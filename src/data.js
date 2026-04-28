// Hero Section
export const heroData = {
  name: "Reyhan Resha Sasmita",
  role: "Fullstack Developer | AI Automation Enthusiast",
  headline: "Building Modern Web Apps and AI-Powered Solutions",
  subtext: "Fullstack Developer experienced in building modern web applications, trading platforms, and AI-powered automation systems.",
  quote: "Code is poetry written in logic",
};

// About Section
export const aboutData = {
  summary: "Fullstack Developer with experience building modern web applications and AI-based systems. Skilled in Next.js, TypeScript, Laravel and Node.js. Experienced developing trading platforms and AI-powered Telegram bots.",
  stats: [
    { label: "Projects Completed", value: "15+", icon: "ri-briefcase-line" },
    { label: "Years Experience", value: "3+", icon: "ri-time-line" },
    { label: "Happy Clients", value: "10+", icon: "ri-user-heart-line" },
  ],
};

// Skills Data - Categorized
export const skillsData = {
  Frontend: [
    { name: "Next.js", icon: "/assets/tools/nextjs.png", color: "white" },
    { name: "React", icon: "/assets/tools/reactjs.png", color: "blue" },
    { name: "TypeScript", icon: "/assets/tools/ts.png", color: "blue" },
    { name: "Tailwind CSS", icon: "/assets/tools/tailwind.png", color: "cyan" },
  ],
  Backend: [
    { name: "Laravel", icon: "/assets/tools/laravel.png", color: "red" },
    { name: "Node.js", icon: "/assets/tools/nodejs.png", color: "green" },
    { name: "Express.js", icon: "/assets/tools/express.png", color: "gray" },
    { name: "PHP", icon: "/assets/tools/php.png", color: "purple" },
  ],
  "AI & Chatbot": [
    { name: "Python", icon: "/assets/tools/python.png", color: "yellow" },
    { name: "OpenClaw", icon: "/assets/tools/openclaw.png", color: "green" },
    { name: "Telegram Bot API", icon: "/assets/tools/telegram.png", color: "blue" },
  ],
  Database: [
    { name: "MySQL", icon: "/assets/tools/mysql.png", color: "blue" },
    { name: "MongoDB", icon: "/assets/tools/mongodb.png", color: "green" },
    { name: "Firebase", icon: "/assets/tools/firebase.png", color: "yellow" },
    { name: "Supabase", icon: "/assets/tools/supabase.png", color: "green" },
  ],
  Tools: [
    { name: "Git", icon: "/assets/tools/git.png", color: "orange" },
    { name: "GitHub", icon: "/assets/tools/github.png", color: "white" },
    { name: "Postman", icon: "/assets/tools/postman.png", color: "orange" },
    { name: "Vercel", icon: "/assets/tools/vercel.png", color: "white" },
    { name: "Laragon", icon: "/assets/tools/laragon.png", color: "green" },
  ],
};

// Projects Data
export const projectsData = [
  {
    id: 1,
    title: "Alpha Gold Society",
    subtitle: "Community Trading Platform",
    fullDescription:
      "A premium community trading platform featuring live XAU/USD charts, real-time trading signals dashboard, and comprehensive market analysis tools. Built with modern web technologies for optimal performance and user experience.",
    tech: ["Next.js", "Tailwind CSS", "Chart.js", "WebSocket"],
    features: [
      "Live XAU/USD chart with real-time updates",
      "Real-time signals dashboard",
      "Community trading insights",
      "Advanced chart indicators",
    ],
    borderColor: "#FFB800",
    gradient: "linear-gradient(145deg, rgba(255, 184, 0, 0.2), rgba(255, 140, 0, 0.05))",
    status: "Live",
    url: "https://github.com/reyhanresha",
    demo: "https://alphagoldsociety.com",
    image: "/assets/proyek/proyek1.webp",
  },
  {
    id: 2,
    title: "AI Telegram Trading Bot",
    subtitle: "Automated Trading Signals",
    fullDescription:
      "An intelligent Telegram bot powered by Python and OpenClaw that provides automated entry, take profit (TP), and stop loss (SL) signals for gold market trading. Features real-time market analysis and price alert automation.",
    tech: ["Python", "OpenClaw", "Telegram Bot API", "TA-Lib"],
    features: [
      "Automated entry, TP, SL signals",
      "Gold market analysis",
      "Price alert automation",
      "24/7 bot monitoring",
    ],
    borderColor: "#FF8C00",
    gradient: "linear-gradient(145deg, rgba(255, 140, 0, 0.2), rgba(255, 184, 0, 0.05))",
    status: "Production",
    url: "https://github.com/reyhanresha",
    image: "/assets/proyek/proyek2.webp",
  },
  {
    id: 3,
    title: "QR Attendance HR System",
    subtitle: "HR Management Platform",
    fullDescription:
      "A comprehensive QR-based attendance web application with complete HR feature modules including employee management, leave requests, and attendance reports. Streamlines the attendance tracking process for organizations.",
    tech: ["HTML", "CSS", "JavaScript", "QR Scanner"],
    features: [
      "QR-based attendance scanning",
      "Employee management module",
      "Leave request system",
      "Attendance reports & analytics",
    ],
    borderColor: "#FFD700",
    gradient: "linear-gradient(145deg, rgba(255, 215, 0, 0.2), rgba(255, 184, 0, 0.05))",
    status: "Completed",
    url: "https://github.com/reyhanresha",
    image: "/assets/proyek/proyek3.webp",
  },
  {
    id: 4,
    title: "Company Profile System",
    subtitle: "Corporate Web Application",
    fullDescription:
      "A Laravel-based CRUD application developed during internship at PT AKA Solusi Teknologi. Features complete content management capabilities for corporate website with admin dashboard.",
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    features: [
      "Full CRUD operations",
      "Admin dashboard",
      "Content management",
      "User authentication",
    ],
    borderColor: "#FFA500",
    gradient: "linear-gradient(145deg, rgba(255, 165, 0, 0.2), rgba(255, 140, 0, 0.05))",
    status: "Completed",
    url: "https://github.com/reyhanresha",
    image: "/assets/proyek/proyek4.webp",
  },
];

