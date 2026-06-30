import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const AIBot = () => {
  const botRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const rightHandRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    
    if (botRef.current) {
      // Gentle hovering for the whole body
      botRef.current.position.y = Math.sin(t * 2) * 0.15;
      // Slight continuous rotation so we see the bot from cool angles
      botRef.current.rotation.y = Math.sin(t * 0.5) * 0.3;
    }
    
    if (headRef.current) {
      // Head looks around slightly
      headRef.current.rotation.x = Math.sin(t * 1.5) * 0.1;
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.2;
    }
    
    if (leftHandRef.current && rightHandRef.current) {
      // Hands float asynchronously
      leftHandRef.current.position.y = Math.sin(t * 2.5) * 0.15;
      rightHandRef.current.position.y = Math.cos(t * 2.5) * 0.15;
    }

    if (ringRef.current) {
      // Halo rings spin around the bot
      ringRef.current.rotation.y += delta * 0.5;
      ringRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={botRef} position={[0, -0.5, 0]}>
      {/* --- HEAD --- */}
      <group ref={headRef} position={[0, 1.4, 0]}>
        {/* Main Head Sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
        </mesh>
        
        {/* Visor (Dark Glass) */}
        <mesh position={[0, 0.1, 0.6]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.9, 0.4, 0.3]} />
          <meshPhysicalMaterial color="#0f172a" roughness={0.1} metalness={0.8} clearcoat={1} />
        </mesh>
        
        {/* Glowing Eye (Cyan) */}
        <mesh position={[0, 0.1, 0.76]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.4, 0.1]} />
          <meshBasicMaterial color="#0ea5e9" />
        </mesh>

        {/* Ear Antennas */}
        <mesh position={[-0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.15, 0.2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[-0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="#0ea5e9" />
        </mesh>

        <mesh position={[0.75, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.15, 0.2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0.9, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <sphereGeometry args={[0.1]} />
          <meshBasicMaterial color="#0ea5e9" />
        </mesh>
      </group>

      {/* --- BODY --- */}
      <group position={[0, 0, 0]}>
        {/* Neck */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.3]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Core Torso (Pill Shape) */}
        <mesh>
          <cylinderGeometry args={[0.6, 0.5, 1.2, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
        </mesh>
        
        {/* Chest Plate */}
        <mesh position={[0, 0.2, 0.55]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.4, 0.4, 0.2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Glowing Chest Emblem */}
        <mesh position={[0, 0.2, 0.66]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#14b8a6" />
        </mesh>

        {/* Thruster Base */}
        <mesh position={[0, -0.65, 0]}>
          <cylinderGeometry args={[0.4, 0.2, 0.2, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>

        {/* Thruster Flame (Glowing Cone) */}
        <mesh position={[0, -1.2, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.3, 0.9, 16]} />
          <meshBasicMaterial color="#0ea5e9" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* --- HANDS (Floating) --- */}
      {/* Left Hand */}
      <group ref={leftHandRef} position={[-1.2, 0.2, 0.3]} rotation={[0, 0.5, -0.2]}>
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
        </mesh>
        {/* Hand glowing core */}
        <mesh position={[0, 0, 0.2]}>
           <sphereGeometry args={[0.1]} />
           <meshBasicMaterial color="#0ea5e9" />
        </mesh>
      </group>

      {/* Right Hand */}
      <group ref={rightHandRef} position={[1.2, 0.2, 0.3]} rotation={[0, -0.5, 0.2]}>
        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
        </mesh>
        {/* Hand glowing core */}
        <mesh position={[0, 0, 0.2]}>
           <sphereGeometry args={[0.1]} />
           <meshBasicMaterial color="#0ea5e9" />
        </mesh>
      </group>

      {/* --- ORBITING HALO / TECH RINGS --- */}
      <group ref={ringRef} position={[0, 0.5, 0]}>
        <mesh rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.8, 0.02, 16, 64]} />
          <meshBasicMaterial color="#14b8a6" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, Math.PI/4, 0]}>
          <torusGeometry args={[2.2, 0.01, 16, 64]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
        </mesh>
      </group>

    </group>
  );
};

export const ThreeHero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 cursor-grab active:cursor-grabbing">
      {/* Sleek Loading Skeleton / HUD */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 pointer-events-none z-10 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <div className="relative flex flex-col items-center justify-center mt-[-10vh] lg:mt-0">
            <div className="relative flex items-center justify-center w-32 h-32">
                <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-teal-500 animate-spin opacity-50" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-2 rounded-full border-r-2 border-l-2 border-blue-500 animate-spin opacity-40" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-teal-400 to-blue-500 animate-pulse shadow-[0_0_40px_rgba(14,165,233,0.6)]" />
            </div>
            <div className="mt-8 text-slate-400 dark:text-slate-500 text-[10px] font-bold tracking-[0.4em] uppercase animate-pulse">
                Initializing AI Core...
            </div>
        </div>
      </div>

      <Canvas 
        dpr={[1, 1.5]} 
        camera={{ position: [0, 0, 6.5], fov: 45 }} 
        gl={{ alpha: true }}
        onCreated={() => {
            // Small delay to ensure shaders are compiled and painted to screen
            setTimeout(() => setIsLoaded(true), 150);
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#14b8a6" />
        
        <AIBot />
        
        <Stars radius={10} depth={50} count={600} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
};
