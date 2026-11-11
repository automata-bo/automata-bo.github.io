# AUTOMATA 2.0 — Sitemap y recorridos

**Estado:** propuesta de información y navegación  
**Versión:** 0.1  
**Documento relacionado:** `docs/ARQUITECTURA-WEB-V2.md`

---

## 1. Objetivo

Organizar la web para que el visitante pueda:
1. Comprender qué es AUTOMATA.
2. Identificar qué división responde a su necesidad.
3. Explorar ejemplos o capacidades concretas.
4. Entender cómo trabajamos.
5. Iniciar una consulta sin fricción.

La navegación debe ser corta. No convertir el menú principal en un inventario de todos los servicios.

## 2. Navegación principal propuesta

| Elemento | Destino propuesto | Objetivo |
|---|---|---|
| Inicio | `/` | Presentación de la marca y acceso al ecosistema |
| Digital | `/digital/` | Soluciones tecnológicas |
| Experiences | `/experiences/` | Experiencias digitales e interactivas |
| Studio | `/studio/` | Producción creativa y audiovisual |
| Proyectos | `/proyectos/` | Casos, muestras y demostraciones verificables |
| Contacto | `/#contacto` o página dedicada | Iniciar una consulta |

Los paths son propuestas semánticas. Su implementación depende de la prueba técnica de rutas descrita en la arquitectura.

## 3. Home — recorrido y secciones

Orden recomendado:

### H01. Hero institucional
- Presentar AUTOMATA.
- Comunicar el posicionamiento «Digital Experiences & Intelligent Solutions».
- Explicar brevemente el descriptor en español.
- CTA primario: explorar las divisiones.
- CTA secundario: conversar con Autómata.

### H02. Ecosistema
- Presentar DIGITAL, EXPERIENCES y STUDIO.
- Una frase de valor por división.
- Enlaces claros a sus páginas.
- Evitar repetir descripciones extensas en las tres tarjetas.

### H03. Experiencias y soluciones destacadas
- Selección editorial de productos o capacidades.
- Mostrar solo elementos aprobados para comunicación pública.
- Etiquetar cada elemento por división y estado.

### H04. Proyectos y demostraciones
- Proyectos reales con autorización para publicarse.
- Demos identificadas como simulaciones.
- Conceptos identificados como exploraciones.
- No usar testimonios, métricas ni marcas de clientes sin evidencia y autorización.

### H05. Cómo trabajamos
- Comprender.
- Diseñar.
- Construir.
- Implementar.
- Acompañar.

El texto debe explicar el enfoque sin convertir la sección en una explicación técnica extensa.

### H06. Cierre y contacto
- CTA a Autómata.
- Alternativa de contacto humano.
- Mantener visible que WhatsApp se abre después de revisar y autorizar el resumen, cuando corresponda.

## 4. Página DIGITAL

Objetivo: mostrar cómo AUTOMATA convierte necesidades operativas o de comunicación en soluciones digitales.

Estructura sugerida:
1. Hero: promesa de la división.
2. Problemas y oportunidades que aborda.
3. Capacidades: web, sistemas, asistentes, automatización e IA.
4. Soluciones o productos destacados.
5. Demos disponibles.
6. Proceso de trabajo.
7. CTA de consulta.

### Demos heredadas de V1

- Restaurante: menú y registro de pedido simulado.
- Consultorio: solicitud de cita simulada.
- Peluquería: solicitud de reserva simulada.

Mantener el aviso de que las acciones no generan pedidos, citas ni reservas reales. Las demos no deben confundirse con integraciones operativas.

## 5. Página EXPERIENCES

Objetivo: presentar experiencias digitales y personalizadas que conectan tecnología con momentos, personas y marcas.

Estructura sugerida:
1. Hero emocional y visual.
2. Qué entendemos por experiencia.
3. Experiencia destacada: bodas y eventos.
4. Cómo participa el invitado.
5. Qué reciben los anfitriones.
6. Personalización y opciones.
7. Galería o demostración cuando exista material autorizado.
8. CTA de consulta.

### Producto inicial: experiencia fotográfica para bodas

