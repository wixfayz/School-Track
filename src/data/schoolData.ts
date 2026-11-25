export type UserRole = 'parent' | 'teacher' | 'management';

export type NavSection = 'overview' | 'academics' | 'homework' | 'attendance' | 'updates';
export type TeacherTab = 'rollcall' | 'grades' | 'homework' | 'feedback';
export type ManagementTab = 'summary' | 'announcements' | 'classes';
export type ReportPeriodId = 'this-week' | 'last-week' | 'last-month' | 'previous-class';

export interface SubjectPerformance {
  id: string;
  subject: string;
  group: 'core' | 'creative';
  score: number;
  level: 'Excellent' | 'Great' | 'Good' | 'Needs Practice';
  todayTopic: string;
  teacherNote: string;
  updatedAt: string;
}

export interface PastReportRecord {
  id: Exclude<ReportPeriodId, 'this-week'>;
  label: string;
  dateRange: string;
  className: string;
  teacherName: string;
  attendanceSummary: string;
  overallRemark: string;
  subjects: {
    subject: string;
    group: 'core' | 'creative';
    score: number;
    level: 'Excellent' | 'Great' | 'Good' | 'Needs Practice';
    topic: string;
    remark: string;
  }[];
}

export interface HomeworkItem {
  id: string;
  subject: string;
  title: string;
  instructions: string;
  dueDate: string;
  completed: boolean;
  isParentReminder?: boolean;
}

export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'Holiday';

export interface AttendanceDay {
  id: string;
  dateLabel: string;
  dayName: string;
  weekLabel: string;
  status: AttendanceStatus;
  arrivalTime: string;
  note: string;
}

export interface PastAttendanceTerm {
  termLabel: string;
  schoolYear: string;
  className: string;
  presentDays: number;
  lateDays: number;
  absentDays: number;
  totalDays: number;
  note: string;
}

export interface TeacherFeedbackItem {
  id: string;
  teacherName: string;
  teacherRole: string;
  teacherAvatar?: string;
  subject: string;
  date: string;
  message: string;
  isRead: boolean;
  parentReply?: {
    text: string;
    sentAt: string;
  };
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  dateEarned: string;
  description: string;
  awardedBy: string;
  iconType: 'star' | 'book' | 'heart' | 'trophy';
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  category: string;
  date: string;
  eventDate: string;
  summary: string;
  acknowledged: boolean;
  isCustom?: boolean;
}

export interface StudentProfile {
  id: string;
  name: string;
  firstName: string;
  grade: string;
  room: string;
  schoolName: string;
  homeroomTeacher: string;
  teacherAvatar: string;
  avatar: string;
  todayStatus: AttendanceStatus;
  todayArrival: string;
  academics: SubjectPerformance[];
  pastReports: PastReportRecord[];
  homework: HomeworkItem[];
  attendance: AttendanceDay[];
  lastMonthAttendance: AttendanceDay[];
  previousClassAttendance: PastAttendanceTerm[];
  feedback: TeacherFeedbackItem[];
  achievements: AchievementItem[];
}

export interface SchoolClassSummary {
  id: string;
  className: string;
  room: string;
  teacherName: string;
  pupilsCount: number;
  presentToday: number;
  homeworkPosted: number;
}

export const SCHOOL_BANNER_IMAGE =
  '/src/assets/images/banner_school_campus_1795359941600.jpg';

export const TEACHER_AMINA_AVATAR =
  '/src/assets/images/avatar_teacher_amina_1795361224531.jpg';

export const RABIATU_AVATAR =
  '/src/assets/images/avatar_student_maya_1795359938573.jpg';

export const SHUAIBU_AVATAR =
  '/src/assets/images/avatar_student_shuaibu_1795361224404.jpg';

export const SCHOOL_CLASSES: SchoolClassSummary[] = [
  {
    id: 'cls-1',
    className: 'Primary 1',
    room: 'Room 1A',
    teacherName: 'Miss Zainab Musa',
    pupilsCount: 28,
    presentToday: 27,
    homeworkPosted: 2,
  },
  {
    id: 'cls-2',
    className: 'Primary 2',
    room: 'Room 2A',
    teacherName: 'Mrs. Amina Ibrahim',
    pupilsCount: 30,
    presentToday: 29,
    homeworkPosted: 3,
  },
  {
    id: 'cls-3',
    className: 'Primary 3',
    room: 'Room 3B',
    teacherName: 'Mr. Tunde Adeyemi',
    pupilsCount: 32,
    presentToday: 31,
    homeworkPosted: 3,
  },
  {
    id: 'cls-4',
    className: 'Primary 4',
    room: 'Room 4B',
    teacherName: 'Mrs. Amina Ibrahim',
    pupilsCount: 31,
    presentToday: 30,
    homeworkPosted: 4,
  },
  {
    id: 'cls-5',
    className: 'Primary 5',
    room: 'Room 5A',
    teacherName: 'Mrs. Ngozi Eze',
    pupilsCount: 33,
    presentToday: 31,
    homeworkPosted: 4,
  },
  {
    id: 'cls-6',
    className: 'Primary 6',
    room: 'Room 6A',
    teacherName: 'Mr. Ibrahim Sani',
    pupilsCount: 32,
    presentToday: 31,
    homeworkPosted: 5,
  },
];

