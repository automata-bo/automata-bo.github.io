# Automata

**Tecnología, creatividad e inteligencia artificial para resolver necesidades reales de negocio.**

Automata es un estudio de tecnología y soluciones digitales con base en Tarija, Bolivia. Diseñamos y desarrollamos experiencias digitales, asistentes, automatizaciones y piezas audiovisuales combinando criterio técnico, creatividad y herramientas de IA.

La idea no es incorporar tecnología por moda. Primero entendemos qué necesita resolver cada negocio; después evaluamos qué solución tiene sentido, qué condiciones requiere y si realmente vale la pena implementarla.

🌐 **Sitio web:** https://automata-bo.github.io/

---

## Qué hacemos

Nuestro trabajo se organiza en siete líneas de solución que pueden combinarse según el problema y el alcance de cada proyecto.

### 1. Asistentes digitales
Asistentes para web y canales de mensajería que responden consultas con información aprobada, orientan a las personas y derivan los casos que necesitan atención humana.

### 2. Pedidos, citas y reservas
Diseño de flujos para recibir y organizar pedidos, solicitudes de cita y reservas. El sistema debe distinguir entre una solicitud recibida y una operación realmente aceptada o confirmada por el negocio.

### 3. Sitios web
Sitios institucionales y páginas de presentación que explican una oferta, muestran productos o servicios, generan confianza y facilitan la captación de consultas.

### 4. Automatización de procesos
Automatización de tareas repetitivas, registros, reportes, avisos e integraciones. Cada caso requiere revisar el proceso actual, las herramientas involucradas y sus reglas.

### 5. Inteligencia artificial aplicada
Integración de IA cuando aporta una ventaja concreta: interpretación de consultas, clasificación, asistencia, síntesis de información y apoyo a flujos de trabajo. La IA no sustituye las reglas del negocio ni la verificación de datos críticos.

### 6. Publicidad y producción audiovisual
Conceptos creativos, anuncios, videos promocionales, piezas de producto y campañas. Trabajamos con producción híbrida: grabación real, edición tradicional y recursos generados con IA, según lo que cada proyecto necesite.

### 7. Experiencias digitales para celebraciones
Diseñamos experiencias digitales personalizadas para bodas y otros eventos: regalos interactivos, páginas conmemorativas, galerías privadas y álbumes comunitarios donde los invitados pueden aportar sus fotografías mediante enlaces o tarjetas con códigos QR.

En una producción para bodas, por ejemplo, los invitados pueden acceder desde sus teléfonos, compartir sus fotos y contribuir a un álbum digital personalizado para los novios. La experiencia puede incluir identidad visual del evento, tarjetas impresas con QR y una galería organizada para conservar los recuerdos.

Cada producción se define según el evento, la privacidad requerida, el volumen de participantes y la forma de recopilar, revisar y entregar las fotografías. No se presupone que cualquier evento tenga las mismas necesidades ni que las imágenes se publiquen de forma abierta.

También evaluamos proyectos a medida cuando el problema requiere una integración o desarrollo que no forma parte de una solución estándar. La viabilidad se determina después de conocer los requisitos.

---

## Una forma distinta de trabajar

No partimos de un catálogo que haya que vender a toda costa. Partimos del problema.

1. **Entender:** conocemos el negocio, su público, el proceso actual y la dificultad concreta.
2. **Evaluar:** identificamos qué alternativa puede resolverla y qué condiciones hacen falta.
3. **Recomendar:** proponemos una solución adecuada, una etapa previa o incluso no contratar si otra opción es mejor.
4. **Definir:** delimitamos alcance, entregables, dependencias y costos antes de comprometernos.
5. **Construir:** desarrollamos, integramos y probamos lo acordado.

No prometemos ventas, crecimiento ni ahorros cuantificados sin evidencia. Tampoco recomendamos una web, un video o una automatización solo porque podamos producirlos.

---

## Prueba las demostraciones

El sitio incluye tres experiencias interactivas para mostrar cómo podrían funcionar ciertos flujos:

- **Restaurante:** explorar un menú, añadir productos, calcular un total y registrar un pedido de ejemplo.
- **Consultorio:** seleccionar un servicio y registrar una solicitud de cita.
- **Peluquería:** elegir un servicio y registrar una solicitud de reserva.

Las experiencias para celebraciones son una línea de producción personalizada; no forman parte de estas tres demos comerciales.

> **Importante:** estas experiencias son demostraciones simuladas. No envían pedidos a restaurantes, no consultan agendas reales y no confirman citas ni reservas. Sirven para explorar la experiencia y conversar sobre una posible adaptación al negocio.

---

## Autómata, el asistente comercial

