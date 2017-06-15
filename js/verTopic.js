var api = {
  url: "http://examen-laboratoria-sprint-5.herokuapp.com/topics/"
};

var contador = 0;

var obteniendoData = function () {
    $.getJSON(api.url, function(temas){
      temas.forEach(agregarId);
    });
};

var agregarId = function (tema) {

  if (tema.id == 1) {
    console.log(tema.id);
  }
  else {
    console.log("no funcionó");
  }

};


var topicId = getParameterByName('topic_id');
//Solo por propositos de debug
if(topicId){
  alert("El topic ID es:"+ topicId);
}


$(document).ready(obteniendoData);
