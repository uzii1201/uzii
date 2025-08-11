document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Formatear todos los inputs numéricos con puntos mientras escriben
document.querySelectorAll("input").forEach(input => {
  input.addEventListener("input", (e) => {
    const el = e.target;

    // Solo formatear ciertos inputs numéricos
    const allowed = ["num-input", "porcentaje-total", "porcentaje-parte", "average-input"];
    if (!allowed.includes(el.id)) return;

    let raw = el.value.replace(/\./g, "").replace(/\D/g, "");
    if (raw === "") {
      el.value = "";
      if (el.id === "num-input") {
        document.getElementById("letras-result").textContent = "";
      }
      return;
    }

    const num = parseInt(raw);
    el.value = num.toLocaleString("es-ES");

    if (el.id === "num-input") {
      const letras = numeroALetras(num);
      const formateado = num.toLocaleString("es-ES");
      document.getElementById("letras-result").textContent = `Número: ${formateado}\n${letras}\n${letras.toUpperCase()}`;
    }
  });
});

function calcular() {
  const input = document.getElementById("calc-input").value.replace(/\./g, "");
  try {
    const result = eval(input);
    document.getElementById("calc-result").textContent = `Resultado: ${result}`;
  } catch {
    document.getElementById("calc-result").textContent = "Error en la expresión";
  }
}

function promediar() {
  const input = document.getElementById("average-input").value;
  const nums = input.split(",")
    .map(n => parseFloat(n.replace(/\./g, "").trim()))
    .filter(n => !isNaN(n));

  if (nums.length === 0) {
    document.getElementById("average-result").textContent = "Ingrese números válidos.";
    return;
  }

  const promedio = nums.reduce((a, b) => a + b, 0) / nums.length;
  document.getElementById("average-result").textContent = `Promedio: ${promedio}`;
}

function convertirALetras() {
  const inputEl = document.getElementById("num-input");
  let raw = inputEl.value.replace(/\./g, "");
  const num = parseInt(raw);

  if (isNaN(num)) {
    document.getElementById("letras-result").textContent = "Número no válido";
    return;
  }

  const letras = numeroALetras(num);
  const formateado = num.toLocaleString("es-ES");
  document.getElementById("letras-result").textContent = `Número: ${formateado}\n${letras}\n${letras.toUpperCase()}`;
}

function calcularPorcentaje() {
  const total = parseFloat(document.getElementById("porcentaje-total").value.replace(/\./g, ""));
  const parte = parseFloat(document.getElementById("porcentaje-parte").value.replace(/\./g, ""));

  if (isNaN(total) || isNaN(parte)) {
    document.getElementById("porcentaje-result").textContent = "Valores no válidos.";
    return;
  }

  const porcentaje1 = (parte / total) * 100;
  const porcentaje2 = (total * parte) / 100;

  document.getElementById("porcentaje-result").textContent =
    `${parte.toLocaleString("es-ES")} es el ${porcentaje1.toFixed(2)}% de ${total.toLocaleString("es-ES")}\n` +
    `${parte}% de ${total.toLocaleString("es-ES")} es ${porcentaje2.toFixed(2)}`;
}

function numeroALetras(num) {
  const UNIDADES = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
  const DIEZ_A_DIECINUEVE = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const DECENAS = ["", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const CENTENAS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

  function unidad(n) {
    return UNIDADES[n];
  }

  function decena(n) {
    if (n < 10) return unidad(n);
    if (n >= 10 && n < 20) return DIEZ_A_DIECINUEVE[n - 10];
    const d = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return DECENAS[d];
    if (d === 2) return "veinti" + unidad(u);
    return DECENAS[d] + " y " + unidad(u);
  }

  function centena(n) {
    if (n === 100) return "cien";
    if (n < 100) return decena(n);
    const c = Math.floor(n / 100);
    const r = n % 100;
    return CENTENAS[c] + (r > 0 ? " " + decena(r) : "");
  }

  function miles(n) {
    const m = Math.floor(n / 1000);
    const r = n % 1000;
    let texto = "";

    if (m === 0) texto = centena(r);
    else if (m === 1) texto = "mil" + (r > 0 ? " " + centena(r) : "");
    else texto = numeroALetras(m) + " mil" + (r > 0 ? " " + centena(r) : "");

    return texto;
  }

  function millones(n) {
    const mill = Math.floor(n / 1_000_000);
    const r = n % 1_000_000;
    let texto = "";

    if (mill === 0) texto = miles(r);
    else if (mill === 1) texto = "un millón" + (r > 0 ? " " + miles(r) : "");
    else texto = numeroALetras(mill) + " millones" + (r > 0 ? " " + miles(r) : "");

    return texto;
  }

  function milesMillones(n) {
    const milMill = Math.floor(n / 1_000_000_000);
    const r = n % 1_000_000_000;
    let texto = "";

    if (milMill === 0) texto = millones(r);
    else if (milMill === 1) texto = "mil millones" + (r > 0 ? " " + millones(r) : "");
    else texto = numeroALetras(milMill) + " mil millones" + (r > 0 ? " " + millones(r) : "");

    return texto;
  }

  if (num === 0) return "cero";
  if (num < 1000) return centena(num);
  if (num < 1_000_000) return miles(num);
  if (num < 1_000_000_000) return millones(num);
  if (num <= 1_000_000_000_000) return milesMillones(num);

  return "Número demasiado grande";
}