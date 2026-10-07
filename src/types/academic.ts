export interface Student {
  id: number;
  studentId: string;
  name: string;
  email: string;
  semester: 1 | 3 | 5;
  attendance: number; // 0 - 100
  sgpa: number;       // 0.0 - 10.0
  assignments: number;// 0 - 100
  events: number;     // 0 - 100
  createdAt?: string;
}

export type RiskLevel = 'Low Risk' | 'Medium Risk' | 'High Risk';
export type PerformanceCategory = 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' | 'At Risk';

export interface AIAnalysis {
  aiScore: number;
  category: PerformanceCategory;
  categoryBadge: string;
  riskLevel: RiskLevel;
  riskBadge: string;
  riskReasons: string[];
  archetype: string;
  archetypeMatch: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface EnrichedStudent extends Student, AIAnalysis {}

export interface SemesterStat {
  semester: number;
  count: number;
  avgAttendance: number;
  avgSgpa: number;
  avgAssignments: number;
  avgEvents: number;
  avgAiScore: number;
  atRiskCount: number;
}

export interface BatchAnalytics {
  totalStudents: number;
  avgAttendance: number;
  avgSgpa: number;
  avgAssignments: number;
  avgEvents: number;
  avgAiScore: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  semesterStats: Record<number, SemesterStat>;
  correlationAttSgpa: number;
  bestSemester: string;
  weakestSemester: string;
}
