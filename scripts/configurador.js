/* ============================================
   PELUDOS FACTORY — configurador.js
   Lógica interactiva del configurador de pedidos.
   Modular, comentado en español.
   ============================================ */

// ─────────────────────────────────────────────
// ESTADO DEL PEDIDO
// Objeto central que se actualiza con cada
// interacción del usuario.
// ─────────────────────────────────────────────
const estadoPedido = {
  productoId:  null,   // 'pijama' | 'manta' | 'polo' | 'totebag'
  varianteId:  null,   // id de la variante (si aplica)
  talla:       null,   // 'XS' | 'S' | 'M' | 'L' | 'XL' (si aplica)
  cantidad:    1,
  precioUnit:  0,
  precioTotal: 0,
  foto:        null,   // objeto File
  fotoPreview: null,   // data URL
  mascota: {
    nombre: '',
    tipo:   '',
    notas:  '',
  },
  cliente: {
    nombre: '',
    telefono: '',
    email:  '',
    ciudad: '',
    envio:  '',
    notasAdicionales: '',
  },
};

// ─────────────────────────────────────────────
// REFERENCIAS AL DOM
// Centraliza todos los selectores para evitar
// repetirlos en cada función.
// ─────────────────────────────────────────────
function getEl(id) { return document.getElementById(id); }

// Resumen sticky
const resNombreProducto = getEl('res-nombre-producto');
const resVariante       = getEl('res-variante');
const resTalla          = getEl('res-talla');
const resCantidad       = getEl('res-cantidad');
const resPrecioUnit     = getEl('res-precio-unit');
const resPrecioTotal    = getEl('res-precio-total');
const resFoto           = getEl('res-foto');
const btnConfirmarWA    = getEl('btn-confirmar-wa');
const btnConfirmarWA2   = getEl('btn-confirmar-wa2');

// Pasos del configurador
const paso2Wrapper    = getEl('paso2-wrapper');
const paso2Variantes  = getEl('paso2-variantes');
const paso2Tallas     = getEl('paso2-tallas');
const tallasContainer = getEl('tallas-container');

// File input
const fotoInput   = getEl('foto-input');
const fotoPreview = getEl('foto-preview');
const resumenFoto = getEl('res-foto');

// ─────────────────────────────────────────────
// 1. SELECCIONAR PRODUCTO
// Llamado cuando el usuario elige un producto
// en el Paso 1 del configurador.
// ─────────────────────────────────────────────
function seleccionarProducto(productoId) {
  const producto = PRODUCTOS[productoId];
  if (!producto) return;

  // Actualizar estado
  estadoPedido.productoId = productoId;
  estadoPedido.varianteId = null;
  estadoPedido.talla      = null;

  // Precio inicial
  if (producto.variantes && producto.variantes.length > 0) {
    estadoPedido.precioUnit = producto.variantes[0].precio;
    estadoPedido.varianteId = producto.variantes[0].id;
  } else {
    estadoPedido.precioUnit = producto.precio || producto.precioDesde;
  }

  // Mostrar paso 2
  renderizarPaso2(producto);
  actualizarResumen();
}

