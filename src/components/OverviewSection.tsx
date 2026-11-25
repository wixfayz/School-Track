import {
  ArrowRight,
  Award,
  CheckCircle2,
  Circle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import {
  NavSection,
  ReportPeriodId,
  SCHOOL_BANNER_IMAGE,
  SchoolAnnouncement,
  StudentProfile,
} from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface OverviewSectionProps {
  student: StudentProfile;
  announcements: SchoolAnnouncement[];
  onNavigate: (section: NavSection) => void;
  onOpenReportPeriod: (period: ReportPeriodId) => void;
  onToggleHomework: (homeworkId: string) => void;
  onToggleFeedbackRead: (feedbackId: string) => void;
  onToggleAnnouncementAck: (announcementId: string) => void;
}

export function OverviewSection({
  student,
  announcements,
  onNavigate,
  onOpenReportPeriod,
  onToggleHomework,
  onToggleFeedbackRead,
  onToggleAnnouncementAck,
}: OverviewSectionProps) {
  const averageScore = Math.round(
    student.academics.reduce((sum, item) => sum + item.score, 0) /
      Math.max(student.academics.length, 1)
  );
  const completedHomework = student.homework.filter((h) => h.completed).length;
  const totalHomework = student.homework.length;
  const remainingHomework = totalHomework - completedHomework;
  const presentDays = student.attendance.filter((d) => d.status === 'Present').length;
  const latestFeedback = student.feedback[0];
  const latestAnnouncement = announcements[0];
  const latestAchievement = student.achievements[0];

  const renderAttendanceIcon = () => {
    if (student.todayStatus === 'Present') {
      return <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0" aria-hidden="true" />;
    }
    if (student.todayStatus === 'Late') {
      return <Clock className="w-4 h-4 text-orange-600 shrink-0" aria-hidden="true" />;
    }
    return <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" aria-hidden="true" />;
  };

  return (
    <div className="space-y-8">
      {/* Hero Split: Welcome message + School campus artwork */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-orange-700">
              {student.schoolName} · Daily Parent Summary
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Good morning, Bello Family
            </h1>
            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Here is {student.firstName}’s daily school update. Check today’s class
              scores, look back at past reports, tick off homework, and read notes from{' '}
              {student.homeroomTeacher} all in one place.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('homework')}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Check Today’s Homework
            </button>
            <button
              type="button"
              onClick={() => onOpenReportPeriod('last-week')}
              className="px-4 py-2.5 text-sm font-semibold text-orange-800 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              View Past Reports
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 min-h-[220px] lg:min-h-0">
          <SafeImage
            src={SCHOOL_BANNER_IMAGE}
            alt="Oakwood Primary School sunny campus entrance"
            fallbackLabel="Oakwood Primary School"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent flex flex-col justify-end p-5">
            <p className="text-sm font-semibold text-white">
              {student.schoolName}
            </p>
            <p className="text-xs text-slate-200 mt-0.5">
              Term 2 · {student.grade} · {student.room}
            </p>
          </div>
        </div>
      </section>

      {/* Full-width 4-column Summary Strip */}
      <section
        aria-label="Today's quick summary"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <button
          type="button"
          onClick={() => onNavigate('attendance')}
          className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-green-400 transition-colors duration-150 cursor-pointer"
        >
          <p className="text-xs font-medium text-slate-500">Today’s Attendance</p>
          <div className="mt-2 flex items-center gap-2">
            {renderAttendanceIcon()}
            <span className="font-display text-2xl font-bold text-slate-900">
              {student.todayStatus}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 tabular-nums">
            Arrived {student.todayArrival} · {presentDays}/{student.attendance.length} days on time
          </p>
        </button>

        <button
          type="button"
          onClick={() => onOpenReportPeriod('this-week')}
          className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-green-400 transition-colors duration-150 cursor-pointer"
        >
          <p className="text-xs font-medium text-slate-500">This Week’s Average</p>
          <p className="mt-2 font-display text-2xl font-bold text-green-800 tabular-nums">
            {averageScore}%
          </p>
          <p className="mt-1 text-xs text-slate-500 tabular-nums">
            Across {student.academics.length} school subjects
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('homework')}
          className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-orange-400 transition-colors duration-150 cursor-pointer"
        >
          <p className="text-xs font-medium text-slate-500">Homework Progress</p>
          <p className="mt-2 font-display text-2xl font-bold text-slate-900 tabular-nums">
            {completedHomework} of {totalHomework} done
          </p>
          <p className="mt-1 text-xs text-slate-500 tabular-nums">
            {remainingHomework === 0
              ? 'All tasks finished!'
              : `${remainingHomework} left to complete`}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onOpenReportPeriod('this-week')}
          className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-orange-400 transition-colors duration-150 cursor-pointer"
        >
          <p className="text-xs font-medium text-slate-500">Achievements Earned</p>
          <p className="mt-2 font-display text-2xl font-bold text-orange-700 tabular-nums">
            {student.achievements.length} Awards
          </p>
          <p className="mt-1 text-xs text-slate-500 truncate">
            Latest: {latestAchievement?.title ?? 'None yet'}
          </p>
        </button>
      </section>

      {/* Main 2-Column Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Homework Checklist + Recent Subject Scores */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Homework */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Homework Checklist
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any task below to mark it done
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('homework')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap shrink-0 cursor-pointer"
              >
                See all
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <ul className="divide-y divide-slate-100 mt-2">
              {student.homework.slice(0, 4).map((task) => (
                <li key={task.id} className="py-3.5 flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleHomework(task.id)}
                    aria-label={
                      task.completed
                        ? `Mark "${task.title}" as not done`
                        : `Mark "${task.title}" as done`
                    }
                    className="mt-0.5 text-slate-400 hover:text-green-700 transition-colors cursor-pointer shrink-0"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-700" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-sm font-medium ${
                        task.completed
                          ? 'line-through text-slate-400'
                          : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 mt-0.5">
                      <span>{task.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span>Due {task.dueDate}</span>
                      <span aria-hidden="true">·</span>
                      <span
                        className={
                          task.completed
                            ? 'text-green-700 font-semibold'
                            : 'text-orange-700 font-semibold'
                        }
                      >
                        {task.completed ? 'Done' : 'To Do'}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Daily Academic Performance Snapshot */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Daily Academic Performance
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  This week’s scores — view past weeks, months, or previous class in Reports
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenReportPeriod('this-week')}
                className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap shrink-0 cursor-pointer"
              >
                All reports
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {student.academics.map((item) => (
                <div key={item.id} className="py-3.5 space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900">
                        {item.subject}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {item.todayTopic}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-semibold text-slate-900 tabular-nums">
                        {item.score}/100
                      </span>
                      <span className="ml-2 text-xs text-green-700 font-medium">
                        {item.level}
                      </span>
                    </div>
                  </div>
                  <div
                    className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-green-700 rounded-full transition-all duration-200"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Latest Teacher Feedback + School Announcement + Latest Award */}
        <div className="lg:col-span-5 space-y-6">
          {/* Latest Teacher Note */}
          {latestFeedback && (
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Latest Teacher Feedback
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('updates')}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  All notes
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex items-center gap-3">
                  <SafeImage
                    src={latestFeedback.teacherAvatar}
                    alt={latestFeedback.teacherName}
                    fallbackInitials={latestFeedback.teacherName
                      .split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      {latestFeedback.teacherName}
                    </p>
                    <p className="text-xs text-slate-500">
                      {latestFeedback.subject} · {latestFeedback.date}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  “{latestFeedback.message}”
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs font-medium text-slate-500">
                    {latestFeedback.isRead ? 'Read by parent' : 'New note'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onToggleFeedbackRead(latestFeedback.id)}
                    className="text-xs font-semibold text-orange-700 hover:text-orange-800 cursor-pointer"
                  >
                    {latestFeedback.isRead ? 'Mark as unread' : 'Mark as read'}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Latest School Announcement */}
          {latestAnnouncement && (
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  School Announcement
                </h2>
                <button
                  type="button"
                  onClick={() => onNavigate('updates')}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  All news
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 space-y-2.5">
                <p className="text-xs text-slate-500">
                  {latestAnnouncement.category} · {latestAnnouncement.eventDate}
                </p>
                <h3 className="font-display text-base font-semibold text-slate-900">
                  {latestAnnouncement.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {latestAnnouncement.summary}
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onToggleAnnouncementAck(latestAnnouncement.id)
                    }
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      latestAnnouncement.acknowledged
                        ? 'bg-green-50 text-green-800 hover:bg-green-100'
                        : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                    }`}
                  >
                    {latestAnnouncement.acknowledged
                      ? 'Noted — Thank you'
                      : 'Got it'}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* Latest Achievement */}
          {latestAchievement && (
            <section className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <h2 className="font-display text-lg font-semibold text-slate-900">
                  Recent Achievement
                </h2>
                <button
                  type="button"
                  onClick={() => onOpenReportPeriod('this-week')}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  All awards
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-4 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-orange-600" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-semibold text-slate-900">
                    {latestAchievement.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {latestAchievement.category} · Earned {latestAchievement.dateEarned}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
                    {latestAchievement.description}
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
