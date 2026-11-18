# Auditoría de seguridad — AUTOMATA Web

**Fecha:** 2026-11-18  
**Repositorio:** `automata-bo/automata-bo.github.io`  
**Rama auditada:** `main`  
**Commit de referencia:** `6a10ae5d10335a111297c12f64d54cdbe79ec71b`  
**Rama de este informe:** `security/site-audit-2026-11-18`  
**Modalidad:** revisión estática focalizada de frontend, Cloudflare Worker, D1, CI/CD y documentación. Sin pruebas destructivas.

## 1. Resumen ejecutivo

Esta auditoría corresponde al sitio público AUTOMATA en `https://automata-bo.github.io/`, no al repositorio privado `t474-r0b07/automata`.

El sitio no es solo una web estática: GitHub Pages sirve la aplicación React/Vite y esta se comunica con el Cloudflare Worker `automata-chat`. El Worker procesa conversaciones con proveedores de IA y almacena eventos analíticos y suscripciones en Cloudflare D1.

**Dictamen:** no se confirmó una vulnerabilidad de ejecución remota, XSS almacenado/reflejado o inyección SQL en los componentes inspeccionados. Sí se identificaron debilidades concretas de control de abuso, verificación de consentimiento y gobernanza de dependencias que conviene corregir antes de escalar tráfico o iniciar campañas.

El despliegue de Pages más reciente visible en Actions corresponde al commit de referencia y terminó en `success` (run 44320974254). Esto acredita que el workflow de build/deploy terminó correctamente, no que se hayan superado pruebas de seguridad.

## 2. Arquitectura y superficie revisada

- Frontend: React 18, TypeScript, Vite 6, servido mediante GitHub Pages.
- API: Cloudflare Worker `automata-chat` en `automata-chat.dgckg-trd1.workers.dev`.
- Persistencia: Cloudflare D1 `automata-audience`.
- Funciones expuestas: `GET /health`, `POST /api/chat`, `POST /api/events`, `POST /api/subscribe`, `POST /api/unsubscribe`.
- Controles declarados: CORS por origen exacto, límites por IP y sesión, límites de tamaño y longitud de mensajes, validación de formato y consultas SQL parametrizadas.
- CI/CD: workflows de validación del sitio, comprobación del Worker, despliegue de Pages y despliegue del Worker.

Archivos principales revisados:
- `index.html`, `api.ts`, `analytics.ts`, `ChatWidget.tsx`, `CookieConsent.tsx`, `NewsletterSignup.tsx`, `entry-bootstrap.ts`, `intro/intro.js`.
- `worker/src/index.ts`, `worker/src/product-catalog.ts`, `worker/wrangler.jsonc`, `worker/package.json`, `worker/migrations/0001_create_audience.sql`.
- `.github/workflows/ci.yml`, `deploy.yml`, `worker-check.yml`, `worker-deploy.yml`.
- `README.md`, `docs/CAPTACION-ANALITICA.md`.

## 3. Hallazgos priorizados

### WEB-01 — El límite por sesión depende de un identificador controlado por el cliente

**Severidad:** Media.  
**Componente:** `ChatWidget.tsx`, `worker/src/index.ts`, `worker/wrangler.jsonc`.

El navegador genera `sessionId` mediante `crypto.randomUUID()` y lo envía en `X-Chat-Session`. El Worker valida el formato, pero no emite ni firma el identificador. El rate limiter usa directamente ese valor como clave.

Un cliente que invoque la API directamente puede generar un identificador distinto por solicitud y evitar el límite de 12 solicitudes/minuto por sesión. El límite de 60 solicitudes/minuto por IP permanece activo y reduce el abuso desde una sola IP, por lo que no se trata de una ausencia total de rate limiting.



**Aclaración sobre CORS:** la comparación exacta de `Origin` es útil para navegadores y evita que sitios web de otros orígenes lean respuestas mediante CORS. No autentica al visitante ni impide que un cliente HTTP no-browser envíe manualmente `Origin: https://automata-bo.github.io`. Como el chat es una función pública, la defensa real contra abuso debe venir de desafíos anti-bot, límites del lado servidor y controles de presupuesto, no de CORS.

**Impacto:** el control por sesión no representa una sesión confiable. Puede facilitar consumo no deseado de cuota de proveedores de IA, spam de solicitudes y degradación de disponibilidad.

**Refuerzo:**
1. No tratar un ID aleatorio del navegador como identidad o credencial.
2. Añadir desafío anti-bot (por ejemplo, Cloudflare Turnstile verificado en el Worker) antes de habilitar chat y suscripciones.
3. Mantener rate limit por IP y agregar límites globales por ruta/proveedor, presupuesto diario y circuit breaker.
4. Si se conserva un límite por sesión, emitir desde el Worker un token de corta duración firmado y validarlo en cada solicitud; no confiar en un valor arbitrario enviado por el cliente.
5. Registrar métricas de rechazos y consumo sin almacenar contenido de conversación.

