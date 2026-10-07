import { Student, EnrichedStudent, AIAnalysis, BatchAnalytics, RiskLevel, PerformanceCategory } from '../types/academic';

export const ARCHETYPES: Record<string, number[]> = {
  'High Academic Achiever': [95.0, 95.0, 95.0, 90.0],
  'Balanced Steady Performer': [85.0, 75.0, 80.0, 70.0],
  'Exam-Focused (Needs Activity)': [80.0, 85.0, 65.0, 35.0],
  'Activity-Focused (Needs Study)': [70.0, 55.0, 60.0, 90.0],
  'At-Risk / Needs Intervention': [50.0, 45.0, 45.0, 30.0],
};

/**
 * Calculates the Composite AI Performance Score (0 - 100)
 * SGPA scaled (40%) + Attendance (25%) + Assignments (20%) + Events (15%)
 */
export function calculateAiScore(attendance: number, sgpa: number, assignments: number, events: number): number {
  const sgpaScaled = Math.min(Math.max(sgpa * 10.0, 0), 100);
  const att = Math.min(Math.max(attendance, 0), 100);
  const ass = Math.min(Math.max(assignments, 0), 100);
  const eve = Math.min(Math.max(events, 0), 100);

  const score = (sgpaScaled * 0.40) + (att * 0.25) + (ass * 0.20) + (eve * 0.15);
  return Number(score.toFixed(1));
}

