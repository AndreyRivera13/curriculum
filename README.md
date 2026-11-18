# Brayam Andrey Oliveros Rivera

Desarrollador de software backend Java. Cúcuta, Colombia.

**CV en línea:** https://andreyrivera13.github.io/curriculum/
**English version:** https://andreyrivera13.github.io/curriculum/en/
**PDF:** [español](Brayam-Oliveros-CV-es.pdf) | [English](Brayam-Oliveros-CV-en.pdf)

LinkedIn: https://www.linkedin.com/in/brayam-andrey-oliveros-rivera-00a514200/
GitHub: https://github.com/AndreyRivera13

## Sobre mí

Desarrollo servicios backend en Java con Spring Boot y programación reactiva, con arquitectura limpia y hexagonal. Desde 2022 trabajo en Pragma, proveedor de Bancolombia, y desde noviembre de 2026 soy ingeniero de software del banco.

## Experiencia

- **Bancolombia**, ingeniero de software. Desde noviembre de 2026.
- **Pragma S.A.**, desarrollador backend Java. Septiembre de 2022 a noviembre de 2026. Servicios con Spring Boot, Spring Cloud y WebFlux; migración de la plataforma de onboarding de KIIRE (Grupo Éxito y Pagos Redeban) a Spring Boot reactivo con PostgreSQL en AWS RDS; plataforma de experiencia de candidatos con arquitectura hexagonal.
- **Desarrollador freelance**. Diciembre de 2019 a diciembre de 2021. Cinco sistemas completos para clientes en PHP, Spring Boot con Angular, Java Web, Kotlin y Node.js.

## Tecnologías

- **Backend:** Java, Spring Boot, Spring Cloud, WebFlux, Python
- **Arquitectura:** arquitectura limpia, arquitectura hexagonal, microservicios, SOLID
- **Datos:** PostgreSQL, MySQL, MongoDB
- **Nube y entrega:** AWS (EC2, S3, RDS), Docker, Jenkins, Azure DevOps, Maven, Gradle
- **Calidad:** JUnit, Mockito, JaCoCo, Postman
- **Día a día:** Git, GitHub, GitLab, IntelliJ IDEA, Linux, Scrum

## Estudios y certificaciones

- Ingeniería de Sistemas, Universidad Francisco de Paula Santander (2018 a 2026)
- Tecnología en implementación y gestión de bases de datos, SENA (en curso)
- Tecnólogo en análisis y desarrollo de sistemas de información, SENA (2021 a 2023)
- Técnico en mantenimiento de equipos de cómputo, SENA (2017)
- AWS Certified Cloud Practitioner

## Proyectos

- [DevTalk](https://github.com/AndreyRivera13/Dey-English-): práctica de inglés hablado con una IA que corre en el navegador.
- [Arteviva](https://artevivax.com): plataforma de streaming de danza y arte en AWS.
- [Control de afiliación y pagos](https://github.com/AndreyRi13/seguridad-social-backend): Spring Boot, Angular y MySQL.
- [Inventario y ventas de calzado](https://andreyri13.github.io/SistemaVentasWeb/): Java Web para la empresa CAYSAM.

---

## Sobre este repositorio

La página es HTML y CSS puros, sin frameworks ni JavaScript. Todo el contenido (español e inglés) está en `src/content.mjs` y el diseño en `src/styles.css`.

```bash
node scripts/build.mjs
```

Regenera `index.html` y `en/index.html`. Para rehacer los PDF:

```bash
google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=Brayam-Oliveros-CV-es.pdf index.html
google-chrome --headless=new --no-pdf-header-footer --print-to-pdf=Brayam-Oliveros-CV-en.pdf en/index.html
```

En `site` de `src/content.mjs` puedes poner `email` (botón de correo) y `photo` (ruta a una foto); ambos están vacíos por defecto.

Las fuentes Onest y Bricolage Grotesque van incluidas con su licencia OFL en `assets/fonts`.