### WEB-02 — El endpoint de suscripción confía en una afirmación de consentimiento enviada por el navegador

**Severidad:** Media.  
**Componente:** `NewsletterSignup.tsx`, `worker/src/index.ts`, migración D1.

El frontend requiere una casilla desmarcada por defecto y envía `consent: true` junto con una versión fija del texto. El Worker comprueba esos valores, pero una solicitud HTTP directa puede enviar ambos sin que la persona titular del correo o teléfono haya marcado la casilla. El registro se crea directamente con estado `active`; no hay verificación de titularidad del contacto.

El formulario y la documentación indican que todavía no se envían campañas automáticas, lo cual reduce el impacto operativo actual. No elimina el riesgo de registrar contactos de terceros o guardar una autorización no demostrada.

**Impacto:** integridad débil del registro de consentimiento, contaminación de la lista y riesgo de enviar comunicaciones a contactos que no las solicitaron cuando se habiliten campañas.

**Refuerzo:**
1. Incorporar doble confirmación (double opt-in) por el canal elegido.
2. Mantener la suscripción en estado `pending` hasta validar la titularidad.
3. No considerar `consent: true` como prueba suficiente por sí solo.
4. Registrar fecha, versión y evidencia del flujo de confirmación en servidor.
5. Aplicar Turnstile, rate limits y límites de altas por IP/contacto.
6. Antes de campañas, implementar baja efectiva, supresión de contactos dados de baja y pruebas de no reactivación accidental.

### WEB-03 — La auditoría de dependencias no bloquea el pipeline

**Severidad:** Media como control de cadena de suministro.  
**Componente:** `.github/workflows/worker-check.yml`, `worker/package.json`.

El workflow ejecuta `npm audit --json`, pero usa `|| true` y reporta el resumen sin fallar ante vulnerabilidades. Es una observación útil, no una barrera de seguridad. El repositorio tiene `package-lock.json` en la raíz, pero no se observó un `worker/package-lock.json` en el árbol auditado; los workflows del Worker usan `npm install`.

**Impacto:** una dependencia vulnerable puede quedar registrada en CI sin impedir que el cambio continúe. La ausencia de lockfile del Worker permite resolver versiones transitivas distintas entre ejecuciones.

**Refuerzo:**
1. Generar y versionar `worker/package-lock.json`.
2. Usar `npm ci` en CI y despliegue, tanto en raíz como en Worker.
3. Convertir el informe de vulnerabilidades críticas/altas en un gate que falle, con excepciones documentadas y fecha de vencimiento.
4. Añadir Dependabot o revisión automatizada de actualizaciones.
5. Considerar fijar GitHub Actions a SHA completo, no solo tags mayores.

**Nota:** no se confirmó una dependencia vulnerable concreta en esta auditoría; el hallazgo es que el control actual no bloquea cuando las detecta.

### WEB-04 — No se encontró una política CSP declarada en la configuración del sitio

**Severidad:** Baja / defensa en profundidad.  
**Componente:** `index.html` y configuración de publicación.

No se observó una etiqueta CSP en el HTML ni un archivo de cabeceras en el árbol de publicación. GitHub Pages no ofrece la misma configuración de cabeceras arbitrarias que un servidor propio. La revisión de fuente no permite afirmar qué cabeceras exactas entrega actualmente el hosting en producción.

**Impacto:** una política CSP reduce el impacto de ciertos errores XSS futuros y limita orígenes de scripts, estilos, conexiones e imágenes.

**Refuerzo:**
1. Verificar las cabeceras reales del dominio publicado desde un cliente HTTP externo.
2. Diseñar una CSP compatible con Vite, los recursos de fuentes y el JSON-LD; empezar con `Content-Security-Policy-Report-Only` donde sea posible.
3. Si el hosting no permite cabeceras, valorar un proxy/CDN controlado que las aplique o una CSP mediante meta tag, considerando sus limitaciones.
4. Mantener scripts y estilos propios y evitar introducir HTML no confiable.

No se confirmó XSS en los componentes revisados. En particular, los mensajes del chat se renderizan como texto React y la plantilla `innerHTML` de la intro utiliza cadenas constantes del propio archivo, no contenido del visitante.

### WEB-05 — El control de consentimiento analítico es una señal del cliente, no una prueba verificable

**Severidad:** Baja / integridad y privacidad.  
**Componente:** `analytics.ts`, `worker/src/index.ts`.

La interfaz solo envía eventos después de que la cookie de preferencias indique aceptación, y el Worker exige `X-Analytics-Consent: yes`. Sin embargo, cualquier cliente HTTP puede enviar ese encabezado y el origen permitido. CORS y el encabezado personalizado controlan navegadores, no autentican solicitudes directas.

La tabla analítica no almacena texto de conversaciones, contacto ni IP, lo cual es una buena minimización. El riesgo principal es que la base de datos puede recibir eventos que no provienen de una aceptación real.

