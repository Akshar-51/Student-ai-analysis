import React from 'react';
import { BatchAnalytics, EnrichedStudent } from '../types/academic';
import { Trophy, TrendingUp, AlertTriangle, Users } from 'lucide-react';

interface AnalyticsViewProps {
  analytics: BatchAnalytics;
  students: EnrichedStudent[];
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ analytics }) => {
  return (
    <div className="space-y-6">
      {/* Overview Cards by Semester */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[1, 3, 5].map((sem) => {
          const data = analytics.semesterStats[sem] || {
            count: 0,
            avgAttendance: 0,
            avgSgpa: 0,
            avgAssignments: 0,
            avgEvents: 0,
            avgAiScore: 0,
            atRiskCount: 0,
          };

          return (
            <div key={sem} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Semester {sem}</h3>
                  <span className="text-[11px] text-slate-400">Class Academic Statistics</span>
                </div>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md font-semibold border border-indigo-100">
                  {data.count} Enrolled
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 font-medium text-[11px]">Avg Attendance</span>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">{data.avgAttendance}%</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 font-medium text-[11px]">Avg SGPA</span>
                  <p className="text-lg font-bold text-indigo-600 mt-0.5">{data.avgSgpa} / 10</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 font-medium text-[11px]">Assignments</span>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">{data.avgAssignments}%</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg">
                  <span className="text-slate-500 font-medium text-[11px]">Composite AI</span>
                  <p className="text-lg font-bold text-blue-600 mt-0.5">{data.avgAiScore}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">At-Risk Cases:</span>
                <span
                  className={`font-bold ${
                    data.atRiskCount > 0 ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {data.atRiskCount} Students
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Semester Comparative Analysis Bars */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Comparative Metric Benchmarking
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-semester assessment of Attendance, GPA, Lab completion and Holistic participation
          </p>
        </div>

        {/* Metric 1: Attendance */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-700">Class Attendance Benchmark (&ge; 75% required)</span>
            <span className="text-slate-400">Target: 85%</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 3, 5].map((sem) => {
              const val = analytics.semesterStats[sem]?.avgAttendance || 0;
              return (
                <div key={sem} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-800">Sem {sem}</span>
                    <span className="font-bold text-indigo-600">{val}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${Math.min(val, 100)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metric 2: SGPA */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-700">Academic SGPA Scale</span>
            <span className="text-slate-400">Out of 10.0</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 3, 5].map((sem) => {
              const val = analytics.semesterStats[sem]?.avgSgpa || 0;
              return (
                <div key={sem} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-800">Sem {sem}</span>
                    <span className="font-bold text-emerald-600">{val} SGPA</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(val * 10, 100)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Metric 3: AI Composite Score */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-700">AI Composite Academic Performance Score</span>
            <span className="text-slate-400">Scale of 100</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1, 3, 5].map((sem) => {
              const val = analytics.semesterStats[sem]?.avgAiScore || 0;
              return (
                <div key={sem} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-800">Sem {sem}</span>
                    <span className="font-bold text-blue-600">{val} / 100</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(val, 100)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Institutional Insights Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-emerald-900 font-bold text-sm mb-2">
            <Trophy className="w-5 h-5 text-emerald-600" />
            <span>Top Performing Semester: {analytics.bestSemester}</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Leading in composite AI academic score, demonstrating stellar lab practical submission consistency, high exam scores, and excellent participation in department seminars.
          </p>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm mb-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Intervention Target: {analytics.weakestSemester}</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Presents the lowest attendance adherence and backlog in internal assessment modules. Department head recommends initiating peer-tutoring and parent-teacher contact.
          </p>
        </div>
      </div>
    </div>
  );
};
