import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const KapiBottle3D: React.FC = () => {
  const bottleGroupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (bottleGroupRef.current) {
      bottleGroupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={bottleGroupRef}>
      {/* 1. Cold Brew Glass Bottle Cylinder */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 2.6, 32]} />
        <meshPhysicalMaterial
          color="#120507"
          roughness={0.08}
          transmission={0.88}
          thickness={1.2}
          ior={1.52}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 2. Rich Dark Velvet Cold Brew Coffee Liquid Core */}
      <mesh ref={liquidRef} position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.84, 0.84, 2.3, 32]} />
        <meshStandardMaterial
          color="#2a080c"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Bottle Shoulder & Neck */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.42, 0.9, 0.5, 32]} />
        <meshPhysicalMaterial
          color="#120507"
          roughness={0.08}
          transmission={0.88}
          thickness={1.2}
          ior={1.52}
          transparent
          opacity={0.85}
        />
      </mesh>
      <mesh position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.35, 32]} />
        <meshPhysicalMaterial
          color="#120507"
          roughness={0.08}
          transmission={0.88}
          thickness={1.2}
          ior={1.52}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* 4. Matte Black Metal Crown Cap */}
      <mesh position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 0.15, 24]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 5. Minimalist Dark Crimson & Gold Editorial Label Band */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.905, 0.905, 1.5, 32, 1, true]} />
        <meshStandardMaterial
          color="#0f0507"
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Crimson Accent Stripe on Label */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.91, 0.91, 0.08, 32, 1, true]} />
        <meshBasicMaterial color="#D90429" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.91, 0.91, 0.08, 32, 1, true]} />
        <meshBasicMaterial color="#D90429" side={THREE.DoubleSide} />
      </mesh>

      {/* 6. Condensation Micro Droplets on Glass */}
      {Array.from({ length: 24 }).map((_, i) => {
        const theta = (i * Math.PI * 2) / 24;
        const y = -1.0 + (i % 6) * 0.4;
        const x = Math.sin(theta) * 0.915;
        const z = Math.cos(theta) * 0.915;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshPhysicalMaterial
              color="#ffffff"
              roughness={0.05}
              transmission={0.95}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export const CoffeeScene: React.FC = () => {
  return (
    <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl bg-gradient-to-b from-[#1c0609]/60 to-[#00171F] border border-rose-900/30 overflow-hidden flex flex-col">
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between pointer-events-none">
        <span className="font-mono text-[10px] text-rose-400 tracking-widest uppercase">
          KÁPI CARTEL 3D PRODUCT LAB
        </span>
        <span className="font-mono text-[10px] text-ds-white/40">
          ORIGIN: CHIKMAGALUR
        </span>
      </div>

      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing" data-cursor-3d>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
          <pointLight position={[-4, 2, -2]} intensity={2.5} color="#D90429" />
          <pointLight position={[3, -2, 2]} intensity={1.5} color="#ff6b6b" />

          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <KapiBottle3D />
          </Float>

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.3}
            rotateSpeed={0.8}
          />
        </Canvas>
      </div>

      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none text-[10px] font-mono text-ds-white/50 border-t border-rose-900/20 pt-2">
        <span className="text-rose-400">DARK VELVET COLD BREW</span>
        <span>DRAG TO ORBIT</span>
      </div>
    </div>
  );
};