export function getPerformanceCategory(score: number): { category: PerformanceCategory; badge: string } {
  if (score >= 85) return { category: 'Excellent', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (score >= 70) return { category: 'Good', badge: 'text-blue-700 bg-blue-50 border-blue-200' };
  if (score >= 55) return { category: 'Average', badge: 'text-amber-700 bg-amber-50 border-amber-200' };
  if (score >= 45) return { category: 'Needs Improvement', badge: 'text-orange-700 bg-orange-50 border-orange-200' };
  return { category: 'At Risk', badge: 'text-rose-700 bg-rose-50 border-rose-200' };
}

export function evaluateRisk(
  attendance: number,
  sgpa: number,
  assignments: number,
  events: number,
  aiScore: number
): { riskLevel: RiskLevel; riskBadge: string; riskReasons: string[] } {
  const reasons: string[] = [];

  if (attendance < 75.0) {
    reasons.push(`Attendance (${attendance}%) is below the mandatory 75% university eligibility requirement.`);
  }
  if (sgpa < 5.0) {
    reasons.push(`SGPA (${sgpa}) is below passing/good academic standing threshold (5.0).`);
  }
  if (assignments < 60.0) {
    reasons.push(`Internal assignment performance (${assignments}%) indicates critical submission backlogs.`);
  }
  if (aiScore < 50.0) {
    reasons.push('Overall composite AI index reveals deep multidimensional learning deficit.');
  }

  let riskLevel: RiskLevel = 'Low Risk';
  let riskBadge = 'text-emerald-700 bg-emerald-50 border-emerald-200';

  if (attendance < 70.0 || sgpa < 5.0 || aiScore < 50.0 || reasons.length >= 2) {
    riskLevel = 'High Risk';
    riskBadge = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (attendance < 78.0 || sgpa < 6.5 || assignments < 70.0 || reasons.length === 1) {
    riskLevel = 'Medium Risk';
    riskBadge = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  if (reasons.length === 0) {
    reasons.push('All parameters satisfy institutional compliance guidelines.');
  }

  return { riskLevel, riskBadge, riskReasons: reasons };
}

/**
 * Cosine Similarity implementation mirroring scikit-learn's cosine_similarity
 */
export function matchArchetype(
  attendance: number,
  sgpa: number,
  assignments: number,
  events: number
): { archetype: string; matchPct: number } {
  const studentVec = [attendance, Math.min(sgpa * 10.0, 100), assignments, events];
  
  let bestArchetype = 'Balanced Steady Performer';
  let highestSim = -1;

  for (const [name, refVec] of Object.entries(ARCHETYPES)) {
    let dotProduct = 0;
    let magA = 0;
    let magB = 0;

    for (let i = 0; i < 4; i++) {
      dotProduct += studentVec[i] * refVec[i];
      magA += studentVec[i] * studentVec[i];
      magB += refVec[i] * refVec[i];
    }

    const similarity = dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
    if (similarity > highestSim) {
      highestSim = similarity;
      bestArchetype = name;
    }
  }

  return {
    archetype: bestArchetype,
    matchPct: Number((highestSim * 100).toFixed(1))
  };
}

export function generateAiAnalysis(student: Student): AIAnalysis {
  const { attendance, sgpa, assignments, events } = student;
  const aiScore = calculateAiScore(attendance, sgpa, assignments, events);
  const { category, badge: categoryBadge } = getPerformanceCategory(aiScore);
  const { riskLevel, riskBadge, riskReasons } = evaluateRisk(attendance, sgpa, assignments, events, aiScore);
  const { archetype, matchPct } = matchArchetype(attendance, sgpa, assignments, events);

  const metrics = [
    { label: 'Attendance', val: attendance, display: `${attendance}%` },
    { label: 'Academic SGPA', val: sgpa * 10, display: `${sgpa} SGPA` },
    { label: 'Internal Assignments', val: assignments, display: `${assignments}%` },
    { label: 'Event Participation', val: events, display: `${events}%` },
  ];

  metrics.sort((a, b) => b.val - a.val);

  const strengths: string[] = [];
  const weaknesses: string[] = [];

  for (const m of metrics) {
    if (m.val >= 80) {
      strengths.push(`${m.label} (${m.display}): Demonstrates strong consistency and institutional benchmark mastery.`);
    } else if (m.val < 70) {
      weaknesses.push(`${m.label} (${m.display}): Immediate intervention required to restore academic standing.`);
    }
  }

  if (strengths.length === 0) {
    strengths.push('Solid core baseline present; high potential for rapid score escalation.');
  }
  if (weaknesses.length === 0) {
    weaknesses.push('High-performing scholar exhibiting holistic discipline across all parameters.');
  }

  const recommendations: string[] = [];
  if (attendance < 75) {
    recommendations.push('Attend all upcoming practical lab sessions and tutorials to clear minimum 75% university eligibility.');
  }
  if (sgpa < 6.5) {
    recommendations.push('Engage in faculty peer-mentorship for core BCA subjects (DBMS & Data Structures) and review past year papers.');
  }
  if (assignments < 75) {
    recommendations.push('Complete internal assignment submissions promptly to secure continuous assessment credits.');
  }
  if (events < 60) {
    recommendations.push('Participate in college technical fests, hackathons, and tech club workshops to develop applied skills.');
  }
  if (aiScore >= 85) {
    recommendations.push('Recommended for departmental research projects, coding symposiums, and student teaching assistantships.');
  }

  return {
    aiScore,
    category,
    categoryBadge,
    riskLevel,
    riskBadge,
    riskReasons,
    archetype,
    archetypeMatch: matchPct,
    strengths,
    weaknesses,
    recommendations
  };
}

export function enrichStudent(student: Student): EnrichedStudent {
  const analysis = generateAiAnalysis(student);
  return {
    ...student,
    ...analysis
  };
}

export function analyzeBatch(students: Student[]): BatchAnalytics {
  if (students.length === 0) {
    return {
      totalStudents: 0,
      avgAttendance: 0,
      avgSgpa: 0,
      avgAssignments: 0,
      avgEvents: 0,
      avgAiScore: 0,
      highRiskCount: 0,
      mediumRiskCount: 0,
      lowRiskCount: 0,
      semesterStats: {},
      correlationAttSgpa: 0,
      bestSemester: 'N/A',
      weakestSemester: 'N/A'
    };
  }

  const enriched = students.map(enrichStudent);
  const total = enriched.length;

  const totalAtt = enriched.reduce((acc, s) => acc + s.attendance, 0);
  const totalSgpa = enriched.reduce((acc, s) => acc + s.sgpa, 0);
  const totalAss = enriched.reduce((acc, s) => acc + s.assignments, 0);
  const totalEve = enriched.reduce((acc, s) => acc + s.events, 0);
  const totalAi = enriched.reduce((acc, s) => acc + s.aiScore, 0);

  const avgAttendance = Number((totalAtt / total).toFixed(1));
  const avgSgpa = Number((totalSgpa / total).toFixed(2));
  const avgAssignments = Number((totalAss / total).toFixed(1));
  const avgEvents = Number((totalEve / total).toFixed(1));
  const avgAiScore = Number((totalAi / total).toFixed(1));

  const highRiskCount = enriched.filter(s => s.riskLevel === 'High Risk').length;
  const mediumRiskCount = enriched.filter(s => s.riskLevel === 'Medium Risk').length;
  const lowRiskCount = enriched.filter(s => s.riskLevel === 'Low Risk').length;

  // Pearson Correlation calculation between Attendance and SGPA
  const meanX = avgAttendance;
  const meanY = avgSgpa;
  let num = 0;
  let denX = 0;
  let denY = 0;

  for (const s of enriched) {
    const dx = s.attendance - meanX;
    const dy = s.sgpa - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }
  const denominator = Math.sqrt(denX) * Math.sqrt(denY);
  const correlationAttSgpa = denominator === 0 ? 0 : Number((num / denominator).toFixed(2));

  // Semester aggregations
  const semesterStats: Record<number, any> = {};
  let bestSem = '';
  let bestScore = -1;
  let weakestSem = '';
  let weakestScore = 9999;

  for (const sem of [1, 3, 5]) {
    const semStudents = enriched.filter(s => s.semester === sem);
    const count = semStudents.length;

    if (count > 0) {
      const sAtt = semStudents.reduce((acc, s) => acc + s.attendance, 0) / count;
      const sSgpa = semStudents.reduce((acc, s) => acc + s.sgpa, 0) / count;
      const sAss = semStudents.reduce((acc, s) => acc + s.assignments, 0) / count;
      const sEve = semStudents.reduce((acc, s) => acc + s.events, 0) / count;
      const sAi = semStudents.reduce((acc, s) => acc + s.aiScore, 0) / count;
      const sAtRisk = semStudents.filter(s => s.riskLevel === 'High Risk').length;

      semesterStats[sem] = {
        semester: sem,
        count,
        avgAttendance: Number(sAtt.toFixed(1)),
        avgSgpa: Number(sSgpa.toFixed(2)),
        avgAssignments: Number(sAss.toFixed(1)),
        avgEvents: Number(sEve.toFixed(1)),
        avgAiScore: Number(sAi.toFixed(1)),
        atRiskCount: sAtRisk
      };

      if (sAi > bestScore) {
        bestScore = sAi;
        bestSem = `Semester ${sem}`;
      }
      if (sAi < weakestScore) {
        weakestScore = sAi;
        weakestSem = `Semester ${sem}`;
      }
    } else {
      semesterStats[sem] = {
        semester: sem,
        count: 0,
        avgAttendance: 0,
        avgSgpa: 0,
        avgAssignments: 0,
        avgEvents: 0,
        avgAiScore: 0,
        atRiskCount: 0
      };
    }
  }

  return {
    totalStudents: total,
    avgAttendance,
    avgSgpa,
    avgAssignments,
    avgEvents,
    avgAiScore,
    highRiskCount,
    mediumRiskCount,
    lowRiskCount,
    semesterStats,
    correlationAttSgpa,
    bestSemester: bestSem || 'Semester 1',
    weakestSemester: weakestSem || 'Semester 5'
  };
}
