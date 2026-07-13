// src/config.js

export const siteConfig = {
  // === CONTROL GLOBAL DE SECCIONES ===
  sections: {
    hero: true,         // La sección principal de bienvenida
    about: true,        // Sección Sobre Mí
    skills: true,       // Sección de Arsenal Técnico
    projects: true,     // Sección de Archivo de Proyectos
    contact: true,      // Sección de Contacto
  },

  // === CONTROL INDIVIDUAL DE COMPONENTES UI ===
  // (Mapeado exacto a tu carpeta /components)
  components: {
    shuffleLogo: true,      // Componente Shuffle.jsx (Logo en la Navbar)
    faultyTerminal: false,   // Componente FaultyTerminal.jsx (Fondo del Hero)
    blurText: true,         // Componente BlurText.jsx (Textos animados del Hero)
    decryptedText: true,    // Componente DecryptedText.jsx (Títulos de secciones)
    logoLoop: true,         // Componente LogoLoop.jsx (Carrusel de tecnologías)
    dither: false,          // Componente Dither.jsx (Apagado por defecto por ahora)
    
    // Controles de Identidad
    lanyard3D: true,        // Componente Lanyard.jsx (El carnet 3D interactivo)
    carnet2DHUD: true,      // El carnet estático de la esquina
  },

  // === CONFIGURACIONES ESPECÍFICAS ===
  lanyardConfig: {
    autoInicio: false,        // ¿Aparece solo al cargar la web?
    duracionPantalla: 3000, // Tiempo en milisegundos (10 segundos)
  },

  // === PROYECTOS ===
  // Para agregar un proyecto: copia un bloque, rellena los campos
  // y coloca el screenshot en /public/projects/nombre.png
  projects: [
    {
      id: 1,
      title: 'Richi Tienda',
      description: 'Plataforma de comercio electrónico moderna y escalable. Optimización de ventas, carrito de compras dinámico y gestión de inventario orientada a maximizar la conversión.',
      image: null, 
      tags: ['React', 'Vite', 'Tailwind', 'E-commerce'],
      urlLive: 'https://richi-tienda.vercel.app/',
      urlGithub: null, 
      status: 'DEPLOYED' 
    },
    {
      id: 2,
      title: 'Dark Net Operatives',
      description: 'Experiencia inmersiva en formato terminal. Interfaz estilo cyberpunk y retro, con animaciones y mecánicas que simulan un sistema operativo de la deep web.',
      image: null,
      tags: ['HTML', 'CSS', 'JavaScript', 'Retro UI'],
      urlLive: 'https://root3355.github.io/Dark-Net-Operatives/',
      urlGithub: null,
      status: 'DEPLOYED'
    },
    {
      id: 3,
      title: 'Directorio IA Futuristas',
      description: 'Catálogo interactivo con las mejores herramientas de Inteligencia Artificial del mercado. Incluye buscador, modo retro CRT y filtrado avanzado por categorías.',
      image: null,
      tags: ['HTML', 'CSS', 'JS', 'Canvas API'],
      urlLive: 'https://anricci575.github.io/pagina-de-ias-2/',
      urlGithub: null,
      status: 'DEPLOYED'
    },
    {
      id: 4,
      title: 'Tool Repository',
      description: 'Repositorio dinámico de herramientas utilitarias. Diseñado para centralizar recursos y aplicaciones web en un solo lugar con una navegación rápida y fluida.',
      image: null,
      tags: ['React', 'Vite', 'Frontend'],
      urlLive: 'https://tool-repository.vercel.app/',
      urlGithub: null,
      status: 'DEPLOYED'
    }
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
