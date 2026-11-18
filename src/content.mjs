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
      { name: 'DevTalk', stack: 'JavaScript, WebGPU, WebLLM', text: 'App web para practicar inglés hablado con una IA que corre en el navegador, sin servidores ni costo. Niveles de A1 a B2, escenarios de trabajo y corrección de cada frase.', href: 'https://github.com/AndreyRivera13/Dey-English-', cta: 'Ver código', flow: ['Voz', 'Navegador (WebGPU)', 'IA local', 'Corrección'] },
      { name: 'Arteviva', stack: 'AWS EC2', text: 'Plataforma de streaming de danza y arte, desplegada en AWS.', href: 'https://artevivax.com', cta: 'Ver sitio', flow: ['Video', 'AWS EC2', 'Público'] },
      { name: 'Control de afiliación y pagos', stack: 'Spring Boot, Angular, MySQL', text: 'Sistema de seguridad social con backend y frontend separados.', href: 'https://github.com/AndreyRi13/seguridad-social-backend', cta: 'Ver código', flow: ['Angular', 'Spring Boot', 'MySQL'] },
      { name: 'Inventario y ventas de calzado', stack: 'Java Web, JPA, MVC, JSP', text: 'Sistema de inventario y ventas para la empresa CAYSAM.', href: 'https://andreyri13.github.io/SistemaVentasWeb/', cta: 'Ver demo', flow: ['JSP', 'MVC', 'JPA'] },
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
      { name: 'DevTalk', stack: 'JavaScript, WebGPU, WebLLM', text: 'Web app to practice spoken English with an AI that runs in the browser, with no servers and no cost. Levels from A1 to B2, work scenarios and a correction for every sentence.', href: 'https://github.com/AndreyRivera13/Dey-English-', cta: 'View code', flow: ['Voice', 'Browser (WebGPU)', 'Local AI', 'Correction'] },
      { name: 'Arteviva', stack: 'AWS EC2', text: 'Dance and art streaming platform, deployed on AWS.', href: 'https://artevivax.com', cta: 'Visit site', flow: ['Video', 'AWS EC2', 'Audience'] },
      { name: 'Affiliation and payment control', stack: 'Spring Boot, Angular, MySQL', text: 'Social security system with separate backend and frontend.', href: 'https://github.com/AndreyRi13/seguridad-social-backend', cta: 'View code', flow: ['Angular', 'Spring Boot', 'MySQL'] },
      { name: 'Footwear inventory and sales', stack: 'Java Web, JPA, MVC, JSP', text: 'Inventory and sales system for the company CAYSAM.', href: 'https://andreyri13.github.io/SistemaVentasWeb/', cta: 'View demo', flow: ['JSP', 'MVC', 'JPA'] },
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

// Trayectoria: de enero de 2017 a enero de 2028. end: null = sigue en curso.
export const axis = { from: 2017, to: 2028 };
export const spans = [
  { kind: 'study', start: '2017-01-16', end: '2017-12-15', es: ['Técnico en mantenimiento de equipos de cómputo', 'SENA', '2017'], en: ['Computer equipment maintenance technician', 'SENA', '2017'] },
  { kind: 'study', start: '2018-01-22', end: '2026-10-08', es: ['Ingeniería de Sistemas', 'UFPS', '2018 a oct 2026'], en: ['Systems Engineering', 'UFPS', '2018 to Oct 2026'] },
  { kind: 'free', start: '2019-12-01', end: '2021-12-31', es: ['Desarrollador freelance', 'cinco sistemas', 'dic 2019 a dic 2021'], en: ['Freelance developer', 'five systems', 'Dec 2019 to Dec 2021'] },
  { kind: 'study', start: '2021-02-01', end: '2023-12-15', es: ['Tecnólogo en desarrollo de sistemas', 'SENA', '2021 a 2023'], en: ['Systems development technologist', 'SENA', '2021 to 2023'] },
  { kind: 'work', start: '2022-09-19', end: '2026-11-09', es: ['Pragma S.A.', 'backend Java', 'sep 2022 a nov 2026'], en: ['Pragma S.A.', 'Java backend', 'Sep 2022 to Nov 2026'] },
  { kind: 'study', start: '2026-04-14', end: null, es: ['Bases de datos', 'SENA, en curso', 'desde abr 2026'], en: ['Databases', 'SENA, in progress', 'since Apr 2026'] },
  { kind: 'work', start: '2026-11-24', end: null, es: ['Bancolombia', 'ingeniero de software', 'desde nov 2026'], en: ['Bancolombia', 'software engineer', 'since Nov 2026'] },
];

// Escala de inglés: level = índice (0 = A1) del nivel actual; goal = meta.
export const english = { levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], current: 2, goal: 4 };

