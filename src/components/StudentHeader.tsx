import { StudentProfile } from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface StudentHeaderProps {
  students: StudentProfile[];
  selectedStudentId: string;
  onSelectStudent: (studentId: string) => void;
}

export function StudentHeader({
  students,
  selectedStudentId,
  onSelectStudent,
}: StudentHeaderProps) {
  const activeStudent =
    students.find((s) => s.id === selectedStudentId) ?? students[0];

  return (
    <section
      aria-label="Student selector"
      className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div className="flex items-center gap-4 min-w-0">
        <SafeImage
          src={activeStudent.avatar}
          alt={activeStudent.name}
          fallbackInitials={activeStudent.firstName.slice(0, 2).toUpperCase()}
          className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 shrink-0"
        />
        <div className="min-w-0">
          <h2 className="font-display text-lg font-semibold text-slate-900 truncate">
            {activeStudent.name}
          </h2>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm text-slate-600">
            <span className="font-medium text-green-800">
              {activeStudent.grade}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span>{activeStudent.room}</span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span>Teacher: {activeStudent.homeroomTeacher}</span>
          </div>
        </div>
      </div>

      {/* Simple segmented child switcher */}
      <div
        role="tablist"
        aria-label="Switch child"
        className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start sm:self-center shrink-0"
      >
        {students.map((student) => {
          const isSelected = student.id === activeStudent.id;
          return (
            <button
              key={student.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelectStudent(student.id)}
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {student.firstName} ({student.grade})
            </button>
          );
        })}
      </div>
    </section>
  );
}
