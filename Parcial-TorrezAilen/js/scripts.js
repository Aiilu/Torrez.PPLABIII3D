import Anuncio_Mascota from "./anuncioMascota.js";

const listaAnuncios = JSON.parse(localStorage.getItem("anuncios")) || [];
let idAutoIncremental;
let idRef;

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("submit", manejaSubmit);
  
    document.addEventListener("click", manejaClick);
  
    idIncremental();
});

function idIncremental() {
    if (listaAnuncios.length > 0) {
      manejaLoad();
      idAutoIncremental = listaAnuncios[listaAnuncios.length - 1].id;
    } else {
      idAutoIncremental = 0;
    }
}

function manejaSubmit(e) {
    e.preventDefault();
  
    const frm = e.target;
  
    idAutoIncremental++;
  
    const nuevoAnuncio = new Anuncio_Mascota(
      idAutoIncremental,
      frm.tituloF.value,
      frm.transH.value,
      frm.descripcionF.value,
      frm.precioF.value,
      frm.tipoF.value,
      frm.razaF.value,
      frm.fechaF.value,
      frm.vacunaA.value
    );
  
    altaAnuncio(nuevoAnuncio);
  
    limpiarFormulario(document.forms[0]);
  }
  
  function altaAnuncio(nuevoAnuncio2) {
    listaAnuncios.push(nuevoAnuncio2);
    AlmacenarDatos(listaAnuncios);
}

function guardarAnuncio() {
    const frm = document.forms[0];
    const index = listaAnuncios.findIndex((el) => el.id === parseInt(idRef));
  
    listaAnuncios[index].titulo = frm.tituloF.value;
    listaAnuncios[index].transaccion = frm.transH.value;
    listaAnuncios[index].descripcion = frm.descripcionF.value;
    listaAnuncios[index].precio = frm.precioF.value;
    listaAnuncios[index].tipo = frm.tipoF.value;
    listaAnuncios[index].raza = frm.razaF.value;
    listaAnuncios[index].fecha = frm.fechaF.value;
    listaAnuncios[index].vacuna = frm.vacunaA.value;
  
    AlmacenarDatos(listaAnuncios);
}

function limpiarFormulario(frm) {
    frm.reset();
    document.getElementById("btnGuardar").classList.add("oculto");
    document.getElementById("btnEliminar").classList.add("oculto");
    document.getElementById("btnCancelar").classList.add("oculto");
}

function AlmacenarDatos(data) {
    localStorage.setItem("anuncios", JSON.stringify(data));
    manejaLoad();
  }
  
function manejaLoad() {
    document.getElementById("tablaF").classList.add("oculto");
    agregarSpinner();
  
    setTimeout(() => {
     eliminarSpinner();
      renderizarLista(
        crearTabla(listaAnuncios),
        document.getElementById("tablaF")
      );
  }, 3000);
}

function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./assets/spinner.gif");
    spinner.setAttribute("alt", "imagen spinner");
  
    document.getElementById("spinnerF").appendChild(spinner);
  }
  
  function eliminarSpinner() {
    const spinner2 = document.getElementById("spinnerF");
  
    while (spinner2.hasChildNodes()) {
      spinner2.removeChild(spinner2.firstChild);
    }
}

function renderizarLista(lista1, contenedor) {
    while (contenedor.hasChildNodes()) {
      contenedor.removeChild(contenedor.firstChild);
    }
  
    if (lista1) {
      contenedor.appendChild(lista1);
    }
  
    document.getElementById("tablaF").classList.remove("oculto");
}

function crearTabla(items) {
    const tabla = document.createElement("table");
  
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
  
    return tabla;
  }
  
  function crearThead(item) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
  
    for (const key in item) {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  
    thead.appendChild(tr);
  
    return thead;
  }
  
  function crearTbody(items) {
    const tbody = document.createElement("tbody");
  
    items.forEach((item) => {
      const tr = document.createElement("tr");
  
      for (const key in item) {
        const td = document.createElement("td");
        td.textContent = item[key];
        tr.appendChild(td);
      }
  
      tbody.appendChild(tr);
    });
  
    return tbody;
}  

function manejaClick(e) {
    const ref = e.target;
  
    if (ref.matches("td")) {
      idRef = e.target.parentNode.firstElementChild.textContent;
      console.log(idRef);
  
      cargarFormulario();
     } 
    else if (ref.matches("#btnCancelar")) {
    limpiarFormulario(document.forms[0]);}
    else if (ref.matches("#btnEliminar")) {
    if (confirm("Confirmar Baja?")) {
    bajaAnuncio();
    }
  
    limpiarFormulario(document.forms[0]);}
    else if (ref.matches("#btnGuardar")) {
    if (confirm("Confirmar Modificacion?")) {
       guardarAnuncio();
      }
  
      limpiarFormulario(document.forms[0]);
    }
}

function bajaAnuncio() {
    const index = listaAnuncios.findIndex((el) => el.id === parseInt(idRef));
    listaAnuncios.splice(index, 1);
  
    AlmacenarDatos(listaAnuncios);
}

function cargarFormulario() {
    const {
      titulo,
      transaccion,
      descripcion,
      precio,
      tipo,
      raza,
      fecha,
      vacuna,
    } = listaAnuncios.filter((el) => el.id === parseInt(idRef))[0];
  
    const frm = document.forms[0];
  
    frm.tituloF.value = titulo;
    frm.transH.value = transaccion;
    frm.descripcionF.value = descripcion;
    frm.precioF.value = precio;
    frm.tipoF.value = tipo;
    frm.razaF.value = raza;
    frm.fechaF.value = fecha;
    frm.vacunaA.value = vacuna;
  
    document.getElementById("btnGuardar").classList.remove("oculto");
    document.getElementById("btnEliminar").classList.remove("oculto");
    document.getElementById("btnCancelar").classList.remove("oculto");
}