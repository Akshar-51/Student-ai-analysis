import React from 'react';
import { EnrichedStudent, BatchAnalytics } from '../types/academic';
import {
  Users,
  Award,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  CalendarCheck,
  ChevronRight,
  UserPlus,
  FileSpreadsheet
} from 'lucide-react';

interface DashboardViewProps {
  students: EnrichedStudent[];
  analytics: BatchAnalytics;
  onSelectStudent: (student: EnrichedStudent) => void;
  onNavigateTab: (tab: any) => void;
  onOpenAddModal: () => void;
  onExportCsv: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  analytics,
  onSelectStudent,
  onNavigateTab,
  onOpenAddModal,
  onExportCsv,
}) => {
  const topScholars = [...students].sort((a, b) => b.aiScore - a.aiScore).slice(0, 5);
  const atRiskAlerts = students.filter((s) => s.riskLevel === 'High Risk').slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Action Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Student Academic Dashboard</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor student attendance, marks, and academic progress across semesters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onExportCsv}
            className="inline-flex items-center px-3 py-2 border border-slate-300 text-xs font-semibold rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition shadow-2xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            Export CSV
          </button>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center px-3.5 py-2 border border-transparent text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-2xs"
          >
            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
            Add Student
          </button>
        </div>
      </div>

      {/* Top 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Total Students</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{analytics.totalStudents}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Enrolled in BCA</p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Avg Attendance</span>
            <CalendarCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{analytics.avgAttendance}%</p>
          <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Target &ge; 75%</p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Avg SGPA</span>
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-indigo-600 mt-1">{analytics.avgSgpa}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Scale of 10.0</p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">Assignments</span>
            <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">{analytics.avgAssignments}%</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Lab file average</p>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">AI Score</span>
            <Award className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-purple-700 mt-1">{analytics.avgAiScore}</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Average score / 100</p>
        </div>

        <div className="bg-rose-50/50 p-3.5 sm:p-4 rounded-xl border border-rose-200 shadow-xs">
          <div className="flex items-center justify-between text-rose-500">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-rose-700">Need Attention</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-rose-700 mt-1">{analytics.highRiskCount}</p>
          <button
            onClick={() => onNavigateTab('at-risk')}
            className="text-[10px] text-rose-600 underline font-medium mt-0.5 hover:text-rose-800"
          >
            View list &rarr;
          </button>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Semester Comparison Bars */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Semester Comparison</h3>
              <p className="text-xs text-slate-500">Average Attendance, SGPA, and AI Score across Semesters</p>
            </div>
            <button
              onClick={() => onNavigateTab('analytics')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Details &rarr;
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {[1, 3, 5].map((sem) => {
              const data = analytics.semesterStats[sem] || { avgAttendance: 0, avgSgpa: 0, avgAiScore: 0, count: 0 };
              return (
                <div key={sem} className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <span className="text-slate-900 font-bold">Semester {sem}</span>
                    <span className="text-slate-500 text-[11px]">
                      {data.count} Students · Avg AI Score: <strong className="text-indigo-600">{data.avgAiScore}</strong>
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-500 mb-1">
                        <span>Attendance</span>
                        <span className="font-semibold text-slate-800">{data.avgAttendance}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-indigo-600 h-1.5 rounded-full"
                          style={{ width: `${Math.min(data.avgAttendance, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-500 mb-1">
                        <span>SGPA (x10)</span>
                        <span className="font-semibold text-slate-800">{data.avgSgpa}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full"
                          style={{ width: `${Math.min(data.avgSgpa * 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-slate-500 mb-1">
                        <span>AI Score</span>
                        <span className="font-semibold text-slate-800">{data.avgAiScore}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${Math.min(data.avgAiScore, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Categories Breakdown */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Student Performance Status</h3>
            <p className="text-xs text-slate-500 mb-3">Based on attendance &amp; exam thresholds</p>

            <div className="space-y-2.5">
              <div
                onClick={() => onNavigateTab('students')}
                className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl cursor-pointer hover:bg-emerald-100/70 hover:shadow-xs transition"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-emerald-900">
                  <span>Good Standing (Low Risk)</span>
                  <span className="text-sm font-bold">{analytics.lowRiskCount} &rarr;</span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Attendance &ge; 75%, passing marks in all subjects.
                </p>
              </div>

              <div
                onClick={() => onNavigateTab('at-risk')}
                className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100/70 hover:shadow-xs transition"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-amber-900">
                  <span>Watchlist (Medium Risk)</span>
                  <span className="text-sm font-bold">{analytics.mediumRiskCount} &rarr;</span>
                </div>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Attendance close to 75% or backlog in lab files.
                </p>
              </div>

              <div
                onClick={() => onNavigateTab('at-risk')}
                className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl cursor-pointer hover:bg-rose-100/70 hover:shadow-xs transition"
              >
                <div className="flex justify-between items-center text-xs font-semibold text-rose-900">
                  <span>Need Attention (High Risk)</span>
                  <span className="text-sm font-bold">{analytics.highRiskCount} &rarr;</span>
                </div>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  Attendance below 75% or SGPA below 5.0.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Class Pass Standing:</span>
            <span className="font-bold text-emerald-600">80% Students Eligible</span>
          </div>
        </div>
      </div>

      {/* Tables Row: Top Students & Students Needing Help */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Top Performers */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Top Performing Students</h3>
              <p className="text-xs text-slate-500">Students with highest AI Academic Score</p>
            </div>
            <button
              onClick={() => onNavigateTab('students')}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              All students &rarr;
            </button>
          </div>

          {/* Mobile Card List for Top Students */}
          <div className="block sm:hidden divide-y divide-slate-100 p-2">
            {topScholars.map((s) => (
              <div key={s.id} className="p-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">{s.name}</span>
                  <span className="text-[10px] text-slate-400">{s.studentId} · Sem {s.semester}</span>
                </div>
                <div className="text-right flex items-center space-x-2">
                  <div>
                    <span className="font-bold text-indigo-600 text-xs block">{s.sgpa} SGPA</span>
                    <span className="text-[10px] text-slate-500">{s.attendance}% Att</span>
                  </div>
                  <button
                    onClick={() => onSelectStudent(s)}
                    className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table for Top Students */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-100">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Sem</th>
                  <th className="p-3">SGPA</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">AI Score</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topScholars.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="font-semibold text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-400">{s.studentId}</div>
                    </td>
                    <td className="p-3 text-slate-600 font-medium">Sem {s.semester}</td>
                    <td className="p-3 font-bold text-indigo-600">{s.sgpa}</td>
                    <td className="p-3 text-slate-700">{s.attendance}%</td>
                    <td className="p-3 font-bold text-slate-900">{s.aiScore}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold inline-flex items-center"
                      >
                        Profile <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Students Needing Attention */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Students Needing Help</h3>
              <p className="text-xs text-slate-500">Attendance &lt; 75% or low SGPA marks</p>
            </div>
            <button
              onClick={() => onNavigateTab('at-risk')}
              className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
            >
              View all &rarr;
            </button>
          </div>

          {/* Mobile Card List for At-Risk */}
          <div className="block sm:hidden divide-y divide-rose-50 p-2">
            {atRiskAlerts.length > 0 ? (
              atRiskAlerts.map((s) => (
                <div key={s.id} className="p-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{s.name}</span>
                    <span className="text-[10px] text-slate-400">{s.studentId} · Sem {s.semester}</span>
                  </div>
                  <div className="text-right flex items-center space-x-2">
                    <div>
                      <span className="font-bold text-rose-600 text-xs block">{s.attendance}% Att</span>
                      <span className="text-[10px] text-slate-500">{s.sgpa} SGPA</span>
                    </div>
                    <button
                      onClick={() => onSelectStudent(s)}
                      className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xs text-slate-400 p-4">No at-risk students.</p>
            )}
          </div>

          {/* Desktop Table for At-Risk */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50/50 text-slate-700 border-b border-rose-100">
                <tr>
                  <th className="p-3">Student</th>
                  <th className="p-3">Sem</th>
                  <th className="p-3">Attendance</th>
                  <th className="p-3">SGPA</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {atRiskAlerts.length > 0 ? (
                  atRiskAlerts.map((s) => (
                    <tr key={s.id} className="hover:bg-rose-50/20">
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{s.name}</div>
                        <div className="text-[10px] text-slate-400">{s.studentId}</div>
                      </td>
                      <td className="p-3 text-slate-600 font-medium">Sem {s.semester}</td>
                      <td className="p-3 font-bold text-rose-600">{s.attendance}%</td>
                      <td className="p-3 font-semibold text-slate-800">{s.sgpa}</td>
                      <td className="p-3 text-slate-600 truncate max-w-[150px]">
                        {s.riskReasons[0] || 'Need assistance'}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onSelectStudent(s)}
                          className="text-rose-600 hover:text-rose-800 font-semibold inline-flex items-center"
                        >
                          Profile <ChevronRight className="w-3 h-3 ml-0.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">
                      All students currently meeting requirements!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
