import { useEffect, useState } from 'react';
import {
  AchievementItem,
  AttendanceStatus,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_STUDENTS,
  ManagementTab,
  NavSection,
  SchoolAnnouncement,
  StudentProfile,
  TEACHER_AMINA_AVATAR,
  TeacherTab,
  UserRole,
  scoreToLevel,
} from './data/schoolData';
import { TopBar } from './components/TopBar';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { StudentHeader } from './components/StudentHeader';
import { OverviewSection } from './components/OverviewSection';
import { AcademicsSection } from './components/AcademicsSection';
import { HomeworkSection } from './components/HomeworkSection';
import { AttendanceSection } from './components/AttendanceSection';
import { UpdatesSection } from './components/UpdatesSection';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ManagementDashboard } from './components/ManagementDashboard';
import { MessageModal } from './components/MessageModal';

const STORAGE_KEY = 'school_track_state_v2';

interface SavedState {
  students: StudentProfile[];
  announcements: SchoolAnnouncement[];
  selectedStudentId: string;
}

function loadInitialState(): SavedState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        students: INITIAL_STUDENTS,
        announcements: INITIAL_ANNOUNCEMENTS,
        selectedStudentId: INITIAL_STUDENTS[0].id,
      };
    }
    const parsed = JSON.parse(raw) as Partial<SavedState>;
    if (
      Array.isArray(parsed.students) &&
      parsed.students.length > 0 &&
      Array.isArray(parsed.announcements)
    ) {
      return {
        students: parsed.students,
        announcements: parsed.announcements,
        selectedStudentId:
          parsed.selectedStudentId ?? parsed.students[0].id,
      };
    }
  } catch {
    // Fallback cleanly to initial sample data
  }
  return {
    students: INITIAL_STUDENTS,
    announcements: INITIAL_ANNOUNCEMENTS,
    selectedStudentId: INITIAL_STUDENTS[0].id,
  };
}

