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

// var plantilla =
//   "<tr data-id=__id_tema__>"+
//     "<td>__autor__</td>"+
//     "<td>__tema__</td>"+
//     "<td>__respuestas__</td>"+
//   "</tr>";

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

  $tdAutor.text(autor);
  $tdTema.text(tema);
  $tdRespuestas.text(respuestaNumero);

  $tr.append($tdAutor);
  $tr.append($tdTema);
  $tr.append($tdRespuestas);
  $tablaLista.append($tr);

  // console.log(respuestaNumero);
  //
  // var colocarEnPlantilla = plantilla.replace("__id_tema__", idTema).
  // replace("__autor__", autor).replace("__tema__", tema).
  // replace("__respuestas__", respuestaNumero);
  //
  // $tablaLista.append(colocarEnPlantilla);
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
      // console.log(temas);
      var temaFiltrado = temas.filter(function (tema){
        console.log(tema.content.toLowerCase().indexOf(criterioFiltro)>=0);
      });
      // colocarTemaEnTabla(temaFiltrado);
    });
  };
  temas();

};

$(document).ready(cargarPagina);
