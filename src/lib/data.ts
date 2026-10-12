import {
  InstituteInfo,
  Course,
  Branch,
  SocialLink,
  NavItem,
  Faculty,
  Test,
  Resource
} from './types';

export * from './types';

export const instituteInfo: InstituteInfo = {
  name: 'ALIVE Institute',
  tagline: 'Igniting Minds, Building Futures',
  foundedYear: 2012,
  city: 'Indore',
  state: 'Madhya Pradesh',
  country: 'India',
  email: 'contact@aliveinstitute.in',
  generalPhone: '+91 84015 58669',
  displayPhone: '+91 84015 58669',
  website: 'https://aliveinstitute.in',
  description:
    'ALIVE Institute Indore has been a beacon of academic excellence since 2012, offering rigorous coaching for classes 6th to 12th (CBSE, ICSE, MP Board) across Science & Commerce streams, alongside dedicated CUET preparation.',
  stats: {
    studentsMentored: '10,000+',
    yearsOfExcellence: '14+',
    selectionRate: '98%',
    centersCount: '2 Centers'
  }
};

export const courses: Course[] = [
  {
    id: 'course-foundation',
    slug: 'foundation-class-6-8',
    title: 'Junior Foundation Program',
    badge: 'Classes 6th – 8th',
    classes: 'Class 6 to Class 8',
    category: 'foundation',
    shortDescription:
      'Strong conceptual base in Mathematics, Science, and English to nurture analytical thinking and competitive readiness early.',
    description:
      'Designed specifically for middle school learners, our Junior Foundation Program builds deep conceptual understanding, eradicates exam fear, and lays the cornerstone for future Olympiads, NTSE, and high-school board excellence.',
    subjects: ['Mathematics', 'Science (Physics, Chemistry, Biology)', 'English', 'Social Science', 'Logical Reasoning'],
    boards: ['CBSE', 'ICSE', 'MP Board'],
    features: [
      'Interactive visual learning sessions & concept maps',
      'Continuous diagnostic testing with weekly performance feedback',
      'Special focus on mental math, speed calculation, and logical reasoning',
      'Small batch size (maximum 20 students) ensuring individual attention',
      'Dedicated doubt-clearing sessions every Saturday'
    ],
    duration: '1 Academic Year',
    batchSize: '20 Students / Batch',
    mode: 'Classroom / Hybrid',
    imagePlaceholder: '/images/courses/foundation.jpg'
  },
  {
    id: 'course-secondary',
    slug: 'secondary-class-9-10',
    title: 'Secondary Board & NTSE Program',
    badge: 'Classes 9th & 10th',
    classes: 'Class 9 to Class 10',
    category: 'secondary',
    shortDescription:
      'Comprehensive board curriculum coverage combined with rigorous problem-solving to secure 95%+ in Board Examinations.',
    description:
      'A structured program geared towards mastering high-school board syllabi while simultaneously grooming students for state and national talent examinations. We emphasize NCERT mastery, exemplary question solving, and board answer-writing technique.',
    subjects: ['Mathematics (Standard & Basic)', 'Science (Physics, Chemistry, Biology)', 'Social Science', 'English'],
    boards: ['CBSE', 'ICSE', 'MP Board'],
    features: [
      'Comprehensive NCERT & exemplar breakdown with step-by-step solutions',
      'Full syllabus completion by November with 3 rounds of board-style revision',
      '15+ Full-length proctored mock board tests with detailed evaluation',
      'Special sessions on diagram drawing, equation balancing, and theorem proofs',
      'Personalized performance tracking and parent-teacher consultative reviews'
    ],
    duration: '1 Academic Year',
    batchSize: '25 Students / Batch',
    mode: 'Classroom / Hybrid',
    imagePlaceholder: '/images/courses/secondary.jpg'
  },
  {
    id: 'course-science-pcm',
    slug: 'science-pcm-class-11-12',
    title: 'Senior Secondary — Science (PCM)',
    badge: 'Classes 11th & 12th',
    classes: 'Class 11 & Class 12',
    category: 'science',
    shortDescription:
      'Rigorous mastery of Physics, Chemistry, and Mathematics for top board scores and solid competitive engineering entrance foundations.',
    description:
      'Crafted for students targeting stellar board percentages as well as competitive engineering entrances. Our veteran faculty simplifies advanced calculus, electromagnetism, and organic chemistry through lucid pedagogical methods and structured problem practice.',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    boards: ['CBSE', 'MP Board', 'ISC'],
    features: [
      'Multi-tiered problem sets ranging from board level to entrance difficulty',
      'Comprehensive numerical problem workshops and derivations notebooks',
      'Formula booklets, revision mind-maps, and quick-reference cheat sheets',
      'Dedicated test series with line-by-line step marking according to official rubrics',
      'One-on-one mentorship for stress management and exam strategy'
    ],
    duration: '2-Year Integrated / 1-Year Fast Track',
    batchSize: '25 Students / Batch',
    mode: 'Classroom',
    imagePlaceholder: '/images/courses/science-pcm.jpg'
  },
  {
    id: 'course-science-pcb',
    slug: 'science-pcb-class-11-12',
    title: 'Senior Secondary — Science (PCB)',
    badge: 'Classes 11th & 12th',
    classes: 'Class 11 & Class 12',
    category: 'science',
    shortDescription:
      'In-depth mastery of Physics, Chemistry, and Biology with high-yield NCERT retention strategies for pre-medical aspirants.',
    description:
      'Empowering pre-medical and life-science students with rigorous conceptual grounding in Biology, Physics, and Chemistry. High-frequency NCERT review, intricate biological diagram training, and chemical mechanism retention techniques ensure peak board and competitive confidence.',
    subjects: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)', 'English'],
    boards: ['CBSE', 'MP Board', 'ISC'],
    features: [
      'Line-by-line NCERT Biology mastery program with mnemonic flashcards',
      'In-depth organic & inorganic reaction drills and laboratory concept reviews',
      'Structured numerical problem sessions for Physics mechanics & electrodynamics',
      'Regular OMR-based timed testing mirroring national medical entrance standards',
      'Bi-weekly doubts and individual remedial support'
    ],
    duration: '2-Year Integrated / 1-Year Fast Track',
    batchSize: '25 Students / Batch',
    mode: 'Classroom',
    imagePlaceholder: '/images/courses/science-pcb.jpg'
  },
  {
    id: 'course-commerce',
    slug: 'commerce-class-11-12',
    title: 'Senior Secondary — Commerce Stream',
    badge: 'Classes 11th & 12th',
    classes: 'Class 11 & Class 12',
    category: 'commerce',
    shortDescription:
      'Excellence in Accountancy, Economics, Business Studies, and Applied Math tailored for aspiring CAs, CSs, and finance professionals.',
    description:
      'A premier commerce curriculum designed to transform theoretical commercial principles into practical analytical skill. We build rock-solid journal and ledger foundations, macroeconomic reasoning, and business case-study solving acumen.',
    subjects: ['Accountancy', 'Economics (Micro, Macro & Indian Economic Dev.)', 'Business Studies', 'Applied Mathematics / Core Math'],
    boards: ['CBSE', 'MP Board', 'ISC'],
    features: [
      'Exhaustive ledger and balance-sheet format drills with speed precision',
      'Case-study workshops with standard evaluation scoring methodologies',
      'Practical business insights, current economic trends analysis, and project assistance',
      'Mock board examinations with detailed constructive feedback',
      'Foundation modules for CA Foundation & CS Executive entrance awareness'
    ],
    duration: '2-Year Integrated / 1-Year Fast Track',
    batchSize: '25 Students / Batch',
    mode: 'Classroom',
    imagePlaceholder: '/images/courses/commerce.jpg'
  },
  {
    id: 'course-cuet',
    slug: 'cuet-preparation',
    title: 'CUET (UG) Comprehensive Preparation',
    badge: 'Class 12th & Droppers',
    classes: 'Class 12th Appearing / Passed',
    category: 'competitive',
    shortDescription:
      'Targeted preparation for Section I (Languages), Section II (Domain Subjects), and Section III (General Test) for Central Universities.',
    description:
      'A specialized test-prep module designed to maximize normalized percentiles for top Central and State universities (DU, BHU, JNU, AU, etc.). Features intense domain revision, general aptitude training, and computer-based test (CBT) simulations.',
    subjects: ['Language (English / Hindi)', 'Domain Subjects (PCM / PCB / Commerce / Humanities)', 'General Test (Quantitative, Logical, GK/CA)'],
    boards: ['National Testing Agency (NTA) Curriculum'],
    features: [
      'Extensive NTA CUET-pattern mock tests with instant percentile benchmarking',
      'Targeted General Aptitude & Logical Reasoning speed training modules',
      'Domain subject NCERT objective question banks with 5000+ MCQs',
      'Negative marking reduction techniques and time management strategies',
      'End-to-end college preference counseling and admission guidance'
    ],
    duration: '4-Month Crash Course / 1-Year Regular',
    batchSize: '30 Students / Batch',
    mode: 'Classroom / Online CBT Labs',
    imagePlaceholder: '/images/courses/cuet.jpg'
  }
];

