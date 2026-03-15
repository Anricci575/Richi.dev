import React, { useState, useEffect, useRef } from 'react';
import './LogoLoop.css';

const LogoLoop = ({
  logos = [],
  speed = 100, // Duración en segundos para una vuelta completa (ajustable)
  direction = 'left', // 'left' | 'right'
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0, // 0 para detenerse al pasar el mouse
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#050505' // Debe coincidir con el fondo de tu web
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Duplicamos los logos suficientes veces para cubrir la pantalla y dar efecto infinito
  // (Mínimo 2 sets, pero 4 asegura que no haya huecos en pantallas anchas)
  const displayLogos = [...logos, ...logos, ...logos, ...logos];

  const animationState = isHovered ? 'paused' : 'running';
  
  // Calculamos la duración basada en la cantidad de logos para mantener velocidad constante
  const totalWidthPerc = logos.length * 100; 
  const calculatedDuration = speed; // Usamos el valor directo o una fórmula

  return (
    <div 
      className="logo-loop-wrapper"
      style={{
        '--gap': `${gap}px`,
        '--icon-size': `${logoHeight}px`,
        '--fade-color': fadeOutColor,
        '--anim-duration': `${calculatedDuration}s`,
        '--anim-direction': direction === 'left' ? 'normal' : 'reverse',
        '--anim-state': animationState
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {fadeOut && (
        <>
          <div className="loop-fade fade-left"></div>
          <div className="loop-fade fade-right"></div>
        </>
      )}

      <div className="loop-track">
        {displayLogos.map((logo, index) => (
          <div 
            key={index} 
            className={`loop-item ${scaleOnHover ? 'scale-hover' : ''}`}
          >
            {/* Si es un componente React (icono) */}
            {logo.node && <span className="logo-icon">{logo.node}</span>}
            
            {/* Si es una imagen */}
            {logo.src && (
              <img src={logo.src} alt={logo.alt} style={{ height: logoHeight }} />
            )}
            
            {/* Título opcional debajo o tooltip */}
            {logo.title && <span className="logo-title">{logo.title}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;