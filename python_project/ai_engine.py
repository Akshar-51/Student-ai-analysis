"""
AI & Analytics Engine for AcademiaAI
Technologies: Python, Pandas, NumPy, Scikit-learn (Cosine Similarity)
Designed for BCA College Project: Clear mathematical logic, explainable viva concepts.
"""

import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Archetype Profiles for Scikit-Learn Cosine Similarity Matching
ARCHETYPES = {
    "High Academic Achiever": [95.0, 95.0, 95.0, 90.0],       # [Attendance, SGPA_scaled, Assignments, Events]
    "Balanced Steady Performer": [85.0, 75.0, 80.0, 70.0],
    "Exam-Focused (Needs Activity)": [80.0, 85.0, 65.0, 35.0],
    "Activity-Focused (Needs Study)": [70.0, 55.0, 60.0, 90.0],
    "At-Risk / Needs Intervention": [50.0, 45.0, 45.0, 30.0]
}

def calculate_ai_score(attendance, sgpa, assignments, events):
    """
    Computes weighted AI Composite Academic Performance Score (0 - 100).
    Weights:
    - SGPA (scaled to 100): 40% (Primary academic indicator)
    - Attendance: 25% (Classroom commitment)
    - Assignments: 20% (Continuous internal assessment)
    - Events: 15% (Extracurricular participation & holistic growth)
    """
    sgpa_scaled = min(max(sgpa * 10.0, 0.0), 100.0)
    att = min(max(attendance, 0.0), 100.0)
    ass = min(max(assignments, 0.0), 100.0)
    eve = min(max(events, 0.0), 100.0)

    score = (sgpa_scaled * 0.40) + (att * 0.25) + (ass * 0.20) + (eve * 0.15)
    return round(score, 1)

def get_performance_category(score):
    """Maps composite AI score to institutional performance category."""
    if score >= 85:
        return "Excellent", "text-emerald-700 bg-emerald-50 border-emerald-200"
    elif score >= 70:
        return "Good", "text-blue-700 bg-blue-50 border-blue-200"
    elif score >= 55:
        return "Average", "text-amber-700 bg-amber-50 border-amber-200"
    elif score >= 45:
        return "Needs Improvement", "text-orange-700 bg-orange-50 border-orange-200"
    else:
        return "At Risk", "text-rose-700 bg-rose-50 border-rose-200"

def evaluate_risk(attendance, sgpa, assignments, events, ai_score):
    """
    Early Warning System: Categorizes student into Low, Medium, or High Risk
    based on regulatory university thresholds (75% minimum attendance, 5.0 SGPA).
    """
    reasons = []
    risk_level = "Low Risk"
    risk_badge = "text-emerald-700 bg-emerald-50"

    # Critical triggers
    if attendance < 75.0:
        reasons.append(f"Attendance ({attendance}%) is below 75% university eligibility threshold.")
    if sgpa < 5.0:
        reasons.append(f"SGPA ({sgpa}) is below passing/good academic standing (5.0).")
    if assignments < 60.0:
        reasons.append(f"Assignment completion ({assignments}%) is deficient.")
    if ai_score < 50.0:
        reasons.append("Overall composite AI index indicates critical performance lag.")

    # Risk level determination
    if attendance < 70.0 or sgpa < 5.0 or ai_score < 50.0 or len(reasons) >= 2:
        risk_level = "High Risk"
        risk_badge = "text-rose-700 bg-rose-50 border-rose-200"
    elif attendance < 78.0 or sgpa < 6.5 or assignments < 70.0 or len(reasons) == 1:
        risk_level = "Medium Risk"
        risk_badge = "text-amber-700 bg-amber-50 border-amber-200"
    else:
        risk_level = "Low Risk"
        risk_badge = "text-emerald-700 bg-emerald-50 border-emerald-200"

    if not reasons:
        reasons.append("All metrics are compliant with institutional standards.")

    return risk_level, risk_badge, reasons

