/* ============================================
   PELUDOS FACTORY — config.js
   Configuración central. Reemplaza los valores
   de Supabase antes del primer deploy.
   ============================================ */

// ─── SUPABASE ────────────────────────────────
// INSTRUCCIÓN: Reemplaza estos placeholders con
// las claves reales de tu proyecto en Supabase.
const SUPABASE_URL = 'https://difkoncxjyquvecyzkrt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpZmtvbmN4anlxdXZlY3l6a3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3Njk3NjUsImV4cCI6MjA5MzM0NTc2NX0.pzhWvGLwB4IfE_QQbRQp5ndZEx-jIGnSChFlvhdduf0';

// ─── WHATSAPP ─────────────────────────────────
const WHATSAPP_NUMERO = '51991858390';

// ─── REDES SOCIALES ───────────────────────────
const REDES = {
  instagram: 'https://instagram.com/peludosfactory',
  tiktok: 'https://tiktok.com/@peludosfactory',
  facebook: 'https://facebook.com/peludosfactory',
};

// ─── CATÁLOGO DE PRODUCTOS ────────────────────
// Modifica aquí los precios cuando cambien.
const PRODUCTOS = {
  pijama: {
    id: 'pijama',
    nombre: 'Pijama personalizada',
    emoji: '😴',
    badge: 'MÁS VENDIDO',
    variantes: [
      { id: 'corta-short', nombre: 'Manga corta + short', precio: 95 },
      { id: 'corta-pantalon', nombre: 'Manga corta + pantalón', precio: 109 },
      { id: 'larga-pantalon', nombre: 'Manga larga + pantalón', precio: 119 }
    ],
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    precioDesde: 95,
    img: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=800&auto=format&fit=crop',
  },
  manta: {
    id: 'manta',
    nombre: 'Manta personalizada',
    emoji: '🛋️',
    badge: 'REGALO IDEAL',
    variantes: [
      { id: 'estandar', nombre: 'Felpa estándar 160×100cm', precio: 60 },
      { id: 'carnero', nombre: 'Felpa con carnero 160×130cm', precio: 90 },
    ],
    tallas: null,
    precioDesde: 60,
    img: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=800&auto=format&fit=crop',
  },
  polo: {
    id: 'polo',
    nombre: 'Polo de algodón',
    emoji: '👕',
    badge: 'NUEVO',
    variantes: null,
    tallas: ['XS', 'S', 'M', 'L', 'XL'],
    precio: 60,
    precioDesde: 60,
    img: 'https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=800&auto=format&fit=crop',
  },
  totebag: {
    id: 'totebag',
    nombre: 'Tote bag personalizada',
    emoji: '🛍️',
    badge: 'COMBO',
    variantes: null,
    tallas: null,
    precio: 45,
    precioDesde: 45,
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop',
  },
};

// ─── OPCIONES DE ENVÍO ────────────────────────
const OPCIONES_ENVIO = [
  { id: 'delivery-lima', nombre: 'Delivery Lima (moto)' },
  { id: 'recojo', nombre: 'Recojo en tienda' },
  { id: 'shalom', nombre: 'Envío Shalom (provincias)' },
  { id: 'olva', nombre: 'Envío Olva (provincias)' },
];