export const branches: Branch[] = [
  {
    id: 'branch-usha-nagar',
    name: 'Usha Nagar Branch',
    shortName: 'Usha Nagar',
    address: '380-B, Usha Nagar Extension, Behind Kidzee Pre-School',
    landmark: 'Behind Kidzee Pre-School',
    city: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452009',
    phone: '+919302204651',
    displayPhone: '+91 93022 04651',
    email: 'ushanagar@aliveinstitute.in',
    timings: 'Monday to Saturday: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 2:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Alive+Institute+Usha+Nagar+Indore',
    isMain: true
  },
  {
    id: 'branch-airport-road',
    name: 'Airport Road Branch',
    shortName: 'Airport Road',
    address: '13, Vyanktesh Nagar, Above LIC Office, Airport Road',
    landmark: 'Above LIC Office',
    city: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452005',
    phone: '+919752997597',
    displayPhone: '+91 97529 97597',
    email: 'airportroad@aliveinstitute.in',
    timings: 'Monday to Saturday: 8:00 AM – 8:00 PM | Sunday: 9:00 AM – 2:00 PM',
    googleMapsUrl: 'https://maps.google.com/?q=Alive+Institute+Airport+Road+Indore',
    isMain: false
  }
];

export const socialLinks: SocialLink[] = [
  {
    platform: 'instagram',
    label: 'Follow ALIVE Institute on Instagram',
    url: 'https://www.instagram.com/aliveinstituteindore/'
  },
  {
    platform: 'youtube',
    label: 'Subscribe to ALIVE Institute on YouTube',
    url: 'https://www.youtube.com/@aliveinstituteindore'
  },
  {
    platform: 'facebook',
    label: 'Like ALIVE Institute on Facebook',
    url: 'https://www.facebook.com/aliveinstituteindore/'
  }
];

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'Foundation (6th-8th)', href: '/courses#foundation-class-6-8', description: 'Early analytical foundation & Olympiad prep' },
      { label: 'Secondary (9th-10th)', href: '/courses#secondary-class-9-10', description: 'Board examinations & NTSE excellence' },
      { label: 'Science PCM (11th-12th)', href: '/courses#science-pcm-class-11-12', description: 'Physics, Chemistry & Mathematics' },
      { label: 'Science PCB (11th-12th)', href: '/courses#science-pcb-class-11-12', description: 'Physics, Chemistry & Biology' },
      { label: 'Commerce (11th-12th)', href: '/courses#commerce-class-11-12', description: 'Accountancy, Economics & Business Studies' },
      { label: 'CUET Preparation', href: '/courses#cuet-preparation', description: 'Central Universities entrance coaching' }
    ]
  },
  { label: 'About Us', href: '/about' },
  { label: 'Faculty', href: '/faculty' },
  { label: 'Resources', href: '/resources' },
  { label: 'Demo Test', href: '/test' },
  { label: 'Contact', href: '/contact' }
];

