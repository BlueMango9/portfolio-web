import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, Moon, Sun, RotateCw, Eye } from 'lucide-react';

interface Watch3DProps {
  isLumeMode: boolean;
  isSkeletonMode: boolean;
}

const MechanicalMovement3D: React.FC<Watch3DProps> = ({ isLumeMode, isSkeletonMode }) => {
  const watchGroupRef = useRef<THREE.Group>(null);
  const balanceWheelRef = useRef<THREE.Group>(null);
  const secondsHandRef = useRef<THREE.Mesh>(null);
  const minutesHandRef = useRef<THREE.Mesh>(null);
  const hoursHandRef = useRef<THREE.Mesh>(null);
  const escapeGearRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Oscillating balance wheel (28,800 vph / 4Hz simulation)
    if (balanceWheelRef.current) {
      balanceWheelRef.current.rotation.z = Math.sin(Date.now() * 0.02) * 0.45;
    }

    // Rotating escapement gear
    if (escapeGearRef.current) {
      escapeGearRef.current.rotation.z += delta * 2.8;
    }

    // Sweeping second hand (High beat mechanical smooth sweep)
    if (secondsHandRef.current) {
      secondsHandRef.current.rotation.z -= delta * (Math.PI * 2 / 60) * 8; // Accelerated demo sweep
    }

    // Minute hand
    if (minutesHandRef.current) {
      minutesHandRef.current.rotation.z -= delta * 0.05;
    }

    // Hour hand
    if (hoursHandRef.current) {
      hoursHandRef.current.rotation.z -= delta * 0.008;
    }
  });

  return (
    <group ref={watchGroupRef}>
      {/* 1. Brushed Stainless Steel 316L Case & Bezel (Tissot PRX / Roger Dubuis integrated style) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.4, 48]} />
        <meshStandardMaterial
          color={isLumeMode ? "#0f172a" : "#94a3b8"}
          metalness={0.92}
          roughness={0.2}
        />
      </mesh>

      {/* Fluted / Polished Bezel Ring */}
      <mesh position={[0, 0, 0.22]}>
        <ringGeometry args={[1.9, 2.25, 48]} />
        <meshStandardMaterial
          color={isLumeMode ? "#1e293b" : "#cbd5e1"}
          metalness={0.96}
          roughness={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Tactile Knurled Crown at 3 o'clock */}
      <mesh position={[2.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.35, 24]} />
        <meshStandardMaterial color="#64748b" metalness={0.95} roughness={0.3} />
      </mesh>

      {/* 3. Dial Plate / Skeleton Dial */}
      <mesh position={[0, 0, 0.2]}>
        <circleGeometry args={[1.88, 48]} />
        <meshStandardMaterial
          color={isSkeletonMode ? "#020617" : "#00171F"}
          metalness={0.8}
          roughness={0.4}
          opacity={isSkeletonMode ? 0.35 : 0.95}
          transparent
        />
      </mesh>

      {/* 4. Skeleton Mechanical Gear Train (Visible in skeleton mode) */}
      <group position={[0, 0, 0.1]}>
        {/* Main Spring Barrel */}
        <mesh position={[-0.6, 0.5, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.88} roughness={0.25} />
        </mesh>

        {/* Center Wheel */}
        <mesh position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.45, 0.45, 0.04, 24]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.92} roughness={0.2} />
        </mesh>

        {/* Escapement Wheel with teeth */}
        <mesh ref={escapeGearRef} position={[0.55, -0.4, 0.04]}>
          <cylinderGeometry args={[0.32, 0.32, 0.04, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.15} />
        </mesh>

        {/* Balance Wheel with Screws */}
        <group ref={balanceWheelRef} position={[0.3, -0.7, 0.06]}>
          <mesh>
            <torusGeometry args={[0.42, 0.035, 12, 32]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Synthetic Ruby Jewel Bearing */}
          <mesh position={[0, 0, 0.03]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#e11d48" roughness={0.1} transparent opacity={0.9} />
          </mesh>
        </group>
      </group>

      {/* 5. Luminous Super-LumiNova Hour Indices (12 to 11) */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const radius = 1.6;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;
        const isCardinal = i % 3 === 0;

        return (
          <group key={i} position={[x, y, 0.22]} rotation={[0, 0, -angle]}>
            <mesh>
              <boxGeometry args={[isCardinal ? 0.09 : 0.06, isCardinal ? 0.25 : 0.16, 0.03]} />
              <meshStandardMaterial
                color={isLumeMode ? "#22c55e" : "#00A8E8"}
                emissive={isLumeMode ? "#22c55e" : "#00A8E8"}
                emissiveIntensity={isLumeMode ? 3.0 : 0.8}
              />
            </mesh>
          </group>
        );
      })}

      {/* 6. Hand Stack (Hours, Minutes, Sweeping Seconds) */}
      <group position={[0, 0, 0.25]}>
        {/* Hour Hand */}
        <mesh ref={hoursHandRef} position={[0, 0, 0.01]}>
          <boxGeometry args={[0.09, 0.9, 0.02]} />
          <meshStandardMaterial
            color={isLumeMode ? "#22c55e" : "#f8fafc"}
            emissive={isLumeMode ? "#22c55e" : "#007EA7"}
            emissiveIntensity={isLumeMode ? 2.5 : 0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Minute Hand */}
        <mesh ref={minutesHandRef} position={[0, 0, 0.03]}>
          <boxGeometry args={[0.07, 1.4, 0.02]} />
          <meshStandardMaterial
            color={isLumeMode ? "#22c55e" : "#f8fafc"}
            emissive={isLumeMode ? "#22c55e" : "#007EA7"}
            emissiveIntensity={isLumeMode ? 2.5 : 0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Seconds Hand (Electric Cyan Needle with counterweight) */}
        <mesh ref={secondsHandRef} position={[0, 0, 0.05]}>
          <boxGeometry args={[0.03, 1.7, 0.02]} />
          <meshStandardMaterial
            color="#00A8E8"
            emissive="#00A8E8"
            emissiveIntensity={1.8}
          />
        </mesh>

        {/* Center Pinion Cap */}
        <mesh position={[0, 0, 0.07]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 7. Curved Sapphire Crystal Reflection Overlay */}
      <mesh position={[0, 0, 0.32]}>
        <cylinderGeometry args={[1.9, 1.9, 0.03, 32]} />
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.92}
          thickness={0.6}
          ior={1.77} // Sapphire refractive index
          transparent
          opacity={0.3}
          color="#00A8E8"
        />
      </mesh>
    </group>
  );
};

