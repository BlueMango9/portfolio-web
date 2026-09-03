import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from '../hooks/useMediaQuery';

// Glowing Geodesic Cloud Sphere Object
const GeodesicCloudCore: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const meshRef = useRef<THREE.Group>(null);
  const outerWireframeRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Generate node positions on an icosahedron
  const nodePositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.4, 2);
    const pos = geo.attributes.position;
    const positions: [number, number, number][] = [];
    for (let i = 0; i < pos.count; i += 3) {
      positions.push([pos.getX(i), pos.getY(i), pos.getZ(i)]);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base slow atmospheric rotation
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.08;

      // Dolly scrub physics
      const targetScale = 1 + scrollProgress * 3.5;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Node emissive pulse
      if (nodesGroupRef.current) {
        nodesGroupRef.current.rotation.y -= delta * 0.25;
      }
    }

    if (outerWireframeRef.current) {
      const material = outerWireframeRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        // Fade wireframe as camera passes through
        material.opacity = Math.max(0.05, 0.7 - scrollProgress * 1.2);
      }
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Geodesic Wireframe Lattice */}
      <mesh ref={outerWireframeRef}>
        <icosahedronGeometry args={[2.4, 2]} />
        <meshBasicMaterial
          color="#00A8E8"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Inner Glowing Holographic Octahedron / Data Core */}
      <mesh ref={innerCoreRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#007EA7"
          emissive="#00A8E8"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Floating Network Nodes */}
      <group ref={nodesGroupRef}>
        {nodePositions.slice(0, 36).map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color={idx % 2 === 0 ? "#00A8E8" : "#FFFFFF"} />
          </mesh>
        ))}
      </group>

      {/* Surrounding Orbital Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[3.2, 3.22, 64]} />
        <meshBasicMaterial color="#007EA7" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <ringGeometry args={[3.6, 3.62, 64]} />
        <meshBasicMaterial color="#00A8E8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// Volumetric Cyber Dust Cloud
const VolumetricDust: React.FC<{ count?: number }> = ({ count = 250 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 1] = (Math.random() - 0.5) * 16;
      coords[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return coords;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles} stride={3}>
      <PointMaterial
        transparent
        color="#00A8E8"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

// Main Scene Controller
interface HeroSceneProps {
  scrollProgress: number;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ scrollProgress }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: isMobile ? 65 : 48 }}
        gl={{ antialias: true, alpha: true }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        <color attach="background" args={['#00171F']} />
        <fog attach="fog" args={['#00171F', 4, 18]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00A8E8" />
        <pointLight position={[-10, -10, -5]} intensity={1.0} color="#007EA7" />

        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
          <GeodesicCloudCore scrollProgress={scrollProgress} />
        </Float>

        <VolumetricDust count={isMobile ? 120 : 320} />
      </Canvas>
    </div>
  );
};
