export type UserRole = 'parent' | 'teacher' | 'management';

export type NavSection = 'overview' | 'academics' | 'homework' | 'attendance' | 'updates';
export type TeacherTab = 'rollcall' | 'grades' | 'homework' | 'feedback';
export type ManagementTab = 'summary' | 'announcements' | 'classes';

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
  homework: HomeworkItem[];
  attendance: AttendanceDay[];
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
    homework: [
      {
        id: 'rh-1',
        subject: 'Mathematics',
        title: 'Multiplication Practice Sheet (Page 24)',
        instructions: 'Complete questions 1 to 10 in the blue math workbook.',
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
