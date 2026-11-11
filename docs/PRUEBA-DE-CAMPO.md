# Protocolo de prueba de campo del asesor comercial

**Estado:** preparado para revisión; todavía no autoriza despliegue ni contacto con participantes.  
**Versión objetivo:** AUTOMATA Web V2, rama `feature/automata-web-v2-architecture`.  
**Tamaño inicial:** 5 a 10 negocios o proyectos.  
**Propósito:** validar comprensión, orientación y utilidad del asesor antes de ofrecerlo como parte de una experiencia comercial real.

## 1. Qué queremos comprobar

La prueba no busca demostrar que el asistente conversa de forma simpática. Busca comprobar que ayuda a una persona a entender su problema y elegir un siguiente paso razonable.

Preguntas principales:

1. ¿Comprende qué tipo de negocio, organización, evento o proyecto tiene la persona?
2. ¿Identifica la necesidad sin obligarla a llenar un formulario?
3. ¿Evita repetir preguntas ya respondidas?
4. ¿Prioriza la necesidad real sobre la ficha o división desde la que se abrió el chat?
5. ¿Recomienda una opción pertinente y explica por qué?
6. ¿Reconoce cuándo no conviene contratar todavía o cuándo falta información?
7. ¿Distingue correctamente servicios disponibles, evaluación a medida, simulaciones y prototipos?
8. ¿La persona entiende qué puede hacer AUTOMATA y cuál sería el siguiente paso?

## 2. Alcance y límites

### Incluido

- Conversaciones de descubrimiento y orientación.
- Entradas desde Inicio y fichas de Digital, Experiences y Studio.
- Preguntas sobre capacidades, demostraciones, límites y solicitud de propuesta.
- Uso en móvil y escritorio.
- Observación de comprensión, confianza, claridad y fricción.

### Fuera de alcance

- Cobros, reservas, pedidos o citas reales.
- Integraciones con sistemas de participantes.
- Envío automático de propuestas o cotizaciones.
- Promesas de ventas, ahorro, conversiones o resultados.
- Prueba con datos personales, financieros, clínicos o confidenciales.
- Publicación, merge o despliegue a producción como parte de este protocolo.

Las demos actuales siguen siendo simulaciones o prototipos según lo indicado en el catálogo. No deben presentarse como instalaciones operativas.

## 3. Selección de participantes

Invitar entre 5 y 10 personas que conozcan la operación o atención de un negocio/proyecto. Buscar variedad, no una muestra estadística:

- 1–2 negocios de atención presencial (por ejemplo, cafetería, restaurante o tienda).
- 1–2 profesionales o servicios con consultas frecuentes (por ejemplo, consultorio u oficina).
- 1–2 negocios que vendan productos o reciban pedidos por mensajería.
- 1–2 personas con un evento o proyecto personal/creativo.
- Completar con otros rubros disponibles sin forzar categorías.

Criterios:
- La persona debe conocer cómo llegan y se atienden las consultas.
- Participación voluntaria.
- No es necesario que tenga interés en contratar.
- No reclutar solo amistades que quieran agradar al equipo.
- Registrar el rubro de forma general; no hace falta publicar nombres de negocios.

## 4. Preparación antes de cada sesión

1. Usar una versión de prueba aislada, local o de preview autorizada. No usar el Worker ni la web de producción para experimentar sin autorización explícita.
2. Confirmar que el proveedor real de IA está configurado en ese entorno y que las claves permanecen en variables/secretos, nunca en el navegador ni en el repositorio.
3. Comprobar límites de uso, coste y manejo de errores del proveedor.
4. Revisar que el catálogo y las demos muestran sus estados y limitaciones correctos.
5. Probar en un teléfono y un navegador de escritorio.
6. Preparar una hoja de observación sin transcripciones por defecto.
7. Explicar a la persona qué se está probando, qué datos se observarán y que puede detenerse en cualquier momento.

Si todavía no existe un entorno aislado con proveedor real, la sesión debe limitarse a una prueba guiada no productiva o posponerse. Las pruebas con proveedor simulado no sustituyen la validación semántica con un modelo real.

## 5. Guion de sesión (15–20 minutos)

