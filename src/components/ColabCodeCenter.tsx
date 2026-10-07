import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export const ColabCodeCenter: React.FC = () => {
  const [copiedCell, setCopiedCell] = useState<number | null>(null);
  const [activeFileTab, setActiveFileTab] = useState<'colab' | 'github' | 'viva'>('colab');

  const copyToClipboard = (text: string, cellIndex: number) => {
    navigator.clipboard.writeText(text);
    setCopiedCell(cellIndex);
    setTimeout(() => setCopiedCell(null), 2000);
  };

  const githubCellClone = `# ==========================================
# STEP 1: Clone Repository from GitHub
# (Apne GitHub repo ka URL yaha dalein)
# ==========================================
!git clone https://github.com/YOUR_USERNAME/AcademiaAI.git
%cd AcademiaAI
!pip install -q -r requirements.txt
print("✅ Project files downloaded successfully from GitHub!")`;

  const githubCellRun = `# ==========================================
# STEP 2: Super Short Auto-Runner (Sirf 10 Lines)
# Flask server chalu karega aur public link dega
# ==========================================
import subprocess, time, re
from IPython.display import display, HTML

# 1. Download Cloudflare tunnel
!curl -s -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o cloudflared && chmod +x ./cloudflared

# 2. Run Flask in background
subprocess.Popen(["python", "app.py"])
time.sleep(2)

# 3. Start Cloudflare Tunnel
subprocess.Popen(["./cloudflared", "tunnel", "--url", "http://127.0.0.1:5000", "--logfile", "tunnel.log"])
time.sleep(5)

# 4. Get and display live link
public_url = None
with open("tunnel.log") as f:
    match = re.search(r"https://[a-zA-Z0-9-]+\.trycloudflare\.com", f.read())
    if match:
        public_url = match.group(0)

if public_url:
    display(HTML(f'''
    <div style="background: linear-gradient(135deg, #1e1b4b, #4338ca); color: white; padding: 20px; border-radius: 12px; font-family: sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #fff; font-size: 18px;">🎓 AcademiaAI Software Live!</h3>
        <p style="margin: 0 0 12px 0; font-size: 13px; color: #c7d2fe;">Niche diye link par click karein aur pura software dekhein:</p>
        <a href="{public_url}" target="_blank" style="background: #fff; color: #4338ca; padding: 10px 22px; border-radius: 8px; font-weight: bold; text-decoration: none; display: inline-block;">
            👉 Open Live Software
        </a>
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #fde047; font-weight: bold;">Direct Link: {public_url}</p>
    </div>
    '''))
else:
    print("🚀 Flask Server running on port 5000! Check tunnel.log for public URL.")`;

  const colabCell1 = `# ==========================================
# CELL 1: Required Packages Installation
# ==========================================
!pip install -q flask pandas numpy scikit-learn
print("Libraries installed successfully!")`;

  const colabCell2 = `# ==========================================
# CELL 2: Setup SQLite Database & Students
# ==========================================
import sqlite3

def init_db():
    conn = sqlite3.connect("academia.db")
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

    cursor.execute("SELECT COUNT(*) FROM students")
    if cursor.fetchone()[0] == 0:
        sample_students = [
            ('BCA-S1-01', 'Aarav Sharma', 'aarav.s@college.edu', 1, 88.5, 8.7, 92.0, 75.0),
            ('BCA-S1-02', 'Priya Patel', 'priya.p@college.edu', 1, 94.0, 9.4, 96.0, 85.0),
            ('BCA-S1-03', 'Rohan Verma', 'rohan.v@college.edu', 1, 68.0, 5.8, 60.0, 40.0),
            ('BCA-S1-04', 'Ananya Singh', 'ananya.s@college.edu', 1, 78.0, 7.2, 80.0, 65.0),
            ('BCA-S1-05', 'Vikram Malhotra', 'vikram.m@college.edu', 1, 55.0, 4.6, 52.0, 30.0),
            ('BCA-S3-01', 'Neha Joshi', 'neha.j@college.edu', 3, 91.0, 8.9, 90.0, 88.0),
            ('BCA-S3-02', 'Aditya Kulkarni', 'aditya.k@college.edu', 3, 82.0, 7.8, 85.0, 70.0),
            ('BCA-S3-03', 'Simran Kaur', 'simran.k@college.edu', 3, 62.0, 5.2, 58.0, 45.0),
            ('BCA-S3-04', 'Karan Mehta', 'karan.m@college.edu', 3, 74.0, 6.4, 72.0, 60.0),
            ('BCA-S3-05', 'Isha Nair', 'isha.n@college.edu', 3, 96.0, 9.6, 98.0, 92.0),
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
    print("Database & 15 Students ready in academia.db!")

init_db()`;

  const colabCell3 = `# ==========================================
# CELL 3: AI Scoring & Attendance Logic
# ==========================================
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

ARCHETYPES = {
    "High Academic Achiever": [95.0, 95.0, 95.0, 90.0],
    "Balanced Steady Performer": [85.0, 75.0, 80.0, 70.0],
    "Exam-Focused (Needs Activity)": [80.0, 85.0, 65.0, 35.0],
    "Activity-Focused (Needs Study)": [70.0, 55.0, 60.0, 90.0],
    "At-Risk / Needs Intervention": [50.0, 45.0, 45.0, 30.0]
}

def calculate_ai_score(attendance, sgpa, assignments, events):
    sgpa_scaled = min(max(sgpa * 10.0, 0.0), 100.0)
    score = (sgpa_scaled * 0.40) + (attendance * 0.25) + (assignments * 0.20) + (events * 0.15)
    return round(score, 1)

def evaluate_risk(attendance, sgpa, assignments, events, ai_score):
    reasons = []
    if attendance < 75.0:
        reasons.append(f"Attendance ({attendance}%) is below 75% university eligibility.")
    if sgpa < 5.0:
        reasons.append(f"SGPA ({sgpa}) is below passing threshold (5.0).")
    if assignments < 60.0:
        reasons.append(f"Lab assignment completion ({assignments}%) is low.")
    
    if attendance < 70.0 or sgpa < 5.0 or ai_score < 50.0 or len(reasons) >= 2:
        return "High Risk", reasons
    elif attendance < 78.0 or sgpa < 6.5 or assignments < 70.0 or len(reasons) == 1:
        return "Watchlist", reasons
    return "Good Standing", ["All parameters satisfy university compliance."]

def match_archetype(attendance, sgpa, assignments, events):
    student_vec = np.array([[attendance, min(sgpa * 10.0, 100.0), assignments, events]])
    best_name = "Balanced Steady Performer"
    highest_sim = -1.0
    for name, ref_vec in ARCHETYPES.items():
        sim = cosine_similarity(student_vec, np.array([ref_vec]))[0][0]
        if sim > highest_sim:
            highest_sim = sim
            best_name = name
    return best_name, round(float(highest_sim) * 100.0, 1)

print("Logic ready: 75% attendance rule & AI scoring active!")`;

  const colabCell4 = `# ==========================================
# CELL 4: Complete Interactive Web Application
# (100% Same-to-Same UI, Pure CSS, Mobile-Friendly + Instant Public Link)
# ==========================================
import threading
import sqlite3
import json
import time
import os
import re
import subprocess
from flask import Flask, jsonify, request, render_template_string
from IPython.display import display, HTML

colab_app = Flask("AcademiaAI")

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AcademiaAI - Student Academic System</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      min-height: 100vh;
      display: flex;
    }
    
    /* Sidebar Styles */
    .sidebar {
      width: 250px;
      background-color: #0f172a;
      color: #f1f5f9;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-right: 1px solid #1e293b;
      transition: transform 0.25s ease;
      z-index: 100;
      min-height: 100vh;
    }
    .sidebar-header {
      padding: 18px 16px;
      border-bottom: 1px solid #1e293b;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-icon {
      width: 36px;
      height: 36px;
      background-color: #4f46e5;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      color: #ffffff;
      font-weight: bold;
    }
    .brand-title {
      font-size: 15px;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.2;
    }
    .brand-sub {
      font-size: 11px;
      color: #94a3b8;
    }
    .nav-menu {
      flex: 1;
      padding: 12px 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      overflow-y: auto;
    }
    .nav-link {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 11px 14px;
      border-radius: 10px;
      color: #cbd5e1;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      background: transparent;
      border: none;
      text-align: left;
      width: 100%;
      transition: all 0.15s ease;
    }
    .nav-link:hover {
      background-color: #1e293b;
      color: #ffffff;
    }
    .nav-link.active {
      background-color: #4f46e5;
      color: #ffffff;
      font-weight: 600;
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.35);
    }
    .nav-badge {
      background-color: #ef4444;
      color: #ffffff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 9999px;
    }
    .sidebar-footer {
      padding: 14px 16px;
      border-top: 1px solid #1e293b;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #10b981;
    }

    /* Main Content Wrapper */
    .main-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      height: 100vh;
      overflow-y: auto;
    }
    .mobile-header {
      display: none;
      background-color: #0f172a;
      color: #ffffff;
      padding: 12px 16px;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #1e293b;
      position: sticky;
      top: 0;
      z-index: 90;
    }
    .mobile-btn {
      background: #1e293b;
      border: 1px solid #334155;
      color: #ffffff;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 14px;
      cursor: pointer;
    }
    .overlay {
      display: none;
      position: fixed;
      inset: 0;
      background-color: rgba(15, 23, 42, 0.65);
      z-index: 95;
    }
    .overlay.open {
      display: block;
    }

    .content-body {
      padding: 20px;
      flex: 1;
    }
    .view-panel {
      display: none;
    }
    .view-panel.active {
      display: block;
    }

    /* Card & Grid Styles */
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px;
      margin-bottom: 16px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      border-bottom: 1px solid #f1f5f9;
      padding-bottom: 10px;
    }
    .card-title {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }
    .card-sub {
      font-size: 12px;
      color: #64748b;
      margin-top: 2px;
    }

    /* KPI Grids */
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .kpi-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .kpi-card.alert {
      background: #fff1f2;
      border-color: #fecdd3;
    }
    .kpi-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #64748b;
    }
    .kpi-card.alert .kpi-label {
      color: #e11d48;
    }
    .kpi-num {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 4px;
    }
    .kpi-card.alert .kpi-num {
      color: #be123c;
    }

    /* Two column grid */
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .grid-3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }

    /* Buttons */
    .btn {
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.15s;
    }
    .btn-primary {
      background: #4f46e5;
      color: #ffffff;
    }
    .btn-primary:hover {
      background: #4338ca;
    }
    .btn-secondary {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      color: #334155;
    }
    .btn-secondary:hover {
      background: #f8fafc;
    }
    .btn-danger {
      background: #ef4444;
      color: #ffffff;
    }
    .btn-danger:hover {
      background: #dc2626;
    }

    /* Badges */
    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 6px;
      font-size: 10px;
      font-weight: 700;
    }
    .badge-green {
      background: #dcfce7;
      color: #15803d;
    }
    .badge-yellow {
      background: #fef3c7;
      color: #b45309;
    }
    .badge-red {
      background: #ffe4e6;
      color: #be123c;
    }

    /* Student Item Card */
    .student-item {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .student-item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    .student-item-name {
      font-weight: 700;
      font-size: 14px;
      color: #0f172a;
    }
    .student-item-sub {
      font-size: 11px;
      color: #64748b;
    }
    .student-stats-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      text-align: center;
    }
    .stat-pill {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 6px;
      border-radius: 8px;
    }
    .stat-pill-label {
      font-size: 10px;
      color: #64748b;
      display: block;
    }
    .stat-pill-val {
      font-size: 12px;
      font-weight: 700;
      color: #0f172a;
    }

    /* Modals */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.7);
      z-index: 150;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .modal-overlay.open {
      display: flex;
    }
    .modal-box {
      background: #ffffff;
      border-radius: 16px;
      max-width: 500px;
      width: 100%;
      padding: 22px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2);
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
    }

    /* Inputs */
    .form-group {
      margin-bottom: 12px;
    }
    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 4px;
    }
    .form-input, .form-select {
      width: 100%;
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      font-size: 13px;
      background: #ffffff;
      box-sizing: border-box;
    }
    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.15);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
      }
      .sidebar.open {
        transform: translateX(0);
      }
      .mobile-header {
        display: flex;
      }
      .content-body {
        padding: 14px;
      }
      .grid-2, .grid-3 {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>

  <!-- Backdrop for Mobile Drawer -->
  <div id="overlay" class="overlay" onclick="toggleSidebar()"></div>

  <!-- Sidebar (Left navigation) -->
  <aside id="sidebar" class="sidebar">
    <div class="sidebar-header">
      <div class="brand-box">
        <div class="brand-icon">🎓</div>
        <div>
          <div class="brand-title">AcademiaAI</div>
          <div class="brand-sub">Academic Intelligence</div>
        </div>
      </div>
      <button class="mobile-btn" onclick="toggleSidebar()" style="display:none;" id="sidebar-close-btn">&times;</button>
    </div>

    <nav class="nav-menu">
      <button onclick="switchTab('dashboard')" class="nav-link active" data-tab="dashboard">
        <span>📊 Dashboard</span>
      </button>
      <button onclick="switchTab('students')" class="nav-link" data-tab="students">
        <span>👥 Students Directory</span>
      </button>
      <button onclick="openAddModal()" class="nav-link">
        <span>➕ Add Student</span>
      </button>
      <button onclick="switchTab('at-risk')" class="nav-link" data-tab="at-risk">
        <span>⚠️ At-Risk Alert</span>
        <span id="badge-at-risk-count" class="nav-badge">0</span>
      </button>
      <button onclick="switchTab('analytics')" class="nav-link" data-tab="analytics">
        <span>📈 Semester Analytics</span>
      </button>
      <button onclick="switchTab('insights')" class="nav-link" data-tab="insights">
        <span>💡 AI Insights</span>
      </button>
      <button onclick="switchTab('reports')" class="nav-link" data-tab="reports">
        <span>📄 Reports &amp; CSV</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <span>System Online</span>
      <span class="status-dot"></span>
    </div>
  </aside>

  <!-- Main Container -->
  <div class="main-wrap">
    <!-- Mobile Header -->
    <header class="mobile-header">
      <div style="display:flex; align-items:center; gap:10px;">
        <button class="mobile-btn" onclick="toggleSidebar()">☰ Menu</button>
        <div>
          <strong style="font-size:14px;">AcademiaAI</strong>
          <span id="mobile-tab-label" style="font-size:11px; color:#818cf8; display:block;">Dashboard</span>
        </div>
      </div>
      <button class="btn btn-primary" onclick="openAddModal()" style="padding:6px 10px; font-size:11px;">+ Add</button>
    </header>

    <!-- Main Content Area -->
    <main class="content-body">
      <!-- 1. DASHBOARD -->
      <section id="view-dashboard" class="view-panel active">
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h2 class="card-title" style="font-size:18px;">Student Academic Dashboard</h2>
            <p class="card-sub">Monitor student attendance, marks, and academic progress across semesters.</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button onclick="exportCsv()" class="btn btn-secondary">📥 Export CSV</button>
            <button onclick="openAddModal()" class="btn btn-primary">➕ Add Student</button>
          </div>
        </div>

        <div class="kpi-row" id="kpi-container"></div>

        <div class="grid-2">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Top Performing Students</h3>
              <button onclick="switchTab('students')" class="btn btn-secondary" style="padding:4px 8px; font-size:11px;">View All &rarr;</button>
            </div>
            <div id="dash-top-list"></div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title" style="color:#e11d48;">Students Needing Help</h3>
              <button onclick="switchTab('at-risk')" class="btn btn-secondary" style="padding:4px 8px; font-size:11px;">View All &rarr;</button>
            </div>
            <div id="dash-risk-list"></div>
          </div>
        </div>
      </section>

      <!-- 2. STUDENTS DIRECTORY -->
      <section id="view-students" class="view-panel">
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; gap:8px; flex:1; flex-wrap:wrap;">
            <input type="text" id="search-input" oninput="filterAndRenderStudents()" placeholder="Search name or ID..." class="form-input" style="max-width:240px;">
            <select id="filter-semester" onchange="filterAndRenderStudents()" class="form-select" style="max-width:140px;">
              <option value="all">All Semesters</option>
              <option value="1">Semester 1</option>
              <option value="3">Semester 3</option>
              <option value="5">Semester 5</option>
            </select>
            <select id="filter-risk" onchange="filterAndRenderStudents()" class="form-select" style="max-width:140px;">
              <option value="all">All Status</option>
              <option value="Good Standing">Good Standing</option>
              <option value="Watchlist">Watchlist</option>
              <option value="High Risk">High Risk</option>
            </select>
          </div>
          <button onclick="openAddModal()" class="btn btn-primary">➕ Add Student</button>
        </div>
        <div id="students-container"></div>
      </section>

      <!-- 3. AT-RISK ALERT -->
      <section id="view-at-risk" class="view-panel">
        <div class="card" style="background:#0f172a; color:#ffffff; border-color:#1e293b; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span class="badge badge-red" style="margin-bottom:6px;">ATTENTION PROTOCOL</span>
            <h2 class="card-title" style="color:#ffffff; font-size:18px;">Students Needing Immediate Help</h2>
            <p class="card-sub" style="color:#94a3b8;">Students with attendance below 75% or SGPA below 5.0.</p>
          </div>
          <span id="at-risk-count-badge" class="badge badge-red" style="font-size:14px; padding:6px 12px;">0 Cases</span>
        </div>
        <div id="at-risk-container"></div>
      </section>

      <!-- 4. SEMESTER ANALYTICS -->
      <section id="view-analytics" class="view-panel">
        <div class="card">
          <h2 class="card-title">Semester-wise Academic Comparison</h2>
          <p class="card-sub">Benchmark metrics across Semester 1, 3, and 5.</p>
        </div>
        <div class="grid-3" id="analytics-sem-cards"></div>
      </section>

      <!-- 5. AI INSIGHTS -->
      <section id="view-insights" class="view-panel">
        <div class="card" style="background:#0f172a; color:#ffffff; border-color:#1e293b;">
          <h2 class="card-title" style="color:#ffffff; font-size:18px;">Student Performance Insights</h2>
          <p class="card-sub" style="color:#94a3b8;">Clear academic findings based on attendance, SGPA marks, and lab assignments.</p>
        </div>
        <div class="grid-3">
          <div class="card">
            <span class="kpi-label">Attendance &amp; Marks Connection</span>
            <div style="font-size:18px; font-weight:700; color:#4f46e5; margin:6px 0;">Strong Relation</div>
            <p class="card-sub">Students attending &gt;75% classes achieve an average SGPA of 8.8 vs 5.1 for low attendance.</p>
          </div>
          <div class="card">
            <span class="kpi-label">Main Problem Area</span>
            <div style="font-size:18px; font-weight:700; color:#e11d48; margin:6px 0;">Attendance Below 75%</div>
            <p class="card-sub">Most struggling students started lagging in practical lab hours before exams.</p>
          </div>
          <div class="card">
            <span class="kpi-label">Formula Used</span>
            <div style="font-size:14px; font-weight:700; color:#0f172a; margin:6px 0;">SGPA (40%) + Att (25%) + Lab (20%) + Events (15%)</div>
            <p class="card-sub">A fair, transparent score prioritizing exam results and daily discipline.</p>
          </div>
        </div>
      </section>

      <!-- 6. REPORTS -->
      <section id="view-reports" class="view-panel">
        <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h2 class="card-title">Student Academic Report</h2>
            <p class="card-sub">Master ledger with marks, attendance, and calculated AI score.</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button onclick="window.print()" class="btn btn-secondary">🖨️ Print Report</button>
            <button onclick="exportCsv()" class="btn btn-primary">📥 Download CSV</button>
          </div>
        </div>
        <div id="reports-container"></div>
      </section>
    </main>
  </div>

  <!-- ADD STUDENT MODAL -->
  <div id="modal-add" class="modal-overlay">
    <div class="modal-box">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">
        <h3 class="modal-title">Enroll New Student</h3>
        <button onclick="closeAddModal()" class="mobile-btn" style="padding:2px 8px;">&times;</button>
      </div>
      <form onsubmit="saveNewStudent(event)">
        <div class="form-group">
          <label class="form-label">Student Roll ID *</label>
          <input type="text" id="add-roll" required placeholder="BCA-S1-09" class="form-input">
        </div>
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input type="text" id="add-name" required placeholder="Aarav Patel" class="form-input">
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Semester *</label>
            <select id="add-sem" class="form-select">
              <option value="1">Semester 1</option>
              <option value="3">Semester 3</option>
              <option value="5">Semester 5</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" id="add-email" placeholder="student@college.edu" class="form-input">
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
          <div class="form-group">
            <label class="form-label">Att (%)</label>
            <input type="number" id="add-att" step="0.1" min="0" max="100" required value="82" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">SGPA</label>
            <input type="number" id="add-sgpa" step="0.05" min="0" max="10" required value="7.8" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Lab (%)</label>
            <input type="number" id="add-lab" step="0.1" min="0" max="100" required value="85" class="form-input">
          </div>
          <div class="form-group">
            <label class="form-label">Events</label>
            <input type="number" id="add-eve" step="0.1" min="0" max="100" required value="70" class="form-input">
          </div>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:14px; border-top:1px solid #e2e8f0; padding-top:10px;">
          <button type="button" onclick="closeAddModal()" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Student</button>
        </div>
      </form>
    </div>
  </div>

  <!-- STUDENT PROFILE MODAL (Exact match with Screenshots 2, 3, 4, 5) -->
  <div id="modal-profile" class="modal-overlay">
    <div class="modal-box" style="max-width:680px; padding:0; overflow:hidden;">
      <!-- Dark Navy Header Bar -->
      <div style="background:#0f172a; color:#ffffff; padding:18px 20px; display:flex; justify-content:space-between; align-items:flex-start;">
        <div style="display:flex; align-items:center; gap:12px;">
          <div id="prof-avatar" style="width:48px; height:48px; border-radius:14px; background:#4f46e5; color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700;">R</div>
          <div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <h3 id="prof-name" style="font-size:18px; font-weight:700; color:#ffffff; margin:0;">Student Name</h3>
              <span id="prof-cat-badge" class="badge badge-yellow">Average</span>
              <span id="prof-risk-badge" class="badge badge-red">High Risk</span>
            </div>
            <p id="prof-sub" style="font-size:11px; color:#cbd5e1; margin-top:4px;">Roll ID · Semester · email</p>
          </div>
        </div>
        <button onclick="closeProfileModal()" class="mobile-btn" style="padding:4px 10px; font-size:16px;">&times;</button>
      </div>

      <!-- Modal Body (Scrollable) -->
      <div style="padding:20px; max-height:75vh; overflow-y:auto; display:flex; flex-direction:column; gap:16px;">
        <!-- 5 Key Metrics Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:10px;">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px;">
            <span style="font-size:10px; color:#64748b; font-weight:600; display:block;">Composite AI Score</span>
            <div id="prof-score" style="font-size:17px; font-weight:700; color:#4f46e5; margin:3px 0;">58.2 / 100</div>
            <span style="font-size:9px; color:#94a3b8;">Weighted Model</span>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px;">
            <span style="font-size:10px; color:#64748b; font-weight:600; display:block;">Class Attendance</span>
            <div id="prof-att" style="font-size:17px; font-weight:700; color:#e11d48; margin:3px 0;">68%</div>
            <span style="font-size:9px; color:#94a3b8;">Min 75% required</span>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px;">
            <span style="font-size:10px; color:#64748b; font-weight:600; display:block;">Academic SGPA</span>
            <div id="prof-sgpa" style="font-size:17px; font-weight:700; color:#0f172a; margin:3px 0;">5.8 / 10.0</div>
            <span style="font-size:9px; color:#94a3b8;">Scale of 10.0</span>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px;">
            <span style="font-size:10px; color:#64748b; font-weight:600; display:block;">Assignments</span>
            <div id="prof-lab" style="font-size:17px; font-weight:700; color:#0f172a; margin:3px 0;">60%</div>
            <span style="font-size:9px; color:#94a3b8;">Continuous Labs</span>
          </div>
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:10px;">
            <span style="font-size:10px; color:#64748b; font-weight:600; display:block;">Events &amp; Activity</span>
            <div id="prof-eve" style="font-size:17px; font-weight:700; color:#0f172a; margin:3px 0;">40%</div>
            <span style="font-size:9px; color:#94a3b8;">Extracurricular</span>
          </div>
        </div>

        <!-- Academic Performance Category Banner -->
        <div style="background:#eef2ff; border:1px solid #c7d2fe; border-radius:12px; padding:14px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:#4f46e5; color:#ffffff; display:flex; align-items:center; justify-content:center; font-size:16px;">🧭</div>
            <div>
              <span style="font-size:10px; color:#4338ca; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; display:block;">Academic Performance Category</span>
              <h4 id="prof-arch" style="font-size:13px; font-weight:700; color:#0f172a; margin-top:2px;">At-Risk / Needs Intervention (100% Match)</h4>
            </div>
          </div>
          <span class="badge" style="background:#ffffff; color:#4338ca; border:1px solid #c7d2fe;">Category</span>
        </div>

        <!-- Marks & Attendance Breakdown Bars -->
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
          <h4 style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:#0f172a; margin-bottom:12px;">Marks &amp; Attendance Breakdown</h4>
          <div style="display:flex; flex-direction:column; gap:12px; font-size:12px;">
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#475569;">Exam SGPA (40% Weight)</span>
                <strong id="bar-sgpa-label" style="color:#4f46e5;">5.8 SGPA (58 / 100)</strong>
              </div>
              <div style="background:#f1f5f9; border-radius:9999px; height:8px; overflow:hidden;">
                <div id="bar-sgpa-fill" style="background:#4f46e5; height:100%; width:58%;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#475569;">Class Attendance (25% Weight)</span>
                <strong id="bar-att-label" style="color:#e11d48;">68%</strong>
              </div>
              <div style="background:#f1f5f9; border-radius:9999px; height:8px; overflow:hidden;">
                <div id="bar-att-fill" style="background:#e11d48; height:100%; width:68%;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#475569;">Lab Assignments (20% Weight)</span>
                <strong id="bar-lab-label" style="color:#0284c7;">60%</strong>
              </div>
              <div style="background:#f1f5f9; border-radius:9999px; height:8px; overflow:hidden;">
                <div id="bar-lab-fill" style="background:#0284c7; height:100%; width:60%;"></div>
              </div>
            </div>
            <div>
              <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                <span style="color:#475569;">Events &amp; Activities (15% Weight)</span>
                <strong id="bar-eve-label" style="color:#f59e0b;">40%</strong>
              </div>
              <div style="background:#f1f5f9; border-radius:9999px; height:8px; overflow:hidden;">
                <div id="bar-eve-fill" style="background:#f59e0b; height:100%; width:40%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Student Strengths & Areas Needing Improvement -->
        <div style="display:grid; grid-template-columns:1fr; gap:12px;">
          <!-- Strengths -->
          <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:12px; padding:14px;">
            <h4 style="font-size:11px; font-weight:700; text-transform:uppercase; color:#166534; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
              <span>✅</span> Student Strengths
            </h4>
            <div id="prof-strengths" style="display:flex; flex-direction:column; gap:6px;"></div>
          </div>

          <!-- Areas Needing Improvement -->
          <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:12px; padding:14px;">
            <h4 style="font-size:11px; font-weight:700; text-transform:uppercase; color:#9f1239; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
              <span>⚠️</span> Areas Needing Improvement
            </h4>
            <div id="prof-weaknesses" style="display:flex; flex-direction:column; gap:6px;"></div>
          </div>
        </div>

        <!-- Recommended Teacher Action Plan (Dark Navy Card) -->
        <div style="background:#0f172a; color:#ffffff; border-radius:14px; padding:16px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
            <span style="font-size:18px;">💡</span>
            <h4 style="font-size:13px; font-weight:700; color:#ffffff; margin:0;">Recommended Teacher Action Plan</h4>
          </div>
          <div id="prof-recs" style="display:flex; flex-direction:column; gap:8px;"></div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div style="background:#f8fafc; padding:14px 20px; border-top:1px solid #e2e8f0; display:flex; justify-content:flex-end; gap:10px;">
        <button onclick="closeProfileModal()" class="btn btn-secondary">Close</button>
      </div>
    </div>
  </div>

  <!-- Injected Student JSON -->
  <script id="raw-students" type="application/json">{{ students_json|safe }}</script>

  <script>
    let students = JSON.parse(document.getElementById('raw-students').textContent);
    let currentTab = 'dashboard';
    const tabNames = {
      dashboard: 'Dashboard',
      students: 'Students Directory',
      'at-risk': 'At-Risk Alert',
      analytics: 'Semester Analytics',
      insights: 'AI Insights',
      reports: 'Reports & CSV'
    };

    function toggleSidebar() {
      const sb = document.getElementById('sidebar');
      const ov = document.getElementById('overlay');
      const closeBtn = document.getElementById('sidebar-close-btn');
      if (sb.classList.contains('open')) {
        sb.classList.remove('open');
        ov.classList.remove('open');
        if (closeBtn) closeBtn.style.display = 'none';
      } else {
        sb.classList.add('open');
        ov.classList.add('open');
        if (closeBtn) closeBtn.style.display = 'block';
      }
    }

    function switchTab(tab) {
      currentTab = tab;
      document.querySelectorAll('.view-panel').forEach(el => el.classList.remove('active'));
      const target = document.getElementById('view-' + tab);
      if (target) target.classList.add('active');

      document.querySelectorAll('.nav-link').forEach(btn => {
        if (btn.dataset.tab === tab) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      const mobileLabel = document.getElementById('mobile-tab-label');
      if (mobileLabel) mobileLabel.innerText = tabNames[tab] || 'Dashboard';

      const sb = document.getElementById('sidebar');
      if (sb.classList.contains('open')) toggleSidebar();
      renderAll();
    }

    function openAddModal() {
      document.getElementById('modal-add').classList.add('open');
      const sb = document.getElementById('sidebar');
      if (sb.classList.contains('open')) toggleSidebar();
    }
    function closeAddModal() {
      document.getElementById('modal-add').classList.remove('open');
    }

    function openProfileModal(id) {
      const s = students.find(x => x.id === id);
      if (!s) return;
      document.getElementById('prof-avatar').innerText = (s.name || 'S').charAt(0);
      document.getElementById('prof-name').innerText = s.name;
      document.getElementById('prof-sub').innerText = 'Roll ID: ' + s.student_id + ' · Semester ' + s.semester + ' · ' + (s.email || 'student@college.edu');
      
      const catBadge = document.getElementById('prof-cat-badge');
      catBadge.innerText = s.category || (s.ai_score >= 70 ? 'Good' : s.ai_score >= 55 ? 'Average' : 'At Risk');
      catBadge.className = 'badge ' + (s.ai_score >= 70 ? 'badge-green' : s.ai_score >= 55 ? 'badge-yellow' : 'badge-red');

      const riskBadge = document.getElementById('prof-risk-badge');
      riskBadge.innerText = s.risk_level || 'Good Standing';
      riskBadge.className = 'badge ' + (s.risk_level === 'High Risk' ? 'badge-red' : s.risk_level === 'Watchlist' ? 'badge-yellow' : 'badge-green');

      document.getElementById('prof-score').innerText = s.ai_score + ' / 100';
      const attEl = document.getElementById('prof-att');
      attEl.innerText = s.attendance + '%';
      attEl.style.color = s.attendance < 75 ? '#e11d48' : '#0f172a';

      document.getElementById('prof-sgpa').innerText = s.sgpa + ' / 10.0';
      document.getElementById('prof-lab').innerText = s.assignments + '%';
      document.getElementById('prof-eve').innerText = s.events + '%';

      document.getElementById('prof-arch').innerText = (s.archetype || 'Balanced Steady Performer') + ' (' + (s.archetype_match || 100) + '% Match)';

      // Progress bars
      const sgpaScaled = Math.min(Math.round(s.sgpa * 10), 100);
      document.getElementById('bar-sgpa-label').innerText = s.sgpa + ' SGPA (' + sgpaScaled + ' / 100)';
      document.getElementById('bar-sgpa-fill').style.width = sgpaScaled + '%';

      document.getElementById('bar-att-label').innerText = s.attendance + '%';
      document.getElementById('bar-att-label').style.color = s.attendance < 75 ? '#e11d48' : '#10b981';
      document.getElementById('bar-att-fill').style.width = Math.min(s.attendance, 100) + '%';
      document.getElementById('bar-att-fill').style.background = s.attendance < 75 ? '#e11d48' : '#10b981';

      document.getElementById('bar-lab-label').innerText = s.assignments + '%';
      document.getElementById('bar-lab-fill').style.width = Math.min(s.assignments, 100) + '%';

      document.getElementById('bar-eve-label').innerText = s.events + '%';
      document.getElementById('bar-eve-fill').style.width = Math.min(s.events, 100) + '%';

      // Strengths
      const strengths = s.strengths || [];
      document.getElementById('prof-strengths').innerHTML = strengths.length ? strengths.map(st => 
        '<div style="background:#ffffff; border:1px solid #dcfce7; padding:8px 10px; border-radius:8px; font-size:12px; color:#14532d;">' + st + '</div>'
      ).join('') : '<div style="background:#ffffff; padding:8px; border-radius:8px; font-size:12px; color:#15803d;">Solid core baseline present; high potential for rapid score escalation.</div>';

      // Weaknesses
      const weaknesses = s.weaknesses || [];
      document.getElementById('prof-weaknesses').innerHTML = weaknesses.length ? weaknesses.map(wk => 
        '<div style="background:#ffffff; border:1px solid #fee2e2; padding:8px 10px; border-radius:8px; font-size:12px; color:#991b1b;">' + wk + '</div>'
      ).join('') : '<div style="background:#ffffff; padding:8px; border-radius:8px; font-size:12px; color:#15803d;">High-performing scholar exhibiting holistic discipline across all parameters.</div>';

      // Teacher recommendations
      const recs = s.recommendations || [];
      document.getElementById('prof-recs').innerHTML = recs.length ? recs.map(rc => 
        '<div style="background:#1e293b; border:1px solid #334155; padding:10px 12px; border-radius:8px; font-size:12px; color:#e2e8f0; display:flex; gap:8px;">' +
        '<span style="color:#818cf8; font-weight:bold;">&bull;</span><span>' + rc + '</span></div>'
      ).join('') : '<div style="font-size:12px; color:#94a3b8;">Eligible for advanced honors program, departmental research projects, and university gold medal guidance.</div>';

      document.getElementById('modal-profile').classList.add('open');
    }
    function closeProfileModal() {
      document.getElementById('modal-profile').classList.remove('open');
    }

    async function saveNewStudent(e) {
      e.preventDefault();
      const payload = {
        student_id: document.getElementById('add-roll').value.trim(),
        name: document.getElementById('add-name').value.trim(),
        semester: parseInt(document.getElementById('add-sem').value),
        email: document.getElementById('add-email').value.trim() || 'student@college.edu',
        attendance: parseFloat(document.getElementById('add-att').value),
        sgpa: parseFloat(document.getElementById('add-sgpa').value),
        assignments: parseFloat(document.getElementById('add-lab').value),
        events: parseFloat(document.getElementById('add-eve').value)
      };

      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        students = await res.json();
        closeAddModal();
        renderAll();
        alert('Student ' + payload.name + ' successfully added!');
      } else {
        alert('Failed to save student.');
      }
    }

    async function deleteStudent(id) {
      if (!confirm('Are you sure you want to remove this student?')) return;
      const res = await fetch('/api/students/' + id, { method: 'DELETE' });
      if (res.ok) {
        students = await res.json();
        renderAll();
      }
    }

    function exportCsv() {
      let csv = 'ID,Name,Semester,Attendance,SGPA,Lab,Events,AIScore,Risk\\n';
      students.forEach(s => {
        csv += s.student_id + ',"' + s.name + '",' + s.semester + ',' + s.attendance + ',' + s.sgpa + ',' + s.assignments + ',' + s.events + ',' + s.ai_score + ',"' + s.risk_level + '"\\n';
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'students_academic_report.csv';
      a.click();
    }

    function renderAll() {
      const total = students.length;
      const avgAtt = total ? (students.reduce((a, b) => a + b.attendance, 0) / total).toFixed(1) : 0;
      const avgSgpa = total ? (students.reduce((a, b) => a + b.sgpa, 0) / total).toFixed(2) : 0;
      const avgLab = total ? (students.reduce((a, b) => a + b.assignments, 0) / total).toFixed(1) : 0;
      const avgAi = total ? (students.reduce((a, b) => a + b.ai_score, 0) / total).toFixed(1) : 0;
      const highRisk = students.filter(s => s.risk_level === 'High Risk');

      const countBadge = document.getElementById('badge-at-risk-count');
      if (countBadge) countBadge.innerText = highRisk.length;
      const alertBadge = document.getElementById('at-risk-count-badge');
      if (alertBadge) alertBadge.innerText = highRisk.length + ' Cases';

      // KPI Container
      document.getElementById('kpi-container').innerHTML =
        '<div class="kpi-card"><span class="kpi-label">Total Students</span><div class="kpi-num">' + total + '</div></div>' +
        '<div class="kpi-card"><span class="kpi-label">Avg Attendance</span><div class="kpi-num" style="color:#10b981;">' + avgAtt + '%</div></div>' +
        '<div class="kpi-card"><span class="kpi-label">Avg SGPA</span><div class="kpi-num" style="color:#4f46e5;">' + avgSgpa + '</div></div>' +
        '<div class="kpi-card"><span class="kpi-label">Assignments</span><div class="kpi-num" style="color:#0284c7;">' + avgLab + '%</div></div>' +
        '<div class="kpi-card"><span class="kpi-label">AI Score</span><div class="kpi-num" style="color:#7c3aed;">' + avgAi + '</div></div>' +
        '<div class="kpi-card alert"><span class="kpi-label">Need Help</span><div class="kpi-num">' + highRisk.length + '</div></div>';

      // Top Performers
      const topSorted = [...students].sort((a, b) => b.ai_score - a.ai_score).slice(0, 5);
      document.getElementById('dash-top-list').innerHTML = topSorted.map(s =>
        '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid #f1f5f9; font-size:12px;">' +
        '<div><strong style="color:#0f172a; display:block;">' + s.name + '</strong><span style="font-size:11px; color:#64748b;">' + s.student_id + ' · Sem ' + s.semester + '</span></div>' +
        '<div style="text-align:right; display:flex; align-items:center; gap:8px;"><div><strong style="color:#4f46e5; display:block;">' + s.sgpa + ' SGPA</strong><span style="font-size:10px; color:#64748b;">' + s.attendance + '% Att</span></div><button onclick="openProfileModal(' + s.id + ')" class="btn btn-secondary" style="padding:2px 6px;">&rarr;</button></div>' +
        '</div>'
      ).join('');

      // High Risk list
      document.getElementById('dash-risk-list').innerHTML = highRisk.slice(0, 5).map(s =>
        '<div style="display:flex; justify-content:space-between; align-items:center; padding:8px; border-bottom:1px solid #fee2e2; font-size:12px; background:#fff1f2; border-radius:6px; margin-bottom:4px;">' +
        '<div><strong style="color:#be123c; display:block;">' + s.name + '</strong><span style="font-size:11px; color:#64748b;">' + s.student_id + ' · Sem ' + s.semester + '</span></div>' +
        '<div style="text-align:right; display:flex; align-items:center; gap:8px;"><div><strong style="color:#e11d48; display:block;">' + s.attendance + '% Att</strong><span style="font-size:10px; color:#64748b;">' + s.sgpa + ' SGPA</span></div><button onclick="openProfileModal(' + s.id + ')" class="btn btn-danger" style="padding:2px 6px;">&rarr;</button></div>' +
        '</div>'
      ).join('') || '<p style="color:#94a3b8; font-size:12px; padding:10px;">No high risk students detected.</p>';

      filterAndRenderStudents();
      renderAtRiskView();
      renderAnalyticsView();
      renderReportsView();
    }

    function filterAndRenderStudents() {
      const q = (document.getElementById('search-input')?.value || '').toLowerCase();
      const sem = document.getElementById('filter-semester')?.value || 'all';
      const risk = document.getElementById('filter-risk')?.value || 'all';

      const filtered = students.filter(s => {
        const matchesQ = s.name.toLowerCase().includes(q) || s.student_id.toLowerCase().includes(q);
        const matchesSem = sem === 'all' || s.semester.toString() === sem;
        const matchesRisk = risk === 'all' || s.risk_level === risk;
        return matchesQ && matchesSem && matchesRisk;
      });

      document.getElementById('students-container').innerHTML = filtered.map(s =>
        '<div class="student-item" style="border-radius:14px; padding:14px;">' +
        '<div class="student-item-header">' +
        '<div><div class="student-item-name">' + s.name + '</div><div class="student-item-sub">' + s.student_id + ' · Sem ' + s.semester + '</div></div>' +
        '<span class="badge ' + (s.risk_level === 'High Risk' ? 'badge-red' : s.risk_level === 'Watchlist' ? 'badge-yellow' : 'badge-green') + '">' + s.risk_level + '</span>' +
        '</div>' +
        '<div class="student-stats-row">' +
        '<div class="stat-pill"><span class="stat-pill-label">Attendance</span><strong class="stat-pill-val" style="color:' + (s.attendance < 75 ? '#e11d48' : '#0f172a') + '">' + s.attendance + '%</strong></div>' +
        '<div class="stat-pill"><span class="stat-pill-label">SGPA</span><strong class="stat-pill-val" style="color:' + (s.sgpa < 5 ? '#e11d48' : '#0f172a') + '">' + s.sgpa + '</strong></div>' +
        '<div class="stat-pill"><span class="stat-pill-label">Lab</span><strong class="stat-pill-val">' + s.assignments + '%</strong></div>' +
        '<div class="stat-pill"><span class="stat-pill-label">AI Score</span><strong class="stat-pill-val" style="color:#4f46e5;">' + s.ai_score + '</strong></div>' +
        '</div>' +
        '<div style="display:flex; justify-content:space-between; align-items:center; gap:8px; border-top:1px solid #f1f5f9; padding-top:10px; margin-top:4px;">' +
        '<button onclick="openProfileModal(' + s.id + ')" class="btn btn-primary" style="flex:1; justify-content:center;">View Student Action Plan &rsaquo;</button>' +
        '<button onclick="deleteStudent(' + s.id + ')" class="btn btn-secondary" style="color:#ef4444;">Delete</button>' +
        '</div>' +
        '</div>'
      ).join('') || '<p style="text-align:center; padding:20px; color:#94a3b8; font-size:12px;">No matching students found.</p>';
    }

    function renderAtRiskView() {
      const riskList = students.filter(s => s.risk_level === 'High Risk');
      let html = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">' +
        '<h3 style="font-size:12px; font-weight:700; color:#b91c1c; text-transform:uppercase; letter-spacing:0.5px; display:flex; align-items:center; gap:6px;">' +
        '<span>🛡️</span> HIGH RISK (ATTENDANCE &lt; 75% OR SGPA &lt; 5.0)</h3>' +
        '<span style="font-size:12px; color:#64748b; font-weight:600;">' + riskList.length + ' students</span></div>';

      html += riskList.map(s => {
        const reasons = (s.risk_reasons && s.risk_reasons.length) ? s.risk_reasons : [
          'Attendance (' + s.attendance + '%) is below the mandatory 75% university eligibility requirement.'
        ];
        const reasonsHtml = reasons.map(r => '<p style="margin:2px 0; font-size:11px; line-height:1.4;">&bull; ' + r + '</p>').join('');

        return '<div style="background:#ffffff; border:1px solid #fecdd3; border-radius:14px; padding:16px; margin-bottom:14px; box-shadow:0 1px 2px rgba(0,0,0,0.03);">' +
          '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">' +
          '<div><h4 style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">' + s.name + '</h4>' +
          '<span style="font-size:11px; color:#64748b;">' + s.student_id + ' · Sem ' + s.semester + '</span></div>' +
          '<span class="badge" style="background:#fff1f2; color:#be123c; border:1px solid #fecdd3; padding:3px 8px;">High Risk</span></div>' +
          
          '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:12px; text-align:center;">' +
          '<div style="background:#fff1f2; border:1px solid #ffe4e6; padding:8px; border-radius:10px;">' +
          '<span style="font-size:10px; color:#64748b; display:block;">Attendance</span><strong style="font-size:13px; color:#e11d48;">' + s.attendance + '%</strong></div>' +
          '<div style="background:#f8fafc; border:1px solid #e2e8f0; padding:8px; border-radius:10px;">' +
          '<span style="font-size:10px; color:#64748b; display:block;">SGPA</span><strong style="font-size:13px; color:' + (s.sgpa < 5 ? '#e11d48' : '#0f172a') + ';">' + s.sgpa + '</strong></div>' +
          '<div style="background:#f8fafc; border:1px solid #e2e8f0; padding:8px; border-radius:10px;">' +
          '<span style="font-size:10px; color:#64748b; display:block;">AI Score</span><strong style="font-size:13px; color:#0f172a;">' + s.ai_score + '</strong></div></div>' +

          '<div style="background:#fff1f2; border:1px solid #ffe4e6; border-radius:10px; padding:10px; color:#9f1239; font-size:11px; margin-bottom:12px;">' +
          '<strong style="display:block; margin-bottom:4px; color:#881337;">Main Reason:</strong>' + reasonsHtml + '</div>' +

          '<button onclick="openProfileModal(' + s.id + ')" style="width:100%; background:#e11d48; color:#ffffff; border:none; border-radius:10px; padding:10px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">' +
          '<span>View Student Action Plan</span> <span>&rsaquo;</span></button>' +
          '</div>';
      }).join('');

      document.getElementById('at-risk-container').innerHTML = html || '<p style="text-align:center; padding:20px; color:#94a3b8; font-size:12px;">No students currently in High Risk category.</p>';
    }

    function renderAnalyticsView() {
      const sems = [1, 3, 5];
      document.getElementById('analytics-sem-cards').innerHTML = sems.map(sem => {
        const list = students.filter(s => s.semester === sem);
        const cnt = list.length;
        const att = cnt ? (list.reduce((a, b) => a + b.attendance, 0) / cnt).toFixed(1) : 0;
        const gpa = cnt ? (list.reduce((a, b) => a + b.sgpa, 0) / cnt).toFixed(2) : 0;
        const ai = cnt ? (list.reduce((a, b) => a + b.ai_score, 0) / cnt).toFixed(1) : 0;
        return '<div class="card">' +
          '<div class="card-header"><strong style="font-size:15px;">Semester ' + sem + '</strong><span class="badge badge-green">' + cnt + ' Students</span></div>' +
          '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; text-align:center;">' +
          '<div class="stat-pill"><span class="stat-pill-label">Att</span><strong>' + att + '%</strong></div>' +
          '<div class="stat-pill"><span class="stat-pill-label">SGPA</span><strong style="color:#4f46e5;">' + gpa + '</strong></div>' +
          '<div class="stat-pill"><span class="stat-pill-label">AI</span><strong style="color:#7c3aed;">' + ai + '</strong></div>' +
          '</div>' +
          '</div>';
      }).join('');
    }

    function renderReportsView() {
      document.getElementById('reports-container').innerHTML = students.map((s, i) =>
        '<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; padding:10px 14px; margin-bottom:8px; display:flex; justify-content:space-between; align-items:center; font-size:12px;">' +
        '<div><strong style="color:#0f172a; display:block;">#' + (i + 1) + ' ' + s.name + '</strong><span style="font-size:11px; color:#64748b;">' + s.student_id + ' · Sem ' + s.semester + '</span></div>' +
        '<div style="display:flex; align-items:center; gap:12px; text-align:right;">' +
        '<div><span style="font-size:10px; color:#64748b; display:block;">' + s.attendance + '% Att · ' + s.sgpa + ' SGPA</span><strong style="color:#4f46e5;">' + s.ai_score + ' Score</strong></div>' +
        '<span class="badge ' + (s.risk_level === 'High Risk' ? 'badge-red' : s.risk_level === 'Watchlist' ? 'badge-yellow' : 'badge-green') + '">' + s.risk_level + '</span>' +
        '</div></div>'
      ).join('');
    }

    renderAll();
  </script>
</body>
</html>
"""

def get_enriched_students():
    conn = sqlite3.connect("academia.db")
    conn.row_factory = sqlite3.Row
    rows = conn.execute("SELECT * FROM students").fetchall()
    conn.close()
    data = []
    for r in rows:
        d = dict(r)
        att = float(d['attendance'])
        sgpa = float(d['sgpa'])
        ass = float(d['assignments'])
        eve = float(d['events'])
        d['ai_score'] = calculate_ai_score(att, sgpa, ass, eve)
        d['risk_level'], d['risk_reasons'] = evaluate_risk(att, sgpa, ass, eve, d['ai_score'])
        d['archetype'], d['archetype_match'] = match_archetype(att, sgpa, ass, eve)

        # Performance category
        if d['ai_score'] >= 85: d['category'] = 'Excellent'
        elif d['ai_score'] >= 70: d['category'] = 'Good'
        elif d['ai_score'] >= 55: d['category'] = 'Average'
        elif d['ai_score'] >= 45: d['category'] = 'Needs Improvement'
        else: d['category'] = 'At Risk'

        # Strengths & Weaknesses
        strengths, weaknesses = [], []
        if att >= 80: strengths.append(f"Class Attendance ({att}%): Strong classroom discipline and benchmark mastery.")
        elif att < 75: weaknesses.append(f"Attendance ({att}%): Immediate intervention required to restore academic standing.")

        if sgpa >= 8.0: strengths.append(f"Academic SGPA ({sgpa} SGPA): Demonstrates solid exam theoretical mastery.")
        elif sgpa < 6.5: weaknesses.append(f"Academic SGPA ({sgpa} SGPA): Immediate intervention required to restore academic standing.")

        if ass >= 80: strengths.append(f"Internal Assignments ({ass}%): Demonstrates strong consistency and institutional benchmark mastery.")
        elif ass < 70: weaknesses.append(f"Internal Assignments ({ass}%): Immediate intervention required to restore academic standing.")

        if eve >= 70: strengths.append(f"Event Participation ({eve}%): Demonstrates strong consistency and institutional benchmark mastery.")
        elif eve < 50: weaknesses.append(f"Event Participation ({eve}%): Immediate intervention required to restore academic standing.")

        if not strengths: strengths.append("Solid core baseline present; high potential for rapid score escalation.")
        if not weaknesses: weaknesses.append("High-performing scholar exhibiting holistic discipline across all parameters.")

        # Teacher Action Plan
        recs = []
        if att < 75: recs.append("Attend all upcoming practical lab sessions and tutorials to clear minimum 75% university eligibility.")
        if sgpa < 6.5: recs.append("Engage in faculty peer-mentorship for core BCA subjects (DBMS & Data Structures) and review past year papers.")
        if ass < 75: recs.append("Complete internal assignment submissions promptly to secure continuous assessment credits.")
        if eve < 50: recs.append("Participate in college technical fests, hackathons, and tech club workshops to develop applied skills.")
        if not recs: recs.append("Eligible for advanced honors program, departmental research projects, and university gold medal guidance.")

        d['strengths'] = strengths
        d['weaknesses'] = weaknesses
        d['recommendations'] = recs
        data.append(d)
    return data

@colab_app.route("/")
def home():
    data = get_enriched_students()
    return render_template_string(HTML_TEMPLATE, students_json=json.dumps(data))

@colab_app.route("/api/students", methods=["GET", "POST"])
def students_api():
    if request.method == "POST":
        p = request.json or {}
        conn = sqlite3.connect("academia.db")
        conn.execute(
            "INSERT INTO students (student_id, name, email, semester, attendance, sgpa, assignments, events) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (p.get("student_id"), p.get("name"), p.get("email"), p.get("semester"), p.get("attendance"), p.get("sgpa"), p.get("assignments"), p.get("events"))
        )
        conn.commit()
        conn.close()
    return jsonify(get_enriched_students())

@colab_app.route("/api/students/<int:id>", methods=["DELETE"])
def delete_student_api(id):
    conn = sqlite3.connect("academia.db")
    conn.execute("DELETE FROM students WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify(get_enriched_students())

# 1. Start Flask in background thread
threading.Thread(target=lambda: colab_app.run(port=5000, host="0.0.0.0", use_reloader=False), daemon=True).start()
time.sleep(1.5)

# 2. Download Cloudflared for 100% Free Public Mobile Link
print("Setting up Cloudflare Tunnel for Mobile & Laptop access...")
if not os.path.exists("cloudflared"):
    subprocess.run(["wget", "-q", "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64", "-O", "cloudflared"])
    subprocess.run(["chmod", "+x", "cloudflared"])

# Start cloudflared logging to tunnel.log
if os.path.exists("tunnel.log"):
    try: os.remove("tunnel.log")
    except: pass

subprocess.Popen(["./cloudflared", "tunnel", "--url", "http://127.0.0.1:5000", "--logfile", "tunnel.log"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

public_url = None
for _ in range(25):
    time.sleep(1)
    if os.path.exists("tunnel.log"):
        with open("tunnel.log", "r") as f:
            match = re.search(r"https://[a-zA-Z0-9-]+\.trycloudflare\.com", f.read())
            if match:
                public_url = match.group(0)
                break

# Check Colab native proxy as fallback
colab_proxy_url = None
try:
    from google.colab.output import eval_js
    colab_proxy_url = eval_js("google.colab.kernel.proxyPort(5000)")
except Exception:
    pass

final_url = public_url or colab_proxy_url

if final_url:
    display(HTML(f'''
    <div style="background: linear-gradient(135deg, #1e1b4b, #312e81, #4338ca); color: white; padding: 22px; border-radius: 16px; font-family: system-ui, -apple-system, sans-serif; box-shadow: 0 10px 25px rgba(0,0,0,0.25); margin: 15px 0;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
            <span style="font-size: 26px;">🎓</span>
            <div>
                <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">AcademiaAI Web Application Ready!</h2>
                <p style="margin: 2px 0 0 0; font-size: 13px; color: #c7d2fe;">AI-Powered Student Academic & Early Warning System</p>
            </div>
        </div>
        <div style="background: rgba(255,255,255,0.12); padding: 14px 18px; border-radius: 12px; margin: 12px 0;">
            <p style="margin: 0 0 8px 0; font-size: 13px; color: #e0e7ff; font-weight: 600;">👇 मोबाइल या लैपटॉप में ऐप खोलने के लिए नीचे दिए बटन पर क्लिक करें:</p>
            <a href="{final_url}" target="_blank" style="display: inline-block; background: #ffffff; color: #4338ca; padding: 11px 26px; border-radius: 10px; font-weight: 700; font-size: 15px; text-decoration: none; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                👉 Open Live App (Full Screen)
            </a>
            <div style="margin-top: 10px; font-size: 12px; color: #c7d2fe;">
                Direct Link: <a href="{final_url}" target="_blank" style="color: #fde047; font-weight: bold; word-break: break-all;">{final_url}</a>
            </div>
        </div>
        <p style="margin: 0; font-size: 11px; color: #a5b4fc;">✅ 100% Free · Works on Mobile &amp; PC · Full Responsive UI with Sidebar &amp; Tabs</p>
    </div>
    '''))
else:
    print("Server running on port 5000!")

# Colab Notebook ke andar live preview (Pure CSS - No CDN blocking!):
try:
    from google.colab import output
    output.serve_kernel_port_as_iframe(5000, height=750)
except Exception:
    pass`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold uppercase tracking-wider border border-indigo-100 inline-block">
            Code &amp; Viva Center
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">Google Colab &amp; Python Code</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ready-to-run code cells for Google Colab and local Python Flask.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveFileTab('colab')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeFileTab === 'colab' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Google Colab (4 Cells)
          </button>
          <button
            onClick={() => setActiveFileTab('github')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeFileTab === 'github' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            GitHub + Short Cells (Auto-Run)
          </button>
          <button
            onClick={() => setActiveFileTab('viva')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeFileTab === 'viva' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Viva Questions &amp; Q/A
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeFileTab === 'colab' && (
        <div className="space-y-4">
          {/* Cell 1 */}
          <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
              <span className="font-mono text-indigo-300 font-bold">CELL 1: Dependencies Installation</span>
              <button
                onClick={() => copyToClipboard(colabCell1, 1)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
              >
                {copiedCell === 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCell === 1 ? 'Copied!' : 'Copy Cell 1'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto">{colabCell1}</pre>
          </div>

          {/* Cell 2 */}
          <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
              <span className="font-mono text-indigo-300 font-bold">CELL 2: SQLite Database &amp; Sample Records</span>
              <button
                onClick={() => copyToClipboard(colabCell2, 2)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
              >
                {copiedCell === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCell === 2 ? 'Copied!' : 'Copy Cell 2'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-60">{colabCell2}</pre>
          </div>

          {/* Cell 3 */}
          <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
              <span className="font-mono text-indigo-300 font-bold">CELL 3: AI Engine Logic</span>
              <button
                onClick={() => copyToClipboard(colabCell3, 3)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
              >
                {copiedCell === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCell === 3 ? 'Copied!' : 'Copy Cell 3'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-60">{colabCell3}</pre>
          </div>

          {/* Cell 4 */}
          <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
              <span className="font-mono text-indigo-300 font-bold">CELL 4: Complete Interactive App (Same-to-Same UI)</span>
              <button
                onClick={() => copyToClipboard(colabCell4, 4)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
              >
                {copiedCell === 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCell === 4 ? 'Copied!' : 'Copy Cell 4'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-72">{colabCell4}</pre>
          </div>
        </div>
      )}

      {/* GitHub Short Cells Tab */}
      {activeFileTab === 'github' && (
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-2">
            <div className="font-bold text-indigo-900 text-sm flex items-center gap-2">
              <span>🚀</span> GitHub se Google Colab connect karne ka simple tareeqa
            </div>
            <p className="text-slate-700 leading-relaxed">
              Agar aap mobile screen par bada code paste nahi karna chahte, to aap project ko GitHub se 1 command me clone kar sakte hain:
            </p>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600 font-medium">
              <li>GitHub.com par new repository banayein aur project files upload karein.</li>
              <li>Google Colab me niche diya gaya <strong>Step 1</strong> cell run karein.</li>
              <li>Uske baad <strong>Step 2 (Super Short Cell 4)</strong> run karein — Flask automatically start hokar live link de dega!</li>
            </ol>
          </div>

          {/* Step 1: Git Clone */}
          <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
              <span className="font-mono text-indigo-300 font-bold">STEP 1: Clone from GitHub</span>
              <button
                onClick={() => copyToClipboard(githubCellClone, 11)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
              >
                {copiedCell === 11 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCell === 11 ? 'Copied!' : 'Copy Step 1'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-emerald-400 overflow-x-auto">{githubCellClone}</pre>
          </div>

          {/* Step 2: Short Runner */}
          <div className="bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-sm">
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between text-xs border-b border-slate-700">
              <span className="font-mono text-indigo-300 font-bold">STEP 2: Super Short Runner (No Big Copy-Paste)</span>
              <button
                onClick={() => copyToClipboard(githubCellRun, 12)}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
              >
                {copiedCell === 12 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCell === 12 ? 'Copied!' : 'Copy Step 2'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-72">{githubCellRun}</pre>
          </div>
        </div>
      )}

      {activeFileTab === 'viva' && (
        <div className="space-y-4">
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Key Viva Questions &amp; Answers</h3>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-indigo-700">Q1: How is the AI Academic Score calculated?</span>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> Using multi-feature weighting:
                <br />
                <code>Score = (SGPA * 10 * 0.40) + (Attendance * 0.25) + (Assignments * 0.20) + (Events * 0.15)</code>
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-indigo-700">Q2: How does the Early Warning System work?</span>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> It applies regulatory limits:
                Attendance &lt; 75% or SGPA &lt; 5.0 is classified as <strong>High Risk</strong>. Attendance 75%-78% is placed on <strong>Watchlist</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-indigo-700">Q3: Why SQLite?</span>
              <p className="text-slate-700 leading-relaxed">
                <strong>Answer:</strong> SQLite is built into Python, serverless, zero configuration, and stores data in a simple, portable <code>academia.db</code> file.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
