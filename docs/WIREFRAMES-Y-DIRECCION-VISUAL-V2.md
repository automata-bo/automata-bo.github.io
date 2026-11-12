# AUTOMATA 2.0 · Wireframes y dirección visual

**Estado:** dirección visual implementada parcialmente en la rama V2. La compilación de la base fue aprobada en CI; la última corrección de navegación debe revalidarse. Revisión visual manual pendiente.  
**Rama:** `feature/automata-web-v2-architecture`  
**Base revisada:** `App.tsx`, `index.css`, `package.json`, `assets/` y documentación V2.

Este documento convierte la arquitectura y el sitemap en una guía concreta de composición y referencia para la implementación. La rama contiene una primera versión funcional de las páginas; aún no se ha completado la revisión visual ni la validación en el hosting. No autoriza a presentar contenido conceptual como un servicio ya desplegado.

---

## 1. Diagnóstico visual de la versión actual

### Lo que conviene conservar

- Paleta clara: blanco, carbón `#0E1116`, naranja `#FF5A00`, superficies cálidas y líneas suaves.
- Tipografías Archivo para titulares e Inter para lectura e interfaz.
- Botones redondeados, jerarquía tipográfica marcada y tarjetas con aire.
- Logo horizontal y símbolo disponibles en `assets/`.
- Asistente, consentimiento, analítica y componentes de captación como piezas funcionales independientes.
- Demos interactivas como prueba de capacidad, con aviso explícito de que son simulaciones.

### Lo que debe cambiar

La portada actual está construida alrededor de automatización para negocios: dolores operativos, soluciones, demos de restaurante/consultorio/peluquería, proceso y modelo de costos. Esa narrativa es útil para la línea **Digital**, pero ya no representa por sí sola a AUTOMATA.

La V2 debe presentar primero el universo de marca y después conducir a cada división. No se deben borrar las demos existentes ni convertirlas en el mensaje central de toda la empresa.

---

## 2. Dirección visual propuesta

**Concepto:** laboratorio creativo-tecnológico. Una marca sobria, expresiva y contemporánea, donde la tecnología se siente útil y la creatividad tiene espacio.

- **Base:** blanco cálido y carbón, con naranja como acento de identidad.
- **Acentos por división:** Digital puede usar naranja; Experiences puede incorporar un acento cálido secundario; Studio puede apoyarse en tonos oscuros y tratamiento editorial. Los acentos secundarios no reemplazan el naranja de marca.
- **Tipografía:** mantener Archivo + Inter hasta comprobar legibilidad y carga. No sumar familias por decoración.
- **Composición:** bloques amplios, titulares cortos, imágenes con intención y ritmo editorial.
- **Movimiento:** microinteracciones discretas. Respetar `prefers-reduced-motion`; evitar animaciones constantes que compitan con el contenido.
- **Fotografía:** usar material propio o imágenes aprobadas. No inventar clientes, proyectos, resultados, testimonios ni fotografías de trabajos realizados.

### Regla de jerarquía

1. AUTOMATA: la marca paraguas.
2. División: Digital / Experiences / Studio.
3. Solución, experiencia o proyecto concreto.
4. CTA: explorar, ver una demostración o iniciar conversación.

---

## 3. Wireframe funcional · Inicio

Orden recomendado:

1. **Header**
   - Logo.
   - Navegación: Digital, Experiences, Studio, Proyectos, Contacto.
   - CTA principal: “Conversemos”.
   - Menú móvil accesible, con foco y cierre previsibles.

2. **Hero institucional**
   - Eyebrow: “Digital Experiences & Intelligent Solutions”.
   - H1: “Diseñamos experiencias digitales y soluciones inteligentes.”
   - Texto: “Tecnología, creatividad e inteligencia aplicadas a experiencias y soluciones digitales.”
   - CTA primario: “Explorar lo que hacemos”.
   - CTA secundario: “Conversemos”.
   - Recurso visual de marca: composición gráfica propia, no un collage de servicios.

