import React, { useState, useRef, useEffect, useCallback } from "react";
import { profile } from "../data";
import { gsap, reduceMotion } from "../lib/scroll";

export default function InteractiveProfileCard() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const chip1Ref = useRef(null);
  const floatAnimRef = useRef(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragHint, setDragHint] = useState("✦ Drag or hover to move");

  // Drag tracking state
  const dragStartPos = useRef({ x: 0, y: 0 });
  const isPointerDown = useRef(false);
  const isHovered = useRef(false);

  // Smooth floating animation when idle
  const startIdleFloat = useCallback(() => {
    if (reduceMotion || !cardRef.current) return;
    if (floatAnimRef.current) floatAnimRef.current.kill();

    floatAnimRef.current = gsap.to(cardRef.current, {
      y: "-=8",
      rotateZ: 1.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const stopIdleFloat = useCallback(() => {
    if (floatAnimRef.current) {
      floatAnimRef.current.kill();
      floatAnimRef.current = null;
    }
  }, []);

  useEffect(() => {
    startIdleFloat();
    return () => stopIdleFloat();
  }, [startIdleFloat, stopIdleFloat]);

  // Pointer Down (Start dragging)
  const handlePointerDown = (e) => {
    if (reduceMotion || !cardRef.current) return;
    isPointerDown.current = true;
    setIsDragging(true);
    setDragHint("✦ Release to spring back");
    stopIdleFloat();

    dragStartPos.current = {
      x: e.clientX,
      y: e.clientY,
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if pointer capture fails
    }

    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  // Pointer Move (Tilt when hovering, Move when dragging)
  const handlePointerMove = (e) => {
    if (!cardRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    if (isPointerDown.current) {
      // DRAG MODE: Card follows pointer with dynamic physics tilt
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;

      const rotZ = Math.max(-18, Math.min(18, deltaX * 0.08));
      const rotY = (isFlipped ? 180 : 0) + Math.max(-25, Math.min(25, deltaX * 0.12));
      const rotX = Math.max(-25, Math.min(25, -deltaY * 0.12));

      gsap.to(cardRef.current, {
        x: deltaX,
        y: deltaY,
        rotateX: rotX,
        rotateY: rotY,
        rotateZ: rotZ,
        duration: 0.15,
        ease: "power1.out",
        overwrite: "auto",
      });

      // Parallax on floating badge
      if (chip1Ref.current) {
        gsap.to(chip1Ref.current, {
          x: deltaX * 0.2,
          y: deltaY * 0.2,
          duration: 0.2,
        });
      }
    } else {
      // HOVER TILT MODE: 3D perspective tilt & light glare
      isHovered.current = true;
      stopIdleFloat();

      const normX = (e.clientX - centerX) / (rect.width / 2);
      const normY = (e.clientY - centerY) / (rect.height / 2);

      const maxTilt = 16;
      const tiltX = -normY * maxTilt;
      const tiltY = (isFlipped ? 180 : 0) + normX * maxTilt;

      gsap.to(cardRef.current, {
        rotateX: tiltX,
        rotateY: tiltY,
        rotateZ: normX * 2,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Specular light glare reflection
      if (glareRef.current) {
        const posX = ((e.clientX - rect.left) / rect.width) * 100;
        const posY = ((e.clientY - rect.top) / rect.height) * 100;
        gsap.to(glareRef.current, {
          opacity: 0.45,
          background: `radial-gradient(circle 280px at ${posX}% ${posY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
          duration: 0.2,
        });
      }

      // Parallax on floating badge
      if (chip1Ref.current) {
        gsap.to(chip1Ref.current, {
          x: normX * -12,
          y: normY * -12,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    }
  };

  // Pointer Up / End Drag (Elastic Apple Spring back)
  const handlePointerUp = (e) => {
    if (!isPointerDown.current) return;
    isPointerDown.current = false;
    setIsDragging(false);
    setDragHint("✦ Drag or hover to move");

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    if (!cardRef.current) return;

    // Bouncy elastic return
    gsap.to(cardRef.current, {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: isFlipped ? 180 : 0,
      rotateZ: 0,
      scale: isHovered.current ? 1.02 : 1,
      duration: 1.2,
      ease: "elastic.out(1.15, 0.4)",
      onComplete: () => {
        if (!isHovered.current) startIdleFloat();
      },
    });

    if (chip1Ref.current) {
      gsap.to(chip1Ref.current, { x: 0, y: 0, duration: 0.6, ease: "back.out(2)" });
    }
  };

  // Pointer Leave (Smooth reset)
  const handlePointerLeave = () => {
    isHovered.current = false;
    if (isPointerDown.current) return; // still dragging

    if (glareRef.current) {
      gsap.to(glareRef.current, { opacity: 0, duration: 0.5 });
    }

    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: isFlipped ? 180 : 0,
      rotateZ: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      onComplete: () => {
        startIdleFloat();
      },
    });

    if (chip1Ref.current) gsap.to(chip1Ref.current, { x: 0, y: 0, duration: 0.5 });
  };

  // 3D Card Flip Action
  const toggleFlip = (e) => {
    e.stopPropagation();
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);

    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: nextFlipped ? 180 : 0,
      duration: 0.8,
      ease: "power3.inOut",
    });
  };

  // Gyroscope orientation on mobile (tilt phone to tilt card)
  useEffect(() => {
    if (reduceMotion) return;
    const handleOrientation = (e) => {
      if (isHovered.current || isPointerDown.current || !cardRef.current) return;
      const gamma = e.gamma || 0; // Left to right [-90, 90]
      const beta = (e.beta || 0) - 45; // Front to back [-180, 180], normalize for viewing angle
      const rotY = Math.max(-15, Math.min(15, gamma * 0.3)) + (isFlipped ? 180 : 0);
      const rotX = Math.max(-15, Math.min(15, -beta * 0.3));

      gsap.to(cardRef.current, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.5,
        ease: "power1.out",
      });
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isFlipped]);

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-[380px] sm:max-w-[400px] select-none"
      style={{ perspective: "1200px" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      {/* 3D Transformable & Draggable Card Body */}
      <div
        ref={cardRef}
        className={`apple-card relative w-full p-2 transition-shadow duration-300 ${
          isDragging
            ? "cursor-grabbing shadow-[0_35px_70px_rgba(0,0,0,0.22)]"
            : "cursor-grab hover:shadow-[0_25px_60px_rgba(0,0,0,0.14)]"
        }`}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          touchAction: "none",
        }}
      >
        <div
          className="apple-card-inner relative p-2 bg-white overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* FRONT FACE (Photo + Profile details) */}
          <div
            className="relative"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Photo Frame Container */}
            <div className="relative aspect-[4/4.8] w-full overflow-hidden rounded-[20px] bg-[#f5f5f7] border border-black/[0.08]">
              <img
                src={profile.photo}
                alt={profile.name}
                draggable={false}
                className="h-full w-full object-cover object-top transition-transform duration-700 pointer-events-none"
                onError={(e) => {
                  e.currentTarget.src = "/assets/hero-img.webp";
                }}
              />

              {/* Specular glare dynamic reflection */}
              <div
                ref={glareRef}
                className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
              />

              {/* Soft dark vignette gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Overlaid Badge */}
              <div
                className="absolute bottom-4 left-4 right-4 text-white"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold tracking-tight text-white">{profile.name}</p>
                    <p className="font-mono text-xs text-white/80">CCIT, Universitas Indonesia</p>
                  </div>

                  {/* Flip button */}
                  <button
                    type="button"
                    onClick={toggleFlip}
                    title="Flip card for developer specs"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-sm active:scale-90"
                    style={{ transform: "translateZ(35px)" }}
                  >
                    <span className="text-sm font-mono">↺</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Chip: SDET Experience (Elevated in 3D) */}
            <div
              ref={chip1Ref}
              className="absolute -top-3 -right-3 sm:-right-4 rounded-2xl border border-black/10 bg-white/95 px-3.5 py-2 shadow-xl backdrop-blur-xl flex items-center gap-2.5 pointer-events-none"
              style={{ transform: "translateZ(45px)", willChange: "transform" }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-black text-white text-xs">
                🛡️
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#86868b]">Experience</p>
                <p className="text-xs font-semibold text-[#1d1d1f]">SDET @ Bank UOB</p>
              </div>
            </div>
          </div>

          {/* BACK FACE (Interactive Developer ID Pass) */}
          <div
            className="absolute inset-0 p-5 rounded-[22px] bg-[#1d1d1f] text-white flex flex-col justify-between"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">
                    DEV PASS · VERIFIED
                  </span>
                </div>
                <button
                  type="button"
                  onClick={toggleFlip}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/90 hover:bg-white hover:text-black transition-all cursor-pointer text-xs"
                >
                  ↺
                </button>
              </div>

              <div className="mt-4 space-y-3 font-mono text-xs">
                <div>
                  <p className="text-[10px] text-white/50 uppercase">Identity</p>
                  <p className="text-sm font-semibold text-white tracking-wide">{profile.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase">Primary Stack</p>
                  <p className="text-xs text-white/90">React · Next.js · Three.js · Python</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase">Autonomous Systems</p>
                  <p className="text-xs text-white/90">Claude MCP · AI Agents · Automated QA</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase">Alma Mater</p>
                  <p className="text-xs text-white/90">CCIT, Universitas Indonesia</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="font-mono text-[9px] text-white/40 tracking-wider">
                PASSPORT NO: #RR-2026-ID
              </div>
              <span className="font-mono text-[10px] text-emerald-400 font-semibold">
                ● LIVE SYSTEM
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Drag & Interactive Control Cue */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1 font-mono text-[10px] font-medium text-[#6e6e73] shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
          {dragHint}
        </span>
      </div>
    </div>
  );
}
