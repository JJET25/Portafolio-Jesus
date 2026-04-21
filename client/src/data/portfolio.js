export const personal = {
  name: 'Jesus Espinoza',
  monogram: 'JE',
  title: 'Full-Stack Developer & Computer Software Engineer',
  location: 'Mexico City, Mexico',
  phone: '(52) 55 4384 1591',
  email: 'jespinoza2511@hotmail.com',
  photo: '/profile-photo.jpeg',
  cv: '/JesusETCV.pdf',
};

export const social = {
  linkedin: 'https://linkedin.com/in/jesus-espinoza-torruco',
  github: 'https://github.com/JJET25',
  email: `mailto:${personal.email}`,
};

export const copy = {
  heroTagline:
    'Computer Software Engineer building scalable full-stack experiences — from real-time e-commerce platforms to IoT-driven dashboards.',
  about: {
    heading: 'Passionate about building impactful technology',
    paragraphs: [
      "I'm a Full Stack Developer and Embedded Systems Engineer based in Mexico, passionate about creating solutions that bridge the gap between hardware and software. With a strong foundation in both disciplines, I bring a unique perspective to every project.",
      "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or diving deep into the latest advancements in embedded systems and web development.",
    ],
  },
  contactInvite: "Let's build something together.",
};

export const personalTraits = [
  'Problem Solver',
  'Team Player',
  'Continuous Learner',
  'Detail Oriented',
  'Creative Thinker',
  'Self-Motivated',
];

export const stats = [
  { label: 'GPA', value: '96/100' },
  { label: 'IB Grade', value: '32' },
  { label: 'Languages', value: '3' },
  { label: 'Years Full-Stack', value: '2' },
];

export const languages = [
  { name: 'Spanish', level: 'Native', percent: 100 },
  { name: 'English', level: 'C1', percent: 85 },
  { name: 'German', level: 'B1', percent: 55 },
];

