'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function MorphingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireframeRef = useRef<THREE.LineSegments>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = state.clock.elapsedTime * 0.1
      wireframeRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 32, 32)
    return geo
  }, [])

  return (
    <group>
      {/* Main wireframe sphere */}
      <lineSegments ref={wireframeRef}>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color="#0072CE" opacity={0.4} transparent />
      </lineSegments>
      
      {/* Secondary morphing sphere */}
      <mesh ref={meshRef} scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[2, 16, 16]} />
        <meshBasicMaterial 
          color="#00C48C" 
          wireframe 
          opacity={0.2} 
          transparent 
        />
      </mesh>
    </group>
  )
}

function GlowingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    const colors = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 10 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      
      // Blue to teal gradient colors
      const colorIntensity = Math.random()
      colors[i * 3] = 0.0 + colorIntensity * 0.1 // Blue component
      colors[i * 3 + 1] = 0.45 + colorIntensity * 0.3 // Green component (teal)
      colors[i * 3 + 2] = 0.8 + colorIntensity * 0.2 // Red component (blue)
    }
    
    return [positions, colors]
  }, [])
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <MorphingGlobe />
        <GlowingParticles />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}