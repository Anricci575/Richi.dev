import React, { useState, useEffect, Suspense } from 'react';
import BlurText from './components/BlurText'; 
import Shuffle from './components/Shuffle'; 
import DecryptedText from './components/DecryptedText'; 
import LogoLoop from './components/LogoLoop';
import FaultyTerminal from './components/FaultyTerminal';
import Lanyard from './components/Lanyard';

// (El componente Dither está comentado por si lo quieres agregar luego)
// import Dither from './components/Dither'; 

// 1. IMPORTAR LOS ICONOS
import { FaSun, FaMoon, FaIdBadge, FaIdCard, FaInstagram, FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { SiReact, SiVuedotjs, SiNodedotjs, SiExpress, SiMysql, SiTailwindcss, SiPython, SiFigma } from 'react-icons/si';

// 2. IMPORTAR LAS IMÁGENES
import carnetOscuro from './assets/carnet-oscuro.png';
import carnetClaro from './assets/carnet-claro.png';
import carnetLanyard from './assets/carnet-oscuro.png'; 

import './App.css';

// 3. IMPORTAR EL PANEL DE CONFIGURACIÓN MAESTRO
import { siteConfig } from './config';

function App() {
  // === ESTADOS: TEMA Y VISIBILIDAD ===
  const [theme, setTheme] = useState('dark');
  const [showIdCard, setShowIdCard] = useState(false); // Carnet HUD (2D)
  
  // El Lanyard inicia según lo que diga el config.js
  const [showLanyard, setShowLanyard] = useState(
    siteConfig.components?.lanyard3D && siteConfig.lanyardConfig?.autoInicio
  ); 

  // --- LÓGICA DE TEMA ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // --- LÓGICA DE AUTO-APAGADO DEL LANYARD (Basada en config) ---
  useEffect(() => {
    if (showLanyard && siteConfig.lanyardConfig?.autoInicio) {
      const timer = setTimeout(() => {
        setShowLanyard(false);
      }, siteConfig.lanyardConfig.duracionPantalla); 

      return () => clearTimeout(timer);
    }
  }, [showLanyard]); // Escucha si showLanyard cambia

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const techLogos = [
    { node: <SiReact />, title: "React", href: "#" },
    { node: <SiVuedotjs />, title: "Vue.js", href: "#" },
    { node: <SiNodedotjs />, title: "Node.js", href: "#" },
    { node: <SiExpress />, title: "Express", href: "#" },
    { node: <SiMysql />, title: "MySQL", href: "#" },
    { node: <SiTailwindcss />, title: "Tailwind", href: "#" },
    { node: <SiPython />, title: "Python", href: "#" },
    { node: <SiFigma />, title: "UI/UX", href: "#" },
  ];

  return (
    <div className="portfolio-container futurist-hud">
      
      {/* --- Capa de decoración --- */}
      <div className="screen-overlay"></div>

      {/* --- ELEMENTOS DECORATIVOS HUD --- */}
      <div className="hud-corner top-left"></div>
      <div className="hud-corner top-right"></div>
      <div className="hud-corner bottom-left"></div>
      <div className="hud-corner bottom-right"></div>
      
      <div className="hud-scanline-v left"></div>
      <div className="hud-scanline-v right"></div>

      {/* ========================================================= */}
      {/* --- CARNET ID HUD (RENDERIZADO CONDICIONAL POR CONFIG) --- */}
      {/* ========================================================= */}
      {siteConfig.components?.carnet2DHUD && (
        <div className={`id-card-hud-image ${showIdCard ? 'active' : ''}`}>
          <img 
            src={theme === 'dark' ? carnetOscuro : carnetClaro} 
            alt="Identificación Andrés Ricci HUD" 
            className="id-image-content"
          />
          <div className="id-card-glow"></div>
        </div>
      )}

      {/* ========================================================= */}
      {/* --- LANYARD 3D (RENDERIZADO CONDICIONAL POR CONFIG) --- */}
      {/* ========================================================= */}
      {siteConfig.components?.lanyard3D && showLanyard && (
        <div className="lanyard-hud-container active" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',  
          height: '100vh',
          zIndex: 9999,    
          pointerEvents: 'none', 
          overflow: 'visible'
        }}>
          <Suspense fallback={null}>
            <Lanyard 
              key="auto-lanyard"
              theme={theme} 
              customImage={carnetLanyard} 
            />
          </Suspense>
        </div>
      )}
      {/* ========================================================= */}

      {/* --- NAVEGACIÓN --- */}
      <nav className="navbar">
        <div className="nav-container">
          
          <div className="logo">
            {/* COMPONENTE: Shuffle */}
            {siteConfig.components?.shuffleLogo ? (
              <Shuffle
                text="RICHI.DEV"
                shuffleDirection="right"
                duration={0.35}
                stagger={0.05}
                triggerOnHover={true}
              />
            ) : (
              <span>RICHI.DEV</span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <ul className="nav-links">
              {siteConfig.sections?.hero && <li><a href="#inicio">/// INICIO</a></li>}
              {siteConfig.sections?.skills && <li><a href="#habilidades">/// SKILLS</a></li>}
              {siteConfig.sections?.projects && <li><a href="#proyectos">/// PROYECTOS</a></li>}
              {siteConfig.sections?.contact && <li><a href="#contacto">/// CONTACTO</a></li>}
            </ul>

            {/* BOTÓN 1: Carnet HUD 2D (Ocultable por config) */}
            {siteConfig.components?.carnet2DHUD && (
              <button 
                onClick={() => { setShowIdCard(!showIdCard); setShowLanyard(false); }} 
                className={`id-toggle-btn ${showIdCard ? 'active' : ''}`} 
                title="Ver ID HUD"
              >
                <FaIdCard size={20} />
              </button>
            )}

            {/* BOTÓN 2: Lanyard 3D (Ocultable por config) */}
            {siteConfig.components?.lanyard3D && (
              <button 
                onClick={() => { setShowLanyard(!showLanyard); setShowIdCard(false); }} 
                className={`id-toggle-btn ${showLanyard ? 'active' : ''}`} 
                title="Activar Lanyard 3D"
              >
                <FaIdBadge size={20} />
              </button>
            )}

            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Cambiar tema">
              {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- SECCIÓN HERO --- */}
      {siteConfig.sections?.hero && (
        <section id="inicio" className="section hero" style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
            {/* COMPONENTE: FaultyTerminal */}
            {siteConfig.components?.faultyTerminal && (
              <FaultyTerminal tint="#00f3ff" brightness={0.3} />
            )}
          </div>

          <div className="hero-content" style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
            <div style={{ pointerEvents: 'auto' }}>
              {/* COMPONENTE: BlurText */}
              {siteConfig.components?.blurText ? (
                <>
                  <BlurText text="SYSTEM_USER:" className="hero-label-anim" />
                  <BlurText text="ANDRÉS RICCI" className="hero-title-anim" />
                </>
              ) : (
                <>
                  <h3 className="hero-label-anim">SYSTEM_USER:</h3>
                  <h1 className="hero-title-anim">ANDRÉS RICCI</h1>
                </>
              )}
              <h2 style={{ color: '#ffffff', letterSpacing: '6px', opacity: 0.9 }}>DESARROLLADOR FULL STACK</h2>
              <p style={{ color: '#a0a0a0' }}>Arquitectura de Software / React / Vue / Node.js</p>
            </div>
            
            <div style={{ marginTop: '2rem', pointerEvents: 'auto' }}>
              <a href="#proyectos" className="btn-tech futurist-btn">
                <span className="btn-glitch-content">INICIAR PROTOCOLO</span>
                <span className="btn-tag">A2-ALPHA</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN HABILIDADES (Controlada por config) */}
      {siteConfig.sections?.skills && (
        <section id="habilidades" className="section skills">
          <div className="section-header">
            <span className="subtitle">SYSTEM_CHECK // DATABASE</span>
            <h2>
              {/* COMPONENTE: DecryptedText */}
              {siteConfig.components?.decryptedText ? (
                <DecryptedText
                  text="ARSENAL TÉCNICO"
                  animateOn="view"
                  revealDirection="center"
                  speed={110}
                  maxIterations={48}
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"
                />
              ) : (
                "ARSENAL TÉCNICO"
              )}
            </h2>
          </div>
          <div style={{ width: '100%', position: 'relative' }}>
            {/* COMPONENTE: LogoLoop */}
            {siteConfig.components?.logoLoop && (
              <LogoLoop
                logos={techLogos}
                speed={50}          
                direction="left"
                logoHeight={48}     
                gap={60}            
                fadeOut={true}
                fadeOutColor={theme === 'dark' ? "#050505" : "#f4f7f6"} 
              />
            )}
          </div>
        </section>
      )}

      {/* SECCIÓN PROYECTOS (Controlada por config) */}
      {siteConfig.sections?.projects && (
        <section id="proyectos" className="section projects">
          <div className="section-header">
            <span className="subtitle">DEPLOYED_MODULES // V.1.0</span>
            <h2>
              {/* COMPONENTE: DecryptedText */}
              {siteConfig.components?.decryptedText ? (
                <DecryptedText
                  text="ARCHIVO DE PROYECTOS"
                  animateOn="view"
                  revealDirection="center"
                  speed={110}
                  maxIterations={48}
                  className="revealed"
                  parentClassName="all-letters"
                  encryptedClassName="encrypted"
                />
              ) : (
                "ARCHIVO DE PROYECTOS"
              )}
            </h2>
          </div>
          <div className="projects-grid">
            <div className="project-card futurist-card">
              <div className="project-info">
                <h3>SISTEMA "ANDRÉS" POS</h3>
                <p>Plataforma comercial Enterprise. Gestión de inventario en tiempo real, facturación PDF.</p>
                <ul className="tech-tags futurist-tags">
                  <li>Vue 3</li>
                  <li>Node</li>
                  <li>MySQL</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN CONTACTO */}
      {siteConfig.sections?.contact && (
        <section id="contacto" className="section contact">
          <div className="section-header">
            <span className="subtitle">COMM_LINK // OPEN</span>
            <h2>INICIAR CONEXIÓN</h2>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a href="mailto:tucorreo@ejemplo.com" className="btn-tech futurist-btn">
              <span className="btn-glitch-content">TRANSMITIR MENSAJE</span>
              <span className="btn-tag">CORE_STATUS: STABLE</span>
            </a>
          </div>

          {/* ── BOTONES DE REDES SOCIALES ── */}
          {siteConfig.socialLinks?.length > 0 && (
            <div className="social-links-bar">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  aria-label={social.label}
                  data-social={social.id}
                >
                  <span className="social-icon">
                    {social.id === 'instagram' && <FaInstagram />}
                    {social.id === 'github'    && <FaGithub />}
                    {social.id === 'linkedin'  && <FaLinkedin />}
                    {social.id === 'twitter'   && <FaTwitter />}
                    {/* Si el id no coincide con ninguno, muestra un icono genérico */}
                    {!['instagram','github','linkedin','twitter'].includes(social.id) && <FaGlobe />}
                  </span>
                  <span className="social-label">{social.label}</span>
                </a>
              ))}
            </div>
          )}

          <footer className="footer" style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-dim)' }}>
            <p>SYSTEM_STATUS: ONLINE | © 2026 RICHI.DEV</p>
          </footer>
        </section>
      )}
    </div>
  );
}

export default App;