3. **Tres divisiones**
   - **Digital:** productos digitales, sitios web, asistentes, automatización e integraciones.
   - **Experiences:** experiencias interactivas para personas, eventos y marcas; incluir el producto de álbum comunitario con QR para bodas cuando su presentación comercial esté lista.
   - **Studio:** producción audiovisual, campañas, fotografía y creación híbrida con IA.
   - Cada tarjeta tiene una frase de valor y un enlace a su página.

4. **Selección de proyectos / experiencias**
   - Mostrar únicamente trabajos, prototipos o demos con estado identificado.
   - Etiquetas posibles: “Proyecto”, “Demo”, “Concepto”.
   - No mezclar prototipos con casos de clientes.

5. **Cómo trabajamos**
   - Comprender → Diseñar → Prototipar → Implementar → Acompañar.
   - Explicar el proceso sin prometer plazos universales.

6. **Cierre y contacto**
   - Mensaje breve.
   - CTA a conversación.
   - El asistente puede apoyar el primer contacto, sin sustituir la decisión humana.

7. **Footer**
   - Marca, navegación secundaria, canales y enlaces legales disponibles.

---

## 4. Wireframe funcional · Digital

**Objetivo:** convertir el interés en una consulta concreta sobre una necesidad digital.

1. Hero: “Sistemas digitales que resuelven trabajo real.”
2. Breve explicación: diseñamos y conectamos herramientas según el proceso del negocio.
3. Catálogo agrupado:
   - Sitios y experiencias web.
   - Asistentes digitales y WhatsApp.
   - Automatización de procesos.
   - Integraciones y sistemas a medida.
   - Aplicaciones de IA con límites y supervisión claros.
4. Demos actuales:
   - Restaurante.
   - Consultorio.
   - Peluquería.
   - Cada demo debe identificarse como simulación y explicar qué parte sería real al implementarse.
5. Método y alcance:
   - diagnóstico, prototipo, implementación, mantenimiento.
6. CTA: “Cuéntanos qué proceso quieres mejorar”.

**Criterio:** las demos actuales se trasladan y ordenan dentro de esta división. No se deben presentar como productos SaaS listos ni como integraciones reales si solo simulan el flujo.

---

## 5. Wireframe funcional · Experiences

**Objetivo:** mostrar que AUTOMATA crea experiencias participativas, no solo páginas o automatizaciones.

1. Hero emocional y visual: “Experiencias que conectan personas y momentos.”
2. Introducción breve sobre experiencias digitales, físicas e híbridas.
3. Producto destacado para bodas:
   - Invitación o punto de acceso mediante QR.
   - Fotografías tomadas por invitados.
   - Álbum comunitario personalizado para la pareja.
   - Entrega y acceso mediante tarjetas con QR.
   - Presentar el flujo como producto en desarrollo hasta validar operación, privacidad, almacenamiento y entrega.
4. Otras experiencias: solo incorporar categorías con oferta y capacidad definidas.
5. Galería o demostración del recorrido del usuario.
6. CTA: “Diseñemos una experiencia”.

**Cuidado:** fotografías de invitados requieren consentimiento y reglas claras de acceso, conservación y eliminación. No prometer álbumes ilimitados ni disponibilidad permanente sin definir infraestructura y costos.

---

## 6. Wireframe funcional · Studio

**Objetivo:** posicionar la capacidad creativa y audiovisual de AUTOMATA.

1. Hero editorial: “Ideas que toman forma.”
2. Presentación: producción audiovisual, fotografía, campañas y piezas híbridas.
3. Líneas de trabajo:
   - Producción audiovisual.
   - Fotografía y contenido.
   - Publicidad y campañas.
   - Producción asistida por IA.
4. Selección visual de trabajos o experimentos, diferenciando encargos reales de exploraciones.
5. Proceso creativo: concepto → preproducción → producción → edición → entrega.
6. CTA: “Hablemos de tu proyecto”.

**Cuidado:** no usar imágenes generadas como si fueran registro documental de un trabajo real. Identificar conceptos y piezas de IA cuando sea relevante.

---

## 7. Sistema de componentes propuesto

Construir componentes pequeños y reutilizables sin introducir una arquitectura innecesariamente compleja.