El sitio incorpora un asistente conversacional con IA. Su función es orientar a los visitantes, comprender sus necesidades y ayudarles a identificar un siguiente paso razonable.

El asistente:

- Responde preguntas sobre las soluciones de Automata.
- Mantiene el contexto de la conversación durante la sesión.
- Hace preguntas puntuales para entender el problema, sin convertir la conversación en un formulario.
- Evalúa si una web, un asistente, una automatización o una pieza audiovisual encaja con la necesidad expresada.
- Distingue hechos compartidos por el visitante de hipótesis que todavía deben comprobarse.
- No inventa precios, plazos, clientes, resultados ni funcionalidades.
- Puede preparar un resumen editable para que el equipo continúe la conversación sin volver a preguntar lo mismo.

Cuando el visitante solicita atención humana, puede revisar el resumen, autorizar expresamente su contenido y abrir WhatsApp para continuar con el equipo. El asistente no envía ese mensaje por su cuenta.

### Arquitectura del asistente

La interfaz web se comunica con un backend desplegado como **Cloudflare Worker**. El Worker valida las solicitudes, aplica límites de uso y consulta proveedores de modelos mediante una capa de adaptación. El código contempla proveedores configurables como OpenRouter, Groq, Gemini y Ollama Cloud; la disponibilidad efectiva depende de las variables y credenciales configuradas en el entorno.

La clave del proveedor permanece en el backend y no se incorpora al código público del navegador.

---

## Captación y privacidad

El sitio incluye mecanismos separados para:

- **Analítica opcional:** los eventos de navegación y uso se envían únicamente cuando el visitante acepta las cookies analíticas. Se registran eventos generales, no el texto de las conversaciones.
- **Suscripciones:** el visitante puede elegir correo o WhatsApp y debe otorgar consentimiento explícito para registrar su contacto.
- **Transferencia a WhatsApp:** el visitante revisa y autoriza por separado el resumen que decide compartir con el equipo.

La infraestructura utiliza **Cloudflare D1** para almacenar los eventos analíticos permitidos y las suscripciones. El registro de una suscripción no significa que ya se estén enviando campañas automáticas.

El historial del chat se mantiene en el estado de la sesión del navegador y no se persiste en la base de datos del Worker. Los mensajes enviados al asistente se procesan mediante el proveedor de IA configurado. Mientras se utilicen rutas gratuitas, no se deben enviar datos personales, confidenciales ni conversaciones reales de clientes. No compartas contraseñas, datos bancarios ni información sensible en el asistente.

Consulta los avisos y controles que aparecen en el propio sitio antes de compartir información.

---

## Tecnología

| Capa | Tecnología |
|---|---|
| Interfaz | React 18, TypeScript y Vite |
| Estilos | Tailwind CSS |
| Iconografía | Lucide |
| Alojamiento web | GitHub Pages |
| API conversacional | Cloudflare Workers |
| Persistencia | Cloudflare D1 |
| Modelos de IA | Adaptadores para proveedores configurables |
| Despliegue | GitHub Actions y Wrangler |

---

## Desarrollo local

### Requisitos

- Node.js y npm.
- Una instalación local de las dependencias del proyecto.

### Instalar y ejecutar

```bash
npm install
npm run dev
```

### Verificar la compilación

```bash
npm run build
```

### Ejecutar el Worker localmente

```bash
cd worker
npm install
npx wrangler dev
```

El Worker requiere sus bindings y variables de entorno para habilitar las funciones correspondientes. Las credenciales privadas deben configurarse mediante los mecanismos de secretos de Cloudflare; nunca deben escribirse en el repositorio.

---

## Estructura del proyecto

```text
.
├── App.tsx                  # Sitio institucional, soluciones y demos
├── ChatWidget.tsx           # Asistente y transferencia a atención humana
├── CookieConsent.tsx        # Consentimiento de analítica
├── NewsletterSignup.tsx     # Registro de suscripciones
├── analytics.ts             # Eventos permitidos desde el navegador
├── docs/
│   ├── ASISTENTE-OPENROUTER.md
│   └── CAPTACION-ANALITICA.md
├── worker/
│   ├── src/index.ts         # API, chat, analítica y suscripciones
│   ├── migrations/          # Esquema de Cloudflare D1
│   └── wrangler.jsonc       # Configuración del Worker
└── .github/workflows/       # Verificación y despliegue
```

---

## Contacto

**Automata · Tarija, Bolivia**

- Web: https://automata-bo.github.io/
- WhatsApp: [+591 76192899](https://wa.me/59176192899)

Cuéntanos qué necesitas crear o resolver, ya sea para tu negocio, una celebración o un proyecto especial. Primero entendemos el objetivo; después decidimos qué construir.
