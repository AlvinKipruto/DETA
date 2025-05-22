require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Middleware to authenticate JWT token and attach user info to req.user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });
  
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// User Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const userCheck = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error('Signup error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    const user = userResult.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '12h',
    });

    res.json({ token });
  } catch (err) {
    console.error('Login error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add Sale - authenticated
app.post('/api/sales', authenticateToken, async (req, res) => {
  const { productName, quantity, price } = req.body;
  if (!productName || !quantity || !price) return res.status(400).json({ message: 'Missing fields' });

  try {
    const result = await pool.query(
      'INSERT INTO sales (user_id, product_name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, productName, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add sale error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Purchases for user
app.get('/api/purchases', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, product_name, quantity, price FROM purchases WHERE user_id=$1 ORDER BY id DESC',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get purchases error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete purchase by id
app.delete('/api/purchases/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    // Optional: check ownership
    const check = await pool.query('SELECT * FROM purchases WHERE id=$1 AND user_id=$2', [
      id,
      req.user.id,
    ]);
    if (check.rows.length === 0) return res.status(404).json({ message: 'Purchase not found' });

    await pool.query('DELETE FROM purchases WHERE id=$1', [id]);
    res.json({ message: 'Purchase deleted' });
  } catch (err) {
    console.error('Delete purchase error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add purchase (optional, if you want similar to sales)
app.post('/api/purchases', authenticateToken, async (req, res) => {
  const { productName, quantity, price } = req.body;
  if (!productName || !quantity || !price) return res.status(400).json({ message: 'Missing fields' });

  try {
    const result = await pool.query(
      'INSERT INTO purchases (user_id, product_name, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, productName, quantity, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Add purchase error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
