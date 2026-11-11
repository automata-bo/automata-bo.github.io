# AUTOMATA 2.0 — Plan de implementación web

**Estado:** backlog inicial  
**Versión:** 0.1  
**Rama documental:** `v2/architecture-foundation`  
**Regla:** completar y validar cada fase antes de avanzar a cambios de producción.

---

## Fase 0 — Cerrar arquitectura y contenido

- [ ] Revisar y aprobar `ARQUITECTURA-WEB-V2.md`.
- [ ] Revisar y aprobar `SITEMAP-WEB-V2.md`.
- [ ] Revisar y aprobar `IDENTIDAD-Y-CONTENIDO-V2.md`.
- [ ] Confirmar qué productos de cada división están disponibles, en piloto, demo o concepto.
- [ ] Inventariar proyectos, imágenes y materiales con derechos de publicación confirmados.
- [ ] Definir el alcance de lanzamiento: qué páginas y productos entran en V2.0 y cuáles quedan para iteraciones posteriores.

**Salida:** alcance de V2.0 cerrado y contenido mínimo aprobado.

## Fase 1 — Auditoría técnica y prueba de publicación

- [ ] Revisar dependencias y scripts actuales.
- [ ] Mapear responsabilidades de `App.tsx`, `ChatWidget.tsx`, `CookieConsent.tsx`, `NewsletterSignup.tsx` y `analytics.ts`.
- [ ] Identificar lógica de demos que debe aislarse.
- [ ] Verificar workflows de CI y despliegue antes de modificar estructura.
- [ ] Probar estrategia de rutas profundas en GitHub Pages.
- [ ] Probar metadatos por página y previsualización al compartir enlaces.
- [ ] Definir estrategia de imágenes, fuentes y carga de recursos.
- [ ] Registrar decisiones técnicas y riesgos.

**Salida:** arquitectura frontend validada con una prueba pequeña, sin alterar producción.

## Fase 2 — Sistema visual y prototipos

- [ ] Definir tokens de color, tipografía, espaciado, radios y sombras.
- [ ] Definir componentes comunes: botones, enlaces, tarjetas, encabezados, navegación y pie.
- [ ] Diseñar navegación desktop y móvil.
- [ ] Crear wireframe de Home.
- [ ] Crear wireframe de Digital.
- [ ] Crear wireframe de Experiences.
- [ ] Crear wireframe de Studio.
- [ ] Validar jerarquía visual y densidad de contenido.
- [ ] Definir comportamiento de movimiento y alternativas reducidas.

**Salida:** prototipos y sistema visual aprobados antes de la implementación completa.

## Fase 3 — Refactorización segura del frontend

- [ ] Crear estructura modular de aplicación.
- [ ] Extraer layout compartido.
- [ ] Separar secciones de Home.
- [ ] Aislar demos de restaurante, consultorio y peluquería.
- [ ] Mantener contratos actuales del asistente y sus eventos.
- [ ] Mantener consentimiento y comportamiento de analítica.
- [ ] Mantener registro de suscripciones sin introducir envíos automáticos.
- [ ] Verificar build y comportamiento tras cada extracción.

**Salida:** frontend modular sin regresiones funcionales.

## Fase 4 — Construcción de páginas

- [ ] Implementar Home institucional.
- [ ] Implementar página Digital.
- [ ] Implementar página Experiences.
- [ ] Implementar página Studio.
- [ ] Implementar Proyectos si existe contenido verificable suficiente; si no, mantener selección breve en Home.
- [ ] Implementar Contacto y CTAs.
- [ ] Añadir metadatos específicos, títulos y descripciones.
- [ ] Añadir navegación accesible y estados activos.
- [ ] Verificar carga directa y actualización de cada URL.

**Salida:** páginas completas, navegables y con contenido aprobado.

## Fase 5 — Catálogo, demos y asistente

- [ ] Clasificar cada oferta por división y estado editorial.
- [ ] Crear fichas únicamente para productos con alcance confirmado.
- [ ] Reubicar demos existentes dentro de Digital.
- [ ] Mantener avisos visibles de simulación.
- [ ] Actualizar el contexto comercial del asistente.
- [ ] Probar consultas de las tres divisiones.
- [ ] Probar resumen editable y autorización antes de WhatsApp.
- [ ] Verificar que el asistente no invente disponibilidad, precio ni capacidades.

**Salida:** recorridos comerciales coherentes entre web y asistente.

## Fase 6 — Calidad y lanzamiento

- [ ] Ejecutar `npm run build`.
- [ ] Revisar responsive en móvil, tablet y desktop.
- [ ] Revisar teclado, foco, etiquetas, contraste y movimiento reducido.
- [ ] Optimizar imágenes, fuentes y recursos.
- [ ] Revisar Core Web Vitals y carga inicial.
- [ ] Validar consentimiento analítico y eventos.
- [ ] Validar formularios y suscripciones.
- [ ] Validar enlaces, canonical, robots y sitemap.
- [ ] Revisar privacidad y seguridad.
- [ ] Ejecutar pruebas de regresión del Worker sin cambiarlo innecesariamente.
- [ ] Desplegar primero a un entorno de prueba o rama de previsualización.
- [ ] Obtener aprobación final antes de actualizar la rama de publicación.

**Salida:** V2 lista para publicar con verificación funcional y autorización del director.

---

## Orden y dependencias

```text
Fase 0: Arquitectura y contenido
   ↓
Fase 1: Auditoría y prueba de rutas
   ↓
Fase 2: Sistema visual y prototipos
   ↓
Fase 3: Refactorización modular
   ↓
Fase 4: Páginas
   ↓
Fase 5: Catálogo, demos y asistente
   ↓
Fase 6: Calidad y lanzamiento
```

Las fases 3 y 4 pueden compartir iteraciones pequeñas, pero ninguna debe adelantarse a la validación de arquitectura, contenido y rutas.

## Límites explícitos

- No modificar Cloudflare Worker, D1, migraciones ni secretos como parte de la renovación visual.
- No reemplazar ni eliminar funcionalidades de V1 sin inventario y prueba de regresión.
- No publicar conceptos como productos disponibles.
- No inventar clientes, resultados, testimonios, precios ni métricas.
- No cargar contenido pesado por motivos decorativos.
- No desplegar a producción desde la rama documental.

## Definición de terminado

Una tarea se considera terminada cuando:
1. Su resultado está implementado y visible.
2. Cumple sus criterios de aceptación.
3. No introduce regresiones en funciones existentes.
4. Está documentada cuando afecta arquitectura, contenido o comportamiento.
5. Fue revisada en desktop y móvil cuando aplica.
6. Tiene evidencia verificable (captura, prueba, build o URL).
