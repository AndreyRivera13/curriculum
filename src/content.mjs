// Todo el contenido del currículum vive aquí. Para actualizar algo, edita este archivo
// y corre `node scripts/build.mjs`.

export const site = {
  name: 'Brayam Andrey Oliveros Rivera',
  short: 'Brayam Oliveros',
  initials: 'BO',
  github: 'https://github.com/AndreyRivera13',
  linkedin: 'https://www.linkedin.com/in/brayam-andrey-oliveros-rivera-00a514200/',
  certificates: 'https://drive.google.com/drive/folders/1ChN9TC4Efbrgn9RN4CzIQiXWH7MsUarj?usp=sharing',
  // Déjalo vacío si no quieres publicar tu correo en la página.
  email: '',
  // Archivo opcional: pon tu foto en assets/photo.jpg y escribe 'assets/photo.jpg'.
  photo: '',
  pdf: { es: 'Brayam-Oliveros-CV-es.pdf', en: 'Brayam-Oliveros-CV-en.pdf' },
};

// Eje del trace: de enero de 2017 a enero de 2028.
export const axis = { from: 2017, to: 2028 };

// kind: work | study | free. end: null = sigue en curso.
export const spans = [
  { id: 'tec',  kind: 'study', start: '2017-01-16', end: '2017-12-15', es: ['Técnico en mantenimiento de equipos de cómputo', 'SENA'], en: ['Computer equipment maintenance technician', 'SENA'], dates: { es: '2017', en: '2017' } },
  { id: 'ing',  kind: 'study', start: '2018-01-22', end: '2026-10-08', es: ['Ingeniería de Sistemas', 'Universidad Francisco de Paula Santander'], en: ['Systems Engineering', 'Francisco de Paula Santander University'], dates: { es: '2018 a oct 2026', en: '2018 to Oct 2026' } },
  { id: 'free', kind: 'free',  start: '2019-12-01', end: '2021-12-31', es: ['Desarrollador freelance', 'Cinco sistemas completos'], en: ['Freelance developer', 'Five complete systems'], dates: { es: 'dic 2019 a dic 2021', en: 'Dec 2019 to Dec 2021' } },
  { id: 'tecn', kind: 'study', start: '2021-02-01', end: '2023-12-15', es: ['Tecnólogo en análisis y desarrollo de sistemas de información', 'SENA'], en: ['Technologist in information systems analysis and development', 'SENA'], dates: { es: '2021 a 2023', en: '2021 to 2023' } },
  { id: 'pra',  kind: 'work',  start: '2022-09-19', end: '2026-11-09', es: ['Pragma S.A.', 'Desarrollador backend Java'], en: ['Pragma S.A.', 'Java backend developer'], dates: { es: 'sep 2022 a nov 2026', en: 'Sep 2022 to Nov 2026' } },
  { id: 'bd',   kind: 'study', start: '2026-04-14', end: null,         es: ['Tecnología en implementación y gestión de bases de datos', 'SENA'], en: ['Technology in database implementation and management', 'SENA'], dates: { es: 'desde abr 2026', en: 'since Apr 2026' } },
  { id: 'ban',  kind: 'work',  start: '2026-11-24', end: null,         es: ['Bancolombia', 'Ingeniero de software'], en: ['Bancolombia', 'Software engineer'], dates: { es: 'desde nov 2026', en: 'since Nov 2026' } },
];