def match_archetype(attendance, sgpa, assignments, events):
    """
    Applies Scikit-Learn Cosine Similarity to find nearest academic learner archetype.
    Great viva concept: explains vector spaces and similarity metrics.
    """
    sgpa_scaled = min(max(sgpa * 10.0, 0.0), 100.0)
    student_vector = np.array([[attendance, sgpa_scaled, assignments, events]])

    best_match = None
    highest_sim = -1.0

    for name, archetype_vector in ARCHETYPES.items():
        ref_vector = np.array([archetype_vector])
        sim = cosine_similarity(student_vector, ref_vector)[0][0]
        if sim > highest_sim:
            highest_sim = sim
            best_match = name

    sim_percentage = round(float(highest_sim) * 100.0, 1)
    return best_match, sim_percentage

def generate_ai_analysis(student):
    """
    Produces complete explainable AI (XAI) analysis report for a single student.
    Combines feature weights, archetype similarity, strengths, weaknesses, and actionable recommendations.
    """
    attendance = float(student['attendance'])
    sgpa = float(student['sgpa'])
    assignments = float(student['assignments'])
    events = float(student['events'])

    ai_score = calculate_ai_score(attendance, sgpa, assignments, events)
    category, cat_badge = get_performance_category(ai_score)
    risk_level, risk_badge, risk_reasons = evaluate_risk(attendance, sgpa, assignments, events, ai_score)
    archetype, match_pct = match_archetype(attendance, sgpa, assignments, events)

    # Strengths and Weaknesses Identification
    metrics = {
        'Attendance': attendance,
        'Academic SGPA': sgpa * 10.0,
        'Internal Assignments': assignments,
        'Event Participation': events
    }
    sorted_metrics = sorted(metrics.items(), key=lambda x: x[1], reverse=True)
    
    strengths = []
    weaknesses = []

    for name, val in sorted_metrics:
        if val >= 80:
            strengths.append(f"{name} ({round(val/10, 2) if 'SGPA' in name else int(val)}%): High performance indicator.")
        elif val < 70:
            weaknesses.append(f"{name} ({round(val/10, 2) if 'SGPA' in name else int(val)}%): Requires structured improvement.")

    if not strengths:
        strengths.append("Foundational skills present; room for rapid growth across all parameters.")
    if not weaknesses:
        weaknesses.append("Consistent performer with no critical deficiencies identified.")

    # Targeted Remedial Recommendations
    recommendations = []
    if attendance < 75:
        recommendations.append("Mandatory attendance recovery: Attend all upcoming practicals and tutorial sessions to avoid exam debarment.")
    if sgpa < 6.5:
        recommendations.append("Academic remediation: Schedule peer-tutoring sessions for core BCA subjects and focus on previous semester question papers.")
    if assignments < 75:
        recommendations.append("Internal submission audit: Submit backlogged lab files and weekly assignments on time to boost continuous evaluation.")
    if events < 60:
        recommendations.append("Holistic development: Participate in upcoming college hackathons, technical seminars, or coding clubs.")
    if ai_score >= 85:
        recommendations.append("Excellence mentoring: Recommended for competitive coding challenges, research paper writing, and student leadership roles.")

    return {
        'ai_score': ai_score,
        'category': category,
        'category_badge': cat_badge,
        'risk_level': risk_level,
        'risk_badge': risk_badge,
        'risk_reasons': risk_reasons,
        'archetype': archetype,
        'archetype_match': match_pct,
        'strengths': strengths,
        'weaknesses': weaknesses,
        'recommendations': recommendations
    }

