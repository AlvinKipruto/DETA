from db import get_connection

def init_db():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    """)

    cur.execute("""
        CREATE TABLE IF NOT EXISTS sales (
            id SERIAL PRIMARY KEY,
            product_name VARCHAR(255),
            quantity INTEGER,
            price NUMERIC,
            date TIMESTAMP,
            user_email VARCHAR(255) REFERENCES users(email)
        );
    """)

    conn.commit()
    cur.close()
    conn.close()

if __name__ == "__main__":
    init_db()
