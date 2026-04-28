import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiX, FiGithub, FiExternalLink, FiCode, FiCheck } from "react-icons/fi";

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/20 rounded-3xl shadow-2xl shadow-amber-500/10 w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-4 py-1.5 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-amber-400 text-xs font-semibold">
                  {project.status}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 transition-all"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-14rem)]">
              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                <p className="text-amber-400 font-medium">{project.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed mb-8">
                {project.fullDescription}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FiCheck className="text-amber-400" />
                  Key Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50"
                    >
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FiCode className="text-amber-400" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-sm text-amber-400 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-amber-500 to-orange-500 p-4 px-6 rounded-full text-black hover:shadow-lg hover:shadow-amber-500/30 transition-all"
                >
                  <FiGithub />
                  <span>View Source Code</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-zinc-800 p-4 px-6 rounded-full text-white border border-zinc-700 hover:bg-zinc-700 hover:border-amber-500/50 transition-all"
                  >
                    <FiExternalLink />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