Flujo conceptual que debe validarse antes de prometer disponibilidad:
1. Los invitados reciben o encuentran una tarjeta con QR.
2. Acceden a una experiencia digital para aportar fotografías.
3. Las imágenes se recopilan en un álbum comunitario personalizado.
4. Los novios reciben el álbum como recuerdo.

Pendiente de especificación funcional:
- Método de captura y carga.
- Identificación o anonimato de participantes.
- Moderación y eliminación de contenido.
- Almacenamiento, duración y descarga.
- Consentimiento de invitados y tratamiento de imágenes.
- Límites de archivos y conectividad.
- Diseño, personalización y entrega del álbum.

No publicar detalles de seguridad, privacidad o capacidad de almacenamiento hasta definirlos.

## 6. Página STUDIO

Objetivo: comunicar una capacidad creativa y de producción, no una herramienta específica.

Estructura sugerida:
1. Hero audiovisual.
2. Enfoque creativo y de producción.
3. Capacidades: publicidad, fotografía, vídeo y contenido.
4. Producción tradicional, digital e híbrida.
5. Muestras de trabajos autorizados.
6. Proceso creativo y producción.
7. CTA para proyectos y campañas.

No afirmar disponibilidad de equipos, locaciones, personal, derechos o capacidades de producción que no hayan sido confirmados.

## 7. Página PROYECTOS

Objetivo: ofrecer evidencia del trabajo y permitir explorar casos por división.

Filtros posibles:
- Digital.
- Experiences.
- Studio.

Cada ficha debe incluir, cuando corresponda:
- Nombre del proyecto o producto.
- División.
- Estado: publicado, piloto, demo o concepto.
- Problema u objetivo.
- Qué se diseñó o construyó.
- Alcance real.
- Imágenes o demostración autorizadas.
- Enlace de exploración, si está disponible.

No inventar clientes, testimonios, métricas, resultados ni fechas.

Si al lanzamiento no existe suficiente material verificable, utilizar una sección breve de proyectos destacados en la home y posponer la página independiente.

## 8. Contacto y asistente

Autómata debe estar disponible desde la navegación y desde las páginas de división.

Contexto recomendado al abrirlo:
- Desde DIGITAL: consulta sobre soluciones digitales.
- Desde EXPERIENCES: consulta sobre experiencias y eventos.
- Desde STUDIO: consulta sobre producción creativa.

El contexto de origen puede orientar la primera pregunta, pero no debe encerrar al visitante en una división ni alterar sus datos sin que lo sepa.

El contacto humano y la transferencia a WhatsApp deben seguir el mecanismo de revisión y autorización existente.

## 9. Recorridos principales

### Recorrido A — negocio que busca una solución
Home → Digital → capacidad o demo → Autómata → resumen autorizado → WhatsApp.

### Recorrido B — persona que organiza una boda o evento
Home → Experiences → experiencia fotográfica → explicación del flujo → Autómata → consulta humana.

### Recorrido C — marca que necesita contenido
Home → Studio → capacidades y muestras → Autómata → consulta humana.

### Recorrido D — visitante que quiere conocer el trabajo
Home → Proyectos → ficha de proyecto o demo → división correspondiente → contacto.

### Recorrido E — visitante que todavía no sabe qué necesita
Home → Autómata → preguntas de contexto → orientación → siguiente paso.

## 10. Reglas de navegación

- Mantener el menú principal visible y consistente.
- Mostrar claramente la división activa.
- Evitar menús desplegables profundos.
- Cada página debe tener un CTA principal y una salida clara.
- No abrir el asistente automáticamente.
- En móvil, priorizar navegación compacta y botones accesibles.
- Mantener URLs compartibles y metadatos específicos por página.
- Evitar enlaces a páginas vacías o a productos sin información aprobada.

## 11. Criterios para decidir qué se publica

| Estado | Tratamiento |
|---|---|
| Disponible | Puede presentarse como producto o servicio disponible, con alcance comprobado |
| Piloto | Indicar que está en validación o implementación piloto |
| Demo | Identificar explícitamente como demostración o simulación |
| Concepto | Presentar como exploración, no como oferta disponible |
| Interno | No publicar |

---

**Criterio de cierre:** el sitemap está listo cuando cada página tiene objetivo, público, contenido mínimo, CTA y estado de publicación definidos.
