// Portfolio Data (Clean Resend / Tech AI Agency Style)
// Ganti foto profil cukup dengan meletakkan file foto Anda di: public/assets/profile-placeholder.jpg

export const profile = {
  name: "Reyhan Resha Sasmita",
  firstName: "Reyhan",
  role: "Fullstack Developer · AI Agent Engineer · SDET",
  headline: "Engineering scalable web platforms, autonomous AI agents, and 3D web experiences with SDET precision.",
  location: "Tangerang Selatan, Indonesia",
  timezone: "Asia/Jakarta",
  email: "reyhanresha87@gmail.com",
  cv: "/assets/Reyhan-Resha-Sasmita-CV.pdf",
  status: "Available for new roles",
  photo: "/assets/profile.jpg",
  photoCaption: "Reyhan Resha Sasmita - Fullstack & AI Agent Engineer",
  builds: [
    "Claude MCP + MT5 trade intelligence",
    "autonomous AI agents (Hermes, KikoClaw)",
    "real-time trading platforms",
    "Three.js 3D web experiences",
    "automated SDET test suites",
  ],
};

export const socials = [
  { label: "GitHub", handle: "reyrs", href: "https://github.com/reyrs" },
  {
    label: "LinkedIn",
    handle: "reyhan-resha-sasmita",
    href: "https://www.linkedin.com/in/reyhan-resha-sasmita-580468243/",
  },
  { label: "Email", handle: "reyhanresha87@gmail.com", href: "mailto:reyhanresha87@gmail.com" },
];

export const about = {
  badge: "About",
  statement:
    "I'm a fullstack developer and IT student at CCIT, Faculty of Engineering, Universitas Indonesia. I build web applications with Next.js, React, Node.js, and Laravel, and AI tools that work with real business data. I currently build internal systems for Berlin188 Garage, and previously built trading tools for PT Midtou Aryacom Futures. Six months as an SDET intern at PT Bank UOB Indonesia taught me to test my work properly before it reaches users.",
  stats: [
    { value: 4, suffix: "+", label: "Web apps running in production" },
    { value: 20, suffix: "+", label: "Paying VIP members on Alpha Gold Society within three months" },
    { value: 20, suffix: "+", label: "Test cases written and run for the UOB TMRW mobile app" },
    { value: 6, suffix: " mo", label: "SDET internship at PT Bank UOB Indonesia" },
  ],
  education: {
    school: "CCIT, Faculty of Engineering, Universitas Indonesia",
    program: "Professional Program in Information Technology (Fullstack Developer)",
    period: "2024 - Present",
    points: [
      "Fullstack web development with Next.js, React, Laravel, Node.js, MySQL, and MongoDB",
      "AI agent development with tool calling and LLM integration (Hermes Agent, KikoClaw, OpenClaw)",
      "REST API design, JWT authentication, Git workflows, and deployment on Vercel",
    ],
  },
};

// Section animasi scroll (wireframe -> laptop -> code -> website). `until` = batas akhir tiap
// scene dalam urutan frame (0-1), mengikuti titik sambung 3 video di public/assets/sequence.
export const buildProcess = {
  label: "From Blueprint to Product",
  steps: [
    {
      id: "blueprint",
      label: "Blueprint",
      lead: "Every idea starts as a",
      key: "blueprint.",
      body: "System architecture, data models, and test plans mapped out before the first commit.",
      until: 0.335,
    },
    {
      id: "code",
      label: "Code",
      lead: "Then it gets",
      key: "written in code.",
      body: "Next.js, React, Laravel, Node.js, and Python, typed, reviewed, and covered by automated tests.",
      until: 0.665,
    },
    {
      id: "product",
      label: "Product",
      lead: "And ships as a",
      key: "real product.",
      body: "Production platforms on Vercel, from real-time trading dashboards to autonomous AI agents.",
      until: 1,
    },
  ],
};