// ─────────────────────────────────────────────
// RENDERIZAR PASO 2 (variantes y tallas)
// Genera dinámicamente los radio buttons de
// variante y los pills de talla según el producto.
// ─────────────────────────────────────────────
function renderizarPaso2(producto) {
  // Mostrar el bloque
  if (paso2Wrapper) {
    paso2Wrapper.classList.remove('hidden');
    paso2Wrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --- VARIANTES ---
  if (paso2Variantes) {
    if (producto.variantes && producto.variantes.length > 0) {
      paso2Variantes.classList.remove('hidden');
      const container = getEl('variantes-container');
      if (container) {
        container.innerHTML = producto.variantes.map((v, idx) => `
          <div class="radio-pill">
            <input
              type="radio"
              name="variante"
              id="variante-${v.id}"
              value="${v.id}"
              ${idx === 0 ? 'checked' : ''}
              onchange="seleccionarVariante('${producto.id}', '${v.id}')"
            >
            <label for="variante-${v.id}">
              ${v.nombre} — <strong>S/ ${v.precio}</strong>
            </label>
          </div>
        `).join('');
      }
    } else {
      paso2Variantes.classList.add('hidden');
    }
  }

  // --- TALLAS ---
  if (paso2Tallas) {
    if (producto.tallas && producto.tallas.length > 0) {
      paso2Tallas.classList.remove('hidden');
      if (tallasContainer) {
        tallasContainer.innerHTML = producto.tallas.map((t, idx) => `
          <div class="radio-pill">
            <input
              type="radio"
              name="talla"
              id="talla-${t}"
              value="${t}"
              ${idx === 0 ? 'checked' : ''}
              onchange="seleccionarTalla('${t}')"
            >
            <label for="talla-${t}">${t}</label>
          </div>
        `).join('');
        // Seleccionar primera talla por defecto
        estadoPedido.talla = producto.tallas[0];
      }
    } else {
      paso2Tallas.classList.add('hidden');
    }
  }
}

// ─────────────────────────────────────────────
// 2. SELECCIONAR VARIANTE
// Actualiza precio y resumen cuando el usuario
// elige una variante del producto (pijama/manta).
// ─────────────────────────────────────────────
function seleccionarVariante(productoId, varianteId) {
  const producto = PRODUCTOS[productoId];
  if (!producto || !producto.variantes) return;

  const variante = producto.variantes.find(v => v.id === varianteId);
  if (!variante) return;

  estadoPedido.varianteId = varianteId;
  estadoPedido.precioUnit = variante.precio;
  actualizarResumen();
}

// ─────────────────────────────────────────────
// 3. SELECCIONAR TALLA
// Guarda la talla elegida y actualiza resumen.
// ─────────────────────────────────────────────
function seleccionarTalla(talla) {
  estadoPedido.talla = talla;
  actualizarResumen();
}

// ─────────────────────────────────────────────
// 4. ACTUALIZAR RESUMEN STICKY
// Sincroniza el panel de resumen de la izquierda
// con el estado actual del pedido.
// ─────────────────────────────────────────────
function actualizarResumen() {
  const producto = estadoPedido.productoId ? PRODUCTOS[estadoPedido.productoId] : null;
  estadoPedido.precioTotal = estadoPedido.precioUnit * estadoPedido.cantidad;

  // Nombre producto
  if (resNombreProducto) {
    resNombreProducto.textContent = producto ? producto.nombre : '—';
  }

  // Variante
  if (resVariante) {
    if (producto && producto.variantes) {
      const v = producto.variantes.find(x => x.id === estadoPedido.varianteId);
      resVariante.textContent = v ? v.nombre : '—';
    } else {
      resVariante.textContent = estadoPedido.productoId ? 'Sin variante' : '—';
    }
  }

  // Talla
  if (resTalla) {
    const rowTalla = resTalla.closest('.resumen-item');
    if (producto && producto.tallas) {
      rowTalla && rowTalla.classList.remove('hidden');
      resTalla.textContent = estadoPedido.talla || '—';
    } else {
      rowTalla && rowTalla.classList.add('hidden');
    }
  }

  // Cantidad
  if (resCantidad) {
    resCantidad.textContent = estadoPedido.cantidad;
  }

  // Precios
  if (resPrecioUnit) {
    resPrecioUnit.textContent = estadoPedido.precioUnit > 0
      ? `S/ ${estadoPedido.precioUnit}`
      : '—';
  }

  if (resPrecioTotal) {
    resPrecioTotal.textContent = estadoPedido.precioTotal > 0
      ? `S/ ${estadoPedido.precioTotal}`
      : '—';
  }
}

// ─────────────────────────────────────────────
// 5. PREVISUALIZAR FOTO
// Muestra el preview inline de la foto subida
// tanto en el formulario como en el resumen.
// ─────────────────────────────────────────────
function previsualizarFoto(input) {
  const file = input.files[0];
  if (!file) return;

  estadoPedido.foto = file;

  const reader = new FileReader();
  reader.onload = function (e) {
    estadoPedido.fotoPreview = e.target.result;

    // Preview en el formulario
    if (fotoPreview) {
      fotoPreview.src = e.target.result;
      fotoPreview.classList.add('visible');
    }

    // Preview en el resumen sticky
    if (resumenFoto) {
      resumenFoto.src = e.target.result;
      resumenFoto.classList.add('visible');
    }

    // Actualizar label del input
    const label = document.querySelector('.file-input-label span');
    if (label) label.textContent = `📷 ${file.name}`;
  };
  reader.readAsDataURL(file);
}

// ─────────────────────────────────────────────
// 6. SINCRONIZAR DATOS DEL FORMULARIO
// Lee todos los campos del formulario y actualiza
// el estadoPedido. Llamar antes de validar.
// ─────────────────────────────────────────────
function sincronizarFormulario() {
  // Cantidad
  const cantInput = getEl('input-cantidad');
  if (cantInput) {
    estadoPedido.cantidad = parseInt(cantInput.value) || 1;
  }

  // Datos mascota
  const nombreMascota = getEl('input-nombre-mascota');
  const tipoMascota   = getEl('select-tipo-mascota');
  const notasDiseno   = getEl('textarea-notas-diseno');

  if (nombreMascota) estadoPedido.mascota.nombre = nombreMascota.value.trim();
  if (tipoMascota)   estadoPedido.mascota.tipo   = tipoMascota.value;
  if (notasDiseno)   estadoPedido.mascota.notas  = notasDiseno.value.trim();

  // Datos cliente
  const nombre   = getEl('input-nombre-cliente');
  const telefono = getEl('input-telefono');
  const email    = getEl('input-email');
  const ciudad   = getEl('input-ciudad');
  const notasAd  = getEl('textarea-notas-adicionales');

  if (nombre)   estadoPedido.cliente.nombre   = nombre.value.trim();
  if (telefono) estadoPedido.cliente.telefono = telefono.value.trim();
  if (email)    estadoPedido.cliente.email    = email.value.trim();
  if (ciudad)   estadoPedido.cliente.ciudad   = ciudad.value.trim();
  if (notasAd)  estadoPedido.cliente.notasAdicionales = notasAd.value.trim();

  // Tipo de envío (radio)
  const envioChecked = document.querySelector('input[name="tipo-envio"]:checked');
  if (envioChecked) estadoPedido.cliente.envio = envioChecked.value;

  // Actualizar precio total con cantidad actualizada
  estadoPedido.precioTotal = estadoPedido.precioUnit * estadoPedido.cantidad;
  actualizarResumen();
}

// ─────────────────────────────────────────────
// 7. VALIDAR FORMULARIO
// Revisa campos requeridos. Retorna true si todo
// está OK. Si hay errores, los muestra en el DOM.
// ─────────────────────────────────────────────
function validarFormulario() {
  let esValido = true;

  // Helper: marcar error
  function marcarError(inputId, errorId, mensaje) {
    const input = getEl(inputId);
    const errorEl = getEl(errorId);
    if (input) input.classList.add('error');
    if (errorEl) {
      errorEl.textContent = mensaje;
      errorEl.classList.add('visible');
    }
    esValido = false;
  }

  // Helper: limpiar error
  function limpiarError(inputId, errorId) {
    const input = getEl(inputId);
    const errorEl = getEl(errorId);
    if (input) input.classList.remove('error');
    if (errorEl) errorEl.classList.remove('visible');
  }

  // Validar producto seleccionado
  if (!estadoPedido.productoId) {
    const msgEl = getEl('error-producto');
    if (msgEl) {
      msgEl.textContent = 'Por favor elige un producto.';
      msgEl.classList.add('visible');
    }
    esValido = false;
  }

  // Nombre de mascota
  limpiarError('input-nombre-mascota', 'error-nombre-mascota');
  if (!estadoPedido.mascota.nombre) {
    marcarError('input-nombre-mascota', 'error-nombre-mascota', 'Cuéntanos el nombre de tu peludo.');
  }

  // Nombre cliente
  limpiarError('input-nombre-cliente', 'error-nombre-cliente');
  if (!estadoPedido.cliente.nombre) {
    marcarError('input-nombre-cliente', 'error-nombre-cliente', 'Tu nombre es requerido.');
  }

  // Teléfono (9 dígitos)
  limpiarError('input-telefono', 'error-telefono');
  const telLimpio = estadoPedido.cliente.telefono.replace(/\D/g, '');
  if (!telLimpio || telLimpio.length !== 9) {
    marcarError('input-telefono', 'error-telefono', 'Ingresa tu número de WhatsApp (9 dígitos).');
  }

  // Ciudad
  limpiarError('input-ciudad', 'error-ciudad');
  if (!estadoPedido.cliente.ciudad) {
    marcarError('input-ciudad', 'error-ciudad', 'Dinos tu distrito o ciudad.');
  }

  // Tipo de envío
  if (!estadoPedido.cliente.envio) {
    const msgEl = getEl('error-envio');
    if (msgEl) {
      msgEl.textContent = 'Elige tu tipo de envío.';
      msgEl.classList.add('visible');
    }
    esValido = false;
  }

  return esValido;
}

// ─────────────────────────────────────────────
// 8. CONSTRUIR MENSAJE DE WHATSAPP
// Genera el texto pre-formateado listo para
// enviarse por WhatsApp.
// ─────────────────────────────────────────────
function construirMensajeWhatsApp(datos) {
  const producto = PRODUCTOS[datos.productoId] || {};

  // Nombre de variante
  let varianteNombre = 'Sin variante';
  if (producto.variantes && datos.varianteId) {
    const v = producto.variantes.find(x => x.id === datos.varianteId);
    if (v) varianteNombre = v.nombre;
  }

  // Talla
  const tallaTexto = datos.talla ? `Talla ${datos.talla}` : '';

  // Variante + talla combinados
  const varianteCompleta = [varianteNombre, tallaTexto].filter(Boolean).join(' | ');

  const mensaje = `¡Hola Peludos Factory! 🐾 Quiero hacer un pedido:

🛍️ Producto: ${producto.nombre || datos.productoId}
📐 Variante: ${varianteCompleta}
🔢 Cantidad: ${datos.cantidad}
💰 Total: S/ ${datos.precioTotal}

🐶 Mascota: ${datos.mascota.nombre} (${datos.mascota.tipo || 'No especificado'})
🎨 Personalización: ${datos.mascota.notas || 'Sin notas especiales'}

👤 Mis datos:
- Nombre: ${datos.cliente.nombre}
- Teléfono: ${datos.cliente.telefono}
- Email: ${datos.cliente.email || 'No proporcionado'}
- Ciudad: ${datos.cliente.ciudad}
- Envío: ${datos.cliente.envio}
${datos.cliente.notasAdicionales ? `\n📝 Notas adicionales: ${datos.cliente.notasAdicionales}` : ''}
📷 (Adjunto la foto de mi peludo en el siguiente mensaje)`;

  return mensaje;
}

// ─────────────────────────────────────────────
// 9. MOSTRAR ÉXITO
// Toast animado que aparece y desaparece en 5s.
// ─────────────────────────────────────────────
function mostrarExito() {
  let toast = document.getElementById('toast-exito');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-exito';
    toast.className = 'toast-exito';
    toast.innerHTML = '✅ ¡Pedido registrado! Abriendo WhatsApp...';
    document.body.appendChild(toast);
  }
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 5000);
}

