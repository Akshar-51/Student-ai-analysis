"""
AcademiaAI - Professional AI-Powered Student Academic Management System
Flask Backend Application
Technology Stack: Python 3, Flask, SQLite3, Pandas, NumPy, Scikit-learn
Viva-friendly design: Modular, clean routes, robust error handling, no duplicated endpoints.
"""

import io
import csv
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, Response
from database import init_db, get_all_students, get_student_by_id, add_student, update_student, delete_student
from ai_engine import calculate_ai_score, evaluate_risk, generate_ai_analysis, analyze_dataset

app = Flask(__name__)
app.secret_key = "academia-ai-bca-academic-management-secret-key"

# Initialize database on startup
with app.app_context():
    init_db()

@app.route('/')
def dashboard():
    """Main Academic Executive Dashboard with institutional KPIs, trends, and overview."""
    students = get_all_students()
    analytics = analyze_dataset(students)

    # Attach AI score and risk to top students
    enriched_students = []
    for s in students:
        ai_meta = generate_ai_analysis(s)
        enriched = dict(s)
        enriched.update(ai_meta)
        enriched_students.append(enriched)

    # Top performers and urgent at-risk for quick dashboard widgets
    top_performers = sorted(enriched_students, key=lambda x: x['ai_score'], reverse=True)[:5]
    at_risk_alerts = [s for s in enriched_students if s['risk_level'] == 'High Risk'][:5]

    return render_template(
        'dashboard.html',
        analytics=analytics,
        top_performers=top_performers,
        at_risk_alerts=at_risk_alerts,
        total_students=len(students)
    )

@app.route('/students')
def students_list():
    """Student Directory with multi-criteria search, semester filtering, and sorting."""
    search_query = request.args.get('q', '').strip()
    sem_filter = request.args.get('semester', 'all')
    sort_by = request.args.get('sort', 'id')
    risk_filter = request.args.get('risk', 'all')

    raw_students = get_all_students(search=search_query, semester=sem_filter, sort_by=sort_by)
    
    enriched = []
    for s in raw_students:
        ai_meta = generate_ai_analysis(s)
        item = dict(s)
        item.update(ai_meta)
        if risk_filter != 'all' and item['risk_level'] != risk_filter:
            continue
        enriched.append(item)

    return render_template(
        'students.html',
        students=enriched,
        search_query=search_query,
        selected_semester=sem_filter,
        selected_sort=sort_by,
        selected_risk=risk_filter,
        count=len(enriched)
    )

@app.route('/student/<int:student_id>')
def student_profile(student_id):
    """Detailed Individual Student Academic Profile with radar metrics and AI diagnosis."""
    student = get_student_by_id(student_id)
    if not student:
        flash("Student record not found.", "error")
        return redirect(url_for('students_list'))

    ai_analysis = generate_ai_analysis(student)
    return render_template('student_profile.html', student=student, ai=ai_analysis)

@app.route('/student/add', methods=['GET', 'POST'])
def add_new_student():
    """Add a new student with strict data validation."""
    if request.method == 'POST':
        student_id = request.form.get('student_id', '').strip()
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        semester = request.form.get('semester')
        attendance = request.form.get('attendance')
        sgpa = request.form.get('sgpa')
        assignments = request.form.get('assignments')
        events = request.form.get('events')

        # Form Validation
        if not student_id or not name:
            flash("Student ID and Full Name are mandatory fields.", "error")
            return render_template('student_form.html', action="Add", student=request.form)

        try:
            sem_val = int(semester)
            att_val = float(attendance)
            sgpa_val = float(sgpa)
            ass_val = float(assignments)
            eve_val = float(events)

            if sem_val not in [1, 2, 3, 4, 5, 6]:
                flash("Semester must be between 1 and 6.", "error")
                return render_template('student_form.html', action="Add", student=request.form)

            if not (0 <= att_val <= 100 and 0 <= sgpa_val <= 10 and 0 <= ass_val <= 100 and 0 <= eve_val <= 100):
                flash("Metrics must be in range: Attendance (0-100), SGPA (0-10), Assignments (0-100), Events (0-100).", "error")
                return render_template('student_form.html', action="Add", student=request.form)

            success, msg = add_student(student_id, name, email, sem_val, att_val, sgpa_val, ass_val, eve_val)
            if success:
                flash(f"Student '{name}' added successfully!", "success")
                return redirect(url_for('students_list'))
            else:
                flash(f"Error: {msg}", "error")
                return render_template('student_form.html', action="Add", student=request.form)

        except ValueError:
            flash("Please enter valid numeric values for academic metrics.", "error")
            return render_template('student_form.html', action="Add", student=request.form)

    return render_template('student_form.html', action="Add", student={})