export const footerQuickLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Faculty', href: '/faculty' },
  { label: 'Free Study Resources', href: '/resources' },
  { label: 'Online Practice Test', href: '/test' },
  { label: 'Admissions & Enquiry', href: '/contact' }
];

export const facultyDemoData: Faculty[] = [
  {
    id: 'fac-demo-1',
    slug: 'academic-head-mathematics',
    name: 'Academic Head (Mathematics) — Demo Profile',
    designation: 'Senior Faculty & Head of Mathematics',
    subject: 'Mathematics (Secondary & Senior Secondary)',
    department: 'Department of Mathematics',
    experienceYears: 15,
    qualifications: ['M.Sc. Mathematics (Demo)', 'B.Ed (Demo)'],
    bio: 'Renowned for simplifying intricate calculus, trigonometry, and coordinate geometry. Focuses on intuitive concept derivations and board accuracy.',
    isDemo: true,
    isDemoPlaceholder: true
  },
  {
    id: 'fac-demo-2',
    slug: 'senior-faculty-physics',
    name: 'Senior Faculty (Physics) — Demo Profile',
    designation: 'Head of Physics Department',
    subject: 'Physics (Classes 11th & 12th)',
    department: 'Department of Physics',
    experienceYears: 12,
    qualifications: ['M.Sc. Applied Physics (Demo)', 'B.Tech (Demo)'],
    bio: 'Specialist in mechanics and electromagnetism with a demonstrative, real-world experiment approach that demystifies competitive physics concepts.',
    isDemo: true,
    isDemoPlaceholder: true
  },
  {
    id: 'fac-demo-3',
    slug: 'senior-faculty-chemistry',
    name: 'Senior Faculty (Chemistry) — Demo Profile',
    designation: 'Head of Chemistry Department',
    subject: 'Chemistry (Classes 11th & 12th)',
    department: 'Department of Chemistry',
    experienceYears: 11,
    qualifications: ['M.Sc. Organic Chemistry (Demo)', 'CSIR-NET (Demo)'],
    bio: 'Master of organic reaction mechanisms, physical stoichiometry, and NCERT-aligned inorganic memory maps for board and competitive test-takers.',
    isDemo: true,
    isDemoPlaceholder: true
  },
  {
    id: 'fac-demo-4',
    slug: 'senior-faculty-biology',
    name: 'Senior Faculty (Biology) — Demo Profile',
    designation: 'Head of Biology & Life Sciences',
    subject: 'Biology (Classes 9th to 12th)',
    department: 'Department of Biology & Life Sciences',
    experienceYears: 10,
    qualifications: ['M.Sc. Biotechnology (Demo)', 'B.Ed (Demo)'],
    bio: 'Passionate educator who employs visual histology slides, conceptual mnemonics, and extensive NCERT line-by-line analyses.',
    isDemo: true,
    isDemoPlaceholder: true
  },
  {
    id: 'fac-demo-5',
    slug: 'senior-faculty-commerce',
    name: 'Senior Faculty (Commerce & Accounts) — Demo Profile',
    designation: 'Head of Commerce Department',
    subject: 'Accountancy & Financial Studies',
    department: 'Department of Commerce & Finance',
    experienceYears: 13,
    qualifications: ['M.Com (Demo)', 'Chartered Accountancy Inter (Demo)'],
    bio: 'Dedicated mentor bridging textbook accounts with practical corporate auditing and financial statements analysis for 95%+ board scoring.',
    isDemo: true,
    isDemoPlaceholder: true
  },
  {
    id: 'fac-demo-6',
    slug: 'lead-faculty-junior-foundation',
    name: 'Lead Faculty (Junior Foundation) — Demo Profile',
    designation: 'Coordinator, Foundation Wing',
    subject: 'Mathematics & Science (Classes 6th - 8th)',
    department: 'Foundation & Middle School Wing',
    experienceYears: 8,
    qualifications: ['B.Sc. PCM (Demo)', 'B.Ed (Demo)'],
    bio: 'Specialist in junior pedagogy, transforming abstract mathematical fundamentals and scientific queries into curiosity-driven daily exploration.',
    isDemo: true,
    isDemoPlaceholder: true
  }
];

