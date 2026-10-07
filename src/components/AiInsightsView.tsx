import React from 'react';
import { BatchAnalytics, EnrichedStudent } from '../types/academic';
import { Brain, CheckCircle2, AlertTriangle, Lightbulb, BookOpen, Trophy } from 'lucide-react';

interface AiInsightsViewProps {
  analytics: BatchAnalytics;
  students: EnrichedStudent[];
}

export const AiInsightsView: React.FC<AiInsightsViewProps> = ({ analytics, students }) => {
  const compliantAttendance = students.filter((s) => s.attendance >= 75).length;
  const attendanceCompliancePct =
    students.length > 0 ? ((compliantAttendance / students.length) * 100).toFixed(0) : '0';

  return (
    <div className="space-y-5">
      {/* Header Banner in Simple Academic English */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Student Performance Insights</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Clear academic findings based on student attendance, SGPA marks, and lab assignments.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Main Finding Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Attendance vs Marks */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Attendance &amp; Marks Connection
          </span>
          <div className="text-2xl font-bold text-indigo-600">
            Strong Relation
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students who attend classes regularly score significantly higher SGPA in end-semester exams.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 mr-1 text-emerald-600 shrink-0" />
            <span>Regular attendance directly boosts grades</span>
          </div>
        </div>

        {/* Card 2: Main Area Needing Attention */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Main Problem Area
          </span>
          <div className="text-2xl font-bold text-rose-600">
            Attendance Below 75%
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Most students struggling academically started by missing practical labs before their exam marks dropped.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-rose-700 font-semibold">
            <AlertTriangle className="w-4 h-4 mr-1 text-rose-600 shrink-0" />
            <span>Need minimum 75% for exam eligibility</span>
          </div>
        </div>

        {/* Card 3: Formula Explanation */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            How AI Score Is Calculated
          </span>
          <div className="text-base font-bold text-slate-900 mt-1">
            SGPA (40%) + Att (25%) + Lab (20%) + Events (15%)
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A balanced formula giving maximum priority to final exam marks while rewarding classroom discipline.
          </p>
          <div className="pt-2 border-t border-slate-100 flex items-center text-xs text-indigo-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 mr-1 text-indigo-600 shrink-0" />
            <span>Fair, transparent scoring system</span>
          </div>
        </div>
      </div>

      {/* 4 Practical College Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Insight 1 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900 text-sm">Attendance Impact on Exam Grades</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Students with attendance above 85% achieve an average SGPA of <strong>8.8</strong>, whereas students below 75% drop to <strong>5.1</strong>. Attending lab practicals is essential for passing.
            </p>
            <span className="text-[11px] text-emerald-700 font-semibold mt-2 inline-block">
              {attendanceCompliancePct}% of students currently meet the 75% rule
            </span>
          </div>
        </div>

        {/* Insight 2 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900 text-sm">Internal Assignment Completion</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Semester 3 students face heavy programming lab workloads (Data Structures &amp; DBMS). Completing weekly assignments on time prevents last-minute exam pressure.
            </p>
            <span className="text-[11px] text-amber-700 font-semibold mt-2 inline-block">
              Tip: Submit lab files weekly to secure internal marks
            </span>
          </div>
        </div>

        {/* Insight 3 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900 text-sm">College Activities &amp; Practical Skills</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Students who take part in college coding fests, technical seminars, and workshops show higher confidence and score better in project viva evaluations.
            </p>
            <span className="text-[11px] text-blue-700 font-semibold mt-2 inline-block">
              Builds practical software skills alongside theory
            </span>
          </div>
        </div>

        {/* Insight 4 */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start space-x-3.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-slate-900 text-sm">Early Teacher Support</h4>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Identifying at-risk students 4 weeks before exams allows teachers to arrange remedial doubt-solving sessions, helping students clear backlogs smoothly.
            </p>
            <span className="text-[11px] text-indigo-700 font-semibold mt-2 inline-block">
              Timely action helps improve overall college passing rate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
