# Estado actual de AUTOMATA V2

**Corte:** 11 de noviembre de 2026  
**Repositorio:** `automata-bo/automata-bo.github.io`  
**Rama activa:** `feature/automata-web-v2-architecture`  
**PR:** [#9](https://github.com/automata-bo/automata-bo.github.io/pull/9)  
**Último commit verificado antes de este documento:** `111bceb81d8c0d9e5dbd09b19591488647c74afd`

> Documento de reanudación. Actualizar este archivo cuando cambie el estado real del proyecto. No sustituye las decisiones de arquitectura ni el protocolo de pruebas.

## 1. Estado general

- AUTOMATA V2 se trabaja en la rama feature y en el PR #9, que permanece abierto como borrador.
- `main` permanece intacta. No se ha autorizado merge ni despliegue a producción.
- El sitio continúa publicado mediante GitHub Pages desde `main`; no se debe crear otro proyecto Pages.
- Se conserva el Worker existente `automata-chat` y la base D1 existente `automata-audience`. No crear recursos Cloudflare nuevos.
- La identidad comercial es **Digital Experiences & Intelligent Solutions**: tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales.

## 2. Arquitectura y experiencia comercial implementada

- El catálogo tipado compartido vive en `worker/src/product-catalog.ts` y alimenta el frontend y el Worker.
- Productos catalogados: `web-presence`, `digital-assistants`, `business-automation`, `event-experience`, `audiovisual-production` y `creative-campaigns`.
- El catálogo describe división, estado comercial, capacidades, público, demos, requisitos, límites y política de precios.
- El asesor prioriza entender el negocio/proyecto y la necesidad real del visitante; el contexto de la ficha es secundario.
- Acciones de contexto: **Explore this solution**, **View experience** y **Request a proposal**.
- La burbuja de ayuda debe ser discreta y abrir el chat por clic, no mediante una aparición invasiva automática.
- No inventar precios, capacidades, demos ni disponibilidad. El precio depende del alcance.

## 3. Pruebas automatizadas y resultados verificados

### Pruebas runtime simuladas

Archivo: `worker/scripts/test-assistant-runtime.mjs`

Cinco pruebas con el proveedor IA simulado:
1. El primer mensaje y el catálogo llegan al proveedor.
2. La necesidad del visitante prevalece sobre la ficha de entrada.
3. El historial conserva el orden y evita repetir el saludo.
4. Una sesión inválida se rechaza antes de llamar al proveedor.
5. Un origen no autorizado se rechaza antes de llamar al proveedor.

El workflow del Worker para el commit `b7ae6626f02fd1aa4f02c985eb4de08a30a95fe2` había validado typecheck, contrato, runtime y Wrangler dry-run. Estas pruebas no evalúan la calidad semántica de un modelo real.

### Banco de pruebas con proveedor real

Archivo: `worker/scripts/test-assistant-live.mjs`  
Comando: `npm run test:live`

- Ocho escenarios A–H alineados con `docs/PRUEBA-DE-CAMPO.md`.
- Ejecuta el Worker desde Node y realiza llamadas reales al proveedor configurado mediante una API key presente en el entorno local.
- No arranca Wrangler, no llama al Worker desplegado, no usa D1 real y no demuestra por sí solo que las respuestas sean comercialmente correctas.
- Requiere configurar localmente una sola clave de proveedor por ejecución. Nunca pegar claves en el chat ni subirlas al repositorio.
- No se ha confirmado todavía una ejecución completa de estos ocho casos contra un proveedor real.

### Protocolo de campo

Archivo: `docs/PRUEBA-DE-CAMPO.md`

Contiene el guion para 5–10 negocios/proyectos, observación, criterios de salida, privacidad y ocho escenarios reproducibles. Los escenarios aún no equivalen a entrevistas ni a pruebas de campo ejecutadas.

## 4. Corrección de dependencias y TypeScript (11 nov 2026)

Se corrigió el conflicto entre Wrangler 4.86.0 y la versión incompatible de `@cloudflare/workers-types`:

- Se eliminó la dependencia explícita conflictiva de `@cloudflare/workers-types`.
- Se añadió `pretypecheck: wrangler types` en `worker/package.json`.
- `worker/tsconfig.json` incluye `worker-configuration.d.ts` y el código fuente.
- Wrangler genera los tipos del proyecto antes de ejecutar TypeScript.

Commits de la corrección:
- `458c403086d1a5cfc3ac5060fe5552e04f4fce51`
- `111bceb81d8c0d9e5dbd09b19591488647c74afd`

**Prueba local reportada por el usuario en ThinkPad T420:**
- `npm install`: terminó correctamente e instaló 39 paquetes.
- `npm run typecheck`: ejecutó `pretypecheck`, generó `worker-configuration.d.ts` y terminó sin errores de TypeScript.
- npm reportó **6 vulnerabilidades: 1 baja y 5 altas**. Todavía no se ha inspeccionado el detalle de `npm audit`; no ejecutar `npm audit fix` a ciegas.

**GitHub Actions, commit `111bceb8`:**
- [Check Automata chat Worker #43050257026](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43050257026): SUCCESS.
- [Validate Automata site #43050257524](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43050257524): SUCCESS.

## 5. Próximas tareas, en orden

1. **Revisar las 6 vulnerabilidades npm.** Obtener el detalle de paquetes, severidad, dependencia directa/transitiva y ruta de dependencia. Evaluar actualización mínima compatible; no usar `--force` ni `--legacy-peer-deps`.
2. **Ejecutar el banco live con un proveedor real.** Elegir un solo proveedor por ejecución, configurar su clave localmente sin compartirla, correr los ocho escenarios y guardar resultados sin secretos. Separar errores técnicos de evaluación semántica.
3. **Evaluar respuestas del asesor.** Comprobar que entiende la necesidad, no se deja arrastrar por la ficha inicial, pregunta lo necesario, distingue demos reales/simuladas/prototipos, no inventa capacidades ni precios y prepara briefs útiles.
4. **QA visual y funcional.** Revisar móvil y escritorio: navegación, fichas de las tres divisiones, burbujas contextuales, apertura del chat, acciones y demos existentes.
5. **Prueba de campo.** Cuando el comportamiento sea suficientemente estable, realizar sesiones consentidas con 5–10 negocios/proyectos siguiendo el protocolo. No presentar escenarios sintéticos como entrevistas reales.
6. **Revisar el PR #9 completo.** Verificar cambios, CI y documentación antes de decidir si está listo para revisión. El PR sigue en borrador hasta autorización expresa.
7. **Merge y producción:** fuera del alcance actual. Requieren autorización explícita del usuario.

## 6. Reglas de trabajo que siguen vigentes

- Desarrollar en `feature/automata-web-v2-architecture`; mantener `main` intacta.
- No mergear ni desplegar producción sin autorización explícita.
- No crear Pages, Workers ni D1 nuevos. Reutilizar los recursos existentes.
- Usar GitHub para inspección y cambios de repositorio; CI para validaciones automatizadas. Pedir trabajo local solo cuando la prueba necesite realmente el entorno o una credencial local.
- No pedir contraseñas ni API keys en el chat. No registrar secretos en commits, logs ni artefactos.
- Distinguir siempre lo implementado, lo probado y lo que todavía no se ha validado.

## 7. Punto exacto para reanudar

La última acción local conocida fue ejecutar `npm install` y `npm run typecheck` dentro de `worker/` después de hacer pull hasta `111bceb`. Ambos terminaron correctamente; quedó pendiente revisar las seis vulnerabilidades npm. En GitHub, los dos workflows principales para ese commit aparecen en SUCCESS. La siguiente tarea técnica recomendada es inspeccionar el detalle de `npm audit` y, en paralelo, preparar la primera ejecución controlada del banco live.


## 8. Actualización de ejecución (11 nov 2026, tarde)

**HEAD de la rama al cierre de esta actualización:** `59eca8b673685dd71784251916f458067642c438`.

### Banco live: atribución del proveedor

- `worker/scripts/test-assistant-live.mjs` ahora exige exactamente una clave de proveedor por ejecución.
- Si detecta cero claves, explica cómo configurar una. Si detecta más de una, se detiene antes de realizar llamadas.
- También compara el proveedor devuelto por el Worker con el proveedor seleccionado y marca como error cualquier discrepancia.
- Esto evita confundir un failover con una prueba atribuible a un proveedor concreto.
- Todavía no se ejecutaron los ocho escenarios contra un modelo real: falta una clave disponible en un entorno de prueba aislado.

### Auditoría npm informativa en CI

- `.github/workflows/worker-check.yml` ahora ejecuta `npm audit --json` después de instalar dependencias e imprime severidad, ruta, efectos y disponibilidad de corrección por paquete.
- La auditoría es informativa y no modifica dependencias ni bloquea el resto de las validaciones.
- Resultado de CI en el commit `4a95fc7ab1c937e3d04ea5675e90cddeaca1601a`: **0 vulnerabilidades** en el árbol resuelto por la instalación limpia de GitHub Actions.
- **Discrepancia pendiente:** la instalación local del usuario reportó 6 vulnerabilidades. El repositorio no contiene `worker/package-lock.json`; CI y la instalación local pueden resolver árboles distintos porque `npm install` usa rangos semver sin lockfile.
- Por tanto, el resultado de CI no invalida el reporte local ni demuestra que el entorno local esté limpio. La corrección definitiva requiere generar y versionar un lockfile reproducible, revisar el cambio de versiones y validar con `npm ci` + `npm audit`. No ejecutar `npm audit fix` ni `--force` a ciegas.

### Validación CI más reciente

- Commit `59eca8b673685dd71784251916f458067642c438`:
  - [Check Automata chat Worker #43090946836](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43090946836): SUCCESS.
  - [Validate Automata site #43090947176](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43090947176): SUCCESS.
- En el workflow del Worker pasaron typecheck, contrato, runtime simulado, sintaxis del banco live y Wrangler dry-run.
- Wrangler dry-run generó un paquete de 47.80 KiB (14.64 KiB gzip) y reconoció los bindings existentes `automata-audience`, `SESSION_LIMITER` e `IP_LIMITER`. No desplegó el Worker.
- PR #9 sigue abierto como borrador. `main` permanece intacta. Sin merge ni despliegue.

### Siguiente trabajo real

1. Resolver la discrepancia de dependencias y crear un `package-lock.json` versionado.
2. Ejecutar el banco live con un único proveedor real en entorno aislado.
3. Evaluar semánticamente las ocho respuestas, especialmente honestidad de demos, precios y capacidades.
4. Completar QA visual y funcional en navegador móvil y escritorio.
5. Preparar sesiones de campo consentidas solo después de superar las validaciones anteriores.

## 9. Pulido editorial de interfaz (12 nov 2026)

- En `v2-main.tsx` se unificaron al español cuatro llamadas a la acción: tres apariciones de “Request a proposal” pasaron a “Solicitar propuesta” y “View experience” pasó a “Ver experiencia”.
- Cambio acotado de interfaz; no modifica rutas, lógica del asistente, catálogo, Worker, D1, consentimiento ni analítica.
- Commit: `12f68e4faf78901d06bb7db64e4ce1e1d0809339`.
- La compilación y las pruebas del commit nuevo todavía están pendientes de confirmación. No considerar este cambio validado hasta que CI termine.
- `main`, el PR #9 y producción no se han fusionado ni desplegado.

## 10. Aislamiento de previsualización (12 nov 2026)

- Se detectó que `.github/workflows/preview-deploy.yml` desplegaba automáticamente un Worker independiente llamado `automata-v2-preview`, incompatible con la decisión de no crear recursos Cloudflare nuevos.
- Se eliminó ese workflow de la rama feature. La revisión visual queda cubierta por `.github/workflows/visual-preview.yml`, que compila el sitio y genera capturas de nueve rutas en escritorio y móvil como artefacto de GitHub Actions, sin desplegar infraestructura.
- Se consultó el inventario de Workers de la cuenta Cloudflare conectada: solo aparece `automata-chat`. No aparece `automata-v2-preview`; por tanto, no se detecta que el flujo anterior haya creado ese Worker.
- Commit de eliminación: `f433d0091aec9dd28e618689d4ff5629c5ad3e89`.
- `main`, el Worker `automata-chat` y la base D1 existente no fueron modificados por esta corrección. No se realizó despliegue.


## 11. QA de previsualización y estado de CI (12 nov 2026)

**Commit de implementación revisado:** `278a67f582531189b95616a064419d69631463ee`.  
**Commit de esta actualización documental:** `88298f73fd0c23bbe46ecfeb870c466ba637b643`.

### Previsualización automatizada

- Se endureció `.github/workflows/visual-preview.yml`: espera la disponibilidad del servidor, verifica respuestas HTTP correctas y captura errores JavaScript de página antes de dar por aprobado el recorrido.
- La ejecución [Build visual preview #43215077161](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43215077161) terminó en SUCCESS.
- Se recorrieron nueve rutas en dos tamaños (1440×1000 y 390×844): 18 visitas en total. El workflow terminó sin errores HTTP ni excepciones JavaScript de página.
- Artefacto `automata-v2-visual-preview`, con capturas y sitio compilado: 3.97 MB. Disponible hasta el 19 de noviembre de 2026.
- Se inspeccionaron las capturas de escritorio y móvil. La jerarquía visual y la identidad se mantienen coherentes entre divisiones y páginas de demostración. **Hallazgo pendiente:** el panel inicial de consentimiento de analítica invade parcialmente el área del CTA del hero en la primera vista, especialmente en móvil. Revisar su ubicación/espaciado sin debilitar la elección de privacidad.
- Esta automatización comprueba carga de rutas y errores de runtime; no sustituye las pruebas manuales de menú móvil, teclado, chat, consentimiento, formulario de contacto ni interacciones de las demos.

### CI y Cloudflare

- Los workflows GitHub Actions de sitio, TypeScript y Worker que acompañan al HEAD se reportaron aprobados en el estado de ejecución revisado.
- El chequeo externo **Workers Builds: automata-chat** falló al ejecutar `npx wrangler preview`: la configuración Wrangler existente no contiene el bloque `previews` requerido por ese comando.
- Ese fallo pertenece al trigger de Workers Builds asociado al Worker existente `automata-chat`; no es un despliegue de la web ni una prueba de que la V2 haya sido publicada.
- No se añadió el bloque `previews`, no se cambió el trigger, no se desplegó ningún Worker y no se creó infraestructura Cloudflare adicional. Resolver la integración solo después de decidir si ese trigger debe ejecutar preview o si debe quedar fuera del flujo de esta rama.

### Estado de publicación

- PR #9 continúa abierto como borrador.
- `main`, GitHub Pages de producción, Worker `automata-chat` y D1 `automata-audience` permanecen fuera de los cambios de esta rama.
- No se ha autorizado merge ni despliegue.


## 12. Consentimiento y acciones del hero sin solapamientos (12 nov 2026)

### Correcciones implementadas

- El aviso inicial de consentimiento pasó de una posición fija superpuesta a un bloque de flujo normal entre la navegación y el contenido principal. La elección de aceptar o rechazar analítica sigue siendo explícita.
- El enlace «Preferencias de cookies» del footer reabre el aviso y desplaza la vista hasta él.
- En móvil, el lanzador del asistente ahora es un botón circular compacto con etiqueta accesible; las acciones del hero se alinean al inicio para dejar espacio libre.
- Cambios:
  - `CookieConsent.tsx`: consentimiento en flujo normal, semántica de región complementaria y desplazamiento al reabrir preferencias.
  - `v2-main.tsx`: aviso inmediatamente después del header; botones del hero alineados al inicio.
  - `index.css`: lanzador circular de 54 px en móvil y texto visual oculto, manteniendo nombre accesible.
  - `.github/workflows/visual-preview.yml`: pruebas de solapamiento y smoke test de consentimiento y navegación móvil.
- Commits de implementación: `2cc44d00d311e9cb0d95d24c7ea2eb574ea734e7`, `398f275013b05d988fe092a987dc5a08c5a1acae`, `7b90b1f93bacf2c10c2df1e2bc808885c4375bc1`, `814e98571f3313c926849e855267b473ed7e4fac` y `38186cc300edb5957373908b0f45c87e7b2c2ea2`.

### Validación completada

- GitHub Actions para el commit `38186cc300edb5957373908b0f45c87e7b2c2ea2`:
  - [Validate Automata site #43218003268](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43218003268): SUCCESS. Build del sitio y type-check del Worker aprobados.
  - [Check Automata chat Worker #43218002988](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43218002988): SUCCESS. Typecheck, contrato, runtime simulado, sintaxis del banco live y Wrangler dry-run aprobados.
  - [Build visual preview #43218003122](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43218003122): SUCCESS.
- Las 18 capturas (nueve rutas en escritorio y móvil) se generaron sin errores HTTP ni excepciones JavaScript.
- Smoke test móvil aprobado: el consentimiento no invade el CTA principal, el lanzador no invade ninguno de los dos CTA del hero, rechazar analítica cierra el aviso, las preferencias se reabren desde el footer y el menú móvil permite navegar a Digital.
- Se inspeccionaron visualmente las capturas actualizadas de Inicio en escritorio y móvil: el aviso queda fuera del hero y el asistente no tapa las acciones.
- Artefacto `automata-v2-visual-preview`: 3.97 MB, disponible hasta el 19 de noviembre de 2026. Incluye sitio compilado y capturas; no es un despliegue.

### Límites que siguen pendientes

- Las pruebas anteriores no sustituyen la revisión manual de teclado/lector de pantalla, chat contra el Worker real, formulario de contacto/WhatsApp ni interacciones de cada demo.
- El fallo externo de Workers Builds documentado en la sección 11 sigue sin corregirse; no se modificó el trigger ni la configuración Cloudflare.
- PR #9 sigue abierto como borrador. `main`, GitHub Pages de producción, Worker `automata-chat` y D1 `automata-audience` permanecen sin cambios de publicación. No se ha autorizado merge ni despliegue.

## 13. QA ampliado de demos y validación de AUTOMATA V2 (12 nov 2026)

**HEAD revisado:** `d398e8d508a9c236a96de372de5df4a9880af71a`.

### Cambios recientes incluidos en el HEAD

- Las llamadas a la acción de propuesta/experiencia están en español.
- El consentimiento permanece en el flujo normal y no se superpone al hero.
- El diálogo de newsletter gestiona foco inicial, ciclo de Tab/Shift+Tab, Escape cuando corresponde, bloqueo/restauración de scroll y retorno del foco al disparador.
- El traspaso del asistente a WhatsApp exige consentimiento explícito antes de habilitar la acción y prepara un brief contextual.
- El formulario de contacto exige objetivo y prepara un brief contextual antes de abrir WhatsApp.
- Las demos Digital (restaurante, consultorio y peluquería) se identifican como simulaciones.
- La demo de invitación comprueba RSVP afirmativo y negativo localmente.
- Creative Lab aclara que es un prototipo interactivo con estructuras predefinidas: no llama a un modelo IA, no genera video ni guarda los datos ingresados.
- Las cuatro tarjetas de Studio tienen asignación explícita de producto/contexto:
  - Producción audiovisual → `audiovisual-production`
  - Fotografía y contenido → `audiovisual-production`
  - Publicidad y campañas → `creative-campaigns`
  - Producción híbrida con IA → `audiovisual-production`
- La etiqueta “Demos en vivo” se cambió por “Demos interactivas” para no sugerir conexiones productivas inexistentes.

### GitHub Actions verificado para el HEAD

- [Validate Automata site #43221974014](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43221974014): SUCCESS. Build del sitio y type-check del Worker.
- [Check Automata chat Worker #43221974288](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43221974288): SUCCESS. Typecheck, pruebas de contrato/runtime y Wrangler dry-run.
- [Build visual preview #43221962963](https://github.com/automata-bo/automata-bo.github.io/actions/runs/43221962963): SUCCESS.
- El preview comprobó nueve rutas en escritorio y móvil (18 cargas HTTP 200), sin excepciones JavaScript de página.
- Pasaron los smoke tests de:
  - Demos Digital: pedido de restaurante, solicitud de cita del consultorio y reserva de peluquería.
  - Demo de invitación: RSVP positivo y negativo.
  - Creative Lab: construcción del brief.
  - Móvil: consentimiento, foco del diálogo newsletter, traspaso del asistente y formulario de contacto.
- El flujo de WhatsApp fue interceptado en navegador; no abrió WhatsApp real ni envió mensajes.
- Artefacto `automata-v2-visual-preview`, ID `13945149647`, tamaño aproximado 3.97 MB, disponible hasta el 19 de noviembre de 2026. Contiene el sitio compilado y capturas desktop/móvil; no es un despliegue.

### Inspección visual realizada

Se inspeccionaron directamente capturas de Inicio móvil, Studio escritorio y Creative Lab móvil. La jerarquía visual, la separación del consentimiento respecto al hero, las cuatro tarjetas Studio y la explicación honesta de los límites del Creative Lab se ven coherentes en esas vistas. El resto de capturas está generado en el artefacto, pero no se considera una revisión visual manual exhaustiva de cada pantalla.

### Límites y pendientes

- No se ha realizado todavía una revisión manual completa con lector de pantalla ni auditoría integral de teclado.
- No se probó el chat contra el Worker productivo, ni se ejecutaron envíos reales de WhatsApp o formularios productivos.
- Las demos siguen siendo locales/simuladas según su descripción; no equivalen a servicios operativos conectados.
- El chequeo externo Workers Builds del Worker existente `automata-chat` mantiene el problema de configuración Wrangler `previews` descrito en la sección 11. No se modificó el trigger ni la configuración Cloudflare.
- El PR #9 permanece en borrador según el último estado conocido. No se ha autorizado merge ni despliegue. `main`, Pages de producción, Worker y D1 deben permanecer intactos.

## 14. Precisión de demos y semántica accesible (12 nov 2026)

- En el hero de `App.tsx`, el CTA «Ver demos en vivo» se cambió a «Explorar demos interactivas». Las tres demos son simulaciones locales y no deben presentarse como servicios conectados en tiempo real.
- Los controles de selección de demo dejaron de declararse como `tablist/tab`, porque no implementaban el patrón de teclado de pestañas (flechas y foco itinerante). Ahora son un grupo de botones nativos con `aria-pressed`, coherentes con su comportamiento toggle y operables mediante teclado estándar.
- Commits:
  - `65a02bb88f6b6200090a690d7f37732cc4b8795a`
  - `6dc98d0c217f66aaad64ab905fddf6862c6b2128`
- En el momento de esta actualización, los commits nuevos todavía no muestran ejecuciones de workflow/checks en la consulta de GitHub. No declarar estas modificaciones validadas por CI hasta que exista una ejecución terminada.

## 15. Investigación de previsualización navegable (12 nov 2026)

- Se consultó la cuenta Cloudflare conectada mediante la API de solo lectura: la lista de proyectos Cloudflare Pages devolvió `[]`. No existe actualmente un proyecto Pages identificado que pueda reutilizarse para publicar una previsualización aislada.
- El repositorio se construye con Vite y usa `base: "/"`; las rutas multipágina incluyen nueve entradas. El workflow `visual-preview.yml` compila el sitio, ejecuta Playwright y guarda capturas como artefacto privado de GitHub Actions (retención de 7 días); no publica un servidor navegable.
- GitHub Actions artifact no equivale a alojamiento público y el sitio GitHub Pages actual está asociado al dominio de producción. No se debe apuntar una rama de revisión al mismo destino ni modificar la configuración Pages existente sin una estrategia aislada.
- No se creó proyecto, deployment, Worker, dominio ni infraestructura nueva. Tampoco se modificó configuración de producción.
- Con la evidencia disponible, para dar al usuario una URL navegable se necesita autorizar un destino de preview aislado (por ejemplo, un proyecto Cloudflare Pages separado) o aportar un hosting temporal ya disponible. Hasta entonces, se mantiene la previsualización automatizada por artefactos y capturas; no afirmar que existe URL pública de V2.


## 16. Corrección de pruebas de demos y paquete visual (12 nov 2026)

- Se detectó que el smoke test de `/demos/` buscaba los selectores `role=tab` para CONSULTORIO y PELUQUERÍA, aunque los controles se habían convertido en botones nativos con `aria-pressed` dentro de un grupo accesible.
- Se actualizaron ambos selectores del test a botones por nombre accesible. Commit: `e5a9d9a1b2302c24ea070402000fe9e2f6e70d37`.
- En ese commit, GitHub Actions confirmó SUCCESS para Validate Automata site, Check Automata chat Worker y Build visual preview.
- La ejecución de Build visual preview `43228943251` completó captura de las nueve rutas en escritorio y móvil, empaquetado y subida del artefacto `automata-v2-visual-preview` (ID `13947649867`, 3,974,212 bytes; vence el 19 nov 2026).
- El artefacto contiene el sitio estático compilado y 18 capturas PNG (nueve rutas × escritorio/móvil). Fue descargado e inspeccionado; el contacto visual general del conjunto no mostró páginas vacías ni fallos evidentes de renderizado. Esto no sustituye una auditoría visual detallada de cada pantalla.
- El artefacto es una instantánea para revisión, no una URL pública ni un despliegue. No se modificó `main`, Pages productivo, Worker, D1 ni configuración Cloudflare.
- PR #9 permanece abierto como borrador; no se hizo merge ni deploy.