export const WatchScene: React.FC = () => {
  const [isLumeMode, setIsLumeMode] = useState<boolean>(false);
  const [isSkeletonMode, setIsSkeletonMode] = useState<boolean>(true);

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl bg-ds-deep/20 border border-ds-sky/20 overflow-hidden flex flex-col">
      {/* Horology Inspector Interactive Controls Bar */}
      <div className="absolute top-4 inset-x-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-sky opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-sky"></span>
          </span>
          <span className="font-mono text-[11px] font-bold text-ds-white tracking-wider uppercase">
            CALIBRE 28,800 VPH // REGULATED
          </span>
        </div>

        <div className="flex items-center gap-1.5 bg-ds-abyss/80 border border-ds-sky/30 rounded-full p-1 backdrop-blur-xl">
          <button
            onClick={() => setIsLumeMode(!isLumeMode)}
            data-cursor="button"
            data-cursor-text="LUME"
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 transition-all ${
              isLumeMode
                ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-300 shadow-glow-subtle'
                : 'text-ds-white/60 hover:text-ds-white'
            }`}
          >
            {isLumeMode ? <Moon className="w-3 h-3 text-emerald-400" /> : <Sun className="w-3 h-3" />}
            <span>SUPER-LUMINOVA</span>
          </button>

          <button
            onClick={() => setIsSkeletonMode(!isSkeletonMode)}
            data-cursor="button"
            data-cursor-text="SKELETON"
            className={`px-2.5 py-1 rounded-full text-[10px] font-mono flex items-center gap-1 transition-all ${
              isSkeletonMode
                ? 'bg-ds-sky/30 border border-ds-sky text-ds-sky shadow-glow-subtle'
                : 'text-ds-white/60 hover:text-ds-white'
            }`}
          >
            <Eye className="w-3 h-3 text-ds-sky" />
            <span>SKELETON</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing" data-cursor-3d>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={isLumeMode ? 0.2 : 0.8} />
          <directionalLight position={[5, 5, 5]} intensity={isLumeMode ? 0.4 : 1.8} color="#ffffff" />
          <pointLight position={[-4, -4, 2]} intensity={1.2} color="#00A8E8" />
          <pointLight position={[3, -2, 4]} intensity={0.9} color="#007EA7" />

          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <MechanicalMovement3D isLumeMode={isLumeMode} isSkeletonMode={isSkeletonMode} />
          </Float>

          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
            rotateSpeed={0.8}
          />
        </Canvas>
      </div>

      {/* Bottom Telemetry Scaffolding */}
      <div className="absolute bottom-3 inset-x-4 flex items-center justify-between pointer-events-none text-[10px] font-mono text-ds-white/50 border-t border-ds-sky/10 pt-2">
        <span>TISSOT PRX &amp; ROGER DUBUIS SKELETON SPEC</span>
        <span className="text-emerald-400">RATE DEVIATION: +0.1 SEC/DAY</span>
      </div>
    </div>
  );
};
