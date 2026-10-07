import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  AlertTriangle,
  BarChart3,
  Brain,
  FileSpreadsheet,
  Code2,
  GraduationCap,
  X
} from 'lucide-react';

export type TabType =
  | 'dashboard'
  | 'students'
  | 'add-student'
  | 'at-risk'
  | 'analytics'
  | 'insights'
  | 'reports'
  | 'python-colab';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  highRiskCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  highRiskCount,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'students' as TabType, label: 'Students Directory', icon: Users },
    { id: 'add-student' as TabType, label: 'Add Student', icon: UserPlus },
    {
      id: 'at-risk' as TabType,
      label: 'At-Risk Alert',
      icon: AlertTriangle,
      badge: highRiskCount > 0 ? highRiskCount : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
    { id: 'analytics' as TabType, label: 'Semester Analytics', icon: BarChart3 },
    { id: 'insights' as TabType, label: 'AI Insights', icon: Brain },
    { id: 'reports' as TabType, label: 'Reports & CSV', icon: FileSpreadsheet },
    { id: 'python-colab' as TabType, label: 'Python & Colab Hub', icon: Code2, highlight: true },
  ];

  const handleItemClick = (id: TabType) => {
    onSelectTab(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Fixed drawer on mobile, static sidebar on desktop */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 bg-slate-900 text-slate-200 flex flex-col shrink-0 border-r border-slate-800 transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-white leading-tight">AcademiaAI</h1>
              <p className="text-[11px] text-slate-400">Academic Intelligence</p>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1.5 text-xs font-medium overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-colors text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : item.highlight
                    ? 'text-indigo-300 hover:bg-slate-800/80 hover:text-white bg-indigo-950/30 border border-indigo-900/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="text-xs">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="p-3.5 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="text-[10px] text-slate-400">System Online</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20" title="Active"></span>
        </div>
      </aside>
    </>
  );
};
