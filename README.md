# Portafolio Profesional - Johann Camiloaga

Sitio web de portafolio profesional desarrollado con Astro. Este proyecto presenta perfil, experiencia, habilidades, proyectos, educacion y contacto en una landing optimizada para rendimiento y SEO basico.

## Resumen

- Framework: Astro 5
- Estilo: CSS personalizado
- Contenido: Astro Content Collections (`src/content`)
- SEO: sitemap mediante `@astrojs/sitemap`
- Objetivo: mostrar perfil profesional y proyectos de forma clara y mantenible

## Caracteristicas

- Secciones modulares reutilizables en componentes Astro
- Contenido editable desde archivos Markdown
- Animaciones e inicializadores en JavaScript separados por modulo
- Arquitectura simple y escalable para agregar mas proyectos/experiencia

## Tecnologias

- Astro
- JavaScript
- TypeScript (configuracion de proyecto)
- CSS

## Estructura del proyecto

```text
.
├── public/
│   ├── resources/
│   │   └── cv/
│   └── robots.txt
├── src/
│   ├── assets/
│   │   └── img/
│   │       ├── projects/
│   │       └── skills/
│   ├── components/
│   │   ├── About.astro
│   │   ├── Contact.astro
│   │   ├── Education.astro
│   │   ├── Experience.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   ├── Projects.astro
│   │   └── Skills.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── experience/
│   │   ├── projects/
│   │   └── skills/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   ├── animations.js
│   │   ├── initializers/
│   │   └── modules/
│   └── styles/
│       └── main.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Requisitos

- Node.js 18+
- npm 9+

## Instalacion y uso local

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre en navegador:

```text
http://localhost:4321
```

## Scripts disponibles

| Script                    | Descripcion                        |
| :------------------------ | :--------------------------------- |
| `npm run dev`             | Levanta entorno de desarrollo      |
| `npm run build`           | Genera build de produccion         |
| `npm run preview`         | Sirve localmente el build generado |
| `npm run astro -- --help` | Ayuda de la CLI de Astro           |

## Gestion de contenido

El contenido principal se administra desde `src/content`:

- Experiencia: `src/content/experience/*.md`
- Proyectos: `src/content/projects/*.md`
- Habilidades: `src/content/skills/*.md`
- Esquemas de colecciones: `src/content/config.ts`

Para agregar una entrada nueva, crea un archivo `.md` en la coleccion correspondiente siguiendo la estructura de frontmatter existente.

## Personalizacion

- Componentes visuales: `src/components`
- Estilos globales: `src/styles/main.css`
- Animaciones e interacciones: `src/scripts/modules` y `src/scripts/initializers`
- Estructura base de pagina: `src/layouts/Layout.astro`

## Build y despliegue

Generar build de produccion:

```bash
npm run build
```

Previsualizar build:

```bash
npm run preview
```

El output final se genera en `dist/` y puede desplegarse en plataformas como Netlify, Vercel, GitHub Pages o cualquier hosting estatico.

## Licencia

Este proyecto incluye un archivo `LICENSE` en la raiz. Ajusta la licencia segun el nivel de uso permitido para terceros.
