export interface Question {
  id: string;
  questionNumber: number;
  text: string;
  options: {
    id: string;
    label: string; // 'A' | 'B' | 'C' | 'D'
    text: string;
  }[];
  correctOptionId: string;
  marks: number;
  explanation: string;
  subject: string;
  topic: string;
}

export interface TestItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  durationMinutes: number;
  totalMarks: number;
  questionCount: number;
  passingMarks: number;
  instructions: string[];
  status: "Available" | "Completed" | "Draft" | "Archived";
  questions: Question[];
}

export interface StudentResult {
  id: string;
  testId: string;
  testTitle: string;
  subject: string;
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeTakenMinutes: number;
  accuracy: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  userAnswers: Record<string, string>; // questionId -> optionId
}

export interface CourseItem {
  id: string;
  name: string;
  grade: string;
  board: string;
  studentsEnrolled: number;
  testsCount: number;
  faculty: string;
  status: "Active" | "Upcoming" | "Completed";
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  grade: string;
  board: string;
  phone: string;
  testsTaken: number;
  averageScore: number;
  joinedDate: string;
  status: "Active" | "Inactive";
}

export interface EnquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseInterest: string;
  grade: string;
  status: "New" | "Contacted" | "Enrolled" | "Resolved";
  date: string;
  notes?: string;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Staff" | "Administrator";
  department: string;
  status: "Active" | "Suspended";
  lastLogin: string;
}

// ── Sample Questions for Demo Assessment ──
export const DEMO_TEST_QUESTIONS: Question[] = [
  {
    id: "q-1",
    questionNumber: 1,
    text: "If the quadratic equation 2x² + kx + 3 = 0 has two equal real roots, find the possible values of k.",
    options: [
      { id: "opt-1a", label: "A", text: "k = ±2√6" },
      { id: "opt-1b", label: "B", text: "k = ±4√3" },
      { id: "opt-1c", label: "C", text: "k = ±6" },
      { id: "opt-1d", label: "D", text: "k = ±24" },
    ],
    correctOptionId: "opt-1a",
    marks: 4,
    explanation:
      "For equal real roots, the discriminant D = b² - 4ac must equal 0. Here a = 2, b = k, c = 3. Therefore, k² - 4(2)(3) = 0 => k² - 24 = 0 => k = ±√24 = ±2√6.",
    subject: "Mathematics",
    topic: "Quadratic Equations",
  },
  {
    id: "q-2",
    questionNumber: 2,
    text: "The 10th term of an Arithmetic Progression (AP) whose first term is -3 and common difference is 4 is:",
    options: [
      { id: "opt-2a", label: "A", text: "30" },
      { id: "opt-2b", label: "B", text: "33" },
      { id: "opt-2c", label: "C", text: "37" },
      { id: "opt-2d", label: "D", text: "41" },
    ],
    correctOptionId: "opt-2b",
    marks: 4,
    explanation:
      "Using the AP formula a_n = a + (n - 1)d: a_10 = -3 + (10 - 1)(4) = -3 + 9(4) = -3 + 36 = 33.",
    subject: "Mathematics",
    topic: "Arithmetic Progressions",
  },
  {
    id: "q-3",
    questionNumber: 3,
    text: "If sin θ + cos θ = √2 cos(90° - θ), then the value of cot θ is:",
    options: [
      { id: "opt-3a", label: "A", text: "√2 + 1" },
      { id: "opt-3b", label: "B", text: "√2 - 1" },
      { id: "opt-3c", label: "C", text: "1 / (√2 + 1)" },
      { id: "opt-3d", label: "D", text: "1 - √2" },
    ],
    correctOptionId: "opt-3b",
    marks: 4,
    explanation:
      "Given sin θ + cos θ = √2 sin θ. Divide both sides by sin θ: 1 + cot θ = √2 => cot θ = √2 - 1.",
    subject: "Mathematics",
    topic: "Trigonometry",
  },
  {
    id: "q-4",
    questionNumber: 4,
    text: "A solid metallic sphere of radius 10.5 cm is melted and recast into smaller cones of radius 3.5 cm and height 3 cm. How many cones are formed?",
    options: [
      { id: "opt-4a", label: "A", text: "84" },
      { id: "opt-4b", label: "B", text: "126" },
      { id: "opt-4c", label: "C", text: "168" },
      { id: "opt-4d", label: "D", text: "210" },
    ],
    correctOptionId: "opt-4b",
    marks: 4,
    explanation:
      "Volume of sphere = (4/3)πR³ = (4/3)π(10.5)³. Volume of one cone = (1/3)πr²h = (1/3)π(3.5)²(3) = π(3.5)². Number of cones = [(4/3)π(10.5)³] / [π(3.5)²] = (4/3) * (3.5 * 3)³ / (3.5)² = (4/3) * 27 * 3.5 = 36 * 3.5 = 126.",
    subject: "Mathematics",
    topic: "Surface Areas & Volumes",
  },
  {
    id: "q-5",
    questionNumber: 5,
    text: "If the mean of five observations x, x + 2, x + 4, x + 6, and x + 8 is 11, what is the mean of the first three observations?",
    options: [
      { id: "opt-5a", label: "A", text: "7" },
      { id: "opt-5b", label: "B", text: "9" },
      { id: "opt-5c", label: "C", text: "11" },
      { id: "opt-5d", label: "D", text: "13" },
    ],
    correctOptionId: "opt-5b",
    marks: 4,
    explanation:
      "Mean of 5 observations = (5x + 20) / 5 = x + 4. Given x + 4 = 11 => x = 7. The first three observations are 7, 9, 11. Mean = (7 + 9 + 11) / 3 = 27 / 3 = 9.",
    subject: "Mathematics",
    topic: "Statistics",
  },
];

