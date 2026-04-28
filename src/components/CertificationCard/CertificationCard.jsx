import { motion } from "motion/react";

const CertificationCard = ({ certification }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="cert-card group cursor-pointer"
    >
      {/* Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30 group-hover:border-amber-400 transition-colors">
          <i className={`${certification.icon} text-2xl text-amber-400`}></i>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">
            {certification.title}
          </h4>
          <p className="text-sm text-gray-400">{certification.issuer}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed mb-4">
        {certification.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
        <span className="text-xs text-gray-500">{certification.date}</span>
        <span className="text-xs text-gray-600 font-mono">
          {certification.credentialId}
        </span>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5 rounded-2xl" />
      </div>
    </motion.div>
  );
};

const CertificationsGrid = ({ certifications }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, index) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <CertificationCard certification={cert} />
        </motion.div>
      ))}
    </div>
  );
};

export { CertificationsGrid };
export default CertificationCard;
