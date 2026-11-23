import { useState } from 'react';
import { Award, BookOpen, Heart, Star, Trophy } from 'lucide-react';
import { AchievementItem, StudentProfile } from '../data/schoolData';

interface AcademicsSectionProps {
  student: StudentProfile;
}

type SubjectFilter = 'all' | 'core' | 'creative';

export function AcademicsSection({ student }: AcademicsSectionProps) {
  const [filter, setFilter] = useState<SubjectFilter>('all');

  const filteredSubjects = student.academics.filter((subject) => {
    if (filter === 'all') return true;
    return subject.group === filter;
  });

  const averageScore = Math.round(
    student.academics.reduce((sum, s) => sum + s.score, 0) /
      Math.max(student.academics.length, 1)
  );

  const highestSubject = student.academics.reduce(
    (best, current) => (current.score > best.score ? current : best),
    student.academics[0]
  );

  const renderAchievementIcon = (type: AchievementItem['iconType']) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5 text-blue-600" aria-hidden="true" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-600" aria-hidden="true" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-amber-600" aria-hidden="true" />;
      case 'star':
      default:
        return <Star className="w-5 h-5 text-amber-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Daily Academic Performance */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              Daily Academic Performance
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Simple subject scores and what {student.firstName} learned in class recently.
            </p>
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
                className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

        {/* Clean 2-metric inline summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 border-b border-slate-100">
          <div>
            <p className="text-xs font-medium text-slate-500">Overall Average</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
              {averageScore} / 100
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Top Subject This Week</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900 tabular-nums">
              {highestSubject.subject} ({highestSubject.score}%)
            </p>
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
                <p className="text-xs text-slate-500">Updated {item.updatedAt}</p>
              </div>

              <div className="md:col-span-5 space-y-1.5">
                <p className="text-sm font-medium text-slate-800">
                  Today’s topic: {item.todayTopic}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.teacherNote}
                </p>
              </div>

              <div className="md:col-span-3 space-y-2 md:text-right">
                <div className="flex md:justify-end items-baseline gap-2">
                  <span className="font-display text-xl font-bold text-slate-900 tabular-nums">
                    {item.score}%
                  </span>
                  <span className="text-xs font-medium text-emerald-700">
                    {item.level}
                  </span>
                </div>
                <div
                  className="h-2 w-full bg-slate-100 rounded-full overflow-hidden"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-blue-600 rounded-full"
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
          <div className="hidden sm:flex items-center gap-2 text-sm font-semibold text-slate-700 tabular-nums">
            <Award className="w-5 h-5 text-amber-600" aria-hidden="true" />
            <span>{student.achievements.length} Earned</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0 md:gap-y-6 pt-6">
          {student.achievements.map((award) => (
            <article
              key={award.id}
              className="py-4 md:py-0 flex items-start gap-4"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
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
