// src/config.js

export const siteConfig = {
  // === CONTROL GLOBAL DE SECCIONES ===
  sections: {
    hero: true,         // La sección principal de bienvenida
    skills: true,       // Sección de Arsenal Técnico
    projects: true,     // Sección de Archivo de Proyectos
    contact: true,      // Sección de Contacto
  },

  // === CONTROL INDIVIDUAL DE COMPONENTES UI ===
  // (Mapeado exacto a tu carpeta /components)
  components: {
    shuffleLogo: true,      // Componente Shuffle.jsx (Logo en la Navbar)
    faultyTerminal: true,   // Componente FaultyTerminal.jsx (Fondo del Hero)
    blurText: true,         // Componente BlurText.jsx (Textos animados del Hero)
    decryptedText: true,    // Componente DecryptedText.jsx (Títulos de secciones)
    logoLoop: true,         // Componente LogoLoop.jsx (Carrusel de tecnologías)
    dither: false,          // Componente Dither.jsx (Apagado por defecto por ahora)
    
    // Controles de Identidad
    lanyard3D: false,        // Componente Lanyard.jsx (El carnet 3D interactivo)
    carnet2DHUD: true,      // El carnet estático de la esquina
  },

  // === CONFIGURACIONES ESPECÍFICAS ===
  lanyardConfig: {
    autoInicio: true,        // ¿Aparece solo al cargar la web?
    duracionPantalla: 3000, // Tiempo en milisegundos (10 segundos)
  },

  // === REDES SOCIALES ===
  // Agrega, quita o comenta cualquier red fácilmente desde aquí.
  // Para agregar una nueva: { id: 'nombre', label: 'LABEL', url: 'https://...' }
  socialLinks: [
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      url: 'https://www.instagram.com/anricci575', // 👈 Cambia tu usuario aquí
    },
    {
      id: 'github',
      label: 'GITHUB',
      url: 'https://github.com/Anricci575',        // 👈 Cambia tu usuario aquí
    },
    // ── SLOT LIBRE: descomenta y completa para agregar otra red ──
    // {
    //   id: 'linkedin',
    //   label: 'LINKEDIN',
    //   url: 'https://linkedin.com/in/tu-usuario',
    // },
    // {
    //   id: 'twitter',
    //   label: 'X / TWITTER',
    //   url: 'https://x.com/tu-usuario',
    // },
  ],
};