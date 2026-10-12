export type CourseSlug =
  | 'foundation-class-6-8'
  | 'secondary-class-9-10'
  | 'science-pcm-class-11-12'
  | 'science-pcb-class-11-12'
  | 'commerce-class-11-12'
  | 'cuet-preparation';

export interface Course {
  id: string;
  slug: CourseSlug | string;
  title: string;
  badge?: string;
  classes: string;
  shortDescription: string;
  description: string;
  subjects: string[];
  boards: string[];
  features: string[];
  category: 'foundation' | 'secondary' | 'science' | 'commerce' | 'competitive';
  duration?: string;
  batchSize?: string;
  mode?: string;
  imagePlaceholder?: string;
}

export interface Branch {
  id: string;
  name: string;
  shortName: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  displayPhone: string;
  email: string;
  timings: string;
  googleMapsUrl?: string;
  isMain?: boolean;
}

export interface Faculty {
  id: string;
  slug: string;
  name: string;
  designation?: string;
  subject: string;
  department: string;
  experienceYears?: number;
  qualifications: string[] | string;
  bio: string;
  isDemo: boolean;
  isDemoPlaceholder?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  isCta?: boolean;
  children?: { label: string; href: string; description?: string }[];
}

export interface SocialLink {
  platform: 'instagram' | 'youtube' | 'facebook';
  label: string;
  url: string;
}

export interface InstituteInfo {
  name: string;
  tagline: string;
  foundedYear: number;
  city: string;
  state: string;
  country: string;
  email: string;
  generalPhone: string;
  displayPhone: string;
  website: string;
  description: string;
  stats: {
    studentsMentored: string;
    yearsOfExcellence: string;
    selectionRate: string;
    centersCount: string;
  };
}

export interface TestQuestion {
  id: number;
  question: string;
  equation?: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  grade: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  instructions: string[];
  questions: TestQuestion[];
}

export interface TestAttempt {
  testId: string;
  studentId: string;
  startedAt: string;
  submittedAt?: string;
  answers: Record<number, 'A' | 'B' | 'C' | 'D'>;
  timeSpentSeconds: number;
}

export interface TestResult {
  attemptId: string;
  testId: string;
  studentName: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  unanswered: number;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  topicBreakdown: {
    topic: string;
    total: number;
    correct: number;
  }[];
  questionResults: {
    questionId: number;
    selectedAnswer?: 'A' | 'B' | 'C' | 'D';
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface Student {
  id: string;
  fullName: string;
  rollNumber: string;
  grade: string;
  stream?: string;
  branchId: string;
  contactNumber: string;
  parentContact: string;
  enrolledCourses: string[];
  attendanceRate: number;
  avatarUrl?: string;
}

export interface Staff {
  id: string;
  fullName: string;
  employeeId: string;
  role: 'Admin' | 'Teacher' | 'Counselor' | 'Staff';
  department: string;
  branchId: string;
  email: string;
  avatarUrl?: string;
}

export interface Enquiry {
  id?: string;
  studentName: string;
  parentName?: string;
  contactNumber: string;
  email?: string;
  targetClass: string;
  targetStream?: string;
  preferredBranch: string;
  message?: string;
  createdAt?: string;
  status?: 'New' | 'Contacted' | 'Enrolled' | 'Closed';
}

export interface Resource {
  id: string;
  title: string;
  type: 'Sample Paper' | 'Syllabus' | 'Notes' | 'Formula Sheet' | 'PYQ';
  classGrade: string;
  subject: string;
  description: string;
  fileSize: string;
  downloadUrl: string;
  updatedAt: string;
}