def analyze_dataset(students_list):
    """
    Uses Pandas & NumPy to generate statistical summaries, correlation,
    and semester comparative metrics across the entire student dataset.
    """
    if not students_list:
        return {
            'total_students': 0,
            'avg_attendance': 0,
            'avg_sgpa': 0,
            'avg_assignments': 0,
            'avg_events': 0,
            'avg_ai_score': 0,
            'high_risk_count': 0,
            'medium_risk_count': 0,
            'low_risk_count': 0,
            'semester_stats': {},
            'correlation_att_sgpa': 0,
            'best_semester': "N/A",
            'weakest_semester': "N/A"
        }

    df = pd.DataFrame(students_list)
    df['attendance'] = pd.to_numeric(df['attendance'])
    df['sgpa'] = pd.to_numeric(df['sgpa'])
    df['assignments'] = pd.to_numeric(df['assignments'])
    df['events'] = pd.to_numeric(df['events'])
    df['semester'] = pd.to_numeric(df['semester'])

    # Compute AI scores for each row
    df['ai_score'] = df.apply(
        lambda r: calculate_ai_score(r['attendance'], r['sgpa'], r['assignments'], r['events']),
        axis=1
    )

    # Classify Risk
    def get_risk(r):
        lvl, _, _ = evaluate_risk(r['attendance'], r['sgpa'], r['assignments'], r['events'], r['ai_score'])
        return lvl
    
    df['risk_level'] = df.apply(get_risk, axis=1)

    total_students = len(df)
    avg_attendance = round(float(df['attendance'].mean()), 1)
    avg_sgpa = round(float(df['sgpa'].mean()), 2)
    avg_assignments = round(float(df['assignments'].mean()), 1)
    avg_events = round(float(df['events'].mean()), 1)
    avg_ai_score = round(float(df['ai_score'].mean()), 1)

    high_risk_count = int((df['risk_level'] == 'High Risk').sum())
    medium_risk_count = int((df['risk_level'] == 'Medium Risk').sum())
    low_risk_count = int((df['risk_level'] == 'Low Risk').sum())

    # Pearson correlation between Attendance and SGPA
    corr = df['attendance'].corr(df['sgpa'])
    correlation_att_sgpa = round(float(corr) if not pd.isna(corr) else 0.0, 2)

    # Semester Breakdown
    sem_stats = {}
    best_sem = None
    best_sem_score = -1.0
    weakest_sem = None
    weakest_sem_score = 999.0

    for sem_num in [1, 3, 5]:
        sem_df = df[df['semester'] == sem_num]
        if not sem_df.empty:
            sem_ai_avg = round(float(sem_df['ai_score'].mean()), 1)
            sem_stats[sem_num] = {
                'count': int(len(sem_df)),
                'avg_attendance': round(float(sem_df['attendance'].mean()), 1),
                'avg_sgpa': round(float(sem_df['sgpa'].mean()), 2),
                'avg_assignments': round(float(sem_df['assignments'].mean()), 1),
                'avg_events': round(float(sem_df['events'].mean()), 1),
                'avg_ai_score': sem_ai_avg,
                'at_risk_count': int((sem_df['risk_level'] == 'High Risk').sum())
            }
            if sem_ai_avg > best_sem_score:
                best_sem_score = sem_ai_avg
                best_sem = f"Semester {sem_num}"
            if sem_ai_avg < weakest_sem_score:
                weakest_sem_score = sem_ai_avg
                weakest_sem = f"Semester {sem_num}"
        else:
            sem_stats[sem_num] = {
                'count': 0,
                'avg_attendance': 0,
                'avg_sgpa': 0,
                'avg_assignments': 0,
                'avg_events': 0,
                'avg_ai_score': 0,
                'at_risk_count': 0
            }

    return {
        'total_students': total_students,
        'avg_attendance': avg_attendance,
        'avg_sgpa': avg_sgpa,
        'avg_assignments': avg_assignments,
        'avg_events': avg_events,
        'avg_ai_score': avg_ai_score,
        'high_risk_count': high_risk_count,
        'medium_risk_count': medium_risk_count,
        'low_risk_count': low_risk_count,
        'semester_stats': sem_stats,
        'correlation_att_sgpa': correlation_att_sgpa,
        'best_semester': best_sem or "Semester 1",
        'weakest_semester': weakest_sem or "Semester 5"
    }