export const stack = [
  {
    group: "AI Agents & Autonomous Systems",
    items: [
      { name: "Claude MCP", icon: "/assets/tools/claude.svg" },
      { name: "MetaTrader 5 (MT5)", icon: "/assets/tools/mt5.svg" },
      { name: "Hermes Agent", icon: "/assets/tools/hermes.svg" },
      { name: "KikoClaw", icon: "/assets/tools/kikoclaw.svg" },
      { name: "OpenClaw", icon: "/assets/tools/ai.png" },
      { name: "Tool Calling", icon: "/assets/tools/ai.png" },
      { name: "Python", icon: "/assets/tools/python.svg" },
      { name: "Telegram Bot API", icon: "/assets/tools/telegram.svg" },
    ],
  },
  {
    group: "Frontend & 3D Web",
    items: [
      { name: "Three.js", icon: "/assets/tools/threejs.svg" },
      { name: "React Three Fiber", icon: "/assets/tools/threejs.svg" },
      { name: "Next.js", icon: "/assets/tools/nextjs.png" },
      { name: "React", icon: "/assets/tools/reactjs.png" },
      { name: "TypeScript", icon: "/assets/tools/ts.png" },
      { name: "Tailwind CSS", icon: "/assets/tools/tailwind.png" },
    ],
  },
  {
    group: "Backend & Systems",
    items: [
      { name: "Node.js", icon: "/assets/tools/nodejs.png" },
      { name: "Express.js", icon: "/assets/tools/express.svg" },
      { name: "Laravel", icon: "/assets/tools/laravel.svg" },
      { name: "PHP", icon: "/assets/tools/php.png" },
    ],
  },
  {
    group: "Database & Cloud",
    items: [
      { name: "MySQL", icon: "/assets/tools/mysql.png" },
      { name: "MongoDB", icon: "/assets/tools/mongodb.svg" },
      { name: "Firebase", icon: "/assets/tools/firebase.png" },
      { name: "Supabase", icon: "/assets/tools/supabase.svg" },
    ],
  },
  {
    group: "DevOps & SDET Quality",
    items: [
      { name: "Postman", icon: "/assets/tools/postman.svg" },
      { name: "Git", icon: "/assets/tools/git.svg" },
      { name: "GitHub", icon: "/assets/tools/github.png" },
      { name: "Vercel", icon: "/assets/tools/vercel.svg" },
      { name: "Laragon", icon: "/assets/tools/laragon.svg" },
    ],
  },
];

export const qaSkills = [
  "Manual Mobile App Testing (iOS / Android)",
  "Test Case Authoring & Execution (~20 End-to-End Cases)",
  "Regression & Sanity Pre-release Testing",
  "JIRA Defect Tracking & Bug Lifecycle",
  "Postman API Validation & Authentication Tests",
  "Agile Scrum & Daily Stand-up Collaboration",
];

export const softSkills = [
  "Autonomous AI Agent Architecture & Prompt Engineering",
  "Analytical Problem Solving & Code Debugging",
  "Effective Technical & Non-Technical Communication",
  "Cross-functional Team & Stakeholder Collaboration",
  "Fast Tech Adaptation & Continuous Learning Mindset",
];