export function getCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getFaculty(): Faculty[] {
  return facultyDemoData;
}

export function getFacultyBySlug(slug: string): Faculty | undefined {
  return facultyDemoData.find((f) => f.slug === slug);
}

export const demoMathTest: Test = {
  id: 'test-class10-math-demo',
  title: 'Class 10 Mathematics Diagnostic Assessment',
  subject: 'Mathematics',
  grade: 'Class 10',
  durationMinutes: 20,
  totalMarks: 40,
  passingMarks: 20,
  instructions: [
    'This test contains 10 objective multiple choice questions.',
    'Each correct answer carries +4 marks.',
    'There is no negative marking in this diagnostic assessment.',
    'Read each mathematical question carefully before choosing an option.',
    'You can review your selected options and instant explanations upon submission.'
  ],
  questions: [
    {
      id: 1,
      question: 'If two positive integers a and b are written as a = x³y² and b = xy³, where x and y are prime numbers, then HCF(a, b) is equal to:',
      options: [
        { key: 'A', text: 'xy' },
        { key: 'B', text: 'xy²' },
        { key: 'C', text: 'x³y³' },
        { key: 'D', text: 'x²y²' }
      ],
      correctAnswer: 'B',
      explanation: 'HCF is the product of the smallest power of each common prime factor involved in the numbers. Smallest power of x is x¹, and smallest power of y is y². Hence, HCF(a, b) = xy².',
      topic: 'Real Numbers',
      difficulty: 'Easy'
    },
    {
      id: 2,
      question: 'If one zero of the quadratic polynomial x² + 3x + k is 2, then what is the value of k?',
      options: [
        { key: 'A', text: '10' },
        { key: 'B', text: '-10' },
        { key: 'C', text: '-7' },
        { key: 'D', text: '-2' }
      ],
      correctAnswer: 'B',
      explanation: 'Since 2 is a zero, substituting x = 2 into P(x) yields 0: (2)² + 3(2) + k = 0 => 4 + 6 + k = 0 => 10 + k = 0 => k = -10.',
      topic: 'Polynomials',
      difficulty: 'Easy'
    },
    {
      id: 3,
      question: 'The pair of linear equations 2x + 3y = 5 and 4x + 6y = 15 has:',
      options: [
        { key: 'A', text: 'A unique solution' },
        { key: 'B', text: 'Infinitely many solutions' },
        { key: 'C', text: 'No solution' },
        { key: 'D', text: 'Exactly two solutions' }
      ],
      correctAnswer: 'C',
      explanation: 'Comparing coefficients: a₁/a₂ = 2/4 = 1/2; b₁/b₂ = 3/6 = 1/2; c₁/c₂ = 5/15 = 1/3. Since a₁/a₂ = b₁/b₂ ≠ c₁/c₂, the lines are parallel and therefore have no solution.',
      topic: 'Pair of Linear Equations in Two Variables',
      difficulty: 'Medium'
    },
    {
      id: 4,
      question: 'Which of the following quadratic equations has real and equal roots?',
      options: [
        { key: 'A', text: 'x² - 4x + 4 = 0' },
        { key: 'B', text: 'x² - 4x - 4 = 0' },
        { key: 'C', text: '2x² - 3x + 5 = 0' },
        { key: 'D', text: 'x² + 5x + 7 = 0' }
      ],
      correctAnswer: 'A',
      explanation: 'For real and equal roots, the discriminant D = b² - 4ac must equal 0. For x² - 4x + 4 = 0: D = (-4)² - 4(1)(4) = 16 - 16 = 0.',
      topic: 'Quadratic Equations',
      difficulty: 'Easy'
    },
    {
      id: 5,
      question: 'The 11th term of the Arithmetic Progression -3, -1/2, 2, ... is:',
      options: [
        { key: 'A', text: '28' },
        { key: 'B', text: '22' },
        { key: 'C', text: '-38' },
        { key: 'D', text: '46/2' }
      ],
      correctAnswer: 'B',
      explanation: 'Here, first term a = -3. Common difference d = (-1/2) - (-3) = 5/2. The 11th term a₁₁ = a + (11 - 1)d = -3 + 10(5/2) = -3 + 25 = 22.',
      topic: 'Arithmetic Progressions',
      difficulty: 'Medium'
    },
    {
      id: 6,
      question: 'If the distance between the points (4, p) and (1, 0) is 5 units, then the value of p is:',
      options: [
        { key: 'A', text: '4 only' },
        { key: 'B', text: '± 4' },
        { key: 'C', text: '-4 only' },
        { key: 'D', text: '0' }
      ],
      correctAnswer: 'B',
      explanation: 'Distance formula: √[(4 - 1)² + (p - 0)²] = 5 => √(3² + p²) = 5 => 9 + p² = 25 => p² = 16 => p = ±4.',
      topic: 'Coordinate Geometry',
      difficulty: 'Medium'
    },
    {
      id: 7,
      question: 'If sin θ + cos θ = √2 cos θ, then the value of (cos θ - sin θ) is:',
      options: [
        { key: 'A', text: '√2 sin θ' },
        { key: 'B', text: 'sin θ' },
        { key: 'C', text: '√3 cos θ' },
        { key: 'D', text: '2 sin θ' }
      ],
      correctAnswer: 'A',
      explanation: 'Given sin θ = (√2 - 1) cos θ. Multiplying both sides by (√2 + 1): (√2 + 1) sin θ = (2 - 1) cos θ = cos θ => √2 sin θ + sin θ = cos θ => cos θ - sin θ = √2 sin θ.',
      topic: 'Introduction to Trigonometry',
      difficulty: 'Hard'
    },
    {
      id: 8,
      question: 'A pole 6 m high casts a shadow 2√3 m long on the ground, then the sun’s elevation angle is:',
      options: [
        { key: 'A', text: '60°' },
        { key: 'B', text: '45°' },
        { key: 'C', text: '30°' },
        { key: 'D', text: '90°' }
      ],
      correctAnswer: 'A',
      explanation: 'tan θ = (Height of pole) / (Length of shadow) = 6 / (2√3) = 3 / √3 = √3. Since tan 60° = √3, the sun’s angle of elevation is 60°.',
      topic: 'Some Applications of Trigonometry',
      difficulty: 'Easy'
    },
    {
      id: 9,
      question: 'From an external point P, tangents PA and PB are drawn to a circle with centre O. If ∠APB = 80°, then ∠POA is equal to:',
      options: [
        { key: 'A', text: '50°' },
        { key: 'B', text: '60°' },
        { key: 'C', text: '70°' },
        { key: 'D', text: '80°' }
      ],
      correctAnswer: 'A',
      explanation: 'In quadrilateral OAPB, radius OA ⊥ PA (∠OAP = 90°) and OB ⊥ PB (∠OBP = 90°). Thus ∠AOB = 180° - 80° = 100°. Since OP bisects ∠AOB, ∠POA = 100° / 2 = 50°.',
      topic: 'Circles',
      difficulty: 'Medium'
    },
    {
      id: 10,
      question: 'If the perimeter and the area of a circle are numerically equal, then the radius of the circle is:',
      options: [
        { key: 'A', text: '2 units' },
        { key: 'B', text: 'π units' },
        { key: 'C', text: '4 units' },
        { key: 'D', text: '7 units' }
      ],
      correctAnswer: 'A',
      explanation: 'Perimeter = 2πr and Area = πr². Given 2πr = πr². Since r > 0, dividing both sides by πr gives r = 2 units.',
      topic: 'Areas Related to Circles',
      difficulty: 'Easy'
    }
  ]
};

