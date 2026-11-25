import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  ManagementTab,
  NavSection,
  TeacherTab,
  UserRole,
} from '../data/schoolData';

interface TopBarProps {
  role: UserRole;
  activeSection: NavSection;
  teacherTab: TeacherTab;
  managementTab: ManagementTab;
  onSelectSection: (section: NavSection) => void;
  onSelectTeacherTab: (tab: TeacherTab) => void;
  onSelectManagementTab: (tab: ManagementTab) => void;
  onPrimaryAction: () => void;
}

const PARENT_NAV: { id: NavSection; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'academics', label: 'Reports & Grades' },
  { id: 'homework', label: 'Homework' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'updates', label: 'Notes & News' },
];

const TEACHER_NAV: { id: TeacherTab; label: string }[] = [
  { id: 'rollcall', label: 'Roll Call' },
  { id: 'grades', label: 'Class Scores' },
  { id: 'homework', label: 'Homework' },
  { id: 'feedback', label: 'Notes & Awards' },
];

const MANAGEMENT_NAV: { id: ManagementTab; label: string }[] = [
  { id: 'summary', label: 'School Summary' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'classes', label: 'Classes & Staff' },
];

export function TopBar({
  role,
  activeSection,
  teacherTab,
  managementTab,
  onSelectSection,
  onSelectTeacherTab,
  onSelectManagementTab,
  onPrimaryAction,
}: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems =
    role === 'parent'
      ? PARENT_NAV
      : role === 'teacher'
        ? TEACHER_NAV
        : MANAGEMENT_NAV;

  const activeId =
    role === 'parent'
      ? activeSection
      : role === 'teacher'
        ? teacherTab
        : managementTab;

  const handleItemClick = (id: string) => {
    if (role === 'parent') {
      onSelectSection(id as NavSection);
    } else if (role === 'teacher') {
      onSelectTeacherTab(id as TeacherTab);
    } else {
      onSelectManagementTab(id as ManagementTab);
    }
    setMobileMenuOpen(false);
  };

  const handleBrandClick = () => {
    if (role === 'parent') onSelectSection('overview');
    if (role === 'teacher') onSelectTeacherTab('rollcall');
    if (role === 'management') onSelectManagementTab('summary');
    setMobileMenuOpen(false);
  };

  const primaryActionLabel =
    role === 'parent' ? 'Message Teacher' : 'View as Parent';

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      {/* Subtle 3px brand stripe in green & orange across the very top edge */}
      <div className="h-1 w-full flex" aria-hidden="true">
        <div className="w-2/3 bg-green-700" />
        <div className="w-1/3 bg-orange-500" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark in Green & Orange */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="font-display text-xl font-bold tracking-tight whitespace-nowrap shrink-0 cursor-pointer transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <span className="text-green-800">School</span>{' '}
          <span className="text-orange-600">Track</span>
        </button>

        {/* Zone 2: Clean single-line text nav links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-7"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 ${
                  isActive
                    ? 'text-green-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-orange-600"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onPrimaryAction}
            className="px-4 py-2 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {primaryActionLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden bg-white border-t border-slate-200 px-4 py-3 flex flex-col gap-1"
        >
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-green-50 text-green-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
