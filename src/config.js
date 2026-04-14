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

  // === PROYECTOS ===
  // Para agregar un proyecto: copia un bloque, rellena los campos
  // y coloca el screenshot en /public/projects/nombre.png
  projects: [
    {
      id: 'andres-pos',
      title: 'SISTEMA "ANDRÉS" POS',
      description: 'Plataforma comercial Enterprise. Gestión de inventario en tiempo real, facturación PDF y reportes avanzados.',
      image: '/projects/andres-pos.png',
      urlLive: '',
      urlGithub: '',
      tags: ['Vue 3', 'Node', 'MySQL'],
      status: 'DEPLOYED',
    },
    {
      id: 'pagina-de-ias',
      title: 'DIRECTORIO DE IA FUTURISTAS',
      description: 'Repositorio interactivo con más de 50 herramientas de IA organizadas por categorías. Incluye búsqueda, favoritos y modo retro CRT.',
      image: '/projects/pagina-de-ias.png',         // ← generada automáticamente
      urlLive: 'https://anricci575.github.io/pagina-de-ias-2/',
      urlGithub: '',
      tags: ['HTML', 'JS', 'CSS', 'Canvas API'],
      status: 'IN_DEV',
    },
    // ── Agrega tu próximo proyecto aquí ──────────────────────────
    // {
    //   id: 'mi-proyecto-3',
    //   title: 'NOMBRE DEL PROYECTO',
    //   description: 'Descripción breve del proyecto.',
    //   image: '/projects/mi-proyecto-3.png',
    //   urlLive: 'https://mi-sitio.com',
    //   urlGithub: 'https://github.com/Anricci575/mi-repo',
    //   tags: ['React', 'Firebase'],
    //   status: 'IN_DEV',
    // },
  ],


  // === REDES SOCIALES ===
  // Agrega, quita o comenta cualquier red fácilmente desde aquí.
  // Para agregar una nueva: { id: 'nombre', label: 'LABEL', url: 'https://...' }
  socialLinks: [
    {
      id: 'instagram',
      label: 'INSTAGRAM',
      url: 'https://www.instagram.com/andres.ricci.90/', // 👈 Cambia tu usuario aquí
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
