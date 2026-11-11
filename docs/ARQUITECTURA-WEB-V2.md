# AUTOMATA 2.0 — Arquitectura de la web

**Estado:** propuesta base aprobada para diseño y planificación  
**Versión:** 0.1  
**Rama:** `v2/architecture-foundation`  
**Alcance:** arquitectura de información, experiencia y organización del frontend. No autoriza cambios en producción ni en el backend.

---

## 1. Propósito

La web 2.0 debe presentar a AUTOMATA como un estudio que diseña y construye experiencias digitales y soluciones inteligentes, combinando tecnología, creatividad e inteligencia.

La web no debe reducir la marca a un proveedor de bots, páginas web o automatizaciones. Tampoco debe parecer tres negocios separados. Las divisiones comparten una marca, una dirección creativa, capacidades técnicas y un mismo estándar de trabajo.

### Posicionamiento central

**Digital Experiences & Intelligent Solutions**

Descriptor en español:

> Tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales.

La web debe permitir que una persona entienda rápidamente qué es AUTOMATA, explore sus tres divisiones, vea ejemplos concretos y encuentre una vía clara para iniciar una conversación.

## 2. Arquitectura de marca

AUTOMATA es la marca principal y contiene tres divisiones:

### DIGITAL

Diseño y construcción de soluciones digitales para organizaciones, negocios y proyectos.

Ámbitos iniciales:
- Sitios web y experiencias web.
- Sistemas y herramientas digitales.
- Asistentes inteligentes.
- Automatización e integración de procesos.
- Aplicaciones de IA aplicadas a necesidades concretas.

La comunicación debe centrarse en el problema y el resultado, no en una lista de tecnologías.

### EXPERIENCES

Diseño de experiencias digitales, interactivas y personalizadas para personas, celebraciones y marcas.

Línea inicial confirmada:
- Experiencias fotográficas para bodas y eventos.
- Recopilación comunitaria de fotografías.
- Álbum digital personalizado para los anfitriones.
- Tarjetas con códigos QR para facilitar la participación.
- Invitaciones, recuerdos y experiencias digitales personalizadas como líneas a explorar.

No presentar como disponibles funciones que todavía no estén implementadas o validadas.

### STUDIO

Producción creativa y audiovisual con capacidades tradicionales, digitales e híbridas.

Ámbitos iniciales:
- Producción audiovisual.
- Fotografía y contenido visual.
- Publicidad y campañas.
- Producción híbrida con herramientas de IA.
- Piezas y contenidos creativos para marcas y proyectos.

No reducir STUDIO a «publicidad con IA». La IA es una capacidad posible dentro del proceso, no la identidad completa de la división.

## 3. Principios de experiencia

1. **Claridad antes que espectacularidad.** El visitante debe comprender la oferta antes de encontrarse con animaciones o efectos.
2. **Una marca, tres puertas de entrada.** Las divisiones deben distinguirse sin fragmentar la identidad.
3. **Mostrar antes que prometer.** Priorizar ejemplos, demostraciones y resultados verificables.
4. **Profundidad progresiva.** La home introduce; las páginas de división explican; las fichas de producto/proyecto detallan.
5. **Interactividad con propósito.** Cada interacción debe ayudar a comprender, explorar o contactar.
6. **Rendimiento primero.** No introducir vídeo pesado, animación continua, librerías o recursos externos sin una justificación clara.
7. **Accesibilidad desde el diseño.** Contraste, teclado, etiquetas, foco visible y respeto por `prefers-reduced-motion`.
8. **Transparencia comercial.** Diferenciar producto disponible, solución a medida, demo, piloto y concepto.
9. **Conversión sin presión.** El asistente acompaña la exploración; no debe invadir ni interrumpir la lectura.
10. **Contenido sostenible.** La estructura debe permitir agregar productos sin convertir la home en un catálogo interminable.

## 4. Arquitectura de información

La estructura recomendada es:

- Inicio
- Digital
- Experiences
- Studio
- Proyectos
- Contacto

Las páginas de división deben poder enlazarse directamente y tener contenido propio. Las fichas individuales de proyectos o productos se incorporarán cuando exista contenido suficiente y verificable.

La navegación detallada está documentada en `docs/SITEMAP-WEB-V2.md`.

## 5. Arquitectura funcional del frontend

### Estado actual observado en V1

El repositorio actual contiene:
- React 18, TypeScript y Vite.
- Tailwind CSS y Lucide.
- `App.tsx` concentra la composición principal, secciones y buena parte de la lógica de las demostraciones.
- Componentes independientes: `ChatWidget.tsx`, `CookieConsent.tsx` y `NewsletterSignup.tsx`.
- Analítica en `analytics.ts`.
- Backend separado en `worker/src/index.ts`, con Cloudflare Worker y D1.
- Despliegue web mediante GitHub Pages y workflows de GitHub Actions.

La V1 no incorpora actualmente una librería de routing en las dependencias declaradas. No asumir que existe navegación multipágina ni añadir una dependencia sin evaluar la estrategia de publicación.

