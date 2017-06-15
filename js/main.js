var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics/"
};

var $tablaLista = $("#tabla-lista");

var cargarPagina = function () {
  mostrarTemas();
};

var mostrarTemas = function () {
  $.getJSON(api.url, function (temas) {
    temas.forEach(colocarTemaEnTabla);
  });
};

var plantilla =
  "<tr data-id=__id_tema__>"+
    "<td>__autor__</td>"+
    "<td>__tema__</td>"+
    "<td>__respuestas__</td>"+
  "</tr>";

var colocarTemaEnTabla = function (tema) {
  var idTema = tema.id;
  var autor = tema.author_name;
  var tema = tema.content;
  var respuesta = tema.responses_count;
  var respuestaNumero = parseInt(respuesta);

  console.log(respuestaNumero);

  var colocarEnPlantilla = plantilla.replace("__id_tema__", idTema).
  replace("__autor__", autor).replace("__tema__", tema).
  replace("__respuestas__", respuestaNumero);

  $tablaLista.append(colocarEnPlantilla);
}

var crearTema = function () {
  

}


$(document).ready(cargarPagina);
