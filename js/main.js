var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics/"
};

var $tablaLista = $("#tabla-lista");

var cargarPagina = function () {
  mostrarTemas();
  cargarTemas();
  $("#forma-agregar-tema").submit(crearTema);
  $("#filtrado").keyup(filtroBusqueda);
};

var arregloDeTemas = [];

var mostrarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(function (tema){
      arregloDeTemas.push(tema);
    });
  });
};

var cargarTemas = function () {
  $.getJSON(api.url, function (tema){
    tema.forEach(colocarTemaEnTabla);
  });
};

var colocarTemaEnTabla = function (tema) {
  var idTema = tema.id;
  var autor = tema.author_name;
  var temaContenido = tema.content;
  var respuesta = tema.responses_count;
  // console.log(tema);
  //console.log(respuesta);
  // var respuestaNumero = parseInt(respuesta);

  var $tr = $("<tr />");
  var $tdAutor = $("<td />");
  var $tdTema = $("<td />");
  var $tdRespuestas = $("<td />");
  var $linkTema = $("<a />");

  $tdAutor.text(autor);
  $linkTema.text(temaContenido);
  $tdRespuestas.text(respuesta);

  $tr.append($tdAutor);
  $tr.append($tdTema);
  $tdTema.append($linkTema);
  $tr.append($tdRespuestas);
  $tablaLista.append($tr);

}

var crearTema = function (e) {
  e.preventDefault();
  var inputNombreAutor = $("#autor-tema").val();
  var inputTituloTema = $("#titulo-tema").val();

  $.post(api.url, {
    author_name: inputNombreAutor,
    content: inputTituloTema
  }, function (tema) {
    $("#forma-modal").modal("hide");
    mostrarTemas();
  });
};

var filtroBusqueda = function (event) {
  event.preventDefault();
  var criterioFiltro = $("#criterio-filtro").val().toLowerCase();
  var temasFiltrados = function () {
    var temaFiltrado = temas.find(function (tema){
       arregloDeTemas.content.toLowerCase().indexOf(criterioFiltro) >= 0;
      });
    };
  };

$(document).ready(cargarPagina);
