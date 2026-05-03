/* ============================================
   PELUDOS FACTORY — supabase-client.js
   Cliente de Supabase inicializado y listo.
   Requiere: config.js cargado primero.
   ============================================ */

// El SDK de Supabase expone `window.supabase` al
// cargarse vía CDN. Inicializamos el cliente aquí
// para que sea accesible globalmente como `db`.

let db = null;

try {
  if (
    SUPABASE_URL !== 'PEGAR_AQUI_SUPABASE_URL' &&
    SUPABASE_ANON_KEY !== 'PEGAR_AQUI_SUPABASE_ANON_KEY'
  ) {
    db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('%c✅ Supabase conectado correctamente.', 'color: #4A9D5F; font-weight: bold;');
  } else {
    console.warn(
      '%c⚠️ Supabase no configurado. Reemplaza SUPABASE_URL y SUPABASE_ANON_KEY en scripts/config.js.',
      'color: #E8721C; font-weight: bold;'
    );
  }
} catch (err) {
  console.error('❌ Error al inicializar Supabase:', err);
}