### Organización objetivo propuesta

La siguiente estructura es una guía de destino, no una instrucción para mover todo de una vez:

```text
src/
├── app/
│   ├── App.tsx
│   └── routes/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── shared/
│   └── assistant/
├── sections/
│   └── home/
├── divisions/
│   ├── digital/
│   ├── experiences/
│   └── studio/
├── projects/
├── demos/
│   ├── restaurant/
│   ├── clinic/
│   └── salon/
├── services/
├── styles/
└── assets/
```

Los nombres y límites finales de carpetas se validarán contra el código real antes de la refactorización. No crear abstracciones vacías ni carpetas sin un uso concreto.

### Criterio de modularización

- Separar composición de página, componentes compartidos y lógica de dominio.
- Mantener cada demo aislada de las páginas institucionales.
- Evitar un único componente gigante para toda la web.
- No duplicar componentes visuales equivalentes entre divisiones.
- No crear un sistema de diseño complejo antes de identificar patrones repetidos.
- Mantener tipado estricto y evitar dependencias innecesarias.

## 6. Estrategia de rutas y publicación

La V1 utiliza Vite con `base: "/"` y GitHub Pages en el dominio raíz `automata-bo.github.io`.

Antes de implementar rutas como `/digital/`, `/experiences/` y `/studio/`, realizar una prueba técnica de publicación y acceso directo a rutas profundas.

Evaluar:
1. Vite multipage con entradas HTML por página.
2. Enrutamiento SPA con fallback `404.html`.
3. Estrategia de metadatos por página y previsualización en redes sociales.

**Criterio de aceptación:** cada URL pública debe cargar directamente al pegarla en el navegador, actualizarse sin error y exponer metadatos correctos para compartirla. No elegir una solución solo porque funciona navegando desde la home.

No desplegar rutas nuevas hasta verificar el comportamiento real de GitHub Pages.

## 7. Asistente comercial y servicios existentes

El asistente Autómata debe mantenerse como punto transversal de consulta y orientación.

Debe:
- Comprender qué división o necesidad corresponde a la consulta.
- Hacer preguntas de contexto antes de recomendar.
- No inventar precios, plazos, clientes, resultados ni capacidades.
- Diferenciar servicios disponibles, demos y soluciones por desarrollar.
- Preparar un resumen editable.
- Abrir WhatsApp únicamente después de que el visitante revise y autorice el contenido.

La actualización de su catálogo, instrucciones y respuestas debe realizarse en una tarea separada y coordinada con el contenido comercial aprobado.

## 8. Infraestructura que se conserva

Fuera del alcance de la renovación visual, salvo evidencia técnica que justifique cambios:

- Cloudflare Worker del asistente.
- Cloudflare D1 y sus migraciones.
- Variables y secretos de proveedor.
- Controles de CORS, límites y validaciones del Worker.
- Consentimiento analítico.
- Registro de suscripciones.
- Transferencia autorizada a WhatsApp.
- Workflows de CI y despliegue.

No modificar endpoints, bindings, nombres de recursos, secretos ni datos de producción como parte de una refactorización visual.

## 9. Rendimiento y privacidad

- No cargar vídeos de fondo automáticamente en móvil.
- Usar imágenes optimizadas, dimensiones explícitas y carga diferida fuera del primer viewport.
- Evitar dependencias grandes para animaciones menores.
- Respetar el consentimiento analítico ya implementado.
- No enviar textos de conversación a la analítica.
- No persistir conversaciones por comodidad sin una decisión expresa y una revisión de privacidad.
- No incluir claves privadas en el frontend.
- Mantener la transferencia a WhatsApp bajo autorización explícita.

## 10. Criterios de aceptación global

La arquitectura V2 estará lista para pasar a implementación cuando:

- Las tres divisiones tengan propósito, alcance y lenguaje definidos.
- El sitemap y los recorridos principales estén aprobados.
- Los contenidos estén clasificados por estado de disponibilidad.
- La estrategia de rutas y metadatos haya sido probada.
- La home tenga jerarquía de contenido y wireframe.
- Se haya definido qué se reutiliza de V1.
- Se haya definido qué infraestructura queda fuera de alcance.
- Exista un plan de pruebas responsive, accesibilidad y rendimiento.

## 11. Registro de decisiones pendientes

No cerrar sin validación:
- Si «Proyectos» será una página independiente o una sección de la home en la primera entrega.
- Si cada división tendrá catálogo de productos desde el lanzamiento o una presentación editorial inicial.
- Qué productos de Experiences se lanzarán primero y cuáles son conceptos.
- Qué trabajos reales pueden mostrarse públicamente.
- La solución técnica final de rutas y metadatos.
- La dirección visual final de cada división dentro del sistema común.

---

**Regla de trabajo:** este documento define la dirección arquitectónica. No autoriza a inventar contenido, modificar backend ni desplegar cambios de interfaz sin completar las decisiones y pruebas correspondientes.