@app.route('/student/edit/<int:student_id>', methods=['GET', 'POST'])
def edit_student_info(student_id):
    """Edit existing student details."""
    student = get_student_by_id(student_id)
    if not student:
        flash("Student record not found.", "error")
        return redirect(url_for('students_list'))

    if request.method == 'POST':
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        semester = request.form.get('semester')
        attendance = request.form.get('attendance')
        sgpa = request.form.get('sgpa')
        assignments = request.form.get('assignments')
        events = request.form.get('events')

        try:
            sem_val = int(semester)
            att_val = float(attendance)
            sgpa_val = float(sgpa)
            ass_val = float(assignments)
            eve_val = float(events)

            if not (0 <= att_val <= 100 and 0 <= sgpa_val <= 10 and 0 <= ass_val <= 100 and 0 <= eve_val <= 100):
                flash("Metrics out of bounds. Please check the values.", "error")
                return render_template('student_form.html', action="Edit", student=student)

            success, err = update_student(student_id, name, email, sem_val, att_val, sgpa_val, ass_val, eve_val)
            if success:
                flash(f"Student '{name}' updated successfully!", "success")
                return redirect(url_for('student_profile', student_id=student_id))
            else:
                flash(f"Update failed: {err}", "error")

        except ValueError:
            flash("Please provide valid numerical numbers.", "error")

    return render_template('student_form.html', action="Edit", student=student)

@app.route('/student/delete/<int:student_id>', methods=['POST'])
def delete_student_record(student_id):
    """Permanently delete student record."""
    delete_student(student_id)
    flash("Student record removed from database.", "info")
    return redirect(url_for('students_list'))

@app.route('/at-risk')
def at_risk_students():
    """Early Warning Triage System for students requiring immediate academic intervention."""
    all_students = get_all_students()
    high_risk = []
    medium_risk = []

    for s in all_students:
        meta = generate_ai_analysis(s)
        record = dict(s)
        record.update(meta)
        if record['risk_level'] == 'High Risk':
            high_risk.append(record)
        elif record['risk_level'] == 'Medium Risk':
            medium_risk.append(record)

    return render_template(
        'at_risk.html',
        high_risk=high_risk,
        medium_risk=medium_risk,
        high_count=len(high_risk),
        medium_count=len(medium_risk)
    )

@app.route('/analytics')
def semester_analytics():
    """Comparative Semester Analysis (Semester 1, Semester 3, Semester 5)."""
    students = get_all_students()
    analytics = analyze_dataset(students)
    return render_template('analytics.html', analytics=analytics)

@app.route('/insights')
def ai_insights():
    """Automated Statistical AI Insights & Curriculum correlation engine."""
    students = get_all_students()
    analytics = analyze_dataset(students)
    return render_template('insights.html', analytics=analytics)

@app.route('/reports')
def reports_summary():
    """Comprehensive academic performance and compliance reports."""
    students = get_all_students()
    analytics = analyze_dataset(students)

    enriched = []
    for s in students:
        meta = generate_ai_analysis(s)
        r = dict(s)
        r.update(meta)
        enriched.append(r)

    return render_template('reports.html', students=enriched, analytics=analytics)

@app.route('/reports/export-csv')
def export_csv():
    """Dynamic CSV Export of complete student records with calculated AI Scores and Risk Levels."""
    students = get_all_students()
    output = io.StringIO()
    writer = csv.writer(output)

    # Header Row
    writer.writerow([
        'Student ID', 'Full Name', 'Email', 'Semester', 'Attendance (%)',
        'SGPA', 'Assignments (%)', 'Events (%)', 'AI Composite Score',
        'Performance Category', 'Risk Level', 'Archetype Match'
    ])

    for s in students:
        meta = generate_ai_analysis(s)
        writer.writerow([
            s['student_id'], s['name'], s['email'], s['semester'],
            s['attendance'], s['sgpa'], s['assignments'], s['events'],
            meta['ai_score'], meta['category'], meta['risk_level'],
            f"{meta['archetype']} ({meta['archetype_match']}%)"
        ])

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=academia_student_records.csv"}
    )

@app.route('/api/stats')
def api_stats():
    """REST endpoint delivering clean JSON data for chart integrations."""
    students = get_all_students()
    analytics = analyze_dataset(students)
    return jsonify(analytics)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('error.html', error_code=404, message="The requested academic page or student record was not found."), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('error.html', error_code=500, message="An internal server error occurred. Please try again."), 500

if __name__ == '__main__':
    # Default local development port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
