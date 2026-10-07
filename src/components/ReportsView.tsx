import React from 'react';
import { EnrichedStudent, BatchAnalytics } from '../types/academic';
import { FileSpreadsheet, Printer, Download } from 'lucide-react';

interface ReportsViewProps {
  students: EnrichedStudent[];
  analytics: BatchAnalytics;
  onExportCsv: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({ students, analytics, onExportCsv }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* Report Header Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">Student Academic Report</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Complete academic summary with attendance, SGPA marks, and calculated AI Score.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            Print
          </button>
          <button
            onClick={onExportCsv}
            className="inline-flex items-center px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Class Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Total Students</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">{analytics.totalStudents}</p>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Average Attendance</span>
          <p className="text-xl font-bold text-emerald-600 mt-0.5">{analytics.avgAttendance}%</p>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Average SGPA</span>
          <p className="text-xl font-bold text-indigo-600 mt-0.5">{analytics.avgSgpa} / 10</p>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Need Attention</span>
          <p className="text-xl font-bold text-rose-600 mt-0.5">{analytics.highRiskCount} Students</p>
        </div>
      </div>

      {/* MOBILE VIEW: Cards */}
      <div className="block md:hidden space-y-3">
        {students.map((s, index) => (
          <div key={s.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">#{index + 1}</span>
                <h4 className="font-bold text-slate-900 text-xs">{s.name}</h4>
                <p className="text-[10px] text-slate-400">{s.studentId} · Sem {s.semester}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                s.riskLevel === 'High Risk' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {s.riskLevel}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Att</span>
                <span className="font-bold text-slate-800">{s.attendance}%</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">SGPA</span>
                <span className="font-bold text-indigo-600">{s.sgpa}</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Lab</span>
                <span className="font-bold text-slate-800">{s.assignments}%</span>
              </div>
              <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">AI</span>
                <span className="font-bold text-purple-700">{s.aiScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Master Data Table */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Roll ID</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Sem</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">SGPA</th>
                <th className="p-3">Assignments</th>
                <th className="p-3">Events</th>
                <th className="p-3">AI Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s, index) => (
                <tr key={s.id} className="hover:bg-slate-50 transition">
                  <td className="p-3 text-slate-400">{index + 1}</td>
                  <td className="p-3 font-semibold text-slate-800">{s.studentId}</td>
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3 text-slate-600">Sem {s.semester}</td>
                  <td
                    className={`p-3 font-semibold ${
                      s.attendance < 75 ? 'text-rose-600 font-bold' : 'text-slate-700'
                    }`}
                  >
                    {s.attendance}%
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      s.sgpa < 5.0 ? 'text-rose-600 font-bold' : 'text-indigo-600'
                    }`}
                  >
                    {s.sgpa}
                  </td>
                  <td className="p-3 text-slate-700">{s.assignments}%</td>
                  <td className="p-3 text-slate-700">{s.events}%</td>
                  <td className="p-3 font-bold text-slate-900">{s.aiScore}</td>
                  <td
                    className={`p-3 font-semibold ${
                      s.riskLevel === 'High Risk'
                        ? 'text-rose-600'
                        : s.riskLevel === 'Medium Risk'
                        ? 'text-amber-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {s.riskLevel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
