# Arquitectura web AUTOMATA 2.0

**Estado:** arquitectura aprobada e implementada parcialmente en la rama V2. La base multipágina está construida; falta QA visual/funcional y aprobación antes de publicar.  
**Base:** repositorio `automata-bo/automata-bo.github.io`, rama `main` como V1.  
**Rama de trabajo:** `feature/automata-web-v2-architecture`.

## 1. Propósito

Evolucionar el sitio desde una presentación centrada principalmente en automatización para negocios hacia la web institucional y comercial de AUTOMATA como estudio que diseña y construye experiencias digitales y soluciones inteligentes.

La web debe explicar con claridad qué es AUTOMATA, qué capacidades reúne, qué productos o servicios se pueden contratar y cómo iniciar una conversación. No debe parecer tres empresas separadas ni un catálogo indiscriminado.

## 2. Posicionamiento

**Marca:** AUTOMATA  
**Descriptor:** Digital Experiences & Intelligent Solutions  
**Descripción en español:** Tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales.

AUTOMATA integra desarrollo tecnológico, creatividad, comunicación y producción. Primero comprende el objetivo; después define qué solución tiene sentido. No se debe prometer resultados, funcionalidades, precios ni plazos sin evidencia o validación.

## 3. Arquitectura de marca

Las tres divisiones son capacidades comerciales de una misma marca, no empresas independientes.

### AUTOMATA Digital
**Promesa:** Construimos soluciones digitales.

Ámbitos:
- Sitios web institucionales, corporativos y landing pages.
- Catálogos y experiencias web orientadas a consultas.
- Aplicaciones y sistemas web a medida.
- Asistentes digitales para web y mensajería.
- Flujos de pedidos, solicitudes, citas y reservas.
- Automatización de procesos e integraciones.
- IA aplicada con límites, reglas y supervisión adecuados.

### AUTOMATA Experiences
**Promesa:** Creamos experiencias digitales memorables.

Ámbitos:
- Invitaciones digitales e interactivas.
- Regalos digitales y narrativas personalizadas.
- Experiencias para bodas y celebraciones.
- Galerías privadas y álbumes comunitarios.
- Recopilación colaborativa de fotografías y mensajes mediante enlaces o QR.
- Dinámicas interactivas, juegos y recorridos para eventos.
- Integración de soportes digitales con tarjetas y objetos físicos.

La experiencia de bodas con QR y álbum comunitario es una línea de producto a desarrollar y comercializar mediante proyectos personalizados. No describirla como plataforma genérica lista ni asumir que todos sus componentes ya están implementados.

### AUTOMATA Studio
**Promesa:** Producimos comunicación y contenido creativo.

Ámbitos:
- Producción audiovisual y videos promocionales.
- Publicidad, campañas y conceptos creativos.
- Fotografía, diseño y contenido para redes.
- Producción híbrida con grabación real, edición y herramientas de IA.
- Narrativas y piezas multimedia para proyectos comerciales, institucionales y culturales.

## 4. Relación entre divisiones

Las divisiones pueden contratarse por separado o combinarse. Ejemplos:
- Digital + Studio: sitio institucional acompañado de fotografía y video.
- Experiences + Studio: experiencia para evento con identidad visual, fotografía y piezas audiovisuales.
- Digital + Experiences: micrositio o plataforma de participación vinculada a una experiencia.

La página debe mostrar esta integración sin obligar al visitante a entender el organigrama antes de encontrar lo que necesita.

## 5. Experiencia y jerarquía de información

Orden recomendado para la home:
1. Hero institucional: qué es AUTOMATA y qué hace posible.
2. Las tres divisiones: acceso claro a Digital, Experiences y Studio.
3. Soluciones o experiencias destacadas: ejemplos concretos, no una lista interminable.
4. Proyectos y demostraciones: separar trabajo real, demos funcionales y conceptos.
5. Método de trabajo: comprender, evaluar, recomendar, definir y construir.
6. Cierre comercial: conversación con el equipo o asistente.

