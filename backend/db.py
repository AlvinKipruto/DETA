# backend/db.py
import psycopg2
import os

def get_connection():
    return psycopg2.connect(
        dbname="inventory_db",
        user="postgres",
        password="thunderMANS",  # replace with your actual password
        host="localhost",
        port="5432"
    )
