# Peludos Factory - Web Oficial 🐾

Sitio web de e-commerce para **Peludos Factory**, emprendimiento peruano que vende productos personalizados con la cara de mascotas: pijamas, mantas, polos y tote bags.

## Stack Técnico

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 con variables custom |
| Lógica | JavaScript vanilla (ES6+) |
| Base de datos | Supabase (PostgreSQL) |
| Deploy | Vercel |
| Analytics | Google Analytics 4 |

## Estructura de archivos

```
peludos-factory-web/
├── index.html              ← Página principal
├── styles/
│   ├── variables.css       ← Tokens de diseño + reset global
│   ├── layout.css          ← Contenedor, navbar, secciones
│   ├── components.css      ← Botones, cards, inputs, animaciones
│   └── responsive.css      ← Media queries mobile-first
├── scripts/
│   ├── config.js           ← ⚙️ Configuración central (Supabase + productos)
│   ├── supabase-client.js  ← Cliente de Supabase inicializado
│   ├── configurador.js     ← Lógica del configurador de pedidos
│   └── animaciones.js      ← Scroll, hamburguesa, fade-ins
└── README.md
```

## Correr en local

**Opción A — Sin instalación (recomendado):**
```bash
npx serve .
# Abre http://localhost:3000
```

**Opción B — VS Code:**
Instala la extensión **Live Server** y haz clic en "Go Live".

**Opción C — Directo:**
Abre `index.html` en el navegador. Las fuentes requieren conexión a internet.

## Variables a configurar

Abre `scripts/config.js` y reemplaza:

```js
const SUPABASE_URL      = 'PEGAR_AQUI_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'PEGAR_AQUI_SUPABASE_ANON_KEY';
```

Con los valores de tu proyecto en [supabase.com](https://supabase.com) → Settings → API.

## Secciones del sitio (Prompt 1)

1. **Navbar** — Sticky con hamburguesa mobile
2. **Hero** — Columnas 50/50 con sticker giratorio y emojis flotantes
3. **Beneficios** — Franja de 4 ítems
4. **Productos** — Grid 2×2 con 4 cards
5. **Cómo funciona** — 4 pasos con SVG decorativo
6. **Configurador de pedidos** — Mini-configurador interactivo en vivo

## Próximamente (Prompt 2)

- Galería de clientes
- Testimonios
- FAQ
- CTA final
- Footer completo
- Botón flotante de WhatsApp
- Integración real con Supabase

## Contacto

- **WhatsApp:** +51 991 858 390
- **Instagram:** [@peludosfactory](https://instagram.com/peludosfactory)
- **TikTok:** [@peludosfactory](https://tiktok.com/@peludosfactory)
- **Yape:** 991 858 390