export const projects = [
  {
    id: "berlin188",
    title: "Berlin 188 Garage",
    kind: "European Car Workshop Platform",
    year: "2026",
    summary:
      "Public site for a European car workshop in Tangerang Selatan. The showroom opens like a garage door, the service story follows each car from teardown to handover, and every service ends in a WhatsApp booking.",
    points: [
      "Scroll-driven service anatomy (teardown, inspection, reassembly, diagnosis, handover) told across six European makes",
      "Fourteen services in five groups, each with its own WhatsApp inquiry",
      "Spare-part warehouse with 1,100+ parts, indent requests by VIN photo, and 24-hour towing",
      "Garasi 3D, a service checker, and the Tanya Berlin assistant for visitors",
    ],
    tech: ["React", "TypeScript", "GSAP ScrollTrigger", "Lenis", "Tailwind CSS", "Vercel"],
    demo: "https://www.berlin188.com/",
    image: "/assets/proyek/berlin188.jpg",
    visual: "crud",
  },
  {
    id: "robotshow",
    title: "Robotshow.id",
    kind: "Humanoid Robot Rental Platform",
    year: "2026",
    summary:
      "Rental platform for AgiBot humanoid robots and robodogs at expos, malls, and product launches, complete with operators, delivery, and setup at the venue.",
    points: [
      "Fleet of five robot talents, from Humanoid Momo and Bimo to Robodog Heli, each with its own act and spec sheet",
      "Interactive 3D casting room: rotate the robot 360°, drag limbs, and trigger scripted motions like wave, bow, handshake, and dance",
      "AI concierge that recommends models and answers stage, pricing, and logistics questions",
      "Trilingual content (Indonesian, English, Chinese) with booking and pricelist requests flowing into WhatsApp",
    ],
    tech: ["React", "Vite", "GSAP", "Lenis", "i18n (ID / EN / 中文)", "GitHub Pages"],
    demo: "https://robotshow.id/",
    image: "/assets/proyek/robotshow.jpg",
    visual: "ai",
  },
  {
    id: "waifunova",
    title: "WaifuNova",
    kind: "Anime AI Companion & Art Studio",
    year: "2026",
    summary:
      "Indonesian AI companion studio: pick one of five characters, chat any time, and turn a single sentence into an anime illustration.",
    points: [
      "Five characters with their own voice, habits, and sense of humour: Sakura, Yumi, Aiko, Miku, and Reina",
      "Per-character conversation history that continues the next day, with no sign-up or login",
      "Illustration generator that turns one sentence about hair, outfit, and mood into anime artwork in seconds",
      "Indonesian-first copy with light and dark themes, built on Next.js and deployed on Vercel",
    ],
    tech: ["Next.js", "AI Agents", "Prompt Engineering", "Tailwind CSS", "Vercel"],
    demo: "https://waifunova.vercel.app/",
    image: "/assets/proyek/waifunova.jpg",
    visual: "chat",
  },
  {
    id: "tridakimiasakti",
    title: "PT Trida Kimia Sakti",
    kind: "Agrochemical Profile & Product Catalog",
    year: "2026",
    summary:
      "Profile and product catalogue for a national agrochemical company founded in 2001, covering molluscicides, insecticides, fungicides, and herbicides from planting to harvest.",
    points: [
      "Registered-product catalogue with active ingredients, formulation codes (EC, SL, WP, SC, WG), dosage, and target pests",
      "Guide to reading a product name and safe spraying habits: read the label, wear PPE, measure the dose, store safely",
      "Distribution map across five regions from Aceh to NTT, plus vision, mission, and company history",
      "Trida AI assistant that answers from the official product list, with WhatsApp inquiry CTAs",
    ],
    tech: ["React", "Vite", "GSAP", "Lenis", "i18n (ID / EN / 中文)", "Vercel"],
    demo: "https://tridakimiasakti.com/",
    image: "/assets/proyek/tridakimiasakti.jpg",
    visual: "qr",
  },
];

