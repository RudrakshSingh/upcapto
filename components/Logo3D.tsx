'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function LogoShape() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  
  // Create the intertwined S-shapes like in the logo
  const geometry = useMemo(() => {
    const shapes = []
    
    // Green S-shape (upper-left to center-right)
    const greenCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, 1, 0),
      new THREE.Vector3(-1, 0.5, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, -0.5, 0),
      new THREE.Vector3(2, -1, 0)
    ])
    
    // Blue S-shape (lower-left to center-upper)
    const blueCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2, -1, 0),
      new THREE.Vector3(-1, -0.5, 0),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0.5, 0),
      new THREE.Vector3(2, 1, 0)
    ])
    
    return { greenCurve, blueCurve }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Green S-shape */}
      <mesh position={[0, 0, 0]}>
        <tubeGeometry args={[geometry.greenCurve, 100, 0.1, 8, false]} />
        <meshStandardMaterial 
          color="#66CC33" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#66CC33"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Blue S-shape */}
      <mesh position={[0, 0, 0]}>
        <tubeGeometry args={[geometry.blueCurve, 100, 0.1, 8, false]} />
        <meshStandardMaterial 
          color="#0099CC" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#0099CC"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Central connection point */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#003366" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#003366"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null!)
  
  const particleCount = 100
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#66CC33"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Logo3D() {
  return (
    <div className="w-full h-96 relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#66CC33" />
        <pointLight position={[5, -5, 5]} intensity={0.6} color="#0099CC" />
        <pointLight position={[0, 0, 5]} intensity={0.4} color="#003366" />
        
        <LogoShape />
        <FloatingParticles />
      </Canvas>
    </div>
  )
}
