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
  badge: "Background & Engineering Philosophy",
  statement:
    "I'm an IT student at CCIT, Faculty of Engineering, Universitas Indonesia. I engineer fullstack web applications with Next.js, React, Three.js, and Node.js/Laravel, build autonomous AI agent architectures, including integrating Claude via Model Context Protocol (MCP) with MetaTrader 5 (MT5) for professional-grade trade analysis, and apply six months of rigorous mobile banking testing at PT Bank UOB Indonesia. I have shipped real-world production platforms including JagoBrand, BugHunter, WaifuNova, and the Alpha Gold Society trading platform.",
  stats: [
    { value: 4, suffix: "+", label: "Live production web apps shipped on Vercel" },
    { value: 20, suffix: "+", label: "VIP traders onboarded on Alpha Gold Society in 3 months" },
    { value: 20, prefix: "~", label: "End-to-end test cases automated and executed for UOB TMRW" },
    { value: 6, suffix: " mo", label: "Intensive SDET Internship at PT Bank UOB Indonesia" },
  ],
  education: {
    school: "CCIT, Faculty of Engineering, Universitas Indonesia",
    program: "Professional Program in Information Technology (Fullstack Developer)",
    period: "2024 - Present",
    points: [
      "Fullstack web architecture with Next.js, React, Three.js, Laravel/Node.js, MySQL, and MongoDB",
      "Autonomous AI Agent workflows with Hermes Agent, KikoClaw, OpenClaw, tool-calling, and LLM orchestration",
      "Rigorous API design, JWT security, Vercel deployments, and production CI/CD git workflows",
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
    id: "jagobrand",
    title: "JagoBrand",
    kind: "AI Content Copilot & Marketing Agent",
    year: "2025",
    summary:
      "AI-powered content copilot engineered to craft viral copywriting, marketing hooks, and multi-platform social media posts in seconds with intelligent prompt chaining and brand voice tuning.",
    points: [
      "Automated viral hook generation, caption formulation, and targeted brand voice adaptation",
      "Clean interactive dashboard with instant output preview and one-click copy workflows",
      "Engineered with React, Vite, AI Agent prompt orchestration, and Tailwind CSS",
    ],
    tech: ["React", "Vite", "AI Agent / LLMs", "Tailwind CSS", "Vercel"],
    demo: "https://jagobrand.vercel.app/",
    repo: "https://github.com/reyrs",
    image: "/assets/proyek/jagobrand.jpg",
    visual: "ai",
  },
  {
    id: "bughunter",
    title: "BugHunter",
    kind: "Gamified Code QA & Debugging Game",
    year: "2025",
    summary:
      "Interactive speed-debugging web application challenging developers to spot and resolve real-world code defects, syntax errors, and race conditions before the 60-second countdown runs out.",
    points: [
      "Dynamic code snippet inspection across multiple difficulty tiers (Easy, Medium, Hard)",
      "Real-time countdown timer, streak multiplier scoring, and instant diagnostic explanations",
      "Infuses SDET testing rigor into a high-octane gamified developer experience",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "Lucide Icons", "Vercel"],
    demo: "https://bug-hunter-delta.vercel.app/",
    repo: "https://github.com/reyrs",
    image: "/assets/proyek/bughunter.jpg",
    visual: "game",
  },
  {
    id: "waifunova",
    title: "WaifuNova",
    kind: "Anime AI Persona Chat & Art Studio",
    year: "2025",
    summary:
      "Next-gen generative AI companion platform featuring conversational anime character personas, contextual memory handling, and a high-fidelity WaifuArt generation studio.",
    points: [
      "Interactive conversational agent with distinct persona prompts and fast streaming responses",
      "WaifuArt generator engine integrating style controls (Detailed Anime, Manga, Chibi)",
      "Built with Next.js, AI Agent orchestration, Tailwind CSS, and edge deployment",
    ],
    tech: ["Next.js", "AI Agents", "Prompt Engineering", "Tailwind CSS", "Vercel"],
    demo: "https://waifunova.vercel.app/",
    repo: "https://github.com/reyrs",
    image: "/assets/proyek/waifunova.jpg",
    visual: "chat",
  },
  {
    id: "alpha-gold",
    title: "Alpha Gold Society",
    kind: "VIP Gold Trading Community Platform",
    year: "2025",
    summary:
      "A high-speed trading community platform where gold market traders analyze XAU/USD in real-time. Features live candlestick chart streaming, automated breakout indicators, and instant VIP signal alerts.",
    points: [
      "Live interactive TradingView candlestick charts with Bollinger bands & volume profiles",
      "Integrated with Claude MCP & MetaTrader 5 (MT5) to evaluate setups against professional trader datasets",
      "Automated signal distribution system broadcasting entry, TP, and SL targets to community traders",
      "Successfully scaled to 20+ active VIP paying members within the first quarter",
    ],
    tech: ["Next.js", "Claude MCP", "MetaTrader 5", "TradingView API", "Tailwind CSS"],
    demo: "https://alpha-gold-society-kappa.vercel.app/",
    repo: "https://github.com/reyrs/alpha-gold-society",
    image: "/assets/proyek/alphagold.jpg",
    visual: "chart",
  },
  {
    id: "signal-bot",
    title: "AI Telegram Signal Bot",
    kind: "Autonomous Trading Assistant",
    year: "2025",
    summary:
      "Intelligent Telegram bot powered by Python and OpenClaw. Automatically computes entry, take-profit (TP), stop-loss (SL) with risk/reward calculation, and answers ad-hoc market questions via conversational AI.",
    points: [
      "Automated trade signal generation with entry, TP, SL, and risk/reward parameters",
      "Conversational natural language assistant answering daily technical gold analysis",
      "Instant push notifications when price levels hit user-defined trigger zones",
    ],
    tech: ["Python", "OpenClaw", "Telegram Bot API", "AsyncIO"],
    repo: "https://github.com/reyrs",
    image: "/assets/proyek/proyek2.webp",
    visual: "chat",
  },
];

export const experience = [
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
    period: "Sep 2025 - Present",
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
    period: "2025 - Present",
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
