import React, { useState, useMemo } from 'react';
import { EnrichedStudent } from '../types/academic';
import { Search, Plus, Trash2, Edit3, Eye, ArrowUpDown, Filter, RotateCcw } from 'lucide-react';

interface StudentsViewProps {
  students: EnrichedStudent[];
  onSelectStudent: (student: EnrichedStudent) => void;
  onEditStudent: (student: EnrichedStudent) => void;
  onDeleteStudent: (id: number) => void;
  onOpenAddModal: () => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onSelectStudent,
  onEditStudent,
  onDeleteStudent,
  onOpenAddModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semesterFilter, setSemesterFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('id');

  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        const matchesSearch =
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSemester = semesterFilter === 'all' || s.semester.toString() === semesterFilter;
        const matchesRisk = riskFilter === 'all' || s.riskLevel === riskFilter;
        return matchesSearch && matchesSemester && matchesRisk;
      })
      .sort((a, b) => {
        if (sortBy === 'sgpa_desc') return b.sgpa - a.sgpa;
        if (sortBy === 'sgpa_asc') return a.sgpa - b.sgpa;
        if (sortBy === 'att_desc') return b.attendance - a.attendance;
        if (sortBy === 'att_asc') return a.attendance - b.attendance;
        if (sortBy === 'ai_desc') return b.aiScore - a.aiScore;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return b.id - a.id;
      });
  }, [students, searchTerm, semesterFilter, riskFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSemesterFilter('all');
    setRiskFilter('all');
    setSortBy('id');
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter & Action Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center gap-2.5 w-full">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name or roll ID..."
              className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          </div>

          {/* Semester Filter */}
          <select
            value={semesterFilter}
            onChange={(e) => setSemesterFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-700 font-medium"
          >
            <option value="all">All Semesters</option>
            <option value="1">Semester 1</option>
            <option value="3">Semester 3</option>
            <option value="5">Semester 5</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-700 font-medium"
          >
            <option value="all">All Risk Tiers</option>
            <option value="Low Risk">Low Risk (Compliant)</option>
            <option value="Medium Risk">Medium Risk (Watchlist)</option>
            <option value="High Risk">High Risk (Critical)</option>
          </select>

          {/* Sort By Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-slate-700 font-medium"
          >
            <option value="id">Sort: Default (Newest)</option>
            <option value="ai_desc">Highest AI Score</option>
            <option value="sgpa_desc">Highest SGPA</option>
            <option value="sgpa_asc">Lowest SGPA</option>
            <option value="att_desc">Highest Attendance</option>
            <option value="att_asc">Lowest Attendance</option>
            <option value="name">Name (A-Z)</option>
          </select>

          {(searchTerm || semesterFilter !== 'all' || riskFilter !== 'all' || sortBy !== 'id') && (
            <button
              onClick={resetFilters}
              className="text-xs text-slate-500 hover:text-slate-800 underline inline-flex items-center px-1"
            >
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </button>
          )}
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <span className="text-xs text-slate-500">
            Showing <strong className="text-slate-900">{filteredStudents.length}</strong> of {students.length}
          </span>
          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center px-3.5 py-2 border border-transparent text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Student
          </button>
        </div>
      </div>

      {/* Mobile Card List (block md:hidden) */}
      <div className="block md:hidden space-y-3">
        {filteredStudents.length > 0 ? (
          filteredStudents.map((s) => (
            <div key={s.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{s.name}</h4>
                  <p className="text-[11px] text-slate-400">{s.studentId} · Sem {s.semester}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${s.riskBadge}`}>
                  {s.riskLevel}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Att</span>
                  <span className={`text-xs font-bold ${s.attendance < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {s.attendance}%
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">SGPA</span>
                  <span className={`text-xs font-bold ${s.sgpa < 5.0 ? 'text-rose-600' : 'text-slate-800'}`}>
                    {s.sgpa}
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">Lab</span>
                  <span className="text-xs font-bold text-slate-800">{s.assignments}%</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="text-[10px] text-slate-400 block">AI Score</span>
                  <span className="text-xs font-bold text-indigo-600">{s.aiScore}</span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectStudent(s)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold transition"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onEditStudent(s)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDeleteStudent(s.id)}
                  className="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
            No students match the current filters.
          </div>
        )}
      </div>

      {/* Desktop Students Table (hidden md:block) */}
      <div className="hidden md:block bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Roll ID & Name</th>
                <th className="p-3.5">Semester</th>
                <th className="p-3.5">Attendance</th>
                <th className="p-3.5">SGPA</th>
                <th className="p-3.5">Assignments</th>
                <th className="p-3.5">Events</th>
                <th className="p-3.5">AI Score</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {s.studentId} · {s.email}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                        Sem {s.semester}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-bold ${
                          s.attendance < 75
                            ? 'text-rose-600'
                            : s.attendance >= 85
                            ? 'text-emerald-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {s.attendance}%
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`font-bold ${
                          s.sgpa < 5.0
                            ? 'text-rose-600'
                            : s.sgpa >= 8.5
                            ? 'text-indigo-600'
                            : 'text-slate-800'
                        }`}
                      >
                        {s.sgpa}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{s.assignments}%</td>
                    <td className="p-3.5 text-slate-700 font-medium">{s.events}%</td>
                    <td className="p-3.5">
                      <div className="flex items-center space-x-1">
                        <span className="font-bold text-slate-900 text-sm">{s.aiScore}</span>
                        <span className="text-[10px] text-slate-400">/ 100</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${s.riskBadge}`}>
                        {s.riskLevel}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-1">
                      <button
                        onClick={() => onSelectStudent(s)}
                        title="View Student Profile"
                        className="p-1.5 rounded text-indigo-600 hover:bg-indigo-50 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEditStudent(s)}
                        title="Edit Student Record"
                        className="p-1.5 rounded text-slate-600 hover:bg-slate-100 transition"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(s.id)}
                        title="Delete Student Record"
                        className="p-1.5 rounded text-rose-600 hover:bg-rose-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400">
                    No students match the current filters.
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
