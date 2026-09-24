/* eslint-disable react/no-unknown-property */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import useInViewport, { prefersReducedMotion } from '../hooks/useInViewport';

function Shape({ type, position, color, size, speed, distort }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <Float speed={speed * 2} rotationIntensity={1.5} floatIntensity={2}>
      <group position={position}>
        {type === 'sphere' && (
          <Sphere ref={meshRef} args={[size, 32, 32]}>
            <MeshDistortMaterial
              color={color}
              speed={speed * 2}
              distort={distort}
              radius={size}
              emissive={color}
              emissiveIntensity={0.2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        )}
        {type === 'box' && (
          <Box ref={meshRef} args={[size, size, size]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.8}
            />
          </Box>
        )}
        {type === 'torus' && (
          <Torus ref={meshRef} args={[size, size * 0.4, 16, 100]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              roughness={0.3}
              metalness={0.8}
            />
          </Torus>
        )}
      </group>
    </Float>
  );
}

export default function Hero3DElements() {
  const wrapperRef = useRef(null);
  const visible = useInViewport(wrapperRef);
  const animate = visible && !prefersReducedMotion();
  const shapes = useMemo(() => [
    { type: 'sphere', position: [-2, 1.5, 0], color: '#FBBF24', size: 0.6, speed: 0.5, distort: 0.4 },
    { type: 'torus', position: [2, -1, 1], color: '#F59E0B', size: 0.4, speed: 0.7, distort: 0 },
    { type: 'box', position: [-1.5, -1.8, -1], color: '#D97706', size: 0.3, speed: 0.4, distort: 0 },
    { type: 'sphere', position: [1.8, 1.2, -1.5], color: '#B45309', size: 0.25, speed: 0.6, distort: 0.6 },
  ], []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={animate ? 'always' : 'demand'}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FBBF24" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D97706" />
        {shapes.map((shape, i) => (
          <Shape key={i} {...shape} />
        ))}
      </Canvas>
    </div>
  );
}
