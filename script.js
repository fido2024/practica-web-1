const input = document.querySelector("#inputTarea");
const boton = document.querySelector("#btnAgregar");
const lista = document.querySelector(".lista");

function obtenerFecha() {
  const hoy = new Date();
  return hoy.toISOString().split("T")[0];
}

function obtenerTareas() {
  const tareas = localStorage.getItem("tareas");
  return tareas ? JSON.parse(tareas) : [];
}

function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function crearTareaElemento(tarea, index) {
  const li = document.createElement("li");
  li.classList.add("tarea");

  li.innerHTML = `
    <span class="descripcion">${tarea.descripcion}</span>
    <span class="fecha">${tarea.fecha}</span>
    <input type="checkbox" ${tarea.completado ? "checked" : ""}>
    <button class="editar">Editar</button>
    <button class="eliminar">Eliminar</button>
  `;

  li.querySelector(".editar").onclick = () => editarTarea(index);

  li.querySelector(".eliminar").onclick = () => eliminarTarea(index);

  li.querySelector("input").onchange = (e) => {
    toggleCompletado(index, e.target.checked);
  };

  lista.appendChild(li);
}

function agregarTarea() {
  const texto = input.value.trim();

  if (texto === "") return;

  const nuevaTarea = {
    descripcion: texto,
    fecha: obtenerFecha(),
    completado: false
  };

  const tareas = obtenerTareas();
  tareas.push(nuevaTarea);

  guardarTareas(tareas);
  renderizar();

  input.value = "";
}

function eliminarTarea(index) {
  const tareas = obtenerTareas();
  tareas.splice(index, 1);

  guardarTareas(tareas);
  renderizar();
}

function toggleCompletado(index, estado) {
  const tareas = obtenerTareas();
  tareas[index].completado = estado;

  guardarTareas(tareas);
}

function renderizar() {
  lista.innerHTML = "";

  const tareas = obtenerTareas();

  tareas.forEach((tarea, index) => {
    crearTareaElemento(tarea, index);
  });
}


boton.addEventListener("click", agregarTarea);

renderizar();

function editarTarea(index) {
  const tareas = obtenerTareas();

  const nuevaDescripcion = prompt("Editar tarea:", tareas[index].descripcion);

  if (nuevaDescripcion === null || nuevaDescripcion.trim() === "") return;

  tareas[index].descripcion = nuevaDescripcion;

  guardarTareas(tareas);
  renderizar();
}