export const sampleResources: Resource[] = [
  {
    id: 'res-1',
    title: 'Class 10 Maths Board Formula & Key Theorems Sheet',
    type: 'Formula Sheet',
    classGrade: 'Class 10',
    subject: 'Mathematics',
    description: 'Comprehensive 8-page rapid revision handbook covering all 14 chapters, NCERT proofs, and mensuration formulae.',
    fileSize: '1.4 MB',
    downloadUrl: '#download-formula-sheet',
    updatedAt: '2026-09-15'
  },
  {
    id: 'res-2',
    title: 'Class 12 Physics Electrodynamics & Optics Mind-Maps',
    type: 'Notes',
    classGrade: 'Class 12',
    subject: 'Physics',
    description: 'High-yield conceptual diagrams and step-by-step derivation outlines prepared by ALIVE Senior Physics Faculty.',
    fileSize: '3.8 MB',
    downloadUrl: '#download-physics-notes',
    updatedAt: '2026-09-20'
  },
  {
    id: 'res-3',
    title: 'Class 12 Accountancy Partnership & Shares Solved Model Papers',
    type: 'Sample Paper',
    classGrade: 'Class 12',
    subject: 'Accountancy',
    description: 'Authentic board format mock paper complete with official step-marking criteria and journal solutions.',
    fileSize: '2.1 MB',
    downloadUrl: '#download-accountancy-paper',
    updatedAt: '2026-10-01'
  },
  {
    id: 'res-4',
    title: 'Class 9 Science Term-2 Comprehensive Practice Question Bank',
    type: 'PYQ',
    classGrade: 'Class 9',
    subject: 'Science',
    description: 'Chapter-wise compilation of HOTS (Higher Order Thinking Skills) questions and model answers.',
    fileSize: '2.9 MB',
    downloadUrl: '#download-class9-science',
    updatedAt: '2026-09-28'
  }
];
