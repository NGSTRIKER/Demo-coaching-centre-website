export interface ResourceSection {
  id: string;
  title: string;
  content: string;
}

export interface EducationalResource {
  id: string;
  slug: string;
  title: string;
  subject: string;
  classGrade: string;
  description: string;
  content: string;
  sections: ResourceSection[];
  readTime: string;
  publishedDate: string;
  updatedDate?: string;
  author: {
    name: string;
    role: string;
    department: string;
  };
  tags: string[];
}

export const educationalResources: EducationalResource[] = [
  {
    id: 'res-quad-equations-10',
    slug: 'understanding-quadratic-equations-visual-guide',
    title: 'Understanding Quadratic Equations: A Visual Guide',
    subject: 'Mathematics',
    classGrade: 'Class 10',
    description:
      'Discover the geometric intuition behind the quadratic formula, parabolic curves, discriminant analysis, and step-by-step problem-solving methods for Class 10 Board exams.',
    readTime: '6 min read',
    publishedDate: '2026-09-15',
    updatedDate: '2026-10-02',
    author: {
      name: 'ALIVE Institute Academic Team',
      role: 'Senior Mathematics Faculty',
      department: 'Department of Mathematics'
    },
    tags: ['Class 10', 'CBSE / ICSE / MP Board', 'Algebra', 'Quadratic Equations', 'Board Exam Prep'],
    sections: [
      {
        id: 'standard-form',
        title: '1. Standard Form and Geometric Intuition',
        content: `A quadratic equation in variable $x$ is defined as $ax^2 + bx + c = 0$, where $a, b, c \\in \\mathbb{R}$ and $a \\neq 0$.

When you graph $y = ax^2 + bx + c$, the resulting curve is a **parabola**. If $a > 0$, the parabola opens upward, creating a minimum point (vertex). If $a < 0$, it curves downward. The solutions or **roots** of the equation are simply the points where this parabola crosses the horizontal $x$-axis ($y = 0$).

Visualizing roots as $x$-intercepts turns an abstract algebraic problem into concrete spatial geometry. If the parabola touches the $x$-axis at exactly one point, the roots are real and equal. If it crosses twice, you have two distinct real roots. If it hovers entirely above or below the axis, there are no real roots.`
      },
      {
        id: 'the-discriminant',
        title: '2. The Discriminant: Decoding Root Characteristics',
        content: `The term $D = b^2 - 4ac$ inside the square root of the quadratic formula is called the **discriminant**. It acts as the mathematical fingerprint of the equation:

- **Case 1: $D > 0$**
  The equation possesses two distinct real roots ($x = \\frac{-b \\pm \\sqrt{D}}{2a}$). Graphically, the parabola cuts the $x$-axis at two unique coordinates.

- **Case 2: $D = 0$**
  The equation has two equal real roots ($x = \\frac{-b}{2a}$). The vertex of the parabola rests precisely tangent to the $x$-axis.

- **Case 3: $D < 0$**
  No real roots exist. The roots are complex conjugate numbers, and the graph never touches the $x$-axis.

In board exams, questions frequently ask: *"Find the value of $k$ for which the equation has equal roots."* Remember to equate $D = 0$ immediately, solve for $k$, and verify that $a \\neq 0$.`
      },
      {
        id: 'solving-methods',
        title: '3. Three Solving Methodologies: When to Use Which',
        content: `Class 10 students should master three primary techniques:

1. **Factorization (Splitting the Middle Term):**
   Ideal when integers $p$ and $q$ can be found such that $p + q = b$ and $p \\cdot q = ac$. This is the quickest method for standard textbook problems.

2. **Completing the Square:**
   Transforms $ax^2 + bx + c = 0$ into $(x + p)^2 = q$. This technique provides the foundational proof for the general quadratic formula and is frequently tested in theoretical questions.

3. **The Quadratic Formula (Sridharacharya Formula):**
   $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
   The universal tool. When middle terms are irrational or numbers are large, do not waste time guessing factors. Compute $D$ first, then apply the formula.`
      },
      {
        id: 'board-exam-tips',
        title: '4. Essential Board Exam Presentation Tips',
        content: `Examiners award marks in stages according to official marking rubrics. Avoid common careless errors by adhering to these guidelines:

- **State the Standard Form First:** Always rewrite expressions into $ax^2 + bx + c = 0$ before identifying $a$, $b$, and $c$. Beware of negative signs when $b$ or $c$ are negative.
- **Write the Formula Explicitly:** Writing $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ carries half a mark in board rubrics.
- **Unit & Context Verification:** In word problems (e.g., speed of a train, dimensions of a garden, age calculations), negative values of time, distance, or age must be formally rejected with an explicit written reason.`
      }
    ],
    content: `A comprehensive visual and analytical breakdown of Class 10 Quadratic Equations. Covers standard definitions, parabolic curves, discriminant classification, and rigorous step-by-step methods for scoring full marks in board examinations.`
  },
  {
    id: 'res-org-chemistry-11-12',
    slug: 'mastering-organic-chemistry-key-concepts',
    title: 'Mastering Organic Chemistry: Key Concepts',
    subject: 'Chemistry',
    classGrade: 'Class 11-12',
    description:
      'A structured roadmap to mastering electronic effects, reaction mechanisms, SN1 vs SN2 pathways, and conversions for Class 11-12 CBSE, ISC, and competitive entrance exams.',
    readTime: '8 min read',
    publishedDate: '2026-09-28',
    updatedDate: '2026-10-06',
    author: {
      name: 'ALIVE Institute Academic Team',
      role: 'Senior Chemistry Faculty',
      department: 'Department of Chemistry'
    },
    tags: ['Class 11', 'Class 12', 'Organic Chemistry', 'Reaction Mechanisms', 'CBSE / ISC / NEET'],
    sections: [
      {
        id: 'electronic-effects',
        title: '1. The Four Foundational Electronic Effects',
        content: `Organic chemistry is governed by electron density distribution. Before memorizing named reactions, you must master the fundamental forces driving molecular stability:

- **Inductive Effect (I-Effect):**
  Permanent polarization transmitted through $\\sigma$-bonds due to electronegativity disparities. $+I$ groups (alkyl chains like $-CH_3$, $-C(CH_3)_3$) push electrons, stabilizing carbocations; $-I$ groups (halogens, $-NO_2$, $-CN$) withdraw electrons, increasing carboxylic acid acidity.

- **Resonance / Mesomeric Effect (M / R-Effect):**
  Delocalization of $\\pi$-electrons across conjugated systems. $+M$ groups donate lone pairs into the aromatic ring (e.g., $-OH$, $-NH_2$), directing electrophiles to ortho/para positions. $-M$ groups (e.g., $-NO_2$, $-CHO$) pull electron density, making the ring meta-directing and deactivating.

- **Hyperconjugation:**
  No-bond resonance involving $\\sigma_{C-H}$ overlap with adjacent empty $p$-orbitals. More $\\alpha$-hydrogens correspond directly to increased carbocation and alkene stability.

- **Electromeric Effect (E-Effect):**
  A temporary effect operating in the presence of an attacking reagent across multiple bonds.`
      },
      {
        id: 'nucleophilic-substitution',
        title: '2. Deciphering $S_N1$ vs $S_N2$ Mechanisms',
        content: `A cornerstone of Class 12 Haloalkanes is distinguishing between unimolecular and bimolecular nucleophilic substitution:

| Parameter | $S_N1$ (Unimolecular) | $S_N2$ (Bimolecular) |
|---|---|---|
| **Kinetics** | Rate = $k[R-X]$ (First order) | Rate = $k[R-X][Nu^-]$ (Second order) |
| **Number of Steps** | 2 steps (Carbocation intermediate) | 1 concerted step (Pentacoordinated transition state) |
| **Substrate Reactivity** | $3^\\circ > 2^\\circ > 1^\\circ > CH_3X$ | $CH_3X > 1^\\circ > 2^\\circ > 3^\\circ$ |
| **Stereochemistry** | Racemization (partial inversion) | Complete Walden Inversion |
| **Solvent Type** | Polar Protic ($H_2O$, $CH_3OH$) | Polar Aprotic (Acetone, DMSO, DMF) |
| **Nucleophile Strength** | Weak nucleophiles suffice ($H_2O$, $ROH$) | Strong nucleophiles required ($OH^-$, $CN^-$) |

Recognizing these criteria allows instant prediction of major reaction products without blind rote memorization.`
      },
      {
        id: 'conversions-roadmap',
        title: '3. Strategic Conversions Roadmap',
        content: `Organic synthesis questions in Board exams test your ability to link functional groups logically:

1. **Step-Up Reactions (Adding Carbons):**
   Convert haloalkanes with alcoholic $KCN$ to add a carbon atom, followed by hydrolysis (to form $-COOH$), reduction (to form $-CH_2NH_2$), or Grignard reagent addition ($RMgX$).
2. **Step-Down Reactions (Removing Carbons):**
   Utilize the **Hoffmann Bromamide Degradation** (converting $R-CONH_2$ to $R-NH_2$) or decarboxylation of sodium salts of fatty acids using soda lime ($NaOH + CaO$).
3. **Oxidation Ladder:**
   Primary Alcohol $\\xrightarrow{\\text{PCC}}$ Aldehyde $\\xrightarrow{\\text{KMnO}_4}$ Carboxylic Acid. Secondary Alcohol $\\xrightarrow{\\text{CrO}_3}$ Ketone.`
      },
      {
        id: 'revision-strategy',
        title: '4. How to Revise Organic Chemistry for Top Scores',
        content: `Organic chemistry cannot be crammed the night before the examination. Successful students follow this structured discipline:

- **Create Named Reaction Flashcards:** Maintain a focused register containing the 30 essential named reactions (Aldol, Cannizzaro, Reimer-Tiemann, Kolbe, Sandmeyer, etc.) with their specific reagents and conditions.
- **Trace the Electrons:** Draw curly arrows showing electron movement. Understanding why a nucleophile attacks a carbonyl carbon prevents memory lapses.
- **Solve NCERT In-Text Problems First:** In CBSE and state boards, over 85% of organic questions are drawn directly or adapted slightly from NCERT textbook exercises.`
      }
    ],
    content: `Master organic chemistry concepts for Class 11 and 12: fundamental electronic displacement effects, reaction mechanisms, SN1 vs SN2 comparative breakdown, and conversion strategies.`
  },
  {
    id: 'res-study-techniques',
    slug: 'effective-study-techniques-board-exams',
    title: 'Effective Study Techniques for Board Exams',
    subject: 'Study Tips',
    classGrade: 'Class 10-12',
    description:
      'Scientifically proven learning methods: Active Recall, Spaced Repetition, the Feynman Technique, and strategic exam-hall time management to maximize retention and scores.',
    readTime: '5 min read',
    publishedDate: '2026-10-04',
    updatedDate: '2026-10-10',
    author: {
      name: 'ALIVE Institute Mentorship Cell',
      role: 'Academic Counselor & Student Mentor',
      department: 'Student Development Wing'
    },
    tags: ['Study Skills', 'Exam Strategy', 'Productivity', 'Class 10', 'Class 12', 'Time Management'],
    sections: [
      {
        id: 'active-recall',
        title: '1. Active Recall: Outperforming Passive Reading',
        content: `Most students spend hours highlighting textbooks and re-reading notes. Cognitive science proves this creates the **illusion of competence**—you recognize the material when it is in front of you, but your brain struggles to retrieve it during an exam without prompts.

**Active Recall** forces your brain to retrieve information from memory:
- After reading a chapter or formula sheet, immediately close the book.
- Take a blank sheet of paper and write down everything you remember: formulas, diagrams, definitions, and key dates.
- Check back against the textbook to identify exact knowledge gaps.
- By exerting the effort to retrieve knowledge, neural pathways are reinforced, resulting in durable retention.`
      },
      {
        id: 'spaced-repetition',
        title: '2. Defeating the Forgetting Curve with Spaced Repetition',
        content: `Hermann Ebbinghaus discovered that within 48 hours of learning new material, humans forget nearly 70% of it unless actively reviewed. 

To overcome this, implement the **Spaced Repetition Schedule**:
- **Day 1:** Initial study session and immediate practice questions.
- **Day 3:** Quick 15-minute active recall review (formulas and derivations).
- **Day 7:** Solving past-year questions or targeted chapter quiz.
- **Day 21:** Comprehensive review and mock test integration.

Each spaced review resets the decay curve, transitioning information from fragile short-term working memory into permanent long-term storage.`
      },
      {
        id: 'feynman-technique',
        title: '3. The Feynman Technique for Complex Concepts',
        content: `Named after Nobel laureate Richard Feynman, this four-step model identifies whether you truly understand a concept:

1. **Choose a Concept:** (e.g., Electromagnetic Induction or Photosynthesis).
2. **Teach It to a 10-Year-Old:** Explain the concept aloud or in writing using plain, jargon-free everyday language.
3. **Identify Your Stumble Points:** When you resort to reciting textbook jargon because you cannot explain the mechanism simply, you have found your gap.
4. **Refine and Simplify:** Return to the primary source, clarify the fundamental question, and create a simple intuitive analogy.`
      },
      {
        id: 'exam-hall-strategy',
        title: '4. The 15-Minute Reading Period & Exam Hall Protocol',
        content: `Your performance on exam day relies on strategy just as much as preparation:

- **Utilize the 15-Minute Reading Period:** Do not start mentally solving tough questions. Categorize questions into Tier 1 (instant confidence), Tier 2 (requires methodical calculation), and Tier 3 (complex/tricky).
- **Start with Strength:** Tackle Tier 1 questions first to bank high marks early and dissolve exam anxiety.
- **Reserve 20 Minutes for Auditing:** Never leave the exam early. Re-check calculations, verify question numbers match your answer sheets, and ensure units and graph labels are properly rendered.`
      }
    ],
    content: `Evidence-based study methodologies for board exam preparation. Discover active recall techniques, spaced repetition schedules, the Feynman method, and proven paper-writing habits.`
  },
  {
    id: 'res-coord-geom-10',
    slug: 'introduction-to-coordinate-geometry',
    title: 'Introduction to Coordinate Geometry',
    subject: 'Mathematics',
    classGrade: 'Class 10',
    description:
      'Bridge algebra and geometry: Master Cartesian coordinates, distance formulas, section formulas, centroid coordinates, and step-by-step proofs for Class 10 Board exams.',
    readTime: '7 min read',
    publishedDate: '2026-10-08',
    updatedDate: '2026-10-11',
    author: {
      name: 'ALIVE Institute Academic Team',
      role: 'Senior Mathematics Faculty',
      department: 'Department of Mathematics'
    },
    tags: ['Class 10', 'CBSE / ICSE / MP Board', 'Coordinate Geometry', 'Analytic Geometry', 'Board Exam Prep'],
    sections: [
      {
        id: 'cartesian-plane',
        title: '1. The Cartesian Plane: The Unifying Bridge',
        content: `Coordinate geometry connects algebra and Euclidean geometry by expressing geometric points as ordered pairs $(x, y)$ on a two-dimensional plane.

Invented by René Descartes, this framework allows geometric proofs—such as proving whether four points form a rectangle, rhombus, or square—to be executed purely through numerical calculation without requiring synthetic geometric constructions.`
      },
      {
        id: 'distance-formula',
        title: '2. The Distance Formula & Practical Applications',
        content: `For any two points $P(x_1, y_1)$ and $Q(x_2, y_2)$, the straight-line Euclidean distance between them is given by:

$$d(P, Q) = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

### Derivation Insight:
This is simply the Pythagorean theorem in disguise! If you draw a right-angled triangle with hypotenuse $PQ$, the base length is $|x_2 - x_1|$ and the vertical height is $|y_2 - y_1|$.

### Common Board Applications:
- **Collinearity of Three Points:** Points $A, B, C$ are collinear if and only if $AB + BC = AC$ (assuming $B$ lies between $A$ and $C$).
- **Equidistant Problems:** If point $P(x, y)$ is equidistant from $A(a_1, b_1)$ and $B(a_2, b_2)$, set $PA^2 = PB^2$ to eliminate square roots immediately.`
      },
      {
        id: 'section-formula',
        title: '3. The Section Formula (Internal Division)',
        content: `If point $P(x, y)$ divides the line segment joining $A(x_1, y_1)$ and $B(x_2, y_2)$ internally in the ratio $m_1 : m_2$, the coordinates of $P$ are:

$$x = \\frac{m_1 x_2 + m_2 x_1}{m_1 + m_2}, \\quad y = \\frac{m_1 y_2 + m_2 y_1}{m_1 + m_2}$$

### Special Cases:
- **Midpoint Formula:** When the ratio is $1:1$ ($m_1 = m_2$), the midpoint coordinates simplify to:
  $$M = \\left(\\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2}\\right)$$
- **Finding the Ratio:** When a question asks to find the ratio in which the $y$-axis (or $x$-axis) divides a segment, always assume the ratio to be $k : 1$. Substitute the known coordinate ($x = 0$ for $y$-axis; $y = 0$ for $x$-axis) to solve for $k$ in one step.`
      },
      {
        id: 'centroid-polygon-proofs',
        title: '4. Centroid Coordinates & Geometric Classification',
        content: `The **centroid** $G$ of a triangle whose vertices are $A(x_1, y_1)$, $B(x_2, y_2)$, and $C(x_3, y_3)$ is the concurrent meeting point of its medians, given by:

$$G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\frac{y_1 + y_2 + y_3}{3}\\right)$$

### Quick Decision Tree for 4-Point Quadrilateral Proofs:
1. **Parallelogram:** Midpoint of diagonal $AC$ = Midpoint of diagonal $BD$.
2. **Rectangle:** Parallelogram condition + Length of diagonals $AC = BD$.
3. **Rhombus:** Parallelogram condition + All four sides equal ($AB = BC = CD = DA$).
4. **Square:** Rhombus condition + Equal diagonals ($AC = BD$).

By using the midpoint property of diagonals first, you save significant time compared to calculating four individual side distances!`
      }
    ],
    content: `An in-depth guide to Coordinate Geometry for Class 10. Learn the Cartesian plane, distance formula derivation, internal section formula, triangle centroids, and geometric quadrilateral classification.`
  }
];

export function getResources(): EducationalResource[] {
  return educationalResources;
}

export function getResourceBySlug(slug: string): EducationalResource | undefined {
  return educationalResources.find((r) => r.slug === slug);
}

export function getSubjects(): string[] {
  const subjects = educationalResources.map((r) => r.subject);
  return ['All', ...Array.from(new Set(subjects))];
}
