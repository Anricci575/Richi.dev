/* eslint-disable react/no-unknown-property */
'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';

// Ajusta las rutas según tu proyecto
import carnetOscuro from '../assets/carnet-oscuro.png';
import carnetClaro from '../assets/carnet-claro.png';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ theme = 'dark', customImage = null }) {
  // === LÓGICA DE AUTO-CIERRE (10 SEGUNDOS) ===
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 9000);
    const closeTimer = setTimeout(() => setIsVisible(false), 10000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 9999,
      pointerEvents: 'none',
      transition: 'opacity 1s ease-in-out',
      opacity: isFading ? 0 : 1
    }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 25 }}
        gl={{ alpha: true, antialias: true }}
        style={{ pointerEvents: 'auto' }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[5, 5, 5]} intensity={2} />

        <Physics gravity={[0, -20, 0]} timeStep={1/60}>
          <Band theme={theme} customImage={customImage} />
        </Physics>
      </Canvas>
    </div>
  );
}

function Band({ theme, customImage }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const texture = useTexture(customImage || (theme === 'dark' ? carnetOscuro : carnetClaro));
  const [dragged, setDragged] = useState(false);
  const [dragOffset, setDragOffset] = useState(new THREE.Vector3());

  // Punto de anclaje fijo
  const anchorX = 8.0; 
  const anchorY = 5;

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]));

  // --- LAS MATEMÁTICAS CORREGIDAS ---
  // Hacemos que la cuerda mida exactamente 1 unidad de largo entre cada eslabón
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  
  // El gancho se agarra 1.8 unidades por encima del centro del carnet
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.8, 0]]);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetPoint = new THREE.Vector3();
    e.ray.intersectPlane(plane, targetPoint);
    if (!targetPoint) return;

    const cardPos = card.current.translation();
    setDragOffset(new THREE.Vector3().subVectors(targetPoint, cardPos));
    setDragged(true);
    [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
  };

  useFrame((state) => {
    if (dragged && card.current) {
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const targetPoint = new THREE.Vector3();
      state.raycaster.ray.intersectPlane(plane, targetPoint);
      if (targetPoint) {
        card.current.setNextKinematicTranslation(targetPoint.clone().sub(dragOffset));
      }
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));

      const angVel = card.current.angvel();
      const rot = card.current.rotation();
      card.current.setAngvel({
        x: angVel.x * 0.9,
        y: (angVel.y - rot.y * 0.15) * 0.9,
        z: angVel.z * 0.9
      });
    }
  });

  // Alta amortiguación para evitar rebotes salvajes
  const segmentProps = { linearDamping: 2, angularDamping: 2, colliders: false, canSleep: true, mass: 0.5 };

  return (
    <>
      <group position={[anchorX, anchorY, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        
        {/* Posiciones iniciales separadas EXACTAMENTE por 1 unidad de distancia */}
        <RigidBody position={[0, -1, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.08]} /></RigidBody>
        <RigidBody position={[0, -2, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.08]} /></RigidBody>
        <RigidBody position={[0, -3, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.08]} /></RigidBody>

        {/* El carnet nace exactamente a 1.8 unidades de j3 (-3 - 1.8 = -4.8) */}
        <RigidBody
          ref={card}
          position={[0, -4.8, 0]}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          colliders={false}
          linearDamping={2} 
          angularDamping={2}
          mass={1.5}
          onPointerDown={handlePointerDown}
          onPointerUp={() => setDragged(false)}
        >
          <CuboidCollider args={[0.8, 1.1, 0.05]} />
          <mesh scale={[1.6, 2.2, 0.05]}>
            <boxGeometry />
            <meshStandardMaterial map={texture} roughness={0.3} transparent opacity={0.95} />
          </mesh>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" lineWidth={0.05} transparent opacity={0.6} />
      </mesh>
    </>
  );
}