const cotizacion = document.getElementById("formulario-contacto");
const contenedorResumen = document.getElementById("resumen-envio");

const regexCorreo = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const regexTelefono = /^\+?[\d\s\-()]{8,25}$/;
const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/;

const LONGITUD_NOMBRE = { minimo: 3, maximo: 40 };
const LONGITUD_MENSAJE = { minimo: 10, maximo: 300 };

function validarNombre(valor) {
  if (valor === "") return "El nombre es obligatorio.";
  if (valor.length < LONGITUD_NOMBRE.minimo) return `El nombre debe tener al menos ${LONGITUD_NOMBRE.minimo} caracteres.`;
  if (valor.length > LONGITUD_NOMBRE.maximo) return `El nombre no puede superar los ${LONGITUD_NOMBRE.maximo} caracteres.`;
  if (!regexNombre.test(valor)) return "El nombre solo puede contener letras y espacios.";
  return "";
}

function validarCorreo(valor) {
  if (valor === "") return "El correo electrónico es obligatorio.";
  if (!regexCorreo.test(valor)) return "Ingresá un correo válido, por ejemplo nombre@dominio.com.";
  return "";
}

function validarTelefono(valor) {
  if (valor === "") return "El teléfono es obligatorio.";
  if (!regexTelefono.test(valor)) return "Ingresá un teléfono válido de 8 a 15 dígitos (se permiten +, espacios y guiones).";
  const cantidadDigitos = valor.replace(/\D/g, "").length;
  if (cantidadDigitos < 8 || cantidadDigitos > 15) return "El teléfono debe tener entre 8 y 15 dígitos.";
  return "";
}

function validarMensaje(valor) {
  if (valor === "") return "El mensaje es obligatorio.";
  if (valor.length < LONGITUD_MENSAJE.minimo) return `El mensaje debe tener al menos ${LONGITUD_MENSAJE.minimo} caracteres.`;
  if (valor.length > LONGITUD_MENSAJE.maximo) return `El mensaje no puede superar los ${LONGITUD_MENSAJE.maximo} caracteres.`;
  return "";
}

const camposDelFormulario = [
  { id: "nombre", etiqueta: "Nombre", validar: validarNombre },
  { id: "correo", etiqueta: "Correo electrónico", validar: validarCorreo },
  { id: "telefono", etiqueta: "Teléfono", validar: validarTelefono },
  { id: "mensaje", etiqueta: "Mensaje", validar: validarMensaje }
];

function limpiarEspacios(texto) {
  return texto.trim().replace(/\s+/g, " ");
}

function mostrarError(campo, textoError) {
  const entrada = document.getElementById(campo.id);
  const parrafoError = document.getElementById(`error-${campo.id}`);
  parrafoError.textContent = textoError;
  entrada.closest(".campo").classList.toggle("campo--invalido", textoError !== "");
  entrada.setAttribute("aria-invalid", textoError !== "" ? "true" : "false");
}

function validarCampo(campo) {
  const entrada = document.getElementById(campo.id);
  const valorLimpio = limpiarEspacios(entrada.value);
  entrada.value = valorLimpio;
  const textoError = campo.validar(valorLimpio);
  mostrarError(campo, textoError);
  return textoError === "";
}

function mostrarResumen(datos) {
  contenedorResumen.replaceChildren();

  const titulo = document.createElement("h2");
  titulo.className = "resumen__titulo";
  titulo.textContent = "¡Gracias por escribirnos!";

  const subtitulo = document.createElement("p");
  subtitulo.textContent = "Recibimos tu consulta con estos datos:";

  const lista = document.createElement("ul");
  lista.className = "resumen__lista";

  camposDelFormulario.forEach((campo) => {
    const item = document.createElement("li");
    item.className = "resumen__item";

    const etiqueta = document.createElement("strong");
    etiqueta.textContent = `${campo.etiqueta}: `;

    const valor = document.createElement("span");
    valor.textContent = datos[campo.id];

    item.append(etiqueta, valor);
    lista.appendChild(item);
  });

  contenedorResumen.append(titulo, subtitulo, lista);
  contenedorResumen.hidden = false;
}

cotizacion.addEventListener("submit", (evento) => {
  evento.preventDefault();

  let todoValido = true;
  camposDelFormulario.forEach((campo) => {
    if (!validarCampo(campo)) todoValido = false;
  });

  if (!todoValido) {
    contenedorResumen.hidden = true;
    const primerInvalido = formulario.querySelector(".campo--invalido input, .campo--invalido textarea");
    if (primerInvalido) primerInvalido.focus();
    return;
  }

  const datos = {};
  camposDelFormulario.forEach((campo) => {
    datos[campo.id] = document.getElementById(campo.id).value;
  });

  mostrarResumen(datos);

  formulario.reset();
  camposDelFormulario.forEach((campo) => mostrarError(campo, ""));
});

camposDelFormulario.forEach((campo) => {
  document.getElementById(campo.id).addEventListener("blur", () => validarCampo(campo));
});