El asistente comercial debe ser transversal, accesible desde las páginas principales y secundarias, pero no competir con el mensaje institucional ni dominar toda la interfaz.

## 6. Arquitectura de navegación

Navegación principal propuesta:
- Inicio
- Digital
- Experiences
- Studio
- Proyectos
- Contacto

El acceso a Autómata se mantiene como CTA persistente y contextual.

Las rutas definitivas se validarán contra la configuración real de Vite y GitHub Pages antes de implementarlas. No introducir un router ni cambiar la estrategia de despliegue sin comprobar el impacto en rutas profundas, recarga directa y enlaces compartidos.

## 7. Principios visuales

Conservar los activos reconocibles de V1:
- Naranja AUTOMATA como acento principal.
- Carbón, blanco y neutros como base.
- Tipografía de carácter fuerte para titulares y tipografía legible para texto.
- Composición editorial, tarjetas limpias y demostraciones interactivas.
- Identidad del asistente Autómata.

Evolucionar la interfaz:
- Dar personalidad visual diferenciada a cada división sin crear tres marcas desconectadas.
- Priorizar imágenes y ejemplos que expliquen el resultado, no decoración tecnológica genérica.
- Mantener jerarquía, ritmo y espacios; evitar convertir la home en una página interminable.
- Animaciones discretas, respetando `prefers-reduced-motion`.
- Diseño mobile-first, carga ligera y controles accesibles.

## 8. Arquitectura técnica y restricciones

### Base comprobada en V1
- React 18, TypeScript y Vite.
- Tailwind CSS y Lucide.
- `App.tsx` contiene la página institucional, secciones y lógica de demos.
- `ChatWidget.tsx` implementa el asistente y transferencia contextual.
- `CookieConsent.tsx` controla consentimiento analítico.
- `NewsletterSignup.tsx` gestiona suscripciones.
- `analytics.ts` contiene eventos del navegador.
- Cloudflare Worker y D1 soportan funciones de backend.
- GitHub Pages aloja el sitio; GitHub Actions participa en despliegue.

### Regla de migración
No reescribir ni sustituir backend, Worker, D1, chat, consentimiento, analítica o suscripciones como parte del rediseño visual. Mantener contratos y comportamiento existentes. Cualquier cambio debe justificarse, documentarse y probarse por separado.

### Modularización objetivo
La separación propuesta es conceptual y debe adaptarse al árbol real antes de mover archivos:

```text
src/
  app/
    App.tsx
    routes/
  components/
    layout/
    shared/
    assistant/
  sections/
    home/
  divisions/
    digital/
    experiences/
    studio/
  projects/
  demos/
    restaurant/
    clinic/
    salon/
  services/
  styles/
  assets/
```

No realizar una migración masiva de archivos en un único cambio. Extraer primero componentes estables y probar después de cada etapa.

## 9. Contenido y veracidad comercial

Cada ficha, sección o tarjeta debe tener un estado editorial:
- **Disponible:** existe una oferta definida y se puede iniciar una contratación.
- **A medida:** se desarrolla tras definir alcance y viabilidad.
- **Demostración:** experiencia simulada para explicar una capacidad.
- **En desarrollo:** concepto o producto que aún no debe venderse como terminado.

No presentar demos de restaurante, consultorio o peluquería como integraciones reales. No afirmar que una solicitud de cita o pedido está confirmada si no existe conexión real con el negocio.

## 10. Rendimiento, accesibilidad y privacidad

- No añadir librerías pesadas si CSS o componentes existentes resuelven la necesidad.
- Optimizar imágenes, formatos, dimensiones y carga diferida.
- Evitar video de fondo y animaciones que bloqueen la carga o distraigan.
- Mantener contraste, foco visible, navegación por teclado y etiquetas accesibles.
- Respetar movimiento reducido.
- Mantener consentimiento analítico y no enviar eventos de analítica antes de autorización.
- No enviar claves o secretos al navegador ni incorporarlos al repositorio.
- Mantener separada la autorización para compartir un resumen con WhatsApp.

