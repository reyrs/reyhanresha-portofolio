import { useState, lazy, Suspense } from "react";
import { motion } from "motion/react";

import AnimatedBackground, { GradientOrb } from "./components/AnimatedBackground/AnimatedBackground";
import ExperienceTimeline from "./components/ExperienceTimeline/ExperienceTimeline";
import { CertificationsGrid } from "./components/CertificationCard/CertificationCard";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import CustomCursor from "./components/CustomCursor";

import {
  heroData,
  aboutData,
  skillsData,
  projectsData,
  experienceData,
  educationData,
  certificationsData,
  socialLinks,
} from "./data";

// Three.js scenes are heavy; load them in a separate chunk after first paint
const FloatingCards3D = lazy(() => import("./components/FloatingCards3D/FloatingCards3D"));
const Hero3DElements = lazy(() => import("./components/Hero3DElements"));

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* Custom Animated Cursor */}
      <CustomCursor />

      {/* Animated Background */}
      <AnimatedBackground />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ==================== HERO SECTION ==================== */}
        <section id="home" className="min-h-screen flex items-center pt-20 pb-10 relative">
            {/* 3D Elements for filling the empty space on the left */}
            <Suspense fallback={null}>
              <Hero3DElements />
            </Suspense>

            <div className="w-full flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 glass rounded-full px-5 py-2"
                >
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-gray-300">Available for opportunities</span>
                </motion.div>

                {/* Name */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight relative z-10"
                >
                  <span className="text-white">Hi, I'm </span>
                  <br />
                  <span className="text-gold-gradient">{heroData.name}</span>
                </motion.h1>

                {/* Role */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl md:text-2xl font-medium text-amber-400"
                >
                  {heroData.role}
                </motion.p>

                {/* Headline */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-400 max-w-xl leading-relaxed"
                >
                  {heroData.headline}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap gap-4 pt-4"
                >
                  <a href="#projects" className="btn-primary inline-flex items-center gap-2">
                    <i className="ri-folder-line"></i>
                    View Projects
                  </a>
                  <a href="./assets/CV.pdf" download="Reyhan_Resha_Sasmita_CV.pdf" className="btn-secondary inline-flex items-center gap-2">
                    <i className="ri-download-line"></i>
                    Download CV
                  </a>
                  <a href="#contact" className="btn-secondary inline-flex items-center gap-2">
                    <i className="ri-chat-3-line"></i>
                    Contact Me
                  </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4 pt-4"
                >
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                    <i className="ri-github-fill text-xl"></i>
                  </a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                    <i className="ri-linkedin-fill text-xl"></i>
                  </a>
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-amber-400 hover:border-amber-500/50 transition-all">
                    <i className="ri-instagram-fill text-xl"></i>
                  </a>
                </motion.div>
              </motion.div>

              {/* Right Content - Floating 3D Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hidden lg:flex justify-center items-center relative h-[600px] lg:h-[700px] xl:h-[800px]"
              >
                <GradientOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative w-full h-full">
                  <Suspense fallback={null}>
                    <FloatingCards3D />
                  </Suspense>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
              <div className="flex flex-col items-center gap-2 text-gray-500">
                <span className="text-xs">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-2">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-amber-500"
                  />
                </div>
              </div>
            </motion.div>
        </section>

        {/* ==================== ABOUT SECTION ==================== */}
        <section id="about" className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title mb-6">
                  About <span className="text-gold-gradient">Me</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {aboutData.summary}
                </p>
                <div className="grid grid-cols-3 gap-6">
                  {aboutData.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass rounded-2xl p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                    <i className="ri-graduation-cap-line text-2xl text-amber-400"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{educationData.institution}</h3>
                    <p className="text-amber-400">{educationData.degree}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {educationData.description}
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  <i className="ri-time-line mr-2"></i>
                  {educationData.period}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ==================== SKILLS SECTION ==================== */}
        <section id="skills" className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Tech <span className="text-gold-gradient">Stack</span>
            </h2>
            <p className="section-subtitle text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="space-y-12">
            {Object.entries(skillsData).map(([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-gradient-to-r from-amber-500 to-transparent"></span>
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card rounded-xl p-4 flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-12 h-12 flex items-center justify-center">
                        {skill.icon ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <div className={`${skill.icon ? "hidden" : "flex"} w-12 h-12 bg-zinc-800 rounded-lg items-center justify-center text-amber-400 text-xl`}>
                          <i className="ri-code-line"></i>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-amber-400 transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== PROJECTS SECTION ==================== */}
        <section id="projects" className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Featured <span className="text-gold-gradient">Projects</span>
            </h2>
            <p className="section-subtitle text-gray-400 max-w-2xl mx-auto">
              A selection of projects that showcase my skills in fullstack development and AI automation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleProjectClick(project)}
                className="project-card cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden rounded-t-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-amber-400 text-xs font-medium">
                      {project.status}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-amber-400 text-sm mb-4">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-gray-400">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== EXPERIENCE SECTION ==================== */}
        <section id="experience" className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Work <span className="text-gold-gradient">Experience</span>
            </h2>
            <p className="section-subtitle text-gray-400 max-w-2xl mx-auto">
              My professional journey and career highlights
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <ExperienceTimeline experiences={experienceData} />
          </div>
        </section>

        {/* ==================== CERTIFICATIONS SECTION ==================== */}
        <section id="certifications" className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Certifications & <span className="text-gold-gradient">Achievements</span>
            </h2>
            <p className="section-subtitle text-gray-400 max-w-2xl mx-auto">
              Continuous learning and professional development
            </p>
          </motion.div>
          <CertificationsGrid certifications={certificationsData} />
        </section>

        {/* ==================== CONTACT SECTION ==================== */}
        <section id="contact" className="py-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title mb-4">
              Get In <span className="text-gold-gradient">Touch</span>
            </h2>
            <p className="section-subtitle text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                  <i className="ri-mail-line text-2xl text-amber-400"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <a href="mailto:reyhanresha87@gmail.com" className="text-gray-400 hover:text-amber-400 transition-colors">
                    reyhanresha87@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                  <i className="ri-github-line text-2xl text-amber-400"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-white">GitHub</h4>
                  <a href="https://github.com/reyhanresha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                    github.com/reyhanresha
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                  <i className="ri-linkedin-line text-2xl text-amber-400"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-white">LinkedIn</h4>
                  <a href="https://linkedin.com/in/reyhanresha" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">
                    linkedin.com/in/reyhanresha
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                  <i className="ri-map-pin-line text-2xl text-amber-400"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-400">Jakarta, Indonesia</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <form
                action="https://formsubmit.co/reyhanresha87@gmail.com"
                method="POST"
                className="glass-card rounded-2xl p-8 space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  <i className="ri-send-plane-line mr-2"></i>
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Project Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  );
}

export default App;
