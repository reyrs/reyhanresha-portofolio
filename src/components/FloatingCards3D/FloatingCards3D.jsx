/* eslint-disable react/no-unknown-property */
'use client';
import { useRef, useState } from 'react';
import useInViewport, { prefersReducedMotion } from '../../hooks/useInViewport';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import './FloatingCards3D.css';

function CodeCard({ position, rotation, color, codeLines }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={meshRef} position={position} rotation={rotation}>
        <RoundedBox
          args={[2.5, 1.8, 0.05]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={hovered ? "#FFB800" : color}
            metalness={0.3}
            roughness={0.4}
            emissive={hovered ? "#FFB800" : "#000000"}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </RoundedBox>
        {/* Code lines */}
        {codeLines.map((line, i) => (
          <Text
            key={i}
            position={[-0.8, 0.6 - i * 0.25, 0.03]}
            fontSize={0.08}
            color="#1a1a2e"
            font="https://fonts.gstatic.com/s/spacemono/v12/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2"
            anchorX="left"
          >
            {line}
          </Text>
        ))}
      </group>
    </Float>
  );
}

function TerminalCard({ position, delay = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position}>
        <RoundedBox args={[2.8, 1.5, 0.05]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1e1e2e" metalness={0.5} roughness={0.3} />
        </RoundedBox>
        {/* Terminal header */}
        <RoundedBox args={[2.6, 0.3, 0.06]} radius={0.05} position={[0, 0.55, 0.01]}>
          <meshStandardMaterial color="#2d2d44" />
        </RoundedBox>
        {/* Terminal dots */}
        {[-0.9, -0.6, -0.3].map((x, i) => (
          <mesh key={i} position={[x, 0.55, 0.04]}>
            <circleGeometry args={[0.05, 16]} />
            <meshStandardMaterial color={i === 0 ? "#ff5f56" : i === 1 ? "#ffbd2e" : "#27c93f"} />
          </mesh>
        ))}
        {/* Terminal content */}
        <Text position={[-1, 0.1, 0.03]} fontSize={0.07} color="#50fa7b" anchorX="left">
          {"$ npm run dev"}
        </Text>
        <Text position={[-1, -0.1, 0.03]} fontSize={0.07} color="#bd93f9" anchorX="left">
          {"✓ Server running"}
        </Text>
        <Text position={[-1, -0.3, 0.03]} fontSize={0.07} color="#8be9fd" anchorX="left">
          {"localhost:3000"}
        </Text>
      </group>
    </Float>
  );
}

function FloatingCodeBlock({ position }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={meshRef} position={position}>
        <RoundedBox args={[3, 2.2, 0.1]} radius={0.15} smoothness={4}>
          <meshStandardMaterial
            color="#0f0f23"
            metalness={0.2}
            roughness={0.8}
            transparent
            opacity={0.9}
          />
        </RoundedBox>
        {/* Code block header */}
        <RoundedBox args={[2.8, 0.35, 0.11]} radius={0.05} position={[0, 0.85, 0.02]}>
          <meshStandardMaterial color="#1a1a2e" />
        </RoundedBox>
        {/* Language tags */}
        {["JS", "TS", "React"].map((tag, i) => (
          <Text
            key={tag}
            position={[-1.1 + i * 0.5, 0.85, 0.06]}
            fontSize={0.08}
            color="#FFB800"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          >
            {tag}
          </Text>
        ))}
        {/* Code lines with colors */}
        <Text position={[-1.2, 0.5, 0.06]} fontSize={0.08} color="#ff79c6" anchorX="left">const</Text>
        <Text position={[-0.6, 0.5, 0.06]} fontSize={0.08} color="#f8f8f2" anchorX="left"> app </Text>
        <Text position={[-0.1, 0.5, 0.06]} fontSize={0.08} color="#ff79c6" anchorX="left">=</Text>
        <Text position={[-1.2, 0.3, 0.06]} fontSize={0.08} color="#f8f8f2" anchorX="left">{'  { name: "Reyhan" }'}</Text>
        <Text position={[-1.2, 0.1, 0.06]} fontSize={0.08} color="#50fa7b" anchorX="left">// Fullstack Dev</Text>
        <Text position={[-1.2, -0.1, 0.06]} fontSize={0.08} color="#8be9fd" anchorX="left">{'<App />'}</Text>
        <Text position={[-1.2, -0.4, 0.06]} fontSize={0.08} color="#bd93f9" anchorX="left">{'export default'}</Text>
        <Text position={[-0.5, -0.4, 0.06]} fontSize={0.08} color="#f8f8f2" anchorX="left"> App;</Text>
        {/* Cursor */}
        <mesh position={[0.3, -0.4, 0.06]}>
          <planeGeometry args={[0.08, 0.4]} />
          <meshBasicMaterial color="#f8f8f2" />
        </mesh>
      </group>
    </Float>
  );
}

export default function FloatingCards3D() {
  const wrapperRef = useRef(null);
  const visible = useInViewport(wrapperRef);
  const animate = visible && !prefersReducedMotion();

  return (
    <div ref={wrapperRef} className="floating-cards-3d">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={animate ? 'always' : 'demand'}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFB800" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#bd93f9" />
        
        <FloatingCodeBlock position={[0, 0, 0]} />
        
        <CodeCard
          position={[-2.5, 1.5, -1]}
          rotation={[0, 0.3, 0]}
          color="#282a36"
          codeLines={["function dev() {", '  return "AI"', "}"]}
        />
        
        <CodeCard
          position={[2.5, -1, -0.5]}
          rotation={[0, -0.2, 0]}
          color="#1a1a2e"
          codeLines={["<Project />", "status: live", "tech: React"]}
        />
        
        <TerminalCard position={[1.5, 2, -1.5]} delay={0.5} />
      </Canvas>
    </div>
  );
}