text.es.explain = {
  flowTitle: 'Cómo construyo un servicio',
  flowIntro: 'Sigue una petición de punta a punta y mira dónde entra cada tecnología.',
  nodes: ['Cliente', 'API reactiva', 'Caso de uso', 'Adaptador', 'Base de datos', 'Pruebas y entrega'],
  stepOf: (i, n) => `Paso ${i} de ${n}`, prev: 'Anterior', next: 'Siguiente', uses: 'Lo uso con', real: 'Caso real',
  steps: [
    { title: 'Llega una petición', text: 'Una app o una web le pide algo al sistema: consultar un dato o crear un registro.', uses: ['REST', 'JSON', 'Postman'] },
    { title: 'La API la recibe sin bloquearse', text: 'Con WebFlux, un servicio atiende muchas peticiones a la vez sin dejar un hilo esperando cada respuesta.', uses: ['Spring Boot', 'WebFlux'], real: 'La migración de la plataforma de onboarding de KIIRE a Spring Boot reactivo.' },
    { title: 'El caso de uso decide', text: 'La lógica del negocio vive en el centro y no depende de frameworks ni de la base de datos. Así se cambia una pieza sin romper el resto.', uses: ['Arquitectura limpia', 'Hexagonal', 'SOLID'], real: 'La plataforma de experiencia de candidatos, con arquitectura hexagonal.' },
    { title: 'El adaptador traduce', text: 'Convierte lo que entiende el dominio en lo que entiende cada sistema externo, y al revés.', uses: ['Spring Cloud', 'Microservicios'] },
    { title: 'Los datos quedan guardados', text: 'La información se guarda en una base de datos. Yo trabajo con relacionales y con documentos.', uses: ['PostgreSQL', 'MySQL', 'MongoDB'], real: 'KIIRE guarda sus datos en PostgreSQL sobre AWS RDS.' },
    { title: 'Antes de salir, todo se prueba', text: 'Pruebas unitarias, medición de cobertura y un pipeline que empaqueta y despliega.', uses: ['JUnit', 'Mockito', 'JaCoCo', 'Git', 'Jenkins', 'Azure DevOps', 'Docker', 'AWS'] },
  ],
  heroLabels: ['API REST', 'Base de datos', 'AWS', 'Spring Cloud', 'Pruebas', 'Docker'],
  heroRings: ['Dominio', 'Puertos', 'Adaptadores'],
  heroCaption: 'Arquitectura hexagonal: el negocio al centro, lo demás conectado por puertos.',
  statsTitle: 'En cifras',
  stats: [['4', 'años en Pragma'], ['5', 'sistemas freelance'], ['2', 'títulos del SENA, y uno en curso'], ['1', 'título de Ingeniería de Sistemas']],
  traceTitle: 'Mi trayectoria', traceIntro: 'Cada barra es un tramo real. El largo es el tiempo que dura.', traceNote: 'Las barras con punta siguen en curso.',
  kinds: { work: 'Trabajo', study: 'Estudio', free: 'Freelance' },
  skillsIntro: 'Agrupadas como las uso en un servicio.',
  projectsIntro: 'Cada proyecto con su recorrido técnico.',
  englishTitle: 'Inglés', englishNow: 'Hoy', englishGoal: 'Meta', englishNative: 'Español: nativo',
  certTitle: 'Estudios y certificaciones',
  builtWith: 'Hecho a mano con HTML, CSS y un poco de JavaScript.',
};
text.en.explain = {
  flowTitle: 'How I build a service',
  flowIntro: 'Follow one request from end to end and see where each technology comes in.',
  nodes: ['Client', 'Reactive API', 'Use case', 'Adapter', 'Database', 'Tests and delivery'],
  stepOf: (i, n) => `Step ${i} of ${n}`, prev: 'Previous', next: 'Next', uses: 'I use', real: 'Real case',
  steps: [
    { title: 'A request arrives', text: 'An app or a website asks the system for something: read a record or create one.', uses: ['REST', 'JSON', 'Postman'] },
    { title: 'The API takes it without blocking', text: 'With WebFlux, one service handles many requests at once without leaving a thread waiting for each answer.', uses: ['Spring Boot', 'WebFlux'], real: 'The migration of the KIIRE onboarding platform to reactive Spring Boot.' },
    { title: 'The use case decides', text: 'Business logic lives at the center and does not depend on frameworks or the database. You can swap a piece without breaking the rest.', uses: ['Clean architecture', 'Hexagonal', 'SOLID'], real: 'The candidate experience platform, built with hexagonal architecture.' },
    { title: 'The adapter translates', text: 'It turns what the domain understands into what each external system understands, and back.', uses: ['Spring Cloud', 'Microservices'] },
    { title: 'The data gets stored', text: 'Information is saved in a database. I work with relational ones and with documents.', uses: ['PostgreSQL', 'MySQL', 'MongoDB'], real: 'KIIRE stores its data in PostgreSQL on AWS RDS.' },
    { title: 'Before shipping, everything is tested', text: 'Unit tests, coverage measurement and a pipeline that packages and deploys.', uses: ['JUnit', 'Mockito', 'JaCoCo', 'Git', 'Jenkins', 'Azure DevOps', 'Docker', 'AWS'] },
  ],
  heroLabels: ['REST API', 'Database', 'AWS', 'Spring Cloud', 'Tests', 'Docker'],
  heroRings: ['Domain', 'Ports', 'Adapters'],
  heroCaption: 'Hexagonal architecture: the business at the center, everything else plugged in through ports.',
  statsTitle: 'By the numbers',
  stats: [['4', 'years at Pragma'], ['5', 'freelance systems'], ['2', 'SENA degrees, plus one in progress'], ['1', 'Systems Engineering degree']],
  traceTitle: 'My path so far', traceIntro: 'Each bar is a real stretch of time. Its length is how long it lasted.', traceNote: 'Bars with an arrow tip are still going.',
  kinds: { work: 'Work', study: 'Study', free: 'Freelance' },
  skillsIntro: 'Grouped the way I use them in a service.',
  projectsIntro: 'Each project with its technical path.',
  englishTitle: 'English', englishNow: 'Now', englishGoal: 'Goal', englishNative: 'Spanish: native',
  certTitle: 'Education and certifications',
  builtWith: 'Handmade with HTML, CSS and a little JavaScript.',
};
