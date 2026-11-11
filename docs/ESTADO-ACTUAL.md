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
