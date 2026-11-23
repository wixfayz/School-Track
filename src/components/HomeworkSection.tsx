import { FormEvent, useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { StudentProfile } from '../data/schoolData';

interface HomeworkSectionProps {
  student: StudentProfile;
  onToggleHomework: (homeworkId: string) => void;
  onAddReminder: (subject: string, title: string, dueDate: string) => void;
  onDeleteReminder: (homeworkId: string) => void;
}

type HomeworkFilter = 'all' | 'todo' | 'done';

export function HomeworkSection({
  student,
  onToggleHomework,
  onAddReminder,
  onDeleteReminder,
}: HomeworkSectionProps) {
  const [filter, setFilter] = useState<HomeworkFilter>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState('Reading');
  const [newTitle, setNewTitle] = useState('');
  const [newDueDate, setNewDueDate] = useState('Tomorrow');

  const completedCount = student.homework.filter((h) => h.completed).length;
  const totalCount = student.homework.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredHomework = student.homework.filter((item) => {
    if (filter === 'todo') return !item.completed;
    if (filter === 'done') return item.completed;
    return true;
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddReminder(newSubject, newTitle.trim(), newDueDate);
    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Homework Checklist
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Keep track of {student.firstName}’s daily tasks and tick them off together.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm((prev) => !prev)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0 self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          {showAddForm ? 'Close Form' : 'Add Study Reminder'}
        </button>
      </div>

      {/* Simple Add Home Study Reminder Form */}
      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4"
        >
          <h2 className="font-display text-base font-semibold text-slate-900">
            Add a Quick Home Study Reminder
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="reminder-subject"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Subject
              </label>
              <select
                id="reminder-subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Reading">Reading</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Spelling">Spelling</option>
                <option value="Art & Craft">Art & Craft</option>
              </select>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="reminder-title"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Task Description
              </label>
              <input
                id="reminder-title"
                type="text"
                required
                placeholder="e.g., Practice 10 spelling words aloud"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
              />
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="reminder-due"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                When
              </label>
              <select
                id="reminder-due"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="This Week">This Week</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Save Reminder
            </button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Progress Summary + Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2 flex-1 max-w-md">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              Weekly Completion
            </span>
            <span className="font-semibold text-slate-900 tabular-nums">
              {completedCount} of {totalCount} done ({progressPercent}%)
            </span>
          </div>
          <div
            className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start">
          {(
            [
              { id: 'all', label: `All (${totalCount})` },
              { id: 'todo', label: `To Do (${totalCount - completedCount})` },
              { id: 'done', label: `Done (${completedCount})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
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

      {/* Homework List */}
      {filteredHomework.length === 0 ? (
        <div className="py-10 text-center space-y-2 border-t border-slate-100">
          <p className="font-display text-lg font-semibold text-slate-900">
            {filter === 'todo'
              ? 'All homework is finished!'
              : 'No homework tasks in this view.'}
          </p>
          <p className="text-sm text-slate-500">
            {filter === 'todo'
              ? `Great job, ${student.firstName}! Everything on the list is checked off.`
              : 'Switch tabs or add a study reminder above.'}
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-slate-100 border-t border-slate-100">
          {filteredHomework.map((task) => (
            <li
              key={task.id}
              className="py-4 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <button
                  type="button"
                  onClick={() => onToggleHomework(task.id)}
                  aria-label={
                    task.completed
                      ? `Mark "${task.title}" as not done`
                      : `Mark "${task.title}" as done`
                  }
                  className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer shrink-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <div className="min-w-0 space-y-1">
                  <p
                    className={`text-base font-semibold ${
                      task.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-slate-600">{task.instructions}</p>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 pt-0.5">
                    <span>{task.subject}</span>
                    <span aria-hidden="true">·</span>
                    <span>Due {task.dueDate}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        task.completed
                          ? 'text-emerald-700 font-medium'
                          : 'text-amber-700 font-medium'
                      }
                    >
                      {task.completed ? 'Completed' : 'To Do'}
                    </span>
                    {task.isParentReminder && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>Parent Reminder</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {task.isParentReminder && (
                <button
                  type="button"
                  onClick={() => onDeleteReminder(task.id)}
                  aria-label={`Remove reminder "${task.title}"`}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
