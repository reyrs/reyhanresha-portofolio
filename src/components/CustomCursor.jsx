import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

// Only for precise pointers (mouse/trackpad). Touch devices keep the native cursor.
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(FINE_POINTER_QUERY).matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  
  // Spring configurations for smooth trailing effect
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  const dotX = useSpring(0, { stiffness: 1000, damping: 40 });
  const dotY = useSpring(0, { stiffness: 1000, damping: 40 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      // Check if the element is clickable
      const target = e.target;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.project-card');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled, mouseX, mouseY, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <style>{`
        body, a, button, .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
      
      {/* Trailing Ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-8 h-8 border border-amber-500 rounded-full pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        animate={{
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? "rgba(245, 158, 11, 0.3)" : "rgba(245, 158, 11, 0)",
          borderColor: isHovering ? "rgba(245, 158, 11, 0.8)" : "rgba(245, 158, 11, 0.5)",
        }}
      />

      {/* Center Dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-amber-500 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
