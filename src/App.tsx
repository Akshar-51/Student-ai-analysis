/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Student, EnrichedStudent } from './types/academic';
import { INITIAL_STUDENTS } from './data/initialStudents';
import { enrichStudent, analyzeBatch } from './utils/aiEngine';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { StudentsView } from './components/StudentsView';
import { AtRiskView } from './components/AtRiskView';
import { AnalyticsView } from './components/AnalyticsView';
import { AiInsightsView } from './components/AiInsightsView';
import { ReportsView } from './components/ReportsView';
import { ColabCodeCenter } from './components/ColabCodeCenter';
import { StudentProfileModal } from './components/StudentProfileModal';
import { StudentFormModal } from './components/StudentFormModal';
import { CheckCircle2, AlertCircle, Menu, GraduationCap, UserPlus } from 'lucide-react';

const STORAGE_KEY = 'academia_ai_students_v1';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_STUDENTS;
  });

  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<EnrichedStudent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Enriched Students
  const enrichedStudents: EnrichedStudent[] = useMemo(() => {
    return students.map(enrichStudent);
  }, [students]);

  // Batch Analytics
  const analytics = useMemo(() => {
    return analyzeBatch(students);
  }, [students]);

  // Handle Save Student (Add / Edit)
  const handleSaveStudent = (data: Omit<Student, 'id'>, existingId?: number) => {
    if (existingId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === existingId ? { ...s, ...data } : s))
      );
      showToast(`Student '${data.name}' successfully updated!`);
    } else {
      const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1;
      const newStudent: Student = {
        ...data,
        id: newId,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setStudents((prev) => [newStudent, ...prev]);
      showToast(`Student '${data.name}' enrolled into Semester ${data.semester}!`);
    }
    setEditingStudent(null);
  };

  // Handle Delete Student
  const handleDeleteStudent = (id: number) => {
    const studentToDelete = students.find((s) => s.id === id);
    if (!studentToDelete) return;
    if (confirm(`Are you sure you want to remove ${studentToDelete.name} from records?`)) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (selectedStudent?.id === id) setSelectedStudent(null);
      showToast(`Student record removed.`);
    }
  };

  // Handle CSV Export
  const handleExportCsv = () => {
    const headers = [
      'Student ID',
      'Full Name',
      'Email',
      'Semester',
      'Attendance (%)',
      'SGPA',
      'Assignments (%)',
      'Events (%)',
      'AI Composite Score',
      'Category',
      'Risk Level',
      'Archetype Match'
    ];

    const rows = enrichedStudents.map((s) => [
      s.studentId,
      `"${s.name}"`,
      s.email,
      s.semester,
      s.attendance,
      s.sgpa,
      s.assignments,
      s.events,
      s.aiScore,
      `"${s.category}"`,
      `"${s.riskLevel}"`,
      `"${s.archetype} (${s.archetypeMatch}%)"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'academia_student_records.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Student CSV ledger exported successfully!');
  };

  const pageTitles: Record<TabType, string> = {
    dashboard: 'Dashboard',
    students: 'Students Directory',
    'add-student': 'Add Student',
    'at-risk': 'At-Risk Alert',
    analytics: 'Semester Analytics',
    insights: 'AI Insights',
    reports: 'Reports & CSV',
    'python-colab': 'Python & Colab Hub'
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 text-slate-800 antialiased overflow-hidden font-sans">
      {/* Sidebar Navigation (drawer on mobile, fixed column on desktop) */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'add-student') {
            setEditingStudent(null);
            setIsFormOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        highRiskCount={analytics.highRiskCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Mobile Top Header (Visible only on mobile devices) */}
        <header className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800 shrink-0 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-bold text-xs tracking-tight text-white leading-none">AcademiaAI</h1>
                <span className="text-[10px] text-indigo-300 font-medium">{pageTitles[currentTab]}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => {
                setEditingStudent(null);
                setIsFormOpen(true);
              }}
              className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[11px] font-semibold transition flex items-center space-x-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </header>
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold border ${
                toastMessage.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {toastMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{toastMessage.text}</span>
            </div>
          </div>
        )}

        {/* View Router */}
        <main className="p-4 sm:p-6 flex-1">
          {currentTab === 'dashboard' && (
            <DashboardView
              students={enrichedStudents}
              analytics={analytics}
              onSelectStudent={setSelectedStudent}
              onNavigateTab={setCurrentTab}
              onOpenAddModal={() => {
                setEditingStudent(null);
                setIsFormOpen(true);
              }}
              onExportCsv={handleExportCsv}
            />
          )}

          {currentTab === 'students' && (
            <StudentsView
              students={enrichedStudents}
              onSelectStudent={setSelectedStudent}
              onEditStudent={(s) => {
                setEditingStudent(s);
                setIsFormOpen(true);
              }}
              onDeleteStudent={handleDeleteStudent}
              onOpenAddModal={() => {
                setEditingStudent(null);
                setIsFormOpen(true);
              }}
            />
          )}

          {currentTab === 'at-risk' && (
            <AtRiskView
              students={enrichedStudents}
              onSelectStudent={setSelectedStudent}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              analytics={analytics}
              students={enrichedStudents}
            />
          )}

          {currentTab === 'insights' && (
            <AiInsightsView
              analytics={analytics}
              students={enrichedStudents}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              students={enrichedStudents}
              analytics={analytics}
              onExportCsv={handleExportCsv}
            />
          )}

          {currentTab === 'python-colab' && <ColabCodeCenter />}
        </main>
      </div>

      {/* Student Profile Dossier Modal */}
      <StudentProfileModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        onEdit={(s) => {
          setEditingStudent(s);
          setIsFormOpen(true);
        }}
      />

      {/* Add / Edit Student Form Modal */}
      <StudentFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingStudent(null);
        }}
        onSave={handleSaveStudent}
        initialData={editingStudent}
      />
    </div>
  );
}