export const experience = [
  {
    company: 'Oracle',
    role: 'Software Engineering Intern',
    period: 'Jul 2026 – Dec 2026',
    location: 'Remote · Mexico',
    bullets: [
      'Incoming software engineering intern joining a 6-month program focused on enterprise-grade platform engineering.',
      'Will contribute to core product development, collaborating with senior engineers on scalable cloud services and internal tooling.',
      'Applying strong foundations in data structures, algorithms, and software design to production systems serving global customers.',
    ],
    stack: ['Java', 'SQL', 'Cloud Infrastructure', 'Git'],
  },
  {
    company: 'Gummy Blast',
    role: 'Full Stack Developer',
    period: '2025',
    location: 'Mexico City',
    bullets: [
      'Architected and deployed a full-stack e-commerce platform using React, Node.js, and PostgreSQL.',
      'Integrated Stripe API for secure, high-volume nationwide transactions across Mexico.',
      'Engineered a mobile-first UI/UX, increasing user engagement via responsive design.',
      'Developed an automated inventory management system reducing stock discrepancies by 40%.',
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind'],
  },
  {
    company: 'Soluciones Integrales Lauti SA de CV',
    role: 'Business Analyst',
    period: '2023 – 2024',
    location: 'Mexico City',
    bullets: [
      "Contributed to an internal research project evaluating the company's strategic focus with business analysis tools.",
      'Achieved a positive outcome indicating 50% profitability improvement potential.',
      'Conducted in-depth data analysis to support data-driven decision-making.',
    ],
    stack: ['Excel', 'Data analysis', 'Strategic modeling'],
  },
];

export const projects = [
  {
    slug: 'gummy-blast',
    title: 'Gummy Blast',
    tagline: 'Full-stack e-commerce platform',
    year: '2025',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    summary:
      'Scaled a local brick-and-mortar business into a national digital brand — 0 → 250+ monthly orders with a 4.9/5.0 CSAT.',
    highlights: [
      'Architected and deployed a scalable full-stack e-commerce ecosystem.',
      'Built a custom real-time inventory sync engine with 99.9% data consistency.',
      'Integrated Stripe API with automated webhooks for real-time order status.',
      'Optimized platform performance, scaling 0 → 250+ monthly orders with 4.9/5.0 CSAT.',
    ],
    links: {
      live: 'https://gummyblast.lovable.app/',
      github: null,
    },
    featured: true,
    bento: 'tall',
  },
  {
    slug: 'agrosense',
    title: 'IoT Plant Monitor',
    tagline: 'AgroSense — hardware + cloud',
    year: '2024',
    stack: ['ESP32', 'Arduino', 'MQTT', 'React', 'Node.js'],
    summary:
      'End-to-end IoT environmental monitoring bridging hardware sensors with cloud analytics — cut plant mortality by 80%.',
    highlights: [
      'Architected and deployed an end-to-end IoT monitoring solution using ESP32.',
      'Streamlined real-time telemetry via MQTT with 99.9% uptime across a distributed network.',
      'Engineered low-power firmware with deep-sleep cycles for extended battery life.',
      'Built a responsive dashboard that turned raw telemetry into actionable insights — reducing plant mortality by 80%.',
    ],
    links: {
      live: 'https://smart-grow-monitor.lovable.app/',
      github: null,
    },
    featured: true,
    bento: 'hero',
  },
  {
    slug: 'vertical-wordle',
    title: 'Vertical Wordle',
    tagline: 'Full-stack word game',
    year: '2024',
    stack: ['JavaScript', 'Node.js', 'React'],
    summary:
      'Full-stack vertical variant of Wordle with a dynamic React front-end and Node.js REST API for game logic.',
    highlights: [
      'Designed a dynamic, component-based React front-end.',
      'Built a Node.js REST API for game logic and data management.',
      'Demonstrates full-stack JavaScript, API design, and component architecture.',
    ],
    links: {
      live: 'https://vertical-wordle.onrender.com/',
      github: null,
    },
    bento: 'wide',
  },
  {
    slug: 'ml-movie-rating',
    title: 'ML Movie Rating Predictor',
    tagline: 'Regression + Random Forest',
    year: '2024',
    stack: ['Python', 'Pandas', 'scikit-learn'],
    summary:
      'Predictive ML model for movie ratings combining linear regression and Random Forest.',
    highlights: [
      'Constructed a predictive ML model combining linear regression and Random Forest.',
      'Conducted comprehensive database analysis and preprocessing with Pandas.',
      'Trained and optimized models, evaluating performance across rating distributions.',
    ],
    links: {
      live: 'https://github.com/JJET25',
      github: 'https://github.com/JJET25',
    },
    bento: 'wide',
  },
  {
    slug: 'product-management',
    title: 'Product Management Site',
    tagline: 'Responsive CRUD web app',
    year: '2024',
    stack: ['JavaScript', 'Node.js', 'React'],
    summary:
      'Responsive CRUD web app with user-selectable dark/light mode and adaptive behavior across resolutions.',
    highlights: [
      'Responsive web application for full product management (create, modify, delete).',
      'User-selectable dark/light mode and adaptive layout.',
      'Built with modern JavaScript, Node.js, React, HTML, and CSS.',
    ],
    links: {
      live: 'https://github.com/JJET25',
      github: 'https://github.com/JJET25',
    },
    bento: 'standard',
  },
  {
    slug: 'blackjack-oop',
    title: 'Object-Oriented Blackjack',
    tagline: 'Terminal card game',
    year: '2024',
    stack: ['C++', 'OOP'],
    summary:
      'Fully playable Blackjack engine built on clean OOP principles — deck, hand, player, and dealer as first-class classes.',
    highlights: [
      'Modeled Deck, Card, Hand, Player, and Dealer as cohesive classes with clear responsibilities.',
      'Implemented hit/stand/bust logic, dealer AI, and scoring rules.',
      'Demonstrates encapsulation, composition, and deterministic game-loop design.',
    ],
    links: {
      live: null,
      github: 'https://github.com/JJET25',
    },
    bento: 'slim',
  },
];

export const education = [
  {
    school: 'Tecnológico de Monterrey (ITESM)',
    degree: 'Bachelor of Engineering in Computer Software',
    meta: 'GPA 96/100',
    period: '2024 – Present',
    location: 'Mexico City',
    coursework: [
      'Object-Oriented Programming (Python & C++)',
      'Data Structures & Algorithms',
      'Software Engineering',
      'Web Development',
      'Machine Learning',
      'Data Analytics Bootcamp',
      'Database Systems',
      'Statistics',
    ],
  },
  {
    school: 'Tecnológico de Monterrey (ITESM)',
    degree: 'International Baccalaureate (IB)',
    meta: 'GPA 96/100 · IB Grade 32',
    period: '2021 – 2024',
    location: 'Mexico City',
    coursework: [
      'Physics',
      'Mathematics',
      'Economics',
      'Business & Management',
      'German',
      'Literature',
    ],
  },
];

export const skills = {
  Technical: ['Python', 'C++', 'JavaScript', 'React', 'Node.js', 'PostgreSQL', 'HTML', 'CSS', 'MATLAB', 'Git'],
  Concepts: [
    'Object-Oriented Programming',
    'Algorithm Design',
    'Data Structures',
    'Complexity Analysis',
    'Relational Databases',
  ],
  Personal: ['Analytical Thinking', 'Adaptability', 'Teamwork', 'Communication', 'Problem Solving'],
  Tools: ['VS Code', 'PyCharm', 'Git'],
};

export const leadership = [
  {
    icon: 'Heart',
    title: 'Volunteer Program for Children with Down Syndrome',
    description:
      'Led a team of volunteers to organize creative activities and foster a supportive environment.',
  },
  {
    icon: 'Users',
    title: 'Student Marketplace App',
    description:
      'Managed end-to-end development with a team of developers and designers, overseeing the full project lifecycle.',
  },
  {
    icon: 'Home',
    title: 'Community Housing Initiative',
    description:
      'Planned and executed home construction for low-income communities; managed volunteer coordination, resources, and logistics.',
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
