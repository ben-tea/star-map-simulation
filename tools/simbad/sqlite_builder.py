import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parents[2]
DATABASE_PATH = BASE_DIR / "data" / "catalog.db"


def create_database():
    
    with sqlite3.connect(DATABASE_PATH) as connection:
        cursor = connection.cursor()
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS stars (

            source_id INTEGER PRIMARY KEY,

            name TEXT,

            spectral TEXT,

            object_type TEXT,

            ids_raw TEXT

        )
        """)