### A. Introducción (2 minutos)

Explicar:

> Estamos probando una nueva forma de orientar a visitantes que llegan a AUTOMATA. No estamos evaluándote a ti ni intentando venderte algo. Queremos saber si las preguntas y recomendaciones se entienden y si realmente ayudan. Puedes detener la prueba cuando quieras. No compartas datos privados ni información de clientes.

Solicitar consentimiento explícito antes de iniciar la observación. Si no acepta, no registrar datos de la sesión.

### B. Exploración libre (5–7 minutos)

Pedir a la persona que use el asesor como lo haría si encontrara AUTOMATA por primera vez.

No sugerir respuestas ni corregir al asistente durante la primera interacción. Observar:

- Qué cree que hace el asistente.
- Si entiende la primera pregunta.
- Si describe su negocio/necesidad con naturalidad.
- En qué momento duda, abandona o pide aclaración.
- Si la recomendación coincide con el problema que quería resolver.

### C. Tareas dirigidas (5–7 minutos)

Elegir dos o tres escenarios pertinentes al participante:

1. **Necesidad ya explicada:** comenzar con un mensaje que contenga rubro y problema para comprobar que no repite el descubrimiento.
2. **Entrada contextual:** abrir desde una ficha de producto y expresar una necesidad distinta para comprobar que la necesidad prevalece sobre la ficha.
3. **No recomendar todavía:** describir una situación donde primero conviene ordenar oferta, proceso o información.
4. **Demo:** preguntar qué demuestra y qué no demuestra una simulación.
5. **Propuesta:** pedir avanzar hacia una propuesta y comprobar si solicita solo el dato decisivo que falta.

No ejecutar todos los escenarios si la sesión se vuelve artificial. Priorizar situaciones reales del participante.

### D. Cierre (3–4 minutos)

Preguntar:
- ¿Qué entendiste que AUTOMATA podría ayudarte a resolver?
- ¿La recomendación tuvo sentido para tu situación? ¿Por qué?
- ¿Qué parte fue confusa, repetitiva o poco creíble?
- ¿Qué esperabas que ocurriera y no ocurrió?
- ¿Cuál sería el siguiente paso que tomarías después de esta conversación?

No pedir una valoración positiva ni inducir interés comercial.

## 6. Hoja de observación

Registrar por sesión, usando un identificador como P01, P02, etc.:

| Campo | Registro |
|---|---|
| ID de sesión | P01–P10 |
| Rubro general | Categoría amplia, sin nombre comercial |
| Dispositivo | Móvil / escritorio |
| Punto de entrada | Inicio / Digital / Experiences / Studio / otro |
| Contexto comprendido | Sí / parcial / no |
| Necesidad comprendida | Sí / parcial / no |
| Preguntas repetidas | Número y descripción breve |
| Recomendación pertinente | Sí / parcial / no / insuficiente información |
| Límites y estado de demo correctos | Sí / no / no aplica |
| Siguiente paso entendido | Sí / parcial / no |
| Fricción principal | Nota breve, sin datos sensibles |
| Comentario del participante | Resumen parafraseado, no transcripción |

No almacenar transcripciones completas por defecto. Si una grabación o transcripción fuera necesaria para una investigación posterior, debe solicitarse consentimiento separado, definir quién accede, cuánto tiempo se conserva y cómo se elimina.

## 7. Indicadores y criterios provisionales

Con una muestra de 5–10 sesiones los resultados serán señales cualitativas, no evidencia estadística ni garantía de comportamiento general.

| Indicador | Cómo observarlo | Señal inicial deseada |
|---|---|---|
| Comprensión de contexto | El asesor identifica el tipo de negocio/proyecto sin asumirlo | 4 de 5 sesiones o más |
| Comprensión de necesidad | La recomendación refleja el problema expresado | 4 de 5 o más |
| No repetición | No vuelve a preguntar lo que ya fue respondido | 4 de 5 o más |
| Pertinencia | El participante reconoce la recomendación como relacionada con su situación | 4 de 5 o más |
| Honestidad comercial | No inventa capacidades, integraciones, precios ni estados de demo | 100% de sesiones |
| Siguiente paso | El participante puede explicar qué podría hacer después | 4 de 5 o más |
| Errores críticos | Fuga de datos, solicitud de información sensible, promesa falsa o acción no autorizada | Cero |

