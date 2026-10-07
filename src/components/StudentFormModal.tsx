import React, { useState, useEffect } from 'react';
import { Student } from '../types/academic';
import { calculateAiScore, evaluateRisk, getPerformanceCategory } from '../utils/aiEngine';
import { X, Sparkles } from 'lucide-react';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: Omit<Student, 'id'>, existingId?: number) => void;
  initialData?: Student | null;
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState<1 | 3 | 5>(1);
  const [attendance, setAttendance] = useState<number>(80);
  const [sgpa, setSgpa] = useState<number>(7.5);
  const [assignments, setAssignments] = useState<number>(80);
  const [events, setEvents] = useState<number>(65);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.studentId);
      setName(initialData.name);
      setEmail(initialData.email);
      setSemester(initialData.semester);
      setAttendance(initialData.attendance);
      setSgpa(initialData.sgpa);
      setAssignments(initialData.assignments);
      setEvents(initialData.events);
    } else {
      const randRoll = Math.floor(10 + Math.random() * 90);
      setStudentId(`BCA-S1-${randRoll}`);
      setName('');
      setEmail('');
      setSemester(1);
      setAttendance(82.0);
      setSgpa(7.8);
      setAssignments(85.0);
      setEvents(70.0);
    }
    setErrorMsg('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // Live calculation
  const liveAiScore = calculateAiScore(attendance, sgpa, assignments, events);
  const { category } = getPerformanceCategory(liveAiScore);
  const { riskLevel, riskBadge } = evaluateRisk(attendance, sgpa, assignments, events, liveAiScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId.trim() || !name.trim()) {
      setErrorMsg('Roll ID and Full Name are mandatory.');
      return;
    }

    if (attendance < 0 || attendance > 100 || assignments < 0 || assignments > 100 || events < 0 || events > 100) {
      setErrorMsg('Attendance, assignments, and events must be between 0% and 100%.');
      return;
    }

    if (sgpa < 0 || sgpa > 10) {
      setErrorMsg('SGPA must be between 0.0 and 10.0.');
      return;
    }

    onSave(
      {
        studentId: studentId.trim(),
        name: name.trim(),
        email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@college.edu`,
        semester,
        attendance: Number(attendance),
        sgpa: Number(sgpa),
        assignments: Number(assignments),
        events: Number(events),
      },
      initialData?.id
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {initialData ? 'Edit Student Record' : 'Enroll New Student'}
            </h3>
            <p className="text-xs text-slate-500">Calculate instant AI Score and early warning status</p>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Roll ID *</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                placeholder="e.g. BCA-S1-07"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Yash Vardhan"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@college.edu"
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Semester *</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value) as 1 | 3 | 5)}
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value={1}>Semester 1</option>
                <option value={3}>Semester 3</option>
                <option value={5}>Semester 5</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="block font-bold text-slate-900 mb-2">Academic Metrics</span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-slate-600 mb-1">Attendance (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={attendance}
                  onChange={(e) => setAttendance(parseFloat(e.target.value) || 0)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Min 75% for eligibility</span>
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">Academic SGPA (0-10)</label>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="10"
                  value={sgpa}
                  onChange={(e) => setSgpa(parseFloat(e.target.value) || 0)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400">Scale of 10.0</span>
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">Assignments (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={assignments}
                  onChange={(e) => setAssignments(parseFloat(e.target.value) || 0)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-600 mb-1">Events & Activities (%)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={events}
                  onChange={(e) => setEvents(parseFloat(e.target.value) || 0)}
                  required
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Live AI Engine Evaluation Preview Box */}
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <div>
                <span className="text-[11px] font-bold text-slate-900">Live AI Estimation:</span>
                <div className="flex items-center space-x-1.5 text-xs text-indigo-900 mt-0.5">
                  <span>Score: <strong className="font-bold">{liveAiScore}</strong> / 100</span>
                  <span>·</span>
                  <span>Category: <strong>{category}</strong></span>
                </div>
              </div>
            </div>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskBadge}`}>
              {riskLevel}
            </span>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-sm transition"
            >
              Save Student Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