export const MOCK_TESTS: TestItem[] = [
  {
    id: "demo-test-101",
    title: "Class 10 Mathematics — Demo Assessment",
    subject: "Mathematics",
    grade: "Class 10 CBSE",
    durationMinutes: 15,
    totalMarks: 20,
    questionCount: 5,
    passingMarks: 8,
    instructions: [
      "Total duration is 15 minutes. The timer starts immediately upon clicking 'Start Test'.",
      "Each question carries 4 marks for a correct response. No negative marking is applicable in this demo test.",
      "You can freely navigate between questions using the Question Palette on the left.",
      "Mark questions for review if you wish to revisit them before final submission.",
      "Once you submit, your detailed scorecard and answers analysis will be rendered instantly.",
    ],
    status: "Available",
    questions: DEMO_TEST_QUESTIONS,
  },
  {
    id: "test-cbse-algebra",
    title: "Class 10 Polynomials & Quadratic Equations Test",
    subject: "Mathematics",
    grade: "Class 10 CBSE",
    durationMinutes: 30,
    totalMarks: 40,
    questionCount: 10,
    passingMarks: 16,
    instructions: [
      "Standard test duration is 30 minutes.",
      "Questions cover roots of polynomials, zeroes, and quadratic formulas.",
      "Rough sheet calculations can be carried out separately.",
    ],
    status: "Available",
    questions: DEMO_TEST_QUESTIONS,
  },
  {
    id: "test-trig-mastery",
    title: "Class 10 Trigonometric Identities & Heights Benchmark",
    subject: "Mathematics",
    grade: "Class 10 CBSE",
    durationMinutes: 45,
    totalMarks: 50,
    questionCount: 12,
    passingMarks: 20,
    instructions: [
      "Standard test duration is 45 minutes.",
      "Includes elevation and depression word problems.",
    ],
    status: "Available",
    questions: DEMO_TEST_QUESTIONS,
  },
];

export const MOCK_COURSES: CourseItem[] = [
  {
    id: "crs-101",
    name: "Class 10 Board Accelerator Program",
    grade: "Class 10",
    board: "CBSE & ICSE",
    studentsEnrolled: 64,
    testsCount: 18,
    faculty: "Dr. Sunita Sen",
    status: "Active",
  },
  {
    id: "crs-102",
    name: "Class 9 Foundation to Olympiad Maths",
    grade: "Class 9",
    board: "CBSE / State",
    studentsEnrolled: 42,
    testsCount: 14,
    faculty: "Er. Rajesh Verma",
    status: "Active",
  },
  {
    id: "crs-103",
    name: "Class 11 Calculus & Coordinate Geometry Intensive",
    grade: "Class 11",
    board: "CBSE / JEE Prep",
    studentsEnrolled: 51,
    testsCount: 22,
    faculty: "Prof. K. Anand",
    status: "Active",
  },
  {
    id: "crs-104",
    name: "Class 12 Board 100/100 Crash Batch",
    grade: "Class 12",
    board: "CBSE",
    studentsEnrolled: 88,
    testsCount: 26,
    faculty: "Dr. Sunita Sen",
    status: "Active",
  },
];

