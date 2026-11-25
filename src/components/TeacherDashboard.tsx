import { FormEvent, useState } from 'react';
import {
  AlertCircle,
  Award,
  CheckCircle2,
  Clock,
  Plus,
  Send,
} from 'lucide-react';
import {
  AchievementItem,
  AttendanceStatus,
  StudentProfile,
  TEACHER_AMINA_AVATAR,
  TeacherTab,
} from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface TeacherDashboardProps {
  activeTab: TeacherTab;
  students: StudentProfile[];
  onSelectTab: (tab: TeacherTab) => void;
  onMarkTodayAttendance: (studentId: string, status: AttendanceStatus) => void;
  onUpdateSubjectScore: (
    studentId: string,
    subjectId: string,
    newScore: number,
    todayTopic: string,
    teacherNote: string
  ) => void;
  onAssignHomework: (
    studentId: string,
    subject: string,
    title: string,
    instructions: string,
    dueDate: string
  ) => void;
  onSendTeacherFeedback: (
    studentId: string,
    subject: string,
    message: string
  ) => void;
  onGrantAchievement: (
    studentId: string,
    title: string,
    category: string,
    description: string,
    iconType: AchievementItem['iconType']
  ) => void;
}

export function TeacherDashboard({
  activeTab,
  students,
  onSelectTab,
  onMarkTodayAttendance,
  onUpdateSubjectScore,
  onAssignHomework,
  onSendTeacherFeedback,
  onGrantAchievement,
}: TeacherDashboardProps) {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const selectedStudent =
    students.find((s) => s.id === selectedStudentId) ?? students[0];

  // Grade update form state
  const [editingSubjectId, setEditingSubjectId] = useState(
    selectedStudent.academics[0]?.id ?? ''
  );
  const currentSubject =
    selectedStudent.academics.find((s) => s.id === editingSubjectId) ??
    selectedStudent.academics[0];
  const [scoreDraft, setScoreDraft] = useState<string>(
    String(currentSubject?.score ?? 90)
  );
  const [topicDraft, setTopicDraft] = useState<string>(
    currentSubject?.todayTopic ?? ''
  );
  const [noteDraft, setNoteDraft] = useState<string>(
    currentSubject?.teacherNote ?? ''
  );

  // Homework form state
  const [hwSubject, setHwSubject] = useState('Mathematics');
  const [hwTitle, setHwTitle] = useState('');
  const [hwInstructions, setHwInstructions] = useState('');
  const [hwDueDate, setHwDueDate] = useState('Tomorrow');

  // Feedback form state
  const [fbSubject, setFbSubject] = useState('Mathematics');
  const [fbMessage, setFbMessage] = useState('');

  // Award form state
  const [awardTitle, setAwardTitle] = useState('');
  const [awardCategory, setAwardCategory] = useState('Reading');
  const [awardDesc, setAwardDesc] = useState('');
  const [awardIcon, setAwardIcon] = useState<AchievementItem['iconType']>('star');

  const handleSwitchStudent = (studentId: string) => {
    setSelectedStudentId(studentId);
    const nextStudent = students.find((s) => s.id === studentId);
    const firstSubj = nextStudent?.academics[0];
    if (firstSubj) {
      setEditingSubjectId(firstSubj.id);
      setScoreDraft(String(firstSubj.score));
      setTopicDraft(firstSubj.todayTopic);
      setNoteDraft(firstSubj.teacherNote);
    }
  };

  const handleSelectSubject = (subjectId: string) => {
    setEditingSubjectId(subjectId);
    const subj = selectedStudent.academics.find((s) => s.id === subjectId);
    if (subj) {
      setScoreDraft(String(subj.score));
      setTopicDraft(subj.todayTopic);
      setNoteDraft(subj.teacherNote);
    }
  };

  const handleSaveScore = (e: FormEvent) => {
    e.preventDefault();
    if (!currentSubject) return;
    const numeric = Math.max(0, Math.min(100, Number(scoreDraft) || 0));
    onUpdateSubjectScore(
      selectedStudent.id,
      currentSubject.id,
      numeric,
      topicDraft.trim() || currentSubject.todayTopic,
      noteDraft.trim() || currentSubject.teacherNote
    );
  };

  const handleHomeworkSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!hwTitle.trim()) return;
    onAssignHomework(
      selectedStudent.id,
      hwSubject,
      hwTitle.trim(),
      hwInstructions.trim() || 'Complete neatly in your workbook.',
      hwDueDate
    );
    setHwTitle('');
    setHwInstructions('');
  };

  const handleFeedbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fbMessage.trim()) return;
    onSendTeacherFeedback(selectedStudent.id, fbSubject, fbMessage.trim());
    setFbMessage('');
  };

  const handleAwardSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!awardTitle.trim()) return;
    onGrantAchievement(
      selectedStudent.id,
      awardTitle.trim(),
      awardCategory,
      awardDesc.trim() || 'Awarded for great effort in class today.',
      awardIcon
    );
    setAwardTitle('');
    setAwardDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Teacher Profile Header */}
      <section className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <SafeImage
            src={TEACHER_AMINA_AVATAR}
            alt="Mrs. Amina Ibrahim"
            fallbackInitials="AI"
            className="w-12 h-12 rounded-full object-cover border-2 border-green-200 shrink-0"
          />
          <div className="min-w-0">
            <h1 className="font-display text-lg font-semibold text-slate-900">
              Mrs. Amina Ibrahim — Teacher Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Oakwood Primary School · Primary 2 & Primary 4 Class Teacher
            </p>
          </div>
        </div>

        {/* Simple quick section tabs */}
        <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start sm:self-center">
          {(
            [
              { id: 'rollcall', label: 'Roll Call' },
              { id: 'grades', label: 'Scores' },
              { id: 'homework', label: 'Homework' },
              { id: 'feedback', label: 'Notes & Awards' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* TAB 1: DAILY ROLL CALL */}
      {activeTab === 'rollcall' && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="pb-5 border-b border-slate-100">
            <h2 className="font-display text-2xl font-bold text-slate-900">
              Today’s Attendance Roll Call
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Tap Present, Late, or Absent for each pupil. Parents see the update right away.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {students.map((pupil) => (
              <div
                key={pupil.id}
                className="py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <SafeImage
                    src={pupil.avatar}
                    alt={pupil.name}
                    fallbackInitials={pupil.firstName.slice(0, 2).toUpperCase()}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <h3 className="font-display text-base font-semibold text-slate-900">
                      {pupil.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {pupil.grade} · {pupil.room} · Current: {pupil.todayStatus}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(
                    [
                      { status: 'Present', icon: CheckCircle2, active: 'bg-green-700 text-white border-green-700' },
                      { status: 'Late', icon: Clock, active: 'bg-orange-600 text-white border-orange-600' },
                      { status: 'Absent', icon: AlertCircle, active: 'bg-rose-600 text-white border-rose-600' },
                    ] as const
                  ).map((option) => {
                    const Icon = option.icon;
                    const isSelected = pupil.todayStatus === option.status;
                    return (
                      <button
                        key={option.status}
                        type="button"
                        onClick={() =>
                          onMarkTodayAttendance(pupil.id, option.status)
                        }
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? option.active
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{option.status}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 2: RECORD DAILY CLASS SCORES */}
      {activeTab === 'grades' && (
        <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Record Daily Academic Score
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Pick a pupil and subject to update today’s score and class topic.
              </p>
            </div>

            <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start">
              {students.map((pupil) => (
                <button
                  key={pupil.id}
                  type="button"
                  onClick={() => handleSwitchStudent(pupil.id)}
                  className={`px-3.5 py-1.5 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedStudent.id === pupil.id
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pupil.firstName}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSaveScore} className="grid grid-cols-1 md:grid-cols-12 gap-5">
            <div className="md:col-span-5 space-y-4">
              <div>
                <label
                  htmlFor="teacher-subject-select"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Subject
                </label>
                <select
                  id="teacher-subject-select"
                  value={currentSubject?.id ?? ''}
                  onChange={(e) => handleSelectSubject(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                >
                  {selectedStudent.academics.map((subj) => (
                    <option key={subj.id} value={subj.id}>
                      {subj.subject} (Current: {subj.score}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="teacher-score-input"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Score out of 100
                </label>
                <input
                  id="teacher-score-input"
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={scoreDraft}
                  onChange={(e) => setScoreDraft(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 tabular-nums"
                />
              </div>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <label
                  htmlFor="teacher-topic-input"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Topic Learned Today
                </label>
                <input
                  id="teacher-topic-input"
                  type="text"
                  required
                  value={topicDraft}
                  onChange={(e) => setTopicDraft(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="teacher-remark-input"
                  className="block text-xs font-medium text-slate-700 mb-1.5"
                >
                  Short Teacher Remark
                </label>
                <input
                  id="teacher-remark-input"
                  type="text"
                  required
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>
            </div>

            <div className="md:col-span-12 pt-1">
              <button
                type="submit"
                className="px-4 py-2.5 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 transition-colors cursor-pointer"
              >
                Save Score for {selectedStudent.firstName}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* TAB 3: ASSIGN HOMEWORK */}
      {activeTab === 'homework' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <section className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Assign New Homework
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                New tasks appear right away in the Parent’s Homework Checklist.
              </p>
            </div>

            <form onSubmit={handleHomeworkSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="hw-pupil"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Pupil
                  </label>
                  <select
                    id="hw-pupil"
                    value={selectedStudent.id}
                    onChange={(e) => handleSwitchStudent(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    {students.map((pupil) => (
                      <option key={pupil.id} value={pupil.id}>
                        {pupil.name} ({pupil.grade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="hw-subject"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="hw-subject"
                    value={hwSubject}
                    onChange={(e) => setHwSubject(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Basic Science">Basic Science</option>
                    <option value="Social Studies">Social Studies</option>
                    <option value="Creative Arts">Creative Arts</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="hw-title"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Homework Title
                </label>
                <input
                  id="hw-title"
                  type="text"
                  required
                  placeholder="e.g., Fractions Worksheet Page 18"
                  value={hwTitle}
                  onChange={(e) => setHwTitle(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="hw-instructions"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Short Instructions
                </label>
                <input
                  id="hw-instructions"
                  type="text"
                  placeholder="e.g., Answer questions 1 to 6 neatly."
                  value={hwInstructions}
                  onChange={(e) => setHwInstructions(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="hw-due"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Due Date
                </label>
                <select
                  id="hw-due"
                  value={hwDueDate}
                  onChange={(e) => setHwDueDate(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                >
                  <option value="Tomorrow">Tomorrow</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </select>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                Assign Homework
              </button>
            </form>
          </section>

          <section className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-slate-900">
                {selectedStudent.firstName}’s Current Homework
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                See which tasks have been ticked off at home.
              </p>
            </div>

            <ul className="divide-y divide-slate-100">
              {selectedStudent.homework.map((task) => (
                <li key={task.id} className="py-3.5 space-y-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {task.subject} · Due {task.dueDate} ·{' '}
                    <span
                      className={
                        task.completed
                          ? 'text-green-700 font-semibold'
                          : 'text-orange-700 font-semibold'
                      }
                    >
                      {task.completed ? 'Completed at home' : 'Not done yet'}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {/* TAB 4: SEND TEACHER FEEDBACK & GIVE AWARDS */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Send Feedback */}
          <section className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Send Feedback to Parents
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Share a daily note about class behavior or learning progress.
              </p>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fb-pupil"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Pupil
                  </label>
                  <select
                    id="fb-pupil"
                    value={selectedStudent.id}
                    onChange={(e) => handleSwitchStudent(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    {students.map((pupil) => (
                      <option key={pupil.id} value={pupil.id}>
                        {pupil.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fb-subject"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Subject
                  </label>
                  <select
                    id="fb-subject"
                    value={fbSubject}
                    onChange={(e) => setFbSubject(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="English Language">English Language</option>
                    <option value="Basic Science">Basic Science</option>
                    <option value="General Classwork">General Classwork</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="fb-message"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Feedback Message
                </label>
                <textarea
                  id="fb-message"
                  rows={3}
                  required
                  placeholder={`Write a warm update about ${selectedStudent.firstName}...`}
                  value={fbMessage}
                  onChange={(e) => setFbMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-green-700 rounded-lg hover:bg-green-800 cursor-pointer"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Send Note to Bello Family
              </button>
            </form>
          </section>

          {/* Give Award */}
          <section className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
            <div className="pb-4 border-b border-slate-100">
              <h2 className="font-display text-xl font-bold text-slate-900">
                Give a Student Achievement
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Celebrate good work with a gold star or certificate.
              </p>
            </div>

            <form onSubmit={handleAwardSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="award-category"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="award-category"
                    value={awardCategory}
                    onChange={(e) => setAwardCategory(e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="Reading">Reading</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Kindness">Kindness</option>
                    <option value="Science">Basic Science</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="award-icon"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Badge Style
                  </label>
                  <select
                    id="award-icon"
                    value={awardIcon}
                    onChange={(e) =>
                      setAwardIcon(e.target.value as AchievementItem['iconType'])
                    }
                    className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                  >
                    <option value="star">Gold Star</option>
                    <option value="trophy">Trophy</option>
                    <option value="book">Reading Ribbon</option>
                    <option value="heart">Kindness Heart</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="award-title"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Award Title
                </label>
                <input
                  id="award-title"
                  type="text"
                  required
                  placeholder="e.g., Neat Handwriting Champion"
                  value={awardTitle}
                  onChange={(e) => setAwardTitle(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label
                  htmlFor="award-desc"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Why They Earned It
                </label>
                <input
                  id="award-desc"
                  type="text"
                  placeholder="e.g., Wrote every class exercise clearly and neatly."
                  value={awardDesc}
                  onChange={(e) => setAwardDesc(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-orange-600 rounded-lg hover:bg-orange-700 cursor-pointer"
              >
                <Award className="w-4 h-4" aria-hidden="true" />
                Give Award to {selectedStudent.firstName}
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