- `SiteHeader`: navegación responsive y CTA.
- `SiteFooter`: identidad y enlaces.
- `SectionIntro`: eyebrow, título y descripción.
- `DivisionCard`: tarjeta de cada división.
- `ProjectCard`: pieza con etiqueta de estado.
- `ProcessSteps`: etapas del método.
- `ContactCTA`: cierre consistente.
- `PageShell`: ancho, espaciado y estructura compartida.

Las piezas funcionales existentes deben seguir separadas:

- `ChatWidget`
- `CookieConsent`
- `NewsletterSignup`, si la estrategia de contenido confirma su uso
- `analytics`

No crear un sistema genérico de bloques antes de necesitarlo. Primero extraer lo que se repite de verdad.

---

## 8. Inventario y destino de elementos V1

| Elemento actual | Decisión V2 |
|---|---|
| Header con Soluciones / Demos / Proceso / Contacto | Reemplazar por navegación de marca y divisiones |
| Hero “Tu negocio no necesita más tecnología…” | Conservar como posible mensaje de entrada de Digital, no como hero institucional |
| Bloque de dolores operativos | Reubicar o resumir en Digital |
| Tarjetas de soluciones | Reagrupar en Digital |
| Demos restaurante / consultorio / peluquería | Mantener como demostraciones identificadas |
| Proceso de cinco pasos | Adaptar a método general |
| Modelo de costos | Llevar a explicación de contratación cuando corresponda; no necesita protagonismo en Inicio |
| Cierre con asistente | Mantener como canal de contacto, con lenguaje de marca paraguas |
| Chat, consentimiento y analítica | Preservar y validar durante la migración |
| Logos existentes | Revisar variantes y escoger una versión principal y una compacta |

---

## 9. Reglas responsive y accesibilidad

- Diseñar primero el orden de lectura móvil; ampliar a tablet y escritorio.
- No esconder información esencial detrás de hover.
- Áreas táctiles cómodas y botones con estados visibles.
- Contraste suficiente en textos, botones y etiquetas.
- Imágenes con texto alternativo útil; imágenes decorativas con alternativa vacía.
- Navegación por teclado y foco visible.
- Formularios con etiquetas, errores comprensibles y confirmación de estado.
- Respetar movimiento reducido.
- Evitar carruseles automáticos y videos pesados en el hero.

---

## 10. Secuencia de implementación

1. **Fundación visual:** tokens, header, footer, contenedores y componentes comunes.
2. **Inicio:** nueva narrativa institucional y tres divisiones.
3. **Digital:** mover las soluciones y demos actuales sin romper su comportamiento.
4. **Experiences:** página y recorrido del producto de bodas, con estados y límites explícitos.
5. **Studio:** estructura editorial y galería preparada para contenido aprobado.
6. **Integración:** asistente, consentimiento, analítica y newsletter solo donde tengan sentido.
7. **Validación:** build, responsive, accesibilidad básica, enlaces, eventos y prueba de rutas en GitHub Pages. La compilación inicial ya pasó en CI; repetirla tras los cambios más recientes y completar QA manual.

### Puerta de calidad antes de publicar

- [ ] Build de producción correcto.
- [ ] No se perdió ninguna función útil de V1.
- [ ] Demos claramente identificadas como simulaciones.
- [ ] Ningún caso, cliente o resultado inventado.
- [ ] Chat, consentimiento y analítica comprobados.
- [ ] Rutas y recarga directa comprobadas en el hosting real.
- [ ] Vistas móvil, tablet y escritorio revisadas.
- [ ] Contenido, imágenes y permisos aprobados.

---

## 11. Decisiones que permanecen abiertas

No bloquear el wireframe por estos puntos, pero resolverlos antes de publicar:

- Selección final de fotografías y material audiovisual.
- Casos reales que AUTOMATA puede mostrar públicamente.
- Alcance operativo y condiciones del producto de bodas.
- Canales de contacto y datos públicos definitivos.
- Si Proyectos será una página independiente o una sección de Inicio en la primera entrega.

**Resultado esperado:** una web que explique AUTOMATA como una marca integrada, permita entender sus tres divisiones en pocos segundos y conduzca a una conversación comercial sin sobrecargar la experiencia.