**Refuerzo:** si se necesita que el consentimiento sea una garantía verificable, implementar un flujo de consentimiento registrado en servidor y ligado a un token de sesión; si la analítica sigue siendo anónima y de bajo impacto, documentar explícitamente que el control es de interfaz y no una barrera antifraude.

## 4. Controles positivos observados

- CORS compara el encabezado `Origin` con el origen configurado y responde a preflight.
- La API utiliza `Cache-Control: no-store`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` y `Referrer-Policy: no-referrer` en respuestas JSON.
- `readBoundedJson` limita el tamaño real leído del cuerpo, no solo el `Content-Length`.
- El chat limita el número de mensajes, caracteres por mensaje y caracteres totales; valida alternancia de roles y exige que el último mensaje sea del usuario.
- Hay límites por IP y sesión en el chat; también límites por IP en analítica, suscripciones y bajas.
- Las operaciones SQL revisadas usan consultas preparadas y `.bind()`; no se observó concatenación de entrada del usuario en SQL.
- La migración define restricciones CHECK y unicidad para canal/contacto y token de baja.
- Las claves de proveedores se leen desde bindings/secretos del Worker; no se observaron claves API incrustadas en los archivos revisados.
- El frontend renderiza texto de mensajes como nodos de texto React, no como HTML arbitrario.
- La transferencia a WhatsApp requiere una casilla explícita y abre un mensaje preparado; el código no afirma que el mensaje ya haya sido enviado.
- La documentación indica que el chat no persiste en D1 y advierte no enviar información sensible o real cuando se usan rutas gratuitas de IA.
- Los workflows limitan permisos de GitHub Actions a lectura de contenidos y permisos de Pages necesarios; el despliegue del Worker requiere secretos de Cloudflare.

## 5. Pruebas, evidencia y límites

- Se revisó estáticamente el código de frontend y Worker indicado en el alcance.
- Se revisaron los workflows y la migración SQL.
- Se inspeccionaron las pruebas del Worker. Las pruebas runtime usan un proveedor de IA simulado; cubren validación de sesión y rechazo de origen no permitido, entre otros contratos, pero no son un pentest.
- El despliegue de Pages del commit auditado terminó correctamente en el run 44320974254.
- No se ejecutó Strix: el CLI/agente no está disponible en este entorno.
- No se ejecutaron `npm audit`, `npm ci`, `npm test`, fuzzing ni DAST desde un checkout en esta sesión.
- No se pudo obtener desde las herramientas disponibles una respuesta HTTP directa del dominio público ni del endpoint `/health`; por tanto, no se verificaron las cabeceras efectivas, TLS, redirecciones, contenido desplegado ni estado real del Worker.
- No se realizaron cargas de estrés, pruebas de consumo de cuota, pruebas destructivas ni intentos de acceso a datos reales.
- No se inspeccionaron secretos de Cloudflare/GitHub, reglas de protección, historial completo del repositorio ni configuración interna de D1.

## 6. Plan de refuerzo

**P0 — antes de campañas o tráfico elevado**
1. Implementar double opt-in para correo/WhatsApp y estado `pending`.
2. Añadir Turnstile verificado por el Worker en chat y suscripciones.
3. Añadir presupuesto/circuit breaker global de IA y rate limit robusto por IP/proveedor.
4. Confirmar configuración real de secretos y permisos de Cloudflare fuera del código público.

**P1 — siguiente iteración**
1. Hacer que `npm audit` bloquee vulnerabilidades altas/críticas salvo excepción aprobada.
2. Crear lockfile del Worker y usar `npm ci`.
3. Incorporar CSP y verificar cabeceras reales en producción.
4. Añadir pruebas de abuso para rotación de session IDs, altas masivas, consentimiento falsificado, token de baja y límites por IP.
5. Añadir monitorización y alertas por consumo anómalo de IA y crecimiento anómalo de D1.

**P2 — madurez**
1. Fijar Actions de terceros a SHA completo y mantener actualización automatizada.
2. Añadir CodeQL/SAST y secret scanning.
3. Definir retención y eliminación periódica de eventos y suscriptores.
4. Revisar términos de privacidad y retención del proveedor de IA configurado antes de procesar conversaciones reales.
5. Ejecutar DAST y pentest autorizado sobre el Worker en staging, con límites y datos sintéticos.

## 7. Dictamen final

**Riesgo actual: moderado y corregible.** No se confirmó una vulnerabilidad crítica directa en el código inspeccionado. Los riesgos más importantes son la facilidad de evadir el límite por sesión, la falta de verificación de titularidad/consentimiento de suscripciones y la ausencia de un gate efectivo de dependencias.

**No recomiendo habilitar campañas de marketing ni aumentar significativamente el tráfico del asistente antes de resolver WEB-01, WEB-02 y WEB-03.** La web puede seguir funcionando como sitio institucional mientras se aplican estos refuerzos, manteniendo datos sintéticos y sin compartir información sensible con el asistente.

Esta auditoría es estática y focalizada. No equivale a una certificación ni a un pentest dinámico completo.