## 11. Criterios de aceptación de la arquitectura

- La marca se entiende como un estudio integrado con tres divisiones.
- Cada división tiene una promesa y alcance diferenciados.
- La home presenta el ecosistema sin convertirse en un catálogo infinito.
- Los visitantes pueden identificar qué solución corresponde a su necesidad.
- Demos, productos disponibles y propuestas a medida están claramente diferenciados.
- El asistente y las funciones existentes siguen operativos.
- La navegación funciona en escritorio y móvil, incluyendo recargas y enlaces directos.
- No se degrada el rendimiento, la accesibilidad ni la privacidad.

## 12. Estado de implementación y siguientes pasos

### Implementado en la rama V2
- Sitio institucional multipágina con Inicio, Digital, Experiences, Studio, Proyectos y Contacto.
- Navegación compartida y diseño responsive inicial.
- Metadatos y canonical por página; sitemap y robots actualizados.
- Demos V1 preservadas en `/demos/`, sin indexación.
- Chat, consentimiento y analítica existentes reutilizados.
- Configuración Vite multipágina y entrada React V2.
- Pull Request de revisión #9 abierto como borrador; `main` no ha sido modificado ni publicado.

### Pendiente antes de publicar
1. Confirmar compilación después de los últimos cambios.
2. Revisar visualmente móvil, tablet y escritorio.
3. Probar enlaces, menú móvil, navegación directa y recarga de todas las rutas.
4. Verificar chat, consentimiento, analítica y conexiones al Worker.
5. Aprobar contenido, material visual y presentación comercial.
6. Preparar una vista previa aislada de producción o acordar el entorno de preview.
7. Recibir aprobación explícita antes de fusionar y desplegar.

**La implementación está en una rama de revisión. No equivale a una publicación ni a una aprobación comercial final.**

## 13. Contexto de origen del asistente

- Los puntos de entrada del asistente en Inicio, Digital, Experiences, Studio, Proyectos y Contacto transmiten un identificador de página permitido.
- El frontend envía ese identificador junto al historial de conversación; no envía texto libre de la URL ni datos personales para este propósito.
- El Worker valida el identificador contra una lista cerrada y convierte el valor en una etiqueta editorial antes de incorporarlo a las instrucciones del modelo.
- El contexto se describe expresamente como metadato de navegación, no como una necesidad ni una declaración del visitante.
- El asistente debe confirmar el objetivo real de la persona y no asumir que busca contratar la división desde la que abrió el chat.
- Las solicitudes antiguas sin el campo `source` siguen siendo válidas y se procesan con origen no identificado.

## 14. Brief de proyecto en Contacto

- La página Contacto incluye un formulario breve para preparar una primera consulta: nombre y organización opcionales, área de interés y objetivo requerido.
- El formulario funciona en el navegador. No realiza una petición al Worker ni guarda las respuestas en AUTOMATA.
- Al enviarlo, abre WhatsApp con un borrador dirigido al número comercial configurado; la persona revisa el texto y decide si lo envía.
- La página también conserva el acceso al asistente conversacional para quien prefiera ordenar la consulta antes de contactar al equipo.
- El texto de interfaz debe mantener esta distinción: preparar un mensaje no equivale a enviarlo ni confirma disponibilidad, cotización o contratación.

### Presentación contextual del asistente

- Si la conversación aún no tiene mensajes del visitante, el saludo inicial y las preguntas rápidas se adaptan a la página desde la que se abrió el chat.
- Si ya existe una conversación, cambiar el origen no reemplaza el historial ni borra lo que la persona compartió.
- Las preguntas rápidas son puntos de partida, no categorías obligatorias ni una inferencia sobre la intención del visitante.


## 15. Demo de invitación digital (11 nov 2026)