export const experience = [
  {
    role: "Fullstack Developer",
    company: "Berlin188 Garage",
    place: "Tangerang Selatan, Indonesia",
    period: "Jul 2026 - Present",
    points: [
      "Built the internal workshop dashboard used by seven staff roles (service advisor, cashier, warehouse, mechanic, marketing, manager, owner) to run each work order from vehicle intake and parts estimate to invoice, bay assignment, and payment",
      "Developed stock and purchasing for 1,400+ spare-part SKUs, including supplier orders, payables tracking, cash closing, and daily and profit-and-loss reports for the owner",
      "Added STNK photo scanning with the Gemini API to fill in plate, VIN, and engine numbers at intake, plus A4 print layouts for invoices, estimates, and work orders with PDF and Excel export",
      "Created a separate payroll app for the manager covering weekly and monthly pay, overtime, cash advances, and leave deductions, with locked paid periods, an audit log, and payslips sent over WhatsApp",
      "Designed and built the showroom microsite, with a scroll-driven story for each car make and the 14 workshop services, using GSAP ScrollTrigger and scroll-scrubbed video",
      "Helped build an AI agent that pulls sales and content data from Shopee, Tokopedia, TikTok, and Instagram into one dashboard for the marketing team's analysis",
    ],
    tags: ["React", "TypeScript", "Supabase", "Gemini API", "GSAP", "AI Agents"],
  },
  {
    role: "Software Development Engineer in Test (SDET) Intern",
    company: "PT Bank UOB Indonesia",
    place: "Jakarta, Indonesia",
    period: "Jan 2026 - Jun 2026",
    points: [
      "Conducted extensive manual & regression testing for the flagship UOB TMRW mobile banking application (login, domestic transfers, and transaction history modules)",
      "Formulated and executed over 20 structured test cases from business analyst and regulatory specifications",
      "Logged and tracked software defects in JIRA, re-validating fixes prior to production release cycles",
      "Executed API endpoint verification using Postman (authentication tokens and customer profile endpoints)",
    ],
    tags: ["Manual Testing", "JIRA", "Postman", "Regression Testing", "Fintech QA"],
  },
  {
    role: "Fullstack Developer & AI Engineer",
    company: "PT Midtou Aryacom Futures",
    place: "Jakarta, Indonesia",
    period: "Sep 2025 - Dec 2025",
    points: [
      "Architected a Model Context Protocol (MCP) bridge integrating Claude AI with MetaTrader 5 (MT5), enabling autonomous real-time querying of account metrics, market orders, and candlestick structures",
      "Engineered an automated trade analysis pipeline grounded in datasets from professional traders to evaluate setups, market bias, and risk-to-reward ratios with institutional precision",
      "Architected and deployed the Alpha Gold Society platform (Next.js & Tailwind CSS), scaling to 20+ active VIP paying members with real-time XAU/USD signal distribution",
      "Engineered an autonomous AI Telegram bot with OpenClaw and Python for automated price trigger alerts and instant conversational technical analysis",
    ],
    tags: ["Claude MCP", "MetaTrader 5 (MT5)", "Python", "Next.js", "Trading Datasets", "Vercel"],
  },
  {
    role: "Blu Ambassador",
    company: "BCA Digital",
    place: "Part-time",
    period: "Apr 2025 - Aug 2025",
    points: [
      "Advocated blu digital banking solutions and educated university students on financial literacy and security",
      "Organized onboarding workshops and community initiatives driving user adoption",
    ],
    tags: ["Community", "Digital Banking", "Advocacy"],
  },
  {
    role: "Junior Programmer Intern (Prakerin)",
    company: "PT AKA Solusi Teknologi",
    place: "Tangerang, Indonesia",
    period: "2021",
    points: [
      "Engineered a dynamic Laravel corporate CMS with an authenticated admin panel and database backend",
      "Collaborated with senior engineers to implement UI responsiveness and test database queries",
    ],
    tags: ["Laravel", "PHP", "MySQL", "Web Development"],
  },
];

export const certifications = [
  { title: "AI Developer: Machine Learning for Web Developers", issuer: "Google Cloud", year: "2025" },
  { title: "Three.js & React Three Fiber: 3D Web Development", issuer: "Coursera", year: "2025" },
  { title: "OpenCV & MediaPipe: Computer Vision for Web", issuer: "Coursera", year: "2025" },
  { title: "Node.js: REST API Development & Microservices", issuer: "Udemy", year: "2024" },
  { title: "Laravel Web Development Fundamentals", issuer: "Udemy", year: "2024" },
  { title: "Prakerin Technical Certificate (No. 24/SERT/AKA-1/VI/2021)", issuer: "PT AKA Solusi Teknologi", year: "2021" },
];

export const sections = [
  { id: "about", label: "About" },
  { id: "stack", label: "Tech Stack" },
  { id: "work", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