// ─────────────────────────────────────────────
// 10. ENVIAR PEDIDO — Integración real Supabase
// Sube la foto al bucket, guarda el pedido en
// la tabla, dispara GA4 y abre WhatsApp.
// ─────────────────────────────────────────────
async function enviarPedido() {
  // 1. Sincronizar + Validar
  sincronizarFormulario();
  if (!validarFormulario()) {
    const primerError = document.querySelector('.form-error.visible, .error-msg.visible');
    if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // 2. Estado de carga en botones
  const btns = [getEl('btn-confirmar-wa'), getEl('btn-confirmar-wa2')];
  btns.forEach(b => { if (b) { b.disabled = true; b.textContent = '⏳ Enviando...'; } });

  const datos = { ...estadoPedido };
  const productoObj = PRODUCTOS[datos.productoId] || {};

  // Nombre de variante para el mensaje
  let varianteNombre = 'Sin variante';
  if (productoObj.variantes && datos.varianteId) {
    const v = productoObj.variantes.find(x => x.id === datos.varianteId);
    if (v) varianteNombre = v.nombre;
  }

  try {
    // 3. Subir foto al bucket fotos-mascotas (si existe foto y Supabase configurado)
    let fotoUrl = null;
    const fotoFile = datos.foto;
    if (fotoFile && db) {
      const nombreArchivo = `${Date.now()}-${fotoFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const { error: uploadError } = await db.storage
        .from('fotos-mascotas')
        .upload(nombreArchivo, fotoFile);

      if (uploadError) {
        console.warn('Foto no subida (continuamos igual):', uploadError.message);
      } else {
        const { data: urlData } = db.storage
          .from('fotos-mascotas')
          .getPublicUrl(nombreArchivo);
        fotoUrl = urlData.publicUrl;
      }
    }

    // 4. Insertar pedido en Supabase
    if (db) {
      const { error: insertError } = await db
        .from('pedidos')
        .insert([{
          nombre_cliente:   datos.cliente.nombre,
          telefono:         datos.cliente.telefono,
          email:            datos.cliente.email || null,
          ciudad:           datos.cliente.ciudad,
          producto:         productoObj.nombre || datos.productoId,
          variante:         varianteNombre !== 'Sin variante' ? varianteNombre : null,
          talla:            datos.talla || null,
          cantidad:         datos.cantidad,
          precio_unitario:  datos.precioUnit,
          precio_total:     datos.precioTotal,
          nombre_mascota:   datos.mascota.nombre || null,
          tipo_mascota:     datos.mascota.tipo || null,
          personalizacion:  datos.mascota.notas || null,
          foto_mascota_url: fotoUrl,
          tipo_envio:       datos.cliente.envio,
          notas_adicionales: datos.cliente.notasAdicionales || null,
          estado:           'pendiente',
        }]);

      if (insertError) throw insertError;
    } else {
      // Supabase no configurado — solo log
      console.log('%c📦 Pedido (Supabase no configurado):', 'color:#E8721C;font-weight:bold;', datos);
    }

    // 5. Evento GA4
    if (typeof gtag === 'function') {
      gtag('event', 'pedido_confirmado', {
        producto: productoObj.nombre || datos.productoId,
        valor:    datos.precioTotal,
        moneda:   'PEN',
      });
    }

    // 6. Toast de éxito
    mostrarExito();

    // 7. Abrir WhatsApp
    const mensaje = construirMensajeWhatsApp(datos);
    const waUrl   = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(waUrl, '_blank');

  } catch (err) {
    console.error('Error al enviar pedido:', err);
    alert('Hubo un problema al guardar tu pedido. Por favor inténtalo de nuevo o escríbenos directo por WhatsApp al +51 991 858 390.');
  } finally {
    btns.forEach(b => { if (b) { b.disabled = false; b.textContent = '📲 Confirmar pedido por WhatsApp'; } });
  }
}

// ─────────────────────────────────────────────
// INICIALIZACIÓN
// Se ejecuta al cargar la página.
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
  // Vincular botones de confirmación
  if (btnConfirmarWA)  btnConfirmarWA.addEventListener('click',  enviarPedido);
  if (btnConfirmarWA2) btnConfirmarWA2.addEventListener('click', enviarPedido);

  // Vincular input de foto
  if (fotoInput) {
    fotoInput.addEventListener('change', function () {
      previsualizarFoto(this);
    });
  }

  // Sincronizar cantidad en tiempo real
  const cantInput = getEl('input-cantidad');
  if (cantInput) {
    cantInput.addEventListener('input', function () {
      estadoPedido.cantidad = Math.max(1, parseInt(this.value) || 1);
      this.value = estadoPedido.cantidad;
      actualizarResumen();
    });
  }

  // Inicializar resumen
  actualizarResumen();

  console.log('%c🐾 Peludos Factory — Configurador listo.', 'color: #E8721C; font-weight: bold;');
});