// Experience Timeline
export const experienceData = [
  {
    id: 1,
    title: "Fullstack Developer",
    company: "PT Midtou Aryacom Futures",
    period: "2026 - Present",
    type: "Full-time",
    description:
      "Developing trading platforms and financial applications. Building real-time dashboards, implementing trading algorithms, and maintaining high-performance web systems.",
    technologies: ["Next.js", "Laravel", "Node.js", "MySQL"],
  },
  {
    id: 2,
    title: "Blu Ambassador",
    company: "BCA Digital",
    period: "2025 - Present",
    type: "Part-time",
    description:
      "Representing BCA Digital's digital banking services. Promoting digital financial literacy and introducing innovative banking solutions to the community.",
    technologies: ["Digital Banking", "Financial Tech", "Community Building"],
  },
  {
    id: 3,
    title: "Programmer Junior Intern",
    company: "PT AKA Solusi Teknologi",
    period: "2021",
    type: "Internship",
    description:
      "Internship program focused on web development using Laravel framework. Contributed to company profile system development and learned professional software development practices.",
    technologies: ["Laravel", "PHP", "MySQL", "Git"],
  },
];

// Education Data
export const educationData = {
  institution: "CCIT Faculty of Engineering UI",
  degree: "Professional Program Fullstack Developer",
  period: "2022 - Present",
  description:
    "Intensive fullstack developer program covering modern web development technologies, software engineering principles, and practical project development.",
};

// Certifications Data
export const certificationsData = [
  {
    id: 1,
    title: "Laravel Fundamentals",
    issuer: "CCIT FTUI",
    date: "2023",
    credentialId: "CCIT-LAR-2023-001",
    description: "Mastered Laravel framework fundamentals including routing, controllers, models, migrations, and Blade templating.",
    icon: "ri-award-line",
  },
  {
    id: 2,
    title: "REST API with Node.js",
    issuer: "CCIT FTUI",
    date: "2023",
    credentialId: "CCIT-API-2023-002",
    description: "Building scalable RESTful APIs with Node.js, Express.js, and various database integrations.",
    icon: "ri-code-line",
  },
  {
    id: 3,
    title: "Modern Frontend with Next.js",
    issuer: "CCIT FTUI",
    date: "2024",
    credentialId: "CCIT-NXT-2024-003",
    description: "Advanced Next.js concepts including SSR, SSG, API routes, and modern React patterns.",
    icon: "ri-reactjs-line",
  },
  {
    id: 4,
    title: "Data Science Bootcamp",
    issuer: "Various",
    date: "2024",
    credentialId: "DS-BOOT-2024-004",
    description: "Comprehensive data science training covering Python, machine learning basics, and AI applications.",
    icon: "ri-bar-chart-line",
  },
  {
    id: 5,
    title: "Problem Solving & Logical Thinking",
    issuer: "HackerRank",
    date: "2024",
    credentialId: "HS-PROB-2024-005",
    description: "Certified in problem-solving techniques and logical thinking through algorithmic challenges.",
    icon: "ri-brain-line",
  },
];

// Contact Data
export const contactData = {
  email: "reyhanresha87@gmail.com",
  github: "github.com/reyhanresha",
  linkedin: "linkedin.com/in/reyhanresha",
  location: "Jakarta, Indonesia",
  availability: "Open to opportunities",
};

// Social Links
export const socialLinks = {
  github: "https://github.com/reyhanresha",
  linkedin: "https://linkedin.com/in/reyhanresha",
  email: "mailto:reyhanresha87@gmail.com",
  instagram: "https://instagram.com/reyhanresha",
};

// Navigation Links
export const navLinks = [
  { label: "Home", href: "#home", icon: "ri-home-4-line" },
  { label: "About", href: "#about", icon: "ri-user-line" },
  { label: "Skills", href: "#skills", icon: "ri-code-s-slash-line" },
  { label: "Projects", href: "#projects", icon: "ri-folder-line" },
  { label: "Experience", href: "#experience", icon: "ri-briefcase-line" },
  { label: "Certifications", href: "#certifications", icon: "ri-medal-line" },
  { label: "Contact", href: "#contact", icon: "ri-message-line" },
];

// GitHub Stats Placeholder
export const githubStats = {
  username: "reyhanresha",
  contributions: "500+",
  repos: "20+",
  stars: "50+",
};
