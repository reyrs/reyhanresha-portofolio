import { motion } from "motion/react";

const ExperienceTimeline = ({ experiences }) => {
  return (
    <div className="relative">
      {experiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="timeline-item mb-12 last:mb-0"
        >
          <div className="glass-card rounded-2xl p-6 ml-4">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                <p className="text-gold-gradient font-semibold">{exp.company}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-gray-400">{exp.period}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    exp.type === "Full-time"
                      ? "bg-green-500/20 text-green-400"
                      : exp.type === "Part-time"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {exp.type}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {exp.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 rounded-full text-xs text-gray-300 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