export const MOCK_STUDENTS: StudentRecord[] = [
  {
    id: "std-001",
    name: "Aarav Sharma",
    email: "student@demo.com",
    grade: "Class 10",
    board: "CBSE",
    phone: "+91 98451 22301",
    testsTaken: 3,
    averageScore: 84,
    joinedDate: "12 Aug 2026",
    status: "Active",
  },
  {
    id: "std-002",
    name: "Diya Narang",
    email: "diya.narang@gmail.com",
    grade: "Class 10",
    board: "CBSE",
    phone: "+91 97120 44812",
    testsTaken: 7,
    averageScore: 92,
    joinedDate: "05 Jul 2026",
    status: "Active",
  },
  {
    id: "std-003",
    name: "Rohan Patel",
    email: "rohan.p@yahoo.com",
    grade: "Class 11",
    board: "CBSE",
    phone: "+91 91234 56789",
    testsTaken: 5,
    averageScore: 78,
    joinedDate: "18 Sep 2026",
    status: "Active",
  },
  {
    id: "std-004",
    name: "Ananya Iyer",
    email: "ananya.iyer@outlook.com",
    grade: "Class 12",
    board: "CBSE",
    phone: "+91 98862 31094",
    testsTaken: 9,
    averageScore: 95,
    joinedDate: "01 Jun 2026",
    status: "Active",
  },
  {
    id: "std-005",
    name: "Kabir Malhotra",
    email: "kabir.m@gmail.com",
    grade: "Class 9",
    board: "ICSE",
    phone: "+91 99011 87654",
    testsTaken: 2,
    averageScore: 70,
    joinedDate: "20 Sep 2026",
    status: "Active",
  },
];

export const MOCK_ENQUIRIES: EnquiryRecord[] = [
  {
    id: "enq-201",
    name: "Meera Krishnan",
    email: "meera.k@gmail.com",
    phone: "+91 98450 11223",
    courseInterest: "Class 10 Board Accelerator Program",
    grade: "Class 10",
    status: "New",
    date: "11 Oct 2026",
    notes: "Parent inquired regarding weekend batch timings and study materials.",
  },
  {
    id: "enq-202",
    name: "Vikas Joshi",
    email: "vikas.joshi@live.com",
    phone: "+91 94481 99882",
    courseInterest: "Class 12 Board 100/100 Crash Batch",
    grade: "Class 12",
    status: "Contacted",
    date: "09 Oct 2026",
    notes: "Counseled on phone. Requested sample assessment link.",
  },
  {
    id: "enq-203",
    name: "Pooja Banerjee",
    email: "pooja.b@gmail.com",
    phone: "+91 97312 00411",
    courseInterest: "Class 9 Foundation to Olympiad Maths",
    grade: "Class 9",
    status: "Enrolled",
    date: "06 Oct 2026",
    notes: "Admitted into Saturday morning batch. Fee receipt generated.",
  },
  {
    id: "enq-204",
    name: "Harish Nair",
    email: "harish.nair@hotmail.com",
    phone: "+91 99452 77610",
    courseInterest: "Class 11 Calculus & Coordinate Geometry",
    grade: "Class 11",
    status: "Resolved",
    date: "02 Oct 2026",
    notes: "Attended demo class. Deferred to next term batch.",
  },
];

export const MOCK_ADMIN_USERS: AdminUserRecord[] = [
  {
    id: "usr-01",
    name: "Dr. Sunita Sen",
    email: "staff@demo.com",
    role: "Staff",
    department: "Senior Faculty — Mathematics",
    status: "Active",
    lastLogin: "Today at 08:30 AM",
  },
  {
    id: "usr-02",
    name: "Principal Rajesh Verma",
    email: "admin@demo.com",
    role: "Administrator",
    department: "Academic Direction & Admissions",
    status: "Active",
    lastLogin: "Yesterday at 05:45 PM",
  },
  {
    id: "usr-03",
    name: "Aarav Sharma",
    email: "student@demo.com",
    role: "Student",
    department: "Class 10 CBSE",
    status: "Active",
    lastLogin: "Today at 09:12 AM",
  },
  {
    id: "usr-04",
    name: "Prof. K. Anand",
    email: "anand.k@aliveinstitute.edu",
    role: "Staff",
    department: "JEE Advanced Curriculum",
    status: "Active",
    lastLogin: "10 Oct 2026",
  },
  {
    id: "usr-05",
    name: "Sunil Hegde",
    email: "sunil.hegde@aliveinstitute.edu",
    role: "Administrator",
    department: "Operations & IT Desk",
    status: "Active",
    lastLogin: "08 Oct 2026",
  },
];
