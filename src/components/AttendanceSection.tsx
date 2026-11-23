import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { AttendanceDay, AttendanceStatus, StudentProfile } from '../data/schoolData';

interface AttendanceSectionProps {
  student: StudentProfile;
}

export function AttendanceSection({ student }: AttendanceSectionProps) {
  const [selectedDayId, setSelectedDayId] = useState<string>(
    student.attendance[student.attendance.length - 1]?.id ?? ''
  );

  const selectedDay =
    student.attendance.find((d) => d.id === selectedDayId) ??
    student.attendance[student.attendance.length - 1];

  const presentCount = student.attendance.filter((d) => d.status === 'Present').length;
  const lateCount = student.attendance.filter((d) => d.status === 'Late').length;
  const absentCount = student.attendance.filter((d) => d.status === 'Absent').length;
  const attendanceRate = Math.round(
    ((presentCount + lateCount) / Math.max(student.attendance.length, 1)) * 100
  );

  const renderStatusIcon = (status: AttendanceStatus) => {
    if (status === 'Present') {
      return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />;
    }
    if (status === 'Late') {
      return <Clock className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />;
    }
    return <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />;
  };

  const getStatusTextClass = (status: AttendanceStatus) => {
    if (status === 'Present') return 'text-emerald-700';
    if (status === 'Late') return 'text-amber-700';
    return 'text-rose-700';
  };

  // Group into weeks (5 school days per week)
  const weeks: AttendanceDay[][] = [];
  for (let i = 0; i < student.attendance.length; i += 5) {
    weeks.push(student.attendance.slice(i, i + 5));
  }

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Attendance Record
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            November school days for {student.firstName}. Click any day to see arrival details.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-xs font-medium text-slate-500">Attendance Rate</p>
          <p className="font-display text-2xl font-bold text-slate-900 tabular-nums">
            {attendanceRate}%
          </p>
        </div>
      </div>

      {/* Simple 3-column Totals */}
      <div className="grid grid-cols-3 gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            <span>Present</span>
          </div>
          <p className="mt-1.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {presentCount} days
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <Clock className="w-4 h-4 text-amber-600" aria-hidden="true" />
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
                        ? 'border-blue-600 bg-blue-50/50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
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
    </section>
  );
}