Los umbrales son criterios internos iniciales para decidir qué corregir, no resultados ya alcanzados. Un solo error crítico obliga a detener, documentar y corregir antes de ampliar la prueba.

## 8. Privacidad y manejo de datos

- Informar el propósito de la prueba y solicitar consentimiento antes de registrar observaciones.
- Recoger el mínimo de información necesario.
- No solicitar ni registrar contraseñas, datos bancarios, documentos de identidad, información clínica ni datos de clientes.
- No copiar conversaciones reales de clientes al entorno de prueba.
- No activar grabación de audio, video o pantalla por defecto.
- No almacenar contenido de conversación para analítica por defecto.
- Separar métricas de uso de cualquier información identificable.
- Limitar el acceso a las notas al equipo que realiza la evaluación.
- Definir una fecha de eliminación de las notas identificables antes de comenzar.
- Si el participante retira su consentimiento, detener el registro y eliminar sus notas identificables.

## 9. Instrumentación técnica: propuesta, no implementación

Antes de añadir eventos, revisar el consentimiento analítico existente y su comportamiento real. Ningún evento analítico debe enviarse antes de que exista autorización válida.

Eventos mínimos propuestos, solo agregados y sin texto libre:

- `assistant_opened`: origen permitido y productId permitido, si existe.
- `discovery_context_completed`: sí/no; no guardar la respuesta textual.
- `discovery_need_completed`: sí/no; no guardar la respuesta textual.
- `recommendation_presented`: identificador de producto/división del catálogo.
- `demo_opened`: identificador de demo y estado conocido.
- `proposal_requested`: sí/no.
- `conversation_ended`: finalización normal o abandono estimado; documentar que abandono es una inferencia.
- `assistant_error`: clase de error y código técnico no sensible.
- `assistant_latency`: duración en rangos, evitando contenido de la conversación.

No implementar estos eventos hasta verificar el consentimiento, la minimización y el destino de los datos. No incluir nombres, teléfonos, mensajes, prompts, direcciones, IP en reportes manuales ni identificadores persistentes de participantes.

## 10. Revisión posterior

Después de cada bloque de 3–5 sesiones:

1. Agrupar problemas por tipo: comprensión, repetición, pertinencia, veracidad, interfaz, latencia y errores.
2. Separar observaciones directas de interpretaciones del equipo.
3. Priorizar problemas críticos de seguridad/veracidad, luego problemas que bloquean la comprensión, después fricciones menores.
4. Cambiar una causa principal por iteración cuando sea posible.
5. Ejecutar de nuevo pruebas de contrato y runtime después de modificar el Worker.
6. Repetir los escenarios afectados antes de ampliar el grupo.

## 11. Decisión de salida

La prueba puede cerrar en uno de estos estados:

- **Continuar:** no hay errores críticos y la mayoría entiende la orientación y el siguiente paso.
- **Corregir y repetir:** hay confusión, repetición o recomendaciones poco pertinentes que pueden corregirse.
- **Detener:** aparecen fugas, solicitudes de datos sensibles, afirmaciones comerciales falsas o acciones no autorizadas.

No se pasa a piloto público ni a producción por haber completado 5–10 sesiones. Hace falta revisar resultados, corregir hallazgos, validar el proveedor real, completar QA visual/funcional y recibir aprobación explícita para publicar.

## 12. Registro de resultados

Completar después de cada sesión y consolidar al finalizar:

- Fecha y versión probada:
- Entorno (local/preview):
- Proveedor/modelo real:
- Participantes completados:
- Problemas críticos:
- Tres hallazgos principales:
- Cambios necesarios:
- Pruebas repetidas:
- Decisión: continuar / corregir y repetir / detener.
- Responsable y fecha de revisión:

---

**Regla de oro:** la prueba no busca demostrar que AUTOMATA tiene razón. Busca descubrir dónde se equivoca antes de que un cliente tenga que descubrirlo por nosotros.
