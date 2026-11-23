import { FormEvent, useState } from 'react';
import { Building2, Megaphone, Trash2 } from 'lucide-react';
import {
  ManagementTab,
  SCHOOL_CLASSES,
  SchoolAnnouncement,
  StudentProfile,
} from '../data/schoolData';

interface ManagementDashboardProps {
  activeTab: ManagementTab;
  students: StudentProfile[];
  announcements: SchoolAnnouncement[];
  onSelectTab: (tab: ManagementTab) => void;
  onPostAnnouncement: (
    title: string,
    category: string,
    eventDate: string,
    summary: string
  ) => void;
  onDeleteAnnouncement: (announcementId: string) => void;
}

export function ManagementDashboard({
  activeTab,
  students,
  announcements,
  onSelectTab,
  onPostAnnouncement,
  onDeleteAnnouncement,
}: ManagementDashboardProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('School Event');
  const [eventDate, setEventDate] = useState('Next Monday · 8:30 AM');
  const [summary, setSummary] = useState('');

  const totalPupils = SCHOOL_CLASSES.reduce((sum, c) => sum + c.pupilsCount, 0);
  const totalPresent = SCHOOL_CLASSES.reduce((sum, c) => sum + c.presentToday, 0);
  const schoolAttendanceRate = Math.round((totalPresent / totalPupils) * 100);
  const totalAwards = students.reduce((sum, s) => sum + s.achievements.length, 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;
    onPostAnnouncement(
      title.trim(),
      category,
      eventDate.trim() || 'Upcoming',
      summary.trim()
    );
    setTitle('');
    setSummary('');
  };

  return (
    <div className="space-y-6">
      {/* Head Teacher / Management Header */}
      <section className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6 text-blue-700" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-lg font-semibold text-slate-900">
              Oakwood Primary School — Management Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Head Teacher: Alhaji Yusuf Abdullahi · Term 2 Overview
            </p>
          </div>
        </div>

        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-center">
          {(
            [
              { id: 'summary', label: 'Summary' },
              { id: 'announcements', label: 'Announcements' },
              { id: 'classes', label: 'Classes & Staff' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* TAB 1: SCHOOL SUMMARY */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <section
            aria-label="School-wide overview"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">Total Pupils</p>
              <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {totalPupils}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Primary 1 to Primary 6
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">
                Present Today
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-emerald-700 tabular-nums">
                {schoolAttendanceRate}%
              </p>
              <p className="mt-1 text-xs text-slate-500 tabular-nums">
                {totalPresent} of {totalPupils} pupils checked in
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">
                Active Notices
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {announcements.length}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Shared with all parents
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <p className="text-xs font-medium text-slate-500">
                Recent Awards Given
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {totalAwards}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                To Bello family pupils this term
              </p>
            </div>
          </section>

          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900">
                  Today’s Class Attendance Snapshot
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simple daily check across every classroom
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectTab('announcements')}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap self-start sm:self-auto cursor-pointer"
              >
                Post New Announcement
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {SCHOOL_CLASSES.map((cls) => {
                const rate = Math.round((cls.presentToday / cls.pupilsCount) * 100);
                return (
                  <div
                    key={cls.id}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {cls.className} · {cls.room}
                      </p>
                      <p className="text-xs text-slate-500">
                        Class Teacher: {cls.teacherName}
                      </p>
                    </div>
                    <div className="text-left sm:text-right tabular-nums">
                      <p className="text-sm font-semibold text-slate-900">
                        {cls.presentToday}/{cls.pupilsCount} present ({rate}%)
                      </p>
                      <p className="text-xs text-slate-500">
                        {cls.homeworkPosted} active homework tasks
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: POST & MANAGE ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Post School Announcement
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Notices posted here appear immediately on every Parent’s screen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="ann-title"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Announcement Title
                </label>
                <input
                  id="ann-title"
                  type="text"
                  required
                  placeholder="e.g., Inter-House Sports Day"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ann-cat"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="ann-cat"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="School Event">School Event</option>
                    <option value="Reminder">Reminder</option>
                    <option value="Activity">Activity</option>
                    <option value="Safety">Safety</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="ann-date"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Event Date / Time
                  </label>
                  <input
                    id="ann-date"
                    type="text"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="ann-summary"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Message for Parents
                </label>
                <textarea
                  id="ann-summary"
                  rows={3}
                  required
                  placeholder="Write a clear, short announcement for families..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                <Megaphone className="w-4 h-4" aria-hidden="true" />
                Publish Announcement
              </button>
            </form>
          </section>

          <section className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Published Announcements ({announcements.length})
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Currently visible to families on School Track.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {announcements.map((notice) => (
                <article
                  key={notice.id}
                  className="py-4 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 min-w-0">
                    <p className="text-xs text-slate-500">
                      {notice.category} · {notice.date} · {notice.eventDate}
                    </p>
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {notice.summary}
                    </p>
                  </div>

                  {notice.isCustom && (
                    <button
                      type="button"
                      onClick={() => onDeleteAnnouncement(notice.id)}
                      aria-label={`Delete announcement "${notice.title}"`}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: CLASSES & STAFF DIRECTORY */}
      {activeTab === 'classes' && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
          <div className="pb-4 border-b border-slate-100">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Classes & Teaching Staff
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Directory of all primary classrooms and homeroom teachers at Oakwood Primary School.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="py-3 pr-4">Class</th>
                  <th className="py-3 px-4">Room</th>
                  <th className="py-3 px-4">Class Teacher</th>
                  <th className="py-3 px-4 text-right">Pupils</th>
                  <th className="py-3 pl-4 text-right">Present Today</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {SCHOOL_CLASSES.map((cls) => (
                  <tr key={cls.id} className="hover:bg-slate-50/80">
                    <td className="py-3.5 pr-4 font-semibold text-slate-900">
                      {cls.className}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">{cls.room}</td>
                    <td className="py-3.5 px-4 text-slate-800">
                      {cls.teacherName}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-700 tabular-nums">
                      {cls.pupilsCount}
                    </td>
                    <td className="py-3.5 pl-4 text-right font-semibold text-emerald-700 tabular-nums">
                      {cls.presentToday} / {cls.pupilsCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
