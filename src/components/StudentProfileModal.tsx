import React from 'react';
import { EnrichedStudent } from '../types/academic';
import {
  X,
  Award,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Compass,
  Edit3,
  CalendarCheck,
  BookOpen
} from 'lucide-react';

interface StudentProfileModalProps {
  student: EnrichedStudent | null;
  onClose: () => void;
  onEdit: (student: EnrichedStudent) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({ student, onClose, onEdit }) => {
  if (!student) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-150">
        {/* Header Profile Bar */}
        <div className="bg-slate-900 text-white p-6 flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-md">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold tracking-tight text-white">{student.name}</h2>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${student.categoryBadge}`}>
                  {student.category}
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${student.riskBadge}`}>
                  {student.riskLevel}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Roll ID: <strong className="text-white">{student.studentId}</strong> · Semester {student.semester} · {student.email}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onClose();
                onEdit(student);
              }}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Edit Student"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Composite AI Score</span>
              <p className="text-xl font-bold text-indigo-600 mt-1">{student.aiScore} / 100</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Weighted Model</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Class Attendance</span>
              <p
                className={`text-xl font-bold mt-1 ${
                  student.attendance < 75 ? 'text-rose-600' : 'text-slate-900'
                }`}
              >
                {student.attendance}%
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Min 75% required</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Academic SGPA</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{student.sgpa} / 10.0</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Scale of 10.0</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Assignments</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{student.assignments}%</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Continuous Labs</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 font-medium">Events & Activity</span>
              <p className="text-xl font-bold text-slate-900 mt-1">{student.events}%</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Extracurricular</p>
            </div>
          </div>

          {/* Archetype Banner */}
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-indigo-700 font-semibold uppercase tracking-wider">
                  Academic Performance Category
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {student.archetype} ({student.archetypeMatch}% Match)
                </h4>
              </div>
            </div>
            <span className="text-xs text-indigo-700 font-semibold bg-white px-2.5 py-1 rounded-md border border-indigo-200 shadow-2xs">
              Category
            </span>
          </div>

          {/* Metric Representation Breakdown */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Marks & Attendance Breakdown</h4>
            
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">Exam SGPA (40% Weight)</span>
                  <span className="font-bold text-indigo-600">{student.sgpa} SGPA ({student.sgpa * 10} / 100)</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.min(student.sgpa * 10, 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">Class Attendance (25% Weight)</span>
                  <span className={`font-bold ${student.attendance < 75 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {student.attendance}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${student.attendance < 75 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(student.attendance, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">Lab Assignments (20% Weight)</span>
                  <span className="font-bold text-slate-800">{student.assignments}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(student.assignments, 100)}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="font-medium text-slate-700">Events & Activities (15% Weight)</span>
                  <span className="font-bold text-slate-800">{student.events}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${Math.min(student.events, 100)}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Strengths & Areas to Improve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" /> Student Strengths
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {student.strengths.map((str, idx) => (
                  <li key={idx} className="bg-white p-2 rounded-lg border border-emerald-100 shadow-2xs">
                    {str}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center mb-2">
                <AlertCircle className="w-4 h-4 text-rose-600 mr-1.5" /> Areas Needing Improvement
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {student.weaknesses.map((wk, idx) => (
                  <li key={idx} className="bg-white p-2 rounded-lg border border-rose-100 shadow-2xs">
                    {wk}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div className="p-5 bg-slate-900 text-white rounded-xl">
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-white">Recommended Teacher Action Plan</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {student.recommendations.map((rec, idx) => (
                <div key={idx} className="p-2.5 bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-700 flex items-start space-x-2">
                  <span className="text-indigo-400 font-bold">&bull;</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEdit(student);
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            Edit Record
          </button>
        </div>
      </div>
    </div>
  );
};
