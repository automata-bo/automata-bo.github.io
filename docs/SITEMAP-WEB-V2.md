# Sitemap y recorrido web AUTOMATA 2.0

**Estado:** estructura implementada en la rama de trabajo V2; pendiente de build y validación en GitHub Pages.

## 1. Mapa principal

```text
AUTOMATA
│
├── Inicio
│   ├── Presentación institucional
│   ├── Tres divisiones
│   ├── Soluciones destacadas
│   ├── Proyectos y demostraciones
│   ├── Método de trabajo
│   └── CTA de contacto
│
├── Digital
│   ├── Sitios web y presencia digital
│   ├── Sistemas y aplicaciones
│   ├── Asistentes digitales
│   ├── Automatización e integraciones
│   ├── IA aplicada
│   └── Demos: restaurante, consultorio y peluquería
│
├── Experiences
│   ├── Bodas y celebraciones
│   ├── Invitaciones digitales
│   ├── Álbum comunitario y QR
│   ├── Regalos y narrativas digitales
│   └── Experiencias interactivas a medida
│
├── Studio
│   ├── Producción audiovisual
│   ├── Publicidad y campañas
│   ├── Fotografía y contenido
│   └── Producción híbrida con IA
│
├── Proyectos
│   ├── Casos reales publicados
│   ├── Demostraciones
│   └── Experimentos / conceptos (si se decide mostrarlos)
│
└── Contacto
    ├── Asistente Autómata
    ├── WhatsApp
    └── Canales de contacto disponibles
```

## 2. Rutas sugeridas

| Página | Ruta objetivo | Propósito |
|---|---|---|
| Inicio | `/` | Presentar la marca y orientar |
| Digital | `/digital/` | Explicar soluciones tecnológicas |
| Experiences | `/experiences/` | Mostrar experiencias personalizadas |
| Studio | `/studio/` | Presentar producción creativa |
| Proyectos | `/proyectos/` | Evidencia, demos y trabajos |
| Contacto | `/contacto/` | Convertir interés en conversación |\n| Demos | `/demos/` | Preservar las demostraciones interactivas de V1 bajo Digital |

Las rutas se implementan como entradas HTML independientes de Vite, no como rutas profundas de una SPA. Cada carpeta contiene su propio `index.html` y se incluye explícitamente en `build.rollupOptions.input`; así GitHub Pages sirve un archivo estático real al solicitar cada URL. `base: "/"` mantiene los recursos en la raíz del dominio del sitio. La ruta `/demos/` conserva la experiencia interactiva anterior mientras se reorganiza su contenido bajo Digital.

## 3. Recorrido de la página de inicio

1. **Hero:** AUTOMATA como estudio de experiencias digitales y soluciones inteligentes.
2. **Divisiones:** tres bloques visuales con descripciones y CTA específicos.
3. **Selección destacada:** mostrar pocos ejemplos de productos o capacidades.
4. **Proyectos:** distinguir claramente trabajo publicado y demos.
5. **Método:** explicar cómo se entiende, evalúa, recomienda y ejecuta un proyecto.
6. **CTA final:** iniciar conversación sin presión ni promesas exageradas.

## 4. Contenido mínimo por división

### Digital
- Qué resuelve.
- Tipos de solución.
- Ejemplos y demos.
- Qué se puede contratar y qué requiere evaluación.
- CTA: conversar sobre una necesidad digital.

### Experiences
- Qué tipo de momentos y experiencias diseña.
- Caso ilustrativo de boda: QR, fotografías de invitados y álbum comunitario personalizado.
- Opciones de personalización y consideraciones de privacidad.
- Estado real de cada producto.
- CTA: diseñar una experiencia para un evento.

### Studio
- Qué piezas y formatos produce.
- Enfoque creativo y posibilidades de producción híbrida.
- Muestras publicables cuando existan.
- CTA: conversar sobre una pieza o campaña.

## 5. Reglas de navegación

- El logo siempre regresa a Inicio.
- La navegación principal no debe tener más de seis destinos.
- Cada página de división incluye enlaces a las otras dos, sin competir con su contenido.
- El asistente debe poder abrirse desde cualquier página.
- Las demos se etiquetan como simulaciones y no se mezclan con casos reales.
- El CTA de cada división debe iniciar una conversación contextual, no un formulario extenso.
- En móvil, el menú debe ser accesible y cerrarse al elegir una ruta.

## 6. SEO por página

Cada página debe tener:
- Título único y descriptivo.
- Meta description propia.
- URL canónica coherente.
- Open Graph title, description e imagen.
- Encabezado H1 único y jerarquía H2/H3 ordenada.
- Enlaces internos descriptivos.
- Datos estructurados únicamente cuando correspondan a información real y verificable.

No inventar testimonios, clientes, premios, direcciones, horarios ni métricas para completar metadatos o páginas.