Se añadió la ruta `/experiences/demo/` como demostración interactiva de una invitación para bodas. Incluye datos ilustrativos del evento y un flujo de confirmación de asistencia en el navegador. La respuesta se mantiene únicamente en el estado temporal de la página: no se envía a un servidor, no se almacena y se pierde al recargar. La ruta lleva `noindex, nofollow` y no se incorpora al sitemap. Esta demo valida presentación y recorrido de interfaz; no representa todavía un sistema real de gestión de invitados, notificaciones, QR individual ni almacenamiento de RSVP. Para convertirla en producto comercial se requiere diseñar persistencia, administración de eventos, privacidad y consentimiento.


## 16. AUTOMATA Studio Creative Lab y showroom de proyectos (11 nov 2026)

Se añadió `/studio/lab/`, un prototipo interactivo de brief creativo que permite definir marca, producto/servicio, público, objetivo y formato. Presenta una idea central, secuencia narrativa y CTA; permite copiar el brief. La lógica usa estructuras predefinidas en el navegador: no llama a un modelo de IA, no genera piezas audiovisuales y no almacena datos. Debe presentarse como prototipo de proceso creativo, no como generador IA ni como producción final.

La página `/proyectos/` pasa a funcionar como showroom de tres demostraciones: flujos de negocio (`/demos/`), invitación de boda (`/experiences/demo/`) y Creative Lab (`/studio/lab/`). Cada tarjeta indica el estado y las limitaciones de su experiencia. Los casos reales se mantienen separados y solo se publicarán con material, permisos y contexto verificables. La ruta Creative Lab está marcada `noindex, nofollow` y no se incorpora al sitemap.


## 17. Acceso al Experience Lab desde Inicio (11 nov 2026)

La portada incorpora una sección de demostraciones interactivas con enlaces directos a las tres experiencias del showroom: flujos Digital, invitación Experiences y Creative Lab de Studio. El objetivo es que la web demuestre capacidades desde el primer recorrido, sin exigir que el visitante conozca previamente la sección Proyectos. Cada experiencia mantiene sus etiquetas y límites; no se presentan simulaciones como operaciones reales ni prototipos como servicios productivos.

## 18. Asesor comercial contextual y catálogo de productos (11 nov 2026)

La V2 incorpora el primer tramo de la experiencia **A website that talks back**: el asistente único puede recibir el contexto de un producto seleccionado, además del origen de navegación que ya recibía.

- Los puntos de entrada de Digital, Experiences y Studio pueden abrir el mismo asistente con `productId` y una acción (`explore`, `experience` o `proposal`).
- El frontend solo transmite identificadores permitidos; no envía descripciones libres para convertirlas en instrucciones del sistema.
- El Worker mantiene una lista controlada de productos con división, estado comercial, descripción y límites confirmados. Valida el identificador recibido y construye el contexto desde esa lista.
- El saludo contextual indica qué producto estaba explorando la persona, sin asumir que ya tiene intención de compra ni obligarla a explicar qué estaba mirando.
- El asistente debe explicar y orientar, descubrir la necesidad real y reconocer las limitaciones. Una solicitud de demostración no autoriza a inventar una demo o un enlace; una solicitud de propuesta requiere descubrir el alcance.
- Se añadieron acciones **Explore this solution** en las fichas de Digital, Experiences y Studio. En Experiences se conserva por separado **View experience** para abrir la demostración existente.
- El catálogo inicial cubre sitios y experiencias web, asistentes digitales, automatización e integraciones, experiencias para bodas y celebraciones, producción audiovisual y publicidad/campañas.
- Este es un catálogo inicial controlado en el Worker, no todavía un CMS ni un panel de administración. La siguiente etapa será normalizar las fichas y definir cómo se mantienen sin duplicar datos entre interfaz y backend.

La conversación existente no se borra al abrir un nuevo punto de entrada. El contexto del producto se actualiza para las siguientes consultas; el historial continúa siendo el de la misma sesión.