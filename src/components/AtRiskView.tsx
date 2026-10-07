import React from 'react';
import { EnrichedStudent } from '../types/academic';
import { AlertTriangle, AlertCircle, ShieldAlert, ChevronRight, UserCheck } from 'lucide-react';

interface AtRiskViewProps {
  students: EnrichedStudent[];
  onSelectStudent: (student: EnrichedStudent) => void;
}

export const AtRiskView: React.FC<AtRiskViewProps> = ({ students, onSelectStudent }) => {
  const highRisk = students.filter((s) => s.riskLevel === 'High Risk');
  const mediumRisk = students.filter((s) => s.riskLevel === 'Medium Risk');

  return (
    <div className="space-y-5">
      {/* Top Simple Warning Banner */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold uppercase tracking-wider">
              Attendance & Marks Alert
            </span>
            <span className="text-xs text-rose-300">Min 75% Attendance Required</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold mt-1 text-white">Students Needing Immediate Attention</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Students whose attendance is below 75% or SGPA is below 5.0. They need guidance before semester final exams.
          </p>
        </div>

        <div className="flex items-center space-x-4 bg-slate-800 p-3 rounded-xl border border-slate-700 shrink-0 self-start sm:self-auto">
          <div className="text-center px-2">
            <span className="text-[11px] text-rose-400 font-semibold uppercase">High Risk</span>
            <p className="text-2xl font-bold text-rose-400">{highRisk.length}</p>
          </div>
          <div className="h-8 w-px bg-slate-700"></div>
          <div className="text-center px-2">
            <span className="text-[11px] text-amber-400 font-semibold uppercase">Watchlist</span>
            <p className="text-2xl font-bold text-amber-400">{mediumRisk.length}</p>
          </div>
        </div>
      </div>

      {/* Critical High Risk Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center">
            <ShieldAlert className="w-4 h-4 mr-1.5" /> High Risk (Attendance &lt; 75% or SGPA &lt; 5.0)
          </h3>
          <span className="text-xs text-slate-500 font-medium">{highRisk.length} students</span>
        </div>

        {/* MOBILE VIEW: Clean Cards (Eliminates horizontal clipping & huge gaps) */}
        <div className="block md:hidden space-y-3">
          {highRisk.length > 0 ? (
            highRisk.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-rose-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-[11px] text-slate-400">{s.studentId} · Sem {s.semester}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    High Risk
                  </span>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-rose-50/70 p-2 rounded-lg border border-rose-100">
                    <span className="text-[10px] text-slate-500 block">Attendance</span>
                    <span className="text-xs font-bold text-rose-600">{s.attendance}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">SGPA</span>
                    <span className={`text-xs font-bold ${s.sgpa < 5.0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {s.sgpa}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">AI Score</span>
                    <span className="text-xs font-bold text-slate-900">{s.aiScore}</span>
                  </div>
                </div>

                {/* Reason */}
                <div className="bg-rose-50/50 p-2.5 rounded-lg border border-rose-100 text-xs text-rose-800 space-y-1">
                  <span className="font-bold text-[11px] block text-rose-900">Main Reason:</span>
                  {s.riskReasons.map((r, i) => (
                    <p key={i} className="text-[11px] leading-tight">&bull; {r}</p>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectStudent(s)}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition flex items-center justify-center space-x-1"
                >
                  <span>View Student Action Plan</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
              <UserCheck className="w-6 h-6 text-emerald-500 mx-auto mb-1" />
              All students have attendance above 75% and passing SGPA.
            </div>
          )}
        </div>

        {/* DESKTOP VIEW: Full Table */}
        <div className="hidden md:block bg-white rounded-xl border border-rose-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-rose-50/70 text-slate-700 font-semibold border-b border-rose-200">
              <tr>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Semester</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">SGPA</th>
                <th className="p-3.5">AI Score</th>
                <th className="p-3.5">Main Reason</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100">
              {highRisk.length > 0 ? (
                highRisk.map((s) => (
                  <tr key={s.id} className="hover:bg-rose-50/30">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-400">{s.studentId}</div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">Sem {s.semester}</td>
                    <td className="p-3.5 font-bold text-rose-600">{s.attendance}%</td>
                    <td className="p-3.5 font-bold text-rose-600">{s.sgpa}</td>
                    <td className="p-3.5 font-bold text-slate-900">{s.aiScore}</td>
                    <td className="p-3.5 text-slate-600 max-w-xs">
                      {s.riskReasons.map((r, i) => (
                        <div key={i} className="text-[11px] text-rose-700">
                          &bull; {r}
                        </div>
                      ))}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition inline-flex items-center"
                      >
                        Action Plan <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    <UserCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                    All students are in good standing!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Medium Risk Watchlist Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center">
            <AlertCircle className="w-4 h-4 mr-1.5" /> Watchlist (Attendance 75%-78% or SGPA 5.0-6.5)
          </h3>
          <span className="text-xs text-slate-500 font-medium">{mediumRisk.length} students</span>
        </div>

        {/* MOBILE VIEW: Clean Cards */}
        <div className="block md:hidden space-y-3">
          {mediumRisk.length > 0 ? (
            mediumRisk.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                    <p className="text-[11px] text-slate-400">{s.studentId} · Sem {s.semester}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    Watchlist
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-amber-50/70 p-2 rounded-lg border border-amber-100">
                    <span className="text-[10px] text-slate-500 block">Attendance</span>
                    <span className="text-xs font-bold text-amber-700">{s.attendance}%</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">SGPA</span>
                    <span className="text-xs font-bold text-slate-800">{s.sgpa}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 block">AI Score</span>
                    <span className="text-xs font-bold text-slate-900">{s.aiScore}</span>
                  </div>
                </div>

                <div className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 text-xs text-amber-800 space-y-1">
                  <span className="font-bold text-[11px] block text-amber-900">Observation:</span>
                  {s.riskReasons.map((r, i) => (
                    <p key={i} className="text-[11px] leading-tight">&bull; {r}</p>
                  ))}
                </div>

                <button
                  onClick={() => onSelectStudent(s)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-2xs transition flex items-center justify-center space-x-1"
                >
                  <span>View Student Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          ) : (
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
              No students on the watchlist.
            </div>
          )}
        </div>

        {/* DESKTOP VIEW: Full Table */}
        <div className="hidden md:block bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/70 text-slate-700 font-semibold border-b border-amber-200">
              <tr>
                <th className="p-3.5">Student</th>
                <th className="p-3.5">Semester</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">SGPA</th>
                <th className="p-3.5">AI Score</th>
                <th className="p-3.5">Observation</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {mediumRisk.length > 0 ? (
                mediumRisk.map((s) => (
                  <tr key={s.id} className="hover:bg-amber-50/30">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-400">{s.studentId}</div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">Sem {s.semester}</td>
                    <td className="p-3.5 font-semibold text-amber-700">{s.attendance}%</td>
                    <td className="p-3.5 font-semibold text-slate-800">{s.sgpa}</td>
                    <td className="p-3.5 font-bold text-slate-900">{s.aiScore}</td>
                    <td className="p-3.5 text-slate-600 max-w-xs">
                      {s.riskReasons.map((r, i) => (
                        <div key={i} className="text-[11px] text-amber-800">
                          &bull; {r}
                        </div>
                      ))}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onSelectStudent(s)}
                        className="text-indigo-600 hover:text-indigo-800 font-semibold text-xs inline-flex items-center"
                      >
                        Profile <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No students currently on Medium Risk watchlist.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
