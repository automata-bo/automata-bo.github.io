# AUTOMATA

**Tecnología · Creatividad · Inteligencia**

AUTOMATA es un estudio de tecnología y soluciones digitales con base en Tarija, Bolivia. Integramos desarrollo de software, inteligencia artificial, automatización, comunicación y producción creativa para resolver necesidades reales y construir experiencias con valor.

No incorporamos tecnología por moda. Primero entendemos qué necesita resolver cada cliente; después evaluamos qué solución tiene sentido, qué condiciones requiere y si realmente vale la pena implementarla.

🌐 **Sitio web:** https://automata-bo.github.io/

---

## Nuestra estructura

AUTOMATA organiza su propuesta en tres grandes capacidades comerciales que pueden trabajar por separado o integrarse en un mismo proyecto.

### AUTOMATA Digital
**Construimos soluciones digitales.**

Diseñamos y desarrollamos presencia digital, plataformas y herramientas para negocios, organizaciones y proyectos.

- Sitios web corporativos, institucionales y páginas de presentación.
- Landing pages, catálogos digitales y sitios orientados a captación.
- Sistemas y aplicaciones web a medida.
- Asistentes digitales para web y canales de mensajería.
- Pedidos, solicitudes de citas y reservas mediante flujos digitales.
- Automatización de procesos, registros, reportes, avisos e integraciones.
- Inteligencia artificial aplicada cuando aporta una ventaja concreta.

Una web corporativa puede ser un proyecto completo por sí mismo o formar parte de una solución mayor que integre contenido audiovisual, automatización y atención digital.

### AUTOMATA Experiences
**Creamos experiencias digitales memorables.**

Diseñamos experiencias personalizadas que conectan personas, historias, contenidos y momentos especiales.

- Invitaciones digitales e interactivas para bodas y celebraciones.
- Regalos digitales personalizados y narrativas interactivas.
- Galerías privadas y álbumes comunitarios.
- Recopilación colaborativa de fotografías y mensajes desde teléfonos mediante enlaces o códigos QR.
- Experiencias conmemorativas, homenajes y cápsulas del tiempo.
- Juegos, recorridos y dinámicas interactivas para eventos.
- Integración de contenido digital con tarjetas, impresos y otros objetos físicos.

En una experiencia para bodas, por ejemplo, los invitados pueden acceder desde sus teléfonos, compartir fotografías y contribuir a un álbum digital personalizado para los novios. La producción puede incluir identidad visual del evento, tarjetas impresas con QR y una galería organizada para conservar los recuerdos.

Cada experiencia se define según el evento, la privacidad requerida, el volumen de participantes y la forma de recopilar, revisar y entregar los contenidos. No se presupone que cualquier evento tenga las mismas necesidades ni que las imágenes se publiquen de forma abierta.

Las experiencias se desarrollan según el alcance de cada encargo. Las ideas y posibilidades descritas en esta línea no implican que exista una plataforma genérica de eventos lista para contratar.

### AUTOMATA Studio
**Producimos comunicación y contenido creativo.**

Desarrollamos conceptos y piezas de comunicación combinando criterio creativo, producción tradicional y herramientas de inteligencia artificial.

- Producción audiovisual y videos promocionales.
- Publicidad, campañas y conceptos creativos.
- Contenido para redes sociales y comunicación de marca.
- Fotografía y piezas gráficas.
- Producciones híbridas: grabación real, edición tradicional y recursos generados con IA.
- Narrativas y contenidos multimedia para proyectos comerciales, institucionales y culturales.

Studio también puede aportar fotografía, video, animación y contenido a proyectos de Digital o Experiences.

---

## Una estructura, múltiples soluciones

Las tres capacidades no son empresas independientes ni catálogos aislados. Son partes de un mismo estudio y pueden combinarse según el objetivo del proyecto.

Por ejemplo, una organización puede trabajar con:

- **Digital** para desarrollar su sitio corporativo.
- **Studio** para producir sus videos institucionales y contenido de marca.
- **Experiences** para crear una experiencia interactiva para un evento o comunidad.

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

El sitio incorpora un asistente conversacional con IA. Su función es orientar a los visitantes, comprender sus necesidades y ayudarles a identificar un siguiente paso razonable dentro de las capacidades de AUTOMATA.

El asistente:

- Responde preguntas sobre las soluciones de AUTOMATA Digital, Experiences y Studio.
- Mantiene el contexto de la conversación durante la sesión.
- Hace preguntas puntuales para entender el problema, sin convertir la conversación en un formulario.
- Evalúa qué capacidad o combinación de capacidades puede encajar con la necesidad expresada.
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

**AUTOMATA · Tarija, Bolivia**

- Web: https://automata-bo.github.io/
- WhatsApp: [+591 76192899](https://wa.me/59176192899)

Cuéntanos qué necesitas construir, comunicar o hacer posible, ya sea para tu negocio, una celebración o un proyecto especial. Primero entendemos el objetivo; después decidimos qué construir.
