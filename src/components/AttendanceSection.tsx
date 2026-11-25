import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { AttendanceDay, AttendanceStatus, StudentProfile } from '../data/schoolData';

interface AttendanceSectionProps {
  student: StudentProfile;
}

type AttendancePeriod = 'this-month' | 'last-month' | 'previous-class';

export function AttendanceSection({ student }: AttendanceSectionProps) {
  const [period, setPeriod] = useState<AttendancePeriod>('this-month');
  const [selectedDayId, setSelectedDayId] = useState<string>('');

  const activeDays =
    period === 'last-month' ? student.lastMonthAttendance : student.attendance;

  const selectedDay =
    activeDays.find((d) => d.id === selectedDayId) ??
    activeDays[activeDays.length - 1];

  const presentCount = activeDays.filter((d) => d.status === 'Present').length;
  const lateCount = activeDays.filter((d) => d.status === 'Late').length;
  const absentCount = activeDays.filter((d) => d.status === 'Absent').length;
  const attendanceRate = Math.round(
    ((presentCount + lateCount) / Math.max(activeDays.length, 1)) * 100
  );

  // Previous class full-year totals
  const prevTotalDays = student.previousClassAttendance.reduce(
    (sum, t) => sum + t.totalDays,
    0
  );
  const prevPresentDays = student.previousClassAttendance.reduce(
    (sum, t) => sum + t.presentDays,
    0
  );
  const prevLateDays = student.previousClassAttendance.reduce(
    (sum, t) => sum + t.lateDays,
    0
  );
  const prevAbsentDays = student.previousClassAttendance.reduce(
    (sum, t) => sum + t.absentDays,
    0
  );
  const prevRate = Math.round(
    ((prevPresentDays + prevLateDays) / Math.max(prevTotalDays, 1)) * 100
  );

  const renderStatusIcon = (status: AttendanceStatus) => {
    if (status === 'Present') {
      return <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" aria-hidden="true" />;
    }
    if (status === 'Late') {
      return <Clock className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />;
    }
    return <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />;
  };

  const getStatusTextClass = (status: AttendanceStatus) => {
    if (status === 'Present') return 'text-green-800';
    if (status === 'Late') return 'text-orange-700';
    return 'text-rose-700';
  };

  // Group into weeks (5 school days per week)
  const weeks: AttendanceDay[][] = [];
  for (let i = 0; i < activeDays.length; i += 5) {
    weeks.push(activeDays.slice(i, i + 5));
  }

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <p className="text-xs font-semibold text-orange-700">
            Attendance History
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Attendance Record
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Check this month, last month, or {student.firstName}’s previous class attendance record.
          </p>
        </div>

        {/* Period Switcher */}
        <div
          role="tablist"
          aria-label="Choose attendance period"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start"
        >
          {(
            [
              { id: 'this-month', label: 'This Month (Nov)' },
              { id: 'last-month', label: 'Last Month (Oct)' },
              { id: 'previous-class', label: 'Previous Class' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={period === tab.id}
              onClick={() => {
                setPeriod(tab.id);
                setSelectedDayId('');
              }}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                period === tab.id
                  ? 'bg-green-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Previous Class Term-by-Term Summary View */}
      {period === 'previous-class' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs font-medium text-slate-500">Full-Year Rate</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-green-800 tabular-nums">
                {prevRate}%
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Days Present</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {prevPresentDays} days
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Days Late</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-orange-700 tabular-nums">
                {prevLateDays} {prevLateDays === 1 ? 'day' : 'days'}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">Days Absent</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {prevAbsentDays} {prevAbsentDays === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {student.previousClassAttendance.map((term) => {
              const rate = Math.round(
                ((term.presentDays + term.lateDays) / Math.max(term.totalDays, 1)) *
                  100
              );
              return (
                <div
                  key={term.termLabel}
                  className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-4">
                    <h2 className="font-display text-base font-semibold text-slate-900">
                      {term.className} · {term.termLabel}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {term.schoolYear} Session
                    </p>
                  </div>

                  <div className="md:col-span-5">
                    <p className="text-sm text-slate-700">{term.note}</p>
                    <p className="text-xs text-slate-500 mt-1 tabular-nums">
                      Present: {term.presentDays} · Late: {term.lateDays} · Absent: {term.absentDays}
                    </p>
                  </div>

                  <div className="md:col-span-3 md:text-right">
                    <p className="font-display text-xl font-bold text-green-800 tabular-nums">
                      {rate}%
                    </p>
                    <p className="text-xs text-slate-500 tabular-nums">
                      {term.presentDays + term.lateDays} / {term.totalDays} days
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {/* Monthly Totals + Rate */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100">
            <div>
              <p className="text-xs font-medium text-slate-500">Attendance Rate</p>
              <p className="mt-1.5 font-display text-2xl font-bold text-green-800 tabular-nums">
                {attendanceRate}%
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-green-700" aria-hidden="true" />
                <span>Present</span>
              </div>
              <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {presentCount} days
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Clock className="w-4 h-4 text-orange-600" aria-hidden="true" />
                <span>Late</span>
              </div>
              <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {lateCount} {lateCount === 1 ? 'day' : 'days'}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <AlertCircle className="w-4 h-4 text-rose-600" aria-hidden="true" />
                <span>Absent</span>
              </div>
              <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
                {absentCount} {absentCount === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>

          {/* Simple Mon-Fri Calendar Grid */}
          <div className="space-y-4">
            <div className="hidden sm:grid grid-cols-5 gap-3 text-xs font-semibold text-slate-500 px-1">
              <span>Monday</span>
              <span>Tuesday</span>
              <span>Wednesday</span>
              <span>Thursday</span>
              <span>Friday</span>
            </div>

            <div className="space-y-3">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {week.map((day) => {
                    const isSelected = selectedDay?.id === day.id;
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => setSelectedDayId(day.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50/50'
                            : 'border-slate-200 bg-white hover:border-green-300'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-slate-900 tabular-nums">
                            {day.dateLabel}
                          </span>
                          <span className="sm:hidden text-xs text-slate-500">
                            {day.dayName}
                          </span>
                        </div>
                        <div className="mt-2.5 flex items-center gap-1.5">
                          {renderStatusIcon(day.status)}
                          <span
                            className={`text-xs font-semibold ${getStatusTextClass(
                              day.status
                            )}`}
                          >
                            {day.status}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500 tabular-nums">
                          {day.arrivalTime === '—' ? 'No check-in' : `In ${day.arrivalTime}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Day Detail Bar */}
          {selectedDay && (
            <div className="pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-500">
                  Selected Day · {selectedDay.dayName}, {selectedDay.dateLabel}
                </p>
                <p className="text-sm font-medium text-slate-900">
                  {selectedDay.note}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {renderStatusIcon(selectedDay.status)}
                <span
                  className={`text-sm font-semibold ${getStatusTextClass(
                    selectedDay.status
                  )}`}
                >
                  {selectedDay.status}
                </span>
                {selectedDay.arrivalTime !== '—' && (
                  <span className="text-sm text-slate-500 tabular-nums">
                    · {selectedDay.arrivalTime}
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
