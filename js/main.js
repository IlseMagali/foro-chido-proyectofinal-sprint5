var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics/"
};

var $tablaLista = $("#tabla-lista");

var cargarPagina = function () {
  mostrarTemas();
  $("#forma-agregar-tema").submit(crearTema);
  $("#filtrado").submit(filtroBusqueda);
};

var mostrarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(colocarTemaEnTabla);
  });
};

var colocarTemaEnTabla = function (tema) {
  var idTema = tema.id;
  var autor = tema.author_name;
  var tema = tema.content;
  var respuesta = tema.responses_count;
  var respuestaNumero = parseInt(respuesta);

  var $tr = $("<tr />");
  var $tdAutor = $("<td />");
  var $tdTema = $("<td />");
  var $tdRespuestas = $("<td />");
  var $linkTema = $("<a />");

  $tdAutor.text(autor);
  $linkTema.text(tema);
  $tdRespuestas.text(respuestaNumero);

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

var filtroBusqueda = function (e, temas) {
  e.preventDefault();
  var criterioFiltro = $("#criterio-filtro").val().toLowerCase();
  var temas = function () {
    $.getJSON(api.url, function (temas) {
      var temaFiltrado = temas.filter(function (tema){
        console.log(tema.content.toLowerCase().indexOf(criterioFiltro)>=0);
      });
    });
  };
  temas();
};

$(document).ready(cargarPagina);