export const text = {
  es: {
    lang: 'es',
    locale: 'es-CO',
    title: 'Brayam Oliveros | Desarrollador backend Java',
    description: 'Currículum de Brayam Andrey Oliveros Rivera, ingeniero de software backend con Java y Spring Boot. Cúcuta, Colombia.',
    skip: 'Saltar al contenido',
    role: 'Desarrollador de software backend Java',
    place: 'Cúcuta, Colombia',
    summary: 'Desarrollo servicios backend en Java con Spring Boot y programación reactiva, con arquitectura limpia y hexagonal. Desde 2022 trabajo en Pragma, proveedor de Bancolombia, y desde noviembre de 2026 soy ingeniero de software del banco.',
    downloadPdf: 'Descargar CV en PDF',
    otherLang: { label: 'English', href: 'en/', code: 'EN', title: 'Read this CV in English' },
    langSwitchLabel: 'Idioma',
    contactTitle: 'Contacto',
    emailLabel: 'Correo',
    traceTitle: 'Mi trayectoria',
    traceIntro: 'Cada barra es un tramo real. El largo es el tiempo que dura.',
    kinds: { work: 'Trabajo', study: 'Estudio', free: 'Freelance' },
    traceNote: 'Las barras con punta siguen en curso.',
    expTitle: 'Experiencia',
    experience: [
      {
        org: 'Bancolombia', role: 'Ingeniero de software', place: 'Cúcuta', dates: 'Desde noviembre de 2026',
        points: ['Desarrollo de software backend para los servicios del banco, ahora como parte de su equipo.'],
      },
      {
        org: 'Pragma S.A.', role: 'Desarrollador backend Java', place: 'Proveedor de Bancolombia', dates: 'Septiembre de 2022 a noviembre de 2026',
        points: [
          'Servicios en Java con Spring Boot, Spring Cloud y WebFlux, con arquitectura limpia, dentro de células de desarrollo con Scrum.',
          'KIIRE (Grupo Éxito y Pagos Redeban): migración de una plataforma de onboarding a Spring Boot reactivo, con PostgreSQL en AWS RDS.',
          'Plataforma de experiencia de candidatos con arquitectura hexagonal.',
          'Pruebas unitarias con JUnit, Mockito y JaCoCo; código versionado en Git y tableros en Azure DevOps.',
        ],
      },
      {
        org: 'Desarrollador freelance', role: 'Sistemas a la medida', place: '', dates: 'Diciembre de 2019 a diciembre de 2021',
        points: ['Cinco sistemas completos para clientes: una farmacia en PHP, un sistema de seguridad social con Spring Boot y Angular, una tienda de calzado en Java Web, un inventario en Kotlin y un sistema de ventas para restaurante en Node.js.'],
      },
    ],
    skillsTitle: 'Tecnologías',
    skills: [
      ['Backend', 'Java, Spring Boot, Spring Cloud, WebFlux (programación reactiva), Python'],
      ['Arquitectura', 'Arquitectura limpia, arquitectura hexagonal, microservicios, SOLID, programación orientada a objetos'],
      ['Datos', 'PostgreSQL, MySQL, MongoDB'],
      ['Nube y entrega', 'AWS (EC2, S3, RDS), Docker, Jenkins, Azure DevOps, Maven, Gradle'],
      ['Calidad', 'JUnit, Mockito, JaCoCo, Postman'],
      ['Día a día', 'Git, GitHub, GitLab, IntelliJ IDEA, Linux, Scrum'],
    ],
    projectsTitle: 'Proyectos',
    projects: [
      { name: 'DevTalk', stack: 'JavaScript, WebGPU, WebLLM', text: 'App web para practicar inglés hablado con una IA que corre en el navegador, sin servidores ni costo. Niveles de A1 a B2, escenarios de trabajo y corrección de cada frase.', href: 'https://github.com/AndreyRivera13/Dey-English-', cta: 'Ver código' },
      { name: 'Arteviva', stack: 'AWS EC2', text: 'Plataforma de streaming de danza y arte, desplegada en AWS.', href: 'https://artevivax.com', cta: 'Ver sitio' },
      { name: 'Control de afiliación y pagos', stack: 'Spring Boot, Angular, MySQL', text: 'Sistema de seguridad social con backend y frontend separados.', href: 'https://github.com/AndreyRi13/seguridad-social-backend', cta: 'Ver código' },
      { name: 'Inventario y ventas de calzado', stack: 'Java Web, JPA, MVC, JSP', text: 'Sistema de inventario y ventas para la empresa CAYSAM.', href: 'https://andreyri13.github.io/SistemaVentasWeb/', cta: 'Ver demo' },
    ],
    moreProjects: 'Más proyectos en GitHub',
    eduTitle: 'Estudios',
    education: [
      { name: 'Ingeniería de Sistemas', org: 'Universidad Francisco de Paula Santander', dates: '2018 a 2026', note: 'Título obtenido en octubre de 2026.' },
      { name: 'Tecnología en implementación y gestión de bases de datos', org: 'SENA', dates: 'Desde abril de 2026', note: 'En curso.' },
      { name: 'Tecnólogo en análisis y desarrollo de sistemas de información', org: 'SENA', dates: '2021 a 2023', note: '' },
      { name: 'Técnico en mantenimiento de equipos de cómputo', org: 'SENA', dates: '2017', note: '' },
      { name: 'Bachiller', org: 'Institución Educativa Gonzalo Rivera Laguado', dates: '2017', note: '' },
    ],
    certTitle: 'Certificaciones e idiomas',
    certs: [
      { name: 'AWS Certified Cloud Practitioner', note: '' },
      { name: 'Cursos y certificados', note: 'Google, Oracle, Cisco, Coursera, LinkedIn Learning, HackerRank, Movistar, SENA y English Dot Works.', href: 'certificates', cta: 'Ver los certificados' },
    ],
    languages: [
      ['Español', 'Nativo'],
      ['Inglés', 'Intermedio (B1), practicando para llegar a C1'],
    ],
    updated: 'Actualizado en',
    builtWith: 'Hecho a mano con HTML y CSS, sin frameworks ni JavaScript.',
  },
  en: {
    lang: 'en',
    locale: 'en-US',
    title: 'Brayam Oliveros | Java backend developer',
    description: 'Résumé of Brayam Andrey Oliveros Rivera, backend software engineer working with Java and Spring Boot. Cúcuta, Colombia.',
    skip: 'Skip to content',
    role: 'Java backend software developer',
    place: 'Cúcuta, Colombia',
    summary: 'I build backend services in Java with Spring Boot and reactive programming, using clean and hexagonal architecture. Since 2022 I have worked at Pragma, a Bancolombia vendor, and since November 2026 I am a software engineer at the bank.',
    downloadPdf: 'Download CV as PDF',
    otherLang: { label: 'Español', href: '../', code: 'ES', title: 'Leer este CV en español' },
    langSwitchLabel: 'Language',
    contactTitle: 'Contact',
    emailLabel: 'Email',
    traceTitle: 'My path so far',
    traceIntro: 'Each bar is a real stretch of time. Its length is how long it lasted.',
    kinds: { work: 'Work', study: 'Study', free: 'Freelance' },
    traceNote: 'Bars with an arrow tip are still going.',
    expTitle: 'Experience',
    experience: [
      {
        org: 'Bancolombia', role: 'Software engineer', place: 'Cúcuta', dates: 'Since November 2026',
        points: ['Backend software development for the bank’s services, now as part of its own team.'],
      },
      {
        org: 'Pragma S.A.', role: 'Java backend developer', place: 'Bancolombia vendor', dates: 'September 2022 to November 2026',
        points: [
          'Java services with Spring Boot, Spring Cloud and WebFlux, built with clean architecture inside Scrum development cells.',
          'KIIRE (Grupo Éxito and Pagos Redeban): migrated an onboarding platform to reactive Spring Boot, with PostgreSQL on AWS RDS.',
          'Candidate experience platform built with hexagonal architecture.',
          'Unit tests with JUnit, Mockito and JaCoCo; code in Git and boards in Azure DevOps.',
        ],
      },
      {
        org: 'Freelance developer', role: 'Custom systems', place: '', dates: 'December 2019 to December 2021',
        points: ['Five complete systems for clients: a pharmacy in PHP, a social security system with Spring Boot and Angular, a shoe store in Java Web, an inventory app in Kotlin and a restaurant sales system in Node.js.'],
      },
    ],
    skillsTitle: 'Technologies',
    skills: [
      ['Backend', 'Java, Spring Boot, Spring Cloud, WebFlux (reactive programming), Python'],
      ['Architecture', 'Clean architecture, hexagonal architecture, microservices, SOLID, object-oriented programming'],
      ['Data', 'PostgreSQL, MySQL, MongoDB'],
      ['Cloud and delivery', 'AWS (EC2, S3, RDS), Docker, Jenkins, Azure DevOps, Maven, Gradle'],
      ['Quality', 'JUnit, Mockito, JaCoCo, Postman'],
      ['Day to day', 'Git, GitHub, GitLab, IntelliJ IDEA, Linux, Scrum'],
    ],
    projectsTitle: 'Projects',
    projects: [
      { name: 'DevTalk', stack: 'JavaScript, WebGPU, WebLLM', text: 'Web app to practice spoken English with an AI that runs in the browser, with no servers and no cost. Levels from A1 to B2, work scenarios and a correction for every sentence.', href: 'https://github.com/AndreyRivera13/Dey-English-', cta: 'View code' },
      { name: 'Arteviva', stack: 'AWS EC2', text: 'Dance and art streaming platform, deployed on AWS.', href: 'https://artevivax.com', cta: 'Visit site' },
      { name: 'Affiliation and payment control', stack: 'Spring Boot, Angular, MySQL', text: 'Social security system with separate backend and frontend.', href: 'https://github.com/AndreyRi13/seguridad-social-backend', cta: 'View code' },
      { name: 'Footwear inventory and sales', stack: 'Java Web, JPA, MVC, JSP', text: 'Inventory and sales system for the company CAYSAM.', href: 'https://andreyri13.github.io/SistemaVentasWeb/', cta: 'View demo' },
    ],
    moreProjects: 'More projects on GitHub',
    eduTitle: 'Education',
    education: [
      { name: 'Systems Engineering', org: 'Francisco de Paula Santander University', dates: '2018 to 2026', note: 'Degree awarded in October 2026.' },
      { name: 'Technology in database implementation and management', org: 'SENA', dates: 'Since April 2026', note: 'In progress.' },
      { name: 'Technologist in information systems analysis and development', org: 'SENA', dates: '2021 to 2023', note: '' },
      { name: 'Computer equipment maintenance technician', org: 'SENA', dates: '2017', note: '' },
      { name: 'High school diploma', org: 'Gonzalo Rivera Laguado Educational Institution', dates: '2017', note: '' },
    ],
    certTitle: 'Certifications and languages',
    certs: [
      { name: 'AWS Certified Cloud Practitioner', note: '' },
      { name: 'Courses and certificates', note: 'Google, Oracle, Cisco, Coursera, LinkedIn Learning, HackerRank, Movistar, SENA and English Dot Works.', href: 'certificates', cta: 'See the certificates' },
    ],
    languages: [
      ['Spanish', 'Native'],
      ['English', 'Intermediate (B1), working toward C1'],
    ],
    updated: 'Updated',
    builtWith: 'Handmade with HTML and CSS, no frameworks and no JavaScript.',
  },
};
