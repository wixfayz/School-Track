import { useState } from 'react';
import { Award, BookOpen, Calendar, Heart, Star, Trophy } from 'lucide-react';
import {
  AchievementItem,
  ReportPeriodId,
  StudentProfile,
} from '../data/schoolData';

interface AcademicsSectionProps {
  student: StudentProfile;
  selectedPeriod: ReportPeriodId;
  onSelectPeriod: (period: ReportPeriodId) => void;
}

type SubjectFilter = 'all' | 'core' | 'creative';

const PERIOD_TABS: { id: ReportPeriodId; label: string }[] = [
  { id: 'this-week', label: 'This Week' },
  { id: 'last-week', label: 'Last Week' },
  { id: 'last-month', label: 'Last Month' },
  { id: 'previous-class', label: 'Previous Class' },
];

export function AcademicsSection({
  student,
  selectedPeriod,
  onSelectPeriod,
}: AcademicsSectionProps) {
  const [filter, setFilter] = useState<SubjectFilter>('all');

  const currentAverage = Math.round(
    student.academics.reduce((sum, s) => sum + s.score, 0) /
      Math.max(student.academics.length, 1)
  );

  // Build simple 4-period history comparison so parents can see growth at a glance
  const progressTimeline = [
    ...student.pastReports
      .slice()
      .reverse()
      .map((report) => ({
        id: report.id as ReportPeriodId,
        label: report.label,
        sublabel: report.className.split(' · ')[0],
        average: Math.round(
          report.subjects.reduce((sum, s) => sum + s.score, 0) /
            Math.max(report.subjects.length, 1)
        ),
      })),
    {
      id: 'this-week' as ReportPeriodId,
      label: 'This Week',
      sublabel: student.grade,
      average: currentAverage,
    },
  ];

  const activePastReport =
    selectedPeriod === 'this-week'
      ? null
      : student.pastReports.find((r) => r.id === selectedPeriod) ?? null;

  const displayedSubjects = activePastReport
    ? activePastReport.subjects.map((s, idx) => ({
        id: `${activePastReport.id}-${idx}`,
        subject: s.subject,
        group: s.group,
        score: s.score,
        level: s.level,
        topic: s.topic,
        remark: s.remark,
        metaLabel: activePastReport.dateRange,
      }))
    : student.academics.map((s) => ({
        id: s.id,
        subject: s.subject,
        group: s.group,
        score: s.score,
        level: s.level,
        topic: s.todayTopic,
        remark: s.teacherNote,
        metaLabel: `Updated ${s.updatedAt}`,
      }));

  const filteredSubjects = displayedSubjects.filter((subject) => {
    if (filter === 'all') return true;
    return subject.group === filter;
  });

  const activeAverage = Math.round(
    displayedSubjects.reduce((sum, s) => sum + s.score, 0) /
      Math.max(displayedSubjects.length, 1)
  );

  const highestSubject = displayedSubjects.reduce(
    (best, current) => (current.score > best.score ? current : best),
    displayedSubjects[0]
  );

  const renderAchievementIcon = (type: AchievementItem['iconType']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-green-700" aria-hidden="true" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-orange-600" aria-hidden="true" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-orange-600" aria-hidden="true" />;
      case 'star':
      default:
        return <Star className="w-5 h-5 text-orange-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Report Period Switcher + Simple Progress Over Time */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <p className="text-xs font-semibold text-orange-700">
              Academic Reports & History
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              {activePastReport
                ? `${activePastReport.label} Report — ${student.firstName}`
                : `This Week’s Academic Performance`}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Switch between this week, last week, last month, and {student.firstName}’s previous class report.
            </p>
          </div>

          {/* Simple Report Period Tabs */}
          <div
            role="tablist"
            aria-label="Choose report period"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start"
          >
            {PERIOD_TABS.map((tab) => {
              const isSelected = selectedPeriod === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onSelectPeriod(tab.id)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-green-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Simple Progress Over Time (Clickable Bars) */}
        <div className="space-y-3 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-sm font-semibold text-slate-800">
              Progress Over Time (Click any period to view its report)
            </h2>
            <span className="text-xs text-slate-500">Average Score</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {progressTimeline.map((point) => {
              const isCurrent = selectedPeriod === point.id;
              return (
                <button
                  key={point.id}
                  type="button"
                  onClick={() => onSelectPeriod(point.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
                    isCurrent
                      ? 'border-orange-500 bg-orange-50/60'
                      : 'border-slate-200 bg-white hover:border-green-300'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-700">
                      {point.label}
                    </span>
                    <span className="font-display text-lg font-bold text-slate-900 tabular-nums">
                      {point.average}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{point.sublabel}</p>
                  <div
                    className="mt-2.5 h-2 w-full bg-slate-100 rounded-full overflow-hidden"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-200 ${
                        isCurrent ? 'bg-orange-600' : 'bg-green-700'
                      }`}
                      style={{ width: `${point.average}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Past Report Summary Banner (shown for Last Week, Last Month, Previous Class) */}
        {activePastReport && (
          <div className="bg-green-50/70 border border-green-200 rounded-xl p-5 space-y-2.5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-semibold text-green-800">
              <Calendar className="w-4 h-4 text-green-700 shrink-0" aria-hidden="true" />
              <span>{activePastReport.dateRange}</span>
              <span aria-hidden="true" className="text-green-400">·</span>
              <span>{activePastReport.className}</span>
              <span aria-hidden="true" className="text-green-400">·</span>
              <span>Teacher: {activePastReport.teacherName}</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              <span className="font-semibold">Teacher Summary: </span>
              {activePastReport.overallRemark}
            </p>
            <p className="text-xs font-medium text-slate-600 tabular-nums">
              Attendance for this period: {activePastReport.attendanceSummary}
            </p>
          </div>
        )}

        {/* Metrics + Subject Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <p className="text-xs font-medium text-slate-500">Period Average</p>
              <p className="mt-0.5 font-display text-2xl font-bold text-green-800 tabular-nums">
                {activeAverage} / 100
              </p>
            </div>
            {highestSubject && (
              <div>
                <p className="text-xs font-medium text-slate-500">Top Subject</p>
                <p className="mt-0.5 font-display text-2xl font-bold text-slate-900 tabular-nums">
                  {highestSubject.subject} ({highestSubject.score}%)
                </p>
              </div>
            )}
          </div>

          <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start">
            {(
              [
                { id: 'all', label: 'All Subjects' },
                { id: 'core', label: 'Core' },
                { id: 'creative', label: 'Creative' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Rows */}
        <div className="divide-y divide-slate-100">
          {filteredSubjects.map((item) => (
            <div
              key={item.id}
              className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
            >
              <div className="md:col-span-4 space-y-1">
                <h2 className="font-display text-base font-semibold text-slate-900">
                  {item.subject}
                </h2>
                <p className="text-xs text-slate-500">{item.metaLabel}</p>
              </div>

              <div className="md:col-span-5 space-y-1.5">
                <p className="text-sm font-medium text-slate-800">
                  Topic: {item.topic}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.remark}
                </p>
              </div>

              <div className="md:col-span-3 space-y-2 md:text-right">
                <div className="flex md:justify-end items-baseline gap-2">
                  <span className="font-display text-xl font-bold text-slate-900 tabular-nums">
                    {item.score}%
                  </span>
                  <span className="text-xs font-semibold text-green-700">
                    {item.level}
                  </span>
                </div>
                <div
                  className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className={`h-full rounded-full ${
                      activePastReport ? 'bg-orange-600' : 'bg-green-700'
                    }`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements & Awards */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Achievements & Awards
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Stars, certificates, and proud moments earned by {student.firstName}.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-orange-700 tabular-nums">
            <Award className="w-5 h-5 text-orange-600" aria-hidden="true" />
            <span>{student.achievements.length} Earned</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0 md:gap-y-6 pt-6">
          {student.achievements.map((award) => (
            <article
              key={award.id}
              className="py-4 md:py-0 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">
                {renderAchievementIcon(award.iconType)}
              </div>
              <div className="space-y-1 min-w-0">
                <h3 className="font-display text-base font-semibold text-slate-900">
                  {award.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {award.category} · Earned {award.dateEarned} · By {award.awardedBy}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed pt-0.5">
                  {award.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
