"""
Database Module for AcademiaAI Student Management System
Technology: SQLite3 with Python standard library
Designed for BCA College Project: Simple, efficient, and reliable.
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "academia.db")

def get_connection():
    """Returns a connection to the SQLite database with row factory for dictionary-like access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initializes the database tables and seeds realistic sample data if empty."""
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT,
        semester INTEGER NOT NULL,
        attendance REAL NOT NULL,
        sgpa REAL NOT NULL,
        assignments REAL NOT NULL,
        events REAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    conn.commit()

    # Check if sample data is already present
    cursor.execute("SELECT COUNT(*) FROM students")
    count = cursor.fetchone()[0]

    if count == 0:
        sample_students = [
            # Semester 1
            ('BCA-S1-01', 'Aarav Sharma', 'aarav.s@college.edu', 1, 88.5, 8.7, 92.0, 75.0),
            ('BCA-S1-02', 'Priya Patel', 'priya.p@college.edu', 1, 94.0, 9.4, 96.0, 85.0),
            ('BCA-S1-03', 'Rohan Verma', 'rohan.v@college.edu', 1, 68.0, 5.8, 60.0, 40.0),
            ('BCA-S1-04', 'Ananya Singh', 'ananya.s@college.edu', 1, 78.0, 7.2, 80.0, 65.0),
            ('BCA-S1-05', 'Vikram Malhotra', 'vikram.m@college.edu', 1, 55.0, 4.6, 52.0, 30.0),
            
            # Semester 3
            ('BCA-S3-01', 'Neha Joshi', 'neha.j@college.edu', 3, 91.0, 8.9, 90.0, 88.0),
            ('BCA-S3-02', 'Aditya Kulkarni', 'aditya.k@college.edu', 3, 82.0, 7.8, 85.0, 70.0),
            ('BCA-S3-03', 'Simran Kaur', 'simran.k@college.edu', 3, 62.0, 5.2, 58.0, 45.0),
            ('BCA-S3-04', 'Karan Mehta', 'karan.m@college.edu', 3, 74.0, 6.4, 72.0, 60.0),
            ('BCA-S3-05', 'Isha Nair', 'isha.n@college.edu', 3, 96.0, 9.6, 98.0, 92.0),

            # Semester 5
            ('BCA-S5-01', 'Rahul Deshmukh', 'rahul.d@college.edu', 5, 85.0, 8.2, 88.0, 80.0),
            ('BCA-S5-02', 'Tanvi Gupta', 'tanvi.g@college.edu', 5, 93.0, 9.1, 94.0, 85.0),
            ('BCA-S5-03', 'Sahil Khan', 'sahil.k@college.edu', 5, 59.0, 4.9, 50.0, 35.0),
            ('BCA-S5-04', 'Divya Rathi', 'divya.r@college.edu', 5, 77.0, 7.5, 81.0, 68.0),
            ('BCA-S5-05', 'Manish Pandey', 'manish.p@college.edu', 5, 71.0, 6.1, 65.0, 50.0)
        ]

        cursor.executemany("""
        INSERT INTO students (student_id, name, email, semester, attendance, sgpa, assignments, events)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, sample_students)
        conn.commit()

    conn.close()

def get_all_students(search=None, semester=None, sort_by=None):
    """Retrieve all students with optional search, semester filter and sorting."""
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM students WHERE 1=1"
    params = []

    if search:
        query += " AND (name LIKE ? OR student_id LIKE ?)"
        term = f"%{search.strip()}%"
        params.extend([term, term])

    if semester and semester != 'all':
        query += " AND semester = ?"
        params.append(int(semester))

    sort_columns = {
        'name': 'name ASC',
        'sgpa_desc': 'sgpa DESC',
        'sgpa_asc': 'sgpa ASC',
        'attendance_desc': 'attendance DESC',
        'attendance_asc': 'attendance ASC',
        'semester': 'semester ASC, name ASC'
    }
    order_clause = sort_columns.get(sort_by, 'id DESC')
    query += f" ORDER BY {order_clause}"

    cursor.execute(query, params)
    rows = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return rows

def get_student_by_id(id_val):
    """Retrieve a single student record by numeric database ID or string student_id."""
    conn = get_connection()
    cursor = conn.cursor()

    if isinstance(id_val, int) or str(id_val).isdigit():
        cursor.execute("SELECT * FROM students WHERE id = ?", (int(id_val),))
    else:
        cursor.execute("SELECT * FROM students WHERE student_id = ?", (str(id_val),))

    row = cursor.fetchone()
    conn.close()
    return dict(row) if row else None

def add_student(student_id, name, email, semester, attendance, sgpa, assignments, events):
    """Inserts a new student into the SQLite database."""
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        INSERT INTO students (student_id, name, email, semester, attendance, sgpa, assignments, events)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (student_id.strip(), name.strip(), email.strip(), int(semester), float(attendance), float(sgpa), float(assignments), float(events)))
        conn.commit()
        new_id = cursor.lastrowid
        conn.close()
        return True, new_id
    except sqlite3.IntegrityError:
        conn.close()
        return False, "Student ID already exists! Please use a unique Student ID."
    except Exception as e:
        conn.close()
        return False, str(e)

def update_student(student_pk, name, email, semester, attendance, sgpa, assignments, events):
    """Updates an existing student by primary key."""
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
        UPDATE students
        SET name = ?, email = ?, semester = ?, attendance = ?, sgpa = ?, assignments = ?, events = ?
        WHERE id = ?
        """, (name.strip(), email.strip(), int(semester), float(attendance), float(sgpa), float(assignments), float(events), int(student_pk)))
        conn.commit()
        conn.close()
        return True, None
    except Exception as e:
        conn.close()
        return False, str(e)

def delete_student(student_pk):
    """Deletes a student by primary key."""
    conn = get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM students WHERE id = ?", (int(student_pk),))
        conn.commit()
        conn.close()
        return True
    except Exception:
        conn.close()
        return False