export function scoreToLevel(score: number): SubjectPerformance['level'] {
  if (score >= 90) return 'Excellent';
  if (score >= 80) return 'Great';
  if (score >= 70) return 'Good';
  return 'Needs Practice';
}

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'rabiatu',
    name: "Rabi'atu Bello",
    firstName: "Rabi'atu",
    grade: 'Primary 4',
    room: 'Room 4B',
    schoolName: 'Oakwood Primary School',
    homeroomTeacher: 'Mrs. Amina Ibrahim',
    teacherAvatar: TEACHER_AMINA_AVATAR,
    avatar: RABIATU_AVATAR,
    todayStatus: 'Present',
    todayArrival: '7:48 AM',
    academics: [
      {
        id: 'r-math',
        subject: 'Mathematics',
        group: 'core',
        score: 94,
        level: 'Excellent',
        todayTopic: 'Multiplication with two-digit numbers',
        teacherNote: 'Solved all 12 practice problems accurately and helped a classmate.',
        updatedAt: 'Today',
      },
      {
        id: 'r-eng',
        subject: 'English Language',
        group: 'core',
        score: 91,
        level: 'Excellent',
        todayTopic: 'Reading comprehension and story characters',
        teacherNote: 'Read aloud clearly during group reading circle.',
        updatedAt: 'Today',
      },
      {
        id: 'r-sci',
        subject: 'Basic Science',
        group: 'core',
        score: 88,
        level: 'Great',
        todayTopic: 'How plants grow toward sunlight',
        teacherNote: 'Recorded neat daily observations in her science notebook.',
        updatedAt: 'Yesterday',
      },
      {
        id: 'r-soc',
        subject: 'Social Studies',
        group: 'core',
        score: 86,
        level: 'Great',
        todayTopic: 'Our community and map directions',
        teacherNote: 'Good teamwork during the neighborhood map activity.',
        updatedAt: 'Nov 19',
      },
      {
        id: 'r-art',
        subject: 'Creative Arts',
        group: 'creative',
        score: 96,
        level: 'Excellent',
        todayTopic: 'Colorful leaf watercolor painting',
        teacherNote: 'Very creative color mixing and tidy desk.',
        updatedAt: 'Nov 18',
      },
    ],
    pastReports: [
      {
        id: 'last-week',
        label: 'Last Week',
        dateRange: 'Nov 9 – Nov 13, 2026',
        className: 'Primary 4 · Room 4B',
        teacherName: 'Mrs. Amina Ibrahim',
        attendanceSummary: '5 of 5 days attended (1 late)',
        overallRemark:
          "Rabi'atu had a very steady week and showed big improvement in Basic Science experiments.",
        subjects: [
          {
            subject: 'Mathematics',
            group: 'core',
            score: 90,
            level: 'Excellent',
            topic: 'Times tables and word problems',
            remark: 'Accurate steps on all class exercises.',
          },
          {
            subject: 'English Language',
            group: 'core',
            score: 89,
            level: 'Great',
            topic: 'Writing short paragraphs with punctuation',
            remark: 'Neat handwriting and clear sentences.',
          },
          {
            subject: 'Basic Science',
            group: 'core',
            score: 85,
            level: 'Great',
            topic: 'Parts of a flowering plant',
            remark: 'Labeled her diagram carefully.',
          },
          {
            subject: 'Social Studies',
            group: 'core',
            score: 84,
            level: 'Great',
            topic: 'Community helpers and civic duties',
            remark: 'Participated politely in class discussion.',
          },
          {
            subject: 'Creative Arts',
            group: 'creative',
            score: 94,
            level: 'Excellent',
            topic: 'Paper collage patterns',
            remark: 'Bright colors and neat cutting.',
          },
        ],
      },
      {
        id: 'last-month',
        label: 'Last Month',
        dateRange: 'October 2026 · Term 2',
        className: 'Primary 4 · Room 4B',
        teacherName: 'Mrs. Amina Ibrahim',
        attendanceSummary: '19 of 20 school days present (95%)',
        overallRemark:
          "A strong start to Primary 4! Rabi'atu settled into her new class quickly and enjoys reading every day.",
        subjects: [
          {
            subject: 'Mathematics',
            group: 'core',
            score: 87,
            level: 'Great',
            topic: 'Place value and 3-digit addition',
            remark: 'Careful work; keep practicing quick mental sums.',
          },
          {
            subject: 'English Language',
            group: 'core',
            score: 88,
            level: 'Great',
            topic: 'Storytelling and new vocabulary',
            remark: 'Confident voice during class reading.',
          },
          {
            subject: 'Basic Science',
            group: 'core',
            score: 83,
            level: 'Great',
            topic: 'Living and non-living things',
            remark: 'Curious and asks thoughtful questions.',
          },
          {
            subject: 'Social Studies',
            group: 'core',
            score: 82,
            level: 'Great',
            topic: 'Nigerian states and culture',
            remark: 'Shared a great short report with her group.',
          },
          {
            subject: 'Creative Arts',
            group: 'creative',
            score: 92,
            level: 'Excellent',
            topic: 'Pencil shading and simple shapes',
            remark: 'Very expressive drawing skills.',
          },
        ],
      },
      {
        id: 'previous-class',
        label: 'Previous Class',
        dateRange: '2025/2026 Session · Final Report',
        className: 'Primary 3 · Room 3B',
        teacherName: 'Mr. Tunde Adeyemi',
        attendanceSummary: '176 of 180 school days present (98%)',
        overallRemark:
          "Promoted to Primary 4 with honors! Rabi'atu was a cheerful leader in Primary 3 and always helped younger pupils.",
        subjects: [
          {
            subject: 'Mathematics',
            group: 'core',
            score: 85,
            level: 'Great',
            topic: 'Primary 3 Core Arithmetic & Simple Fractions',
            remark: 'Strong foundation ready for Primary 4.',
          },
          {
            subject: 'English Language',
            group: 'core',
            score: 86,
            level: 'Great',
            topic: 'Primary 3 Reading, Grammar & Spelling',
            remark: 'Read 18 library books across the school year.',
          },
          {
            subject: 'Basic Science',
            group: 'core',
            score: 82,
            level: 'Great',
            topic: 'Weather, Water & Simple Machines',
            remark: 'Loved hands-on group science days.',
          },
          {
            subject: 'Social Studies',
            group: 'core',
            score: 84,
            level: 'Great',
            topic: 'Family Values & School Community',
            remark: 'Kind, respectful, and cooperative.',
          },
          {
            subject: 'Creative Arts',
            group: 'creative',
            score: 91,
            level: 'Excellent',
            topic: 'Drawing, Craft & Class Performance',
            remark: 'Won Best Craft Project in Term 3.',
          },
        ],
      },
    ],
    homework: [
      {
        id: 'rh-1',
        subject: 'Mathematics',
        title: 'Multiplication Practice Sheet (Page 24)',
        instructions: 'Complete questions 1 to 10 in the green math workbook.',
        dueDate: 'Tomorrow',
        completed: false,
      },
      {
        id: 'rh-2',
        subject: 'English Language',
        title: 'Read Chapter 3 of Storybook',
        instructions: 'Read for 15 minutes and write two sentences about your favorite part.',
        dueDate: 'Tomorrow',
        completed: false,
      },
      {
        id: 'rh-3',
        subject: 'Basic Science',
        title: 'Draw and Label Parts of a Flower',
        instructions: 'Color the stem, roots, leaves, and petals neatly.',
        dueDate: 'Wednesday',
        completed: true,
      },
      {
        id: 'rh-4',
        subject: 'Spelling',
        title: 'Weekly Spelling List (10 Words)',
        instructions: 'Practice writing each spelling word twice before Friday’s test.',
        dueDate: 'Friday',
        completed: true,
      },
    ],
    attendance: [
      { id: 'ra-1', dateLabel: 'Nov 2', dayName: 'Mon', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:45 AM', note: 'Arrived early and ready for morning assembly.' },
      { id: 'ra-2', dateLabel: 'Nov 3', dayName: 'Tue', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'ra-3', dateLabel: 'Nov 4', dayName: 'Wed', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:48 AM', note: 'Arrived on time.' },
      { id: 'ra-4', dateLabel: 'Nov 5', dayName: 'Thu', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:44 AM', note: 'Arrived on time.' },
      { id: 'ra-5', dateLabel: 'Nov 6', dayName: 'Fri', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:49 AM', note: 'Led morning assembly reading.' },
      { id: 'ra-6', dateLabel: 'Nov 9', dayName: 'Mon', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:52 AM', note: 'Arrived on time.' },
      { id: 'ra-7', dateLabel: 'Nov 10', dayName: 'Tue', weekLabel: 'Week 2', status: 'Late', arrivalTime: '8:15 AM', note: 'Arrived 15 minutes late due to morning traffic.' },
      { id: 'ra-8', dateLabel: 'Nov 11', dayName: 'Wed', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:46 AM', note: 'Arrived on time.' },
      { id: 'ra-9', dateLabel: 'Nov 12', dayName: 'Thu', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:49 AM', note: 'Arrived on time.' },
      { id: 'ra-10', dateLabel: 'Nov 13', dayName: 'Fri', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'ra-11', dateLabel: 'Nov 16', dayName: 'Mon', weekLabel: 'Week 3', status: 'Absent', arrivalTime: '—', note: 'Excused absence (mild cold, parent informed school office).' },
      { id: 'ra-12', dateLabel: 'Nov 17', dayName: 'Tue', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:47 AM', note: 'Welcome back! Caught up on missed notes.' },
      { id: 'ra-13', dateLabel: 'Nov 18', dayName: 'Wed', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:45 AM', note: 'Arrived on time.' },
      { id: 'ra-14', dateLabel: 'Nov 19', dayName: 'Thu', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:51 AM', note: 'Arrived on time.' },
      { id: 'ra-15', dateLabel: 'Nov 20', dayName: 'Fri', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:48 AM', note: 'Great finish to the school week!' },
    ],
    lastMonthAttendance: [
      { id: 'ro-1', dateLabel: 'Oct 5', dayName: 'Mon', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:46 AM', note: 'Great start to October!' },
      { id: 'ro-2', dateLabel: 'Oct 6', dayName: 'Tue', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:49 AM', note: 'Arrived on time.' },
      { id: 'ro-3', dateLabel: 'Oct 7', dayName: 'Wed', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:44 AM', note: 'Arrived on time.' },
      { id: 'ro-4', dateLabel: 'Oct 8', dayName: 'Thu', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'ro-5', dateLabel: 'Oct 9', dayName: 'Fri', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:48 AM', note: 'Attended Friday assembly.' },
      { id: 'ro-6', dateLabel: 'Oct 12', dayName: 'Mon', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:51 AM', note: 'Arrived on time.' },
      { id: 'ro-7', dateLabel: 'Oct 13', dayName: 'Tue', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:47 AM', note: 'Arrived on time.' },
      { id: 'ro-8', dateLabel: 'Oct 14', dayName: 'Wed', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:45 AM', note: 'Arrived on time.' },
      { id: 'ro-9', dateLabel: 'Oct 15', dayName: 'Thu', weekLabel: 'Week 2', status: 'Absent', arrivalTime: '—', note: 'Family travel day (excused).' },
      { id: 'ro-10', dateLabel: 'Oct 16', dayName: 'Fri', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:49 AM', note: 'Back in class and smiling.' },
      { id: 'ro-11', dateLabel: 'Oct 19', dayName: 'Mon', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:46 AM', note: 'Arrived on time.' },
      { id: 'ro-12', dateLabel: 'Oct 20', dayName: 'Tue', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:48 AM', note: 'Arrived on time.' },
      { id: 'ro-13', dateLabel: 'Oct 21', dayName: 'Wed', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'ro-14', dateLabel: 'Oct 22', dayName: 'Thu', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:47 AM', note: 'Arrived on time.' },
      { id: 'ro-15', dateLabel: 'Oct 23', dayName: 'Fri', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:45 AM', note: '100% week attendance!' },
    ],
    previousClassAttendance: [
      {
        termLabel: 'Term 1',
        schoolYear: '2025/2026',
        className: 'Primary 3',
        presentDays: 58,
        lateDays: 1,
        absentDays: 1,
        totalDays: 60,
        note: 'Punctual and eager every morning.',
      },
      {
        termLabel: 'Term 2',
        schoolYear: '2025/2026',
        className: 'Primary 3',
        presentDays: 59,
        lateDays: 0,
        absentDays: 1,
        totalDays: 60,
        note: 'Received Punctuality Ribbon at end of term.',
      },
      {
        termLabel: 'Term 3',
        schoolYear: '2025/2026',
        className: 'Primary 3',
        presentDays: 58,
        lateDays: 0,
        absentDays: 2,
        totalDays: 60,
        note: 'Excellent full-year attendance record (98%).',
      },
    ],
    feedback: [
      {
        id: 'rf-1',
        teacherName: 'Mrs. Amina Ibrahim',
        teacherRole: 'Primary 4 Class Teacher',
        teacherAvatar: TEACHER_AMINA_AVATAR,
        subject: 'Mathematics',
        date: 'Today · 1:45 PM',
        message:
          "Rabi'atu did a wonderful job in Mathematics today! She finished her multiplication problems carefully and patiently explained a tricky step to her desk partner.",
        isRead: false,
      },
      {
        id: 'rf-2',
        teacherName: 'Mrs. Amina Ibrahim',
        teacherRole: 'Primary 4 Class Teacher',
        teacherAvatar: TEACHER_AMINA_AVATAR,
        subject: 'English Language',
        date: 'Nov 19 · 2:10 PM',
        message:
          "Rabi'atu shared a thoughtful summary of our class story. Please encourage her to keep reading 15 minutes every evening—her confidence is growing nicely.",
        isRead: true,
        parentReply: {
          text: 'Thank you Mrs. Ibrahim! She enjoys reading every evening after homework.',
          sentAt: 'Nov 19 · 6:20 PM',
        },
      },
      {
        id: 'rf-3',
        teacherName: 'Mr. Chinedu Okafor',
        teacherRole: 'Creative Arts Teacher',
        subject: 'Creative Arts',
        date: 'Nov 18 · 12:30 PM',
        message:
          "Rabi'atu's leaf watercolor painting was chosen for our hallway display board near the school library.",
        isRead: true,
      },
    ],
    achievements: [
      {
        id: 'rach-1',
        title: 'Star Reader of the Week',
        category: 'Reading',
        dateEarned: 'Nov 20',
        description: 'Completed 5 storybooks and shared a book review with Room 4B.',
        awardedBy: 'Mrs. Amina Ibrahim',
        iconType: 'book',
      },
      {
        id: 'rach-2',
        title: 'Helpful Classmate Award',
        category: 'Kindness',
        dateEarned: 'Nov 14',
        description: 'Helped arrange classroom library books and welcomed a new pupil.',
        awardedBy: 'Mrs. Amina Ibrahim',
        iconType: 'heart',
      },
      {
        id: 'rach-3',
        title: 'Mathematics Gold Star',
        category: 'Mathematics',
        dateEarned: 'Nov 6',
        description: 'Scored 100% on the weekly times-tables challenge.',
        awardedBy: 'Mrs. Amina Ibrahim',
        iconType: 'star',
      },
      {
        id: 'rach-4',
        title: 'Art Display Spotlight',
        category: 'Creative Arts',
        dateEarned: 'Oct 29',
        description: 'Painting displayed in the Oakwood Primary School art corner.',
        awardedBy: 'Mr. Chinedu Okafor',
        iconType: 'trophy',
      },
    ],
  },
  {
    id: 'shuaibu',
    name: "Shu'aibu Bello",
    firstName: "Shu'aibu",
    grade: 'Primary 2',
    room: 'Room 2A',
    schoolName: 'Oakwood Primary School',
    homeroomTeacher: 'Mrs. Amina Ibrahim',
    teacherAvatar: TEACHER_AMINA_AVATAR,
    avatar: SHUAIBU_AVATAR,
    todayStatus: 'Present',
    todayArrival: '7:48 AM',
    academics: [
      {
        id: 's-math',
        subject: 'Mathematics',
        group: 'core',
        score: 89,
        level: 'Great',
        todayTopic: 'Adding and subtracting numbers up to 100',
        teacherNote: 'Used counting blocks very neatly to check his answers.',
        updatedAt: 'Today',
      },
      {
        id: 's-eng',
        subject: 'Phonics & Reading',
        group: 'core',
        score: 87,
        level: 'Great',
        todayTopic: 'Short stories and rhyming words',
        teacherNote: 'Sounded out new words aloud with great energy.',
        updatedAt: 'Today',
      },
      {
        id: 's-sci',
        subject: 'Basic Science',
        group: 'core',
        score: 95,
        level: 'Excellent',
        todayTopic: 'Butterflies and garden habitats',
        teacherNote: 'Asked curious questions during our school garden walk!',
        updatedAt: 'Yesterday',
      },
      {
        id: 's-art',
        subject: 'Drawing & Music',
        group: 'creative',
        score: 92,
        level: 'Excellent',
        todayTopic: 'Rhythm clapping and crayon sketching',
        teacherNote: 'Kept a steady beat during our class song.',
        updatedAt: 'Nov 19',
      },
    ],
    pastReports: [
      {
        id: 'last-week',
        label: 'Last Week',
        dateRange: 'Nov 9 – Nov 13, 2026',
        className: 'Primary 2 · Room 2A',
        teacherName: 'Mrs. Amina Ibrahim',
        attendanceSummary: '5 of 5 days attended (1 late)',
        overallRemark:
          "Shu'aibu was full of curiosity last week and read his storybook aloud with a big smile!",
        subjects: [
          {
            subject: 'Mathematics',
            group: 'core',
            score: 86,
            level: 'Great',
            topic: 'Counting in 2s, 5s, and 10s',
            remark: 'Quick with skip-counting games.',
          },
          {
            subject: 'Phonics & Reading',
            group: 'core',
            score: 85,
            level: 'Great',
            topic: 'Blending consonant sounds',
            remark: 'Improved fluency during partner reading.',
          },
          {
            subject: 'Basic Science',
            group: 'core',
            score: 92,
            level: 'Excellent',
            topic: 'Seeds, soil, and sunlight',
            remark: 'Loved watering our classroom bean sprouts.',
          },
          {
            subject: 'Drawing & Music',
            group: 'creative',
            score: 90,
            level: 'Excellent',
            topic: 'Animal sketches in crayon',
            remark: 'Very joyful and colorful artwork.',
          },
        ],
      },
      {
        id: 'last-month',
        label: 'Last Month',
        dateRange: 'October 2026 · Term 2',
        className: 'Primary 2 · Room 2A',
        teacherName: 'Mrs. Amina Ibrahim',
        attendanceSummary: '20 of 20 school days present (100%)',
        overallRemark:
          "Perfect attendance in October! Shu'aibu is growing in confidence with reading and number lines.",
        subjects: [
          {
            subject: 'Mathematics',
            group: 'core',
            score: 84,
            level: 'Great',
            topic: 'Number bonds up to 50',
            remark: 'Good steady practice every morning.',
          },
          {
            subject: 'Phonics & Reading',
            group: 'core',
            score: 82,
            level: 'Great',
            topic: 'Short vowel picture books',
            remark: 'Keep reading aloud 10 minutes each evening.',
          },
          {
            subject: 'Basic Science',
            group: 'core',
            score: 90,
            level: 'Excellent',
            topic: 'Our five senses',
            remark: 'Named all five senses clearly with examples.',
          },
          {
            subject: 'Drawing & Music',
            group: 'creative',
            score: 89,
            level: 'Great',
            topic: 'Class rhythm and singing',
            remark: 'Cheerful singer and kind teammate.',
          },
        ],
      },
      {
        id: 'previous-class',
        label: 'Previous Class',
        dateRange: '2025/2026 Session · Final Report',
        className: 'Primary 1 · Room 1A',
        teacherName: 'Miss Zainab Musa',
        attendanceSummary: '177 of 180 school days present (98%)',
        overallRemark:
          "Promoted to Primary 2 with a bright smile! Shu'aibu learned to read short sentences and loves nature discovery.",
        subjects: [
          {
            subject: 'Mathematics',
            group: 'core',
            score: 83,
            level: 'Great',
            topic: 'Primary 1 Counting, Shapes & Simple Sums',
            remark: 'Solid understanding of early numbers.',
          },
          {
            subject: 'Phonics & Reading',
            group: 'core',
            score: 81,
            level: 'Great',
            topic: 'Primary 1 Letter Sounds & Sight Words',
            remark: 'Made wonderful progress by Term 3.',
          },
          {
            subject: 'Basic Science',
            group: 'core',
            score: 88,
            level: 'Great',
            topic: 'Animals, Plants & Healthy Habits',
            remark: 'Always excited for outdoor science walks.',
          },
          {
            subject: 'Drawing & Music',
            group: 'creative',
            score: 89,
            level: 'Great',
            topic: 'Coloring, Rhymes & Storytelling',
            remark: 'Friendly, creative, and well-behaved.',
          },
        ],
      },
    ],
    homework: [
      {
        id: 'sh-1',
        subject: 'Phonics & Reading',
        title: 'Read "The Clever Tortoise" Picture Book',
        instructions: 'Read aloud together with a parent for 10 minutes.',
        dueDate: 'Tomorrow',
        completed: false,
      },
      {
        id: 'sh-2',
        subject: 'Mathematics',
        title: 'Number Line Addition Worksheet',
        instructions: 'Complete the 6 addition hops on the sheet in his homework folder.',
        dueDate: 'Wednesday',
        completed: true,
      },
      {
        id: 'sh-3',
        subject: 'Basic Science',
        title: 'Bring One Dry Leaf to Class',
        instructions: 'Find a clean dry leaf from your yard or park for our leaf rubbing craft.',
        dueDate: 'Thursday',
        completed: false,
      },
    ],
    attendance: [
      { id: 'sa-1', dateLabel: 'Nov 2', dayName: 'Mon', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:45 AM', note: 'Big smile at morning drop-off!' },
      { id: 'sa-2', dateLabel: 'Nov 3', dayName: 'Tue', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'sa-3', dateLabel: 'Nov 4', dayName: 'Wed', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:48 AM', note: 'Arrived on time.' },
      { id: 'sa-4', dateLabel: 'Nov 5', dayName: 'Thu', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:44 AM', note: 'Arrived on time.' },
      { id: 'sa-5', dateLabel: 'Nov 6', dayName: 'Fri', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:49 AM', note: 'Arrived on time.' },
      { id: 'sa-6', dateLabel: 'Nov 9', dayName: 'Mon', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:52 AM', note: 'Arrived on time.' },
      { id: 'sa-7', dateLabel: 'Nov 10', dayName: 'Tue', weekLabel: 'Week 2', status: 'Late', arrivalTime: '8:15 AM', note: 'Arrived 15 minutes late due to morning traffic.' },
      { id: 'sa-8', dateLabel: 'Nov 11', dayName: 'Wed', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:46 AM', note: 'Arrived on time.' },
      { id: 'sa-9', dateLabel: 'Nov 12', dayName: 'Thu', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:49 AM', note: 'Arrived on time.' },
      { id: 'sa-10', dateLabel: 'Nov 13', dayName: 'Fri', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'sa-11', dateLabel: 'Nov 16', dayName: 'Mon', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:46 AM', note: 'Arrived on time.' },
      { id: 'sa-12', dateLabel: 'Nov 17', dayName: 'Tue', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:47 AM', note: 'Arrived on time.' },
      { id: 'sa-13', dateLabel: 'Nov 18', dayName: 'Wed', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:45 AM', note: 'Arrived on time.' },
      { id: 'sa-14', dateLabel: 'Nov 19', dayName: 'Thu', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:51 AM', note: 'Arrived on time.' },
      { id: 'sa-15', dateLabel: 'Nov 20', dayName: 'Fri', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:48 AM', note: 'Full week of smiling attendance!' },
    ],
    lastMonthAttendance: [
      { id: 'so-1', dateLabel: 'Oct 5', dayName: 'Mon', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:46 AM', note: 'Happy arrival!' },
      { id: 'so-2', dateLabel: 'Oct 6', dayName: 'Tue', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:49 AM', note: 'Arrived on time.' },
      { id: 'so-3', dateLabel: 'Oct 7', dayName: 'Wed', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:44 AM', note: 'Arrived on time.' },
      { id: 'so-4', dateLabel: 'Oct 8', dayName: 'Thu', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'so-5', dateLabel: 'Oct 9', dayName: 'Fri', weekLabel: 'Week 1', status: 'Present', arrivalTime: '7:48 AM', note: 'Arrived on time.' },
      { id: 'so-6', dateLabel: 'Oct 12', dayName: 'Mon', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:51 AM', note: 'Arrived on time.' },
      { id: 'so-7', dateLabel: 'Oct 13', dayName: 'Tue', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:47 AM', note: 'Arrived on time.' },
      { id: 'so-8', dateLabel: 'Oct 14', dayName: 'Wed', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:45 AM', note: 'Arrived on time.' },
      { id: 'so-9', dateLabel: 'Oct 15', dayName: 'Thu', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:48 AM', note: 'Arrived on time.' },
      { id: 'so-10', dateLabel: 'Oct 16', dayName: 'Fri', weekLabel: 'Week 2', status: 'Present', arrivalTime: '7:49 AM', note: 'Arrived on time.' },
      { id: 'so-11', dateLabel: 'Oct 19', dayName: 'Mon', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:46 AM', note: 'Arrived on time.' },
      { id: 'so-12', dateLabel: 'Oct 20', dayName: 'Tue', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:48 AM', note: 'Arrived on time.' },
      { id: 'so-13', dateLabel: 'Oct 21', dayName: 'Wed', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:50 AM', note: 'Arrived on time.' },
      { id: 'so-14', dateLabel: 'Oct 22', dayName: 'Thu', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:47 AM', note: 'Arrived on time.' },
      { id: 'so-15', dateLabel: 'Oct 23', dayName: 'Fri', weekLabel: 'Week 3', status: 'Present', arrivalTime: '7:45 AM', note: 'Perfect October attendance!' },
    ],
    previousClassAttendance: [
      {
        termLabel: 'Term 1',
        schoolYear: '2025/2026',
        className: 'Primary 1',
        presentDays: 59,
        lateDays: 0,
        absentDays: 1,
        totalDays: 60,
        note: 'Settled into Primary 1 wonderfully.',
      },
      {
        termLabel: 'Term 2',
        schoolYear: '2025/2026',
        className: 'Primary 1',
        presentDays: 59,
        lateDays: 1,
        absentDays: 0,
        totalDays: 60,
        note: 'Zero absences all term!',
      },
      {
        termLabel: 'Term 3',
        schoolYear: '2025/2026',
        className: 'Primary 1',
        presentDays: 58,
        lateDays: 0,
        absentDays: 2,
        totalDays: 60,
        note: 'Awarded Best Attendance in Room 1A.',
      },
    ],
    feedback: [
      {
        id: 'sf-1',
        teacherName: 'Mrs. Amina Ibrahim',
        teacherRole: 'Primary 2 Class Teacher',
        teacherAvatar: TEACHER_AMINA_AVATAR,
        subject: 'Basic Science',
        date: 'Today · 1:20 PM',
        message:
          "Shu'aibu spotted three different garden insects during our nature walk and drew a wonderful picture of them for the class board!",
        isRead: false,
      },
      {
        id: 'sf-2',
        teacherName: 'Mr. Chinedu Okafor',
        teacherRole: 'Creative Arts & Music Teacher',
        subject: 'Drawing & Music',
        date: 'Nov 18 · 11:45 AM',
        message:
          "Shu'aibu was a great listener during music time and helped pass out the rhythm shakers to everyone in his row.",
        isRead: true,
      },
    ],
    achievements: [
      {
        id: 'sach-1',
        title: 'Young Nature Explorer',
        category: 'Basic Science',
        dateEarned: 'Nov 19',
        description: 'Best garden observation sketch in Primary 2.',
        awardedBy: 'Mrs. Amina Ibrahim',
        iconType: 'star',
      },
      {
        id: 'sach-2',
        title: '100% Week Attendance Star',
        category: 'Attendance',
        dateEarned: 'Nov 13',
        description: 'Present every single school day with great morning energy.',
        awardedBy: 'Oakwood Primary School',
        iconType: 'trophy',
      },
      {
        id: 'sach-3',
        title: 'Kind Sharing Ribbon',
        category: 'Kindness',
        dateEarned: 'Nov 5',
        description: 'Shared colored pencils cheerfully with his table group.',
        awardedBy: 'Mr. Chinedu Okafor',
        iconType: 'heart',
      },
    ],
  },
];

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Primary School Science & Craft Day',
    category: 'School Event',
    date: 'Posted Today',
    eventDate: 'Friday, Nov 27 · 9:30 AM',
    summary:
      'Parents are warmly invited to visit the school hall to see pupils’ science experiments, plant journals, and watercolor paintings.',
    acknowledged: false,
  },
  {
    id: 'ann-2',
    title: 'Library Book Week — Storybook Character Day',
    category: 'Activity',
    date: 'Posted Nov 19',
    eventDate: 'Wednesday, Dec 2 · All Day',
    summary:
      'Pupils may wear a simple costume or bring their favorite storybook to share during morning reading time.',
    acknowledged: false,
  },
  {
    id: 'ann-3',
    title: 'Open Day & Parent–Teacher Catch-Up',
    category: 'Reminder',
    date: 'Posted Nov 16',
    eventDate: 'Thursday, Dec 10 · 1:00 PM – 4:00 PM',
    summary:
      'Short 10-minute chats with class teachers to celebrate Term 2 progress and plan goals for next term.',
    acknowledged: true,
  },
  {
    id: 'ann-4',
    title: 'Afternoon Pick-Up Gate Reminder',
    category: 'Safety',
    date: 'Posted Nov 12',
    eventDate: 'Ongoing',
    summary:
      'Please pick up children at the covered East Courtyard gate between 2:00 PM and 2:45 PM with your family pickup card.',
    acknowledged: true,
  },
];