export default function App() {
  const [initial] = useState<SavedState>(() => loadInitialState());
  const [role, setRole] = useState<UserRole>('parent');
  const [students, setStudents] = useState<StudentProfile[]>(initial.students);
  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>(
    initial.announcements
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    initial.selectedStudentId
  );
  const [activeSection, setActiveSection] = useState<NavSection>('overview');
  const [teacherTab, setTeacherTab] = useState<TeacherTab>('rollcall');
  const [managementTab, setManagementTab] = useState<ManagementTab>('summary');
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  useEffect(() => {
    try {
      const payload: SavedState = {
        students,
        announcements,
        selectedStudentId,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors
    }
  }, [students, announcements, selectedStudentId]);

  useEffect(() => {
    if (!toastText) return;
    const timer = window.setTimeout(() => setToastText(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toastText]);

  const activeStudent =
    students.find((s) => s.id === selectedStudentId) ?? students[0];

  const updateStudentById = (
    studentId: string,
    updater: (student: StudentProfile) => StudentProfile
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? updater(student) : student
      )
    );
  };

  // Parent actions
  const handleToggleHomework = (homeworkId: string) => {
    updateStudentById(activeStudent.id, (student) => ({
      ...student,
      homework: student.homework.map((task) =>
        task.id === homeworkId
          ? { ...task, completed: !task.completed }
          : task
      ),
    }));
  };

  const handleAddReminder = (
    subject: string,
    title: string,
    dueDate: string
  ) => {
    updateStudentById(activeStudent.id, (student) => ({
      ...student,
      homework: [
        {
          id: `rem-${Date.now()}`,
          subject,
          title,
          instructions: 'Added by parent as a helpful study reminder.',
          dueDate,
          completed: false,
          isParentReminder: true,
        },
        ...student.homework,
      ],
    }));
    setToastText(`Added study reminder for ${activeStudent.firstName}.`);
  };

  const handleDeleteReminder = (homeworkId: string) => {
    updateStudentById(activeStudent.id, (student) => ({
      ...student,
      homework: student.homework.filter((task) => task.id !== homeworkId),
    }));
  };

  const handleToggleFeedbackRead = (feedbackId: string) => {
    updateStudentById(activeStudent.id, (student) => ({
      ...student,
      feedback: student.feedback.map((item) =>
        item.id === feedbackId ? { ...item, isRead: !item.isRead } : item
      ),
    }));
  };

  const handleReplyToFeedback = (feedbackId: string, replyText: string) => {
    updateStudentById(activeStudent.id, (student) => ({
      ...student,
      feedback: student.feedback.map((item) =>
        item.id === feedbackId
          ? {
              ...item,
              isRead: true,
              parentReply: {
                text: replyText,
                sentAt: 'Just now',
              },
            }
          : item
      ),
    }));
    setToastText('Your reply has been saved.');
  };

  const handleToggleAnnouncementAck = (announcementId: string) => {
    setAnnouncements((prev) =>
      prev.map((item) =>
        item.id === announcementId
          ? { ...item, acknowledged: !item.acknowledged }
          : item
      )
    );
  };

  const handleSendMessageToTeacher = (topic: string, message: string) => {
    updateStudentById(activeStudent.id, (student) => ({
      ...student,
      feedback: [
        {
          id: `msg-${Date.now()}`,
          teacherName: student.homeroomTeacher,
          teacherRole: `${student.grade} Class Teacher`,
          teacherAvatar: student.teacherAvatar,
          subject: topic,
          date: 'Just now',
          message: `Parent note received regarding ${student.firstName}. Thank you for reaching out—I will reply soon!`,
          isRead: true,
          parentReply: {
            text: message,
            sentAt: 'Sent just now',
          },
        },
        ...student.feedback,
      ],
    }));
    setActiveSection('updates');
    setToastText(`Message sent to ${activeStudent.homeroomTeacher}.`);
  };

  // Teacher actions (reflect immediately on Parent Dashboard)
  const handleMarkTodayAttendance = (
    studentId: string,
    status: AttendanceStatus
  ) => {
    const target = students.find((s) => s.id === studentId);
    const arrivalTime =
      status === 'Present'
        ? '7:48 AM'
        : status === 'Late'
          ? '8:18 AM'
          : '—';
    const note =
      status === 'Present'
        ? 'Marked present by Mrs. Amina Ibrahim.'
        : status === 'Late'
          ? 'Arrived late today (recorded by teacher).'
          : 'Marked absent today (recorded by teacher).';

    updateStudentById(studentId, (student) => ({
      ...student,
      todayStatus: status,
      todayArrival: arrivalTime,
      attendance: student.attendance.map((day, idx) =>
        idx === student.attendance.length - 1
          ? { ...day, status, arrivalTime, note }
          : day
      ),
    }));
    if (target) {
      setToastText(`Marked ${target.firstName} as ${status} for today.`);
    }
  };

  const handleUpdateSubjectScore = (
    studentId: string,
    subjectId: string,
    newScore: number,
    todayTopic: string,
    teacherNote: string
  ) => {
    const target = students.find((s) => s.id === studentId);
    updateStudentById(studentId, (student) => ({
      ...student,
      academics: student.academics.map((subj) =>
        subj.id === subjectId
          ? {
              ...subj,
              score: newScore,
              level: scoreToLevel(newScore),
              todayTopic,
              teacherNote,
              updatedAt: 'Just now',
            }
          : subj
      ),
    }));
    if (target) {
      setToastText(`Updated score for ${target.firstName}.`);
    }
  };

  const handleAssignHomework = (
    studentId: string,
    subject: string,
    title: string,
    instructions: string,
    dueDate: string
  ) => {
    const target = students.find((s) => s.id === studentId);
    updateStudentById(studentId, (student) => ({
      ...student,
      homework: [
        {
          id: `hw-${Date.now()}`,
          subject,
          title,
          instructions,
          dueDate,
          completed: false,
        },
        ...student.homework,
      ],
    }));
    if (target) {
      setToastText(`Assigned new homework to ${target.firstName}.`);
    }
  };

  const handleSendTeacherFeedback = (
    studentId: string,
    subject: string,
    message: string
  ) => {
    const target = students.find((s) => s.id === studentId);
    updateStudentById(studentId, (student) => ({
      ...student,
      feedback: [
        {
          id: `tfb-${Date.now()}`,
          teacherName: 'Mrs. Amina Ibrahim',
          teacherRole: `${student.grade} Class Teacher`,
          teacherAvatar: TEACHER_AMINA_AVATAR,
          subject,
          date: 'Just now',
          message,
          isRead: false,
        },
        ...student.feedback,
      ],
    }));
    if (target) {
      setToastText(`Sent teacher note about ${target.firstName} to Bello Family.`);
    }
  };

  const handleGrantAchievement = (
    studentId: string,
    title: string,
    category: string,
    description: string,
    iconType: AchievementItem['iconType']
  ) => {
    const target = students.find((s) => s.id === studentId);
    updateStudentById(studentId, (student) => ({
      ...student,
      achievements: [
        {
          id: `ach-${Date.now()}`,
          title,
          category,
          dateEarned: 'Today',
          description,
          awardedBy: 'Mrs. Amina Ibrahim',
          iconType,
        },
        ...student.achievements,
      ],
    }));
    if (target) {
      setToastText(`Awarded "${title}" to ${target.firstName}!`);
    }
  };

  // School Management actions (reflect immediately on Parent Dashboard)
  const handlePostAnnouncement = (
    title: string,
    category: string,
    eventDate: string,
    summary: string
  ) => {
    setAnnouncements((prev) => [
      {
        id: `ann-${Date.now()}`,
        title,
        category,
        date: 'Posted Just Now',
        eventDate,
        summary,
        acknowledged: false,
        isCustom: true,
      },
      ...prev,
    ]);
    setToastText('Published school announcement to all parents.');
  };

  const handleDeleteAnnouncement = (announcementId: string) => {
    setAnnouncements((prev) => prev.filter((item) => item.id !== announcementId));
    setToastText('Announcement removed.');
  };

  const handleResetDemo = () => {
    setStudents(INITIAL_STUDENTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setSelectedStudentId(INITIAL_STUDENTS[0].id);
    setRole('parent');
    setActiveSection('overview');
    setToastText('Sample school data restored.');
  };

  const handleTopBarPrimaryAction = () => {
    if (role === 'parent') {
      setIsMessageOpen(true);
    } else {
      setRole('parent');
      setActiveSection('overview');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-900">
      <TopBar
        role={role}
        activeSection={activeSection}
        teacherTab={teacherTab}
        managementTab={managementTab}
        onSelectSection={setActiveSection}
        onSelectTeacherTab={setTeacherTab}
        onSelectManagementTab={setManagementTab}
        onPrimaryAction={handleTopBarPrimaryAction}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        <RoleSwitcherBar role={role} onChangeRole={setRole} />

        {role === 'parent' && (
          <>
            <StudentHeader
              students={students}
              selectedStudentId={activeStudent.id}
              onSelectStudent={setSelectedStudentId}
            />

            {activeSection === 'overview' && (
              <OverviewSection
                student={activeStudent}
                announcements={announcements}
                onNavigate={setActiveSection}
                onToggleHomework={handleToggleHomework}
                onToggleFeedbackRead={handleToggleFeedbackRead}
                onToggleAnnouncementAck={handleToggleAnnouncementAck}
              />
            )}

            {activeSection === 'academics' && (
              <AcademicsSection student={activeStudent} />
            )}

            {activeSection === 'homework' && (
              <HomeworkSection
                student={activeStudent}
                onToggleHomework={handleToggleHomework}
                onAddReminder={handleAddReminder}
                onDeleteReminder={handleDeleteReminder}
              />
            )}

            {activeSection === 'attendance' && (
              <AttendanceSection student={activeStudent} />
            )}

            {activeSection === 'updates' && (
              <UpdatesSection
                student={activeStudent}
                announcements={announcements}
                onToggleFeedbackRead={handleToggleFeedbackRead}
                onReplyToFeedback={handleReplyToFeedback}
                onToggleAnnouncementAck={handleToggleAnnouncementAck}
              />
            )}
          </>
        )}

        {role === 'teacher' && (
          <TeacherDashboard
            activeTab={teacherTab}
            students={students}
            onSelectTab={setTeacherTab}
            onMarkTodayAttendance={handleMarkTodayAttendance}
            onUpdateSubjectScore={handleUpdateSubjectScore}
            onAssignHomework={handleAssignHomework}
            onSendTeacherFeedback={handleSendTeacherFeedback}
            onGrantAchievement={handleGrantAchievement}
          />
        )}

        {role === 'management' && (
          <ManagementDashboard
            activeTab={managementTab}
            students={students}
            announcements={announcements}
            onSelectTab={setManagementTab}
            onPostAnnouncement={handlePostAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            School Track · Connecting parents, teachers, and Oakwood Primary School
          </p>
          <button
            type="button"
            onClick={handleResetDemo}
            className="font-medium text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
          >
            Reset sample data
          </button>
        </div>
      </footer>

      <MessageModal
        isOpen={isMessageOpen}
        student={activeStudent}
        onClose={() => setIsMessageOpen(false)}
        onSendMessage={handleSendMessageToTeacher}
      />

      {toastText && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 bg-slate-900 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-md"
        >
          {toastText}
        </div>
      )}
    </div>
  );
}
