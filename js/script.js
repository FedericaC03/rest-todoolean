$(document).ready(function(){

//READ
  $.ajax(
    {
      "url" : " http://157.230.17.132:3014/todos",
      "method" : "GET",
      "success": function(data) {
        console.log(data);
        render(data);
      },
      "error": function() {
        alert("errore");
      }
    }
  );

//DELETE
$("#list").on("click", ".fa-times", function() {

  var elm = $(this).parent().siblings();
  var id = elm.attr("id");
   $(this).parent().parent().remove();
  $.ajax(
    {
      "url" : " http://157.230.17.132:3014/todos/" + id,
      "method" : "DELETE",
      "success": function(data) {
        elm.remove();
      },
      "error": function() {
        alert("errore");
      }
    }
  );
});

//CREATE

$("#add").click(function() {
  var valueBtn = $("#input").val();
  $("#input").val("");
  if (valueBtn != "") {

    $.ajax(
      {
        "url" : " http://157.230.17.132:3014/todos",
        "method" : "POST",
        "data": {
          "text": valueBtn
        },
        "success": function(data) {
          render([data]);
        },
        "error": function() {
          alert("errore");
        }
      }
    );
  }

});



//UPDATE
$("#list").on("click", ".fa-edit", function() {

  var questo = $(this).parent().prev();
  var id = questo.attr("id");
  var val =  questo.children("input").val();
  console.log(val);
  $.ajax(
    {
      "url" : " http://157.230.17.132:3014/todos/" + id,
      "method" : "PUT",
      "data": {
        "text": val
      },
      "success": function(data) {
         alert("elemento modificato");
      },
      "error": function() {
        alert("errore");
      }
    }
  );
});

});


//TEMPLATE E APPEND
function render(data) {
  var source = $("#template").html();
  var template = Handlebars.compile(source);

  var context = {
    "data": data,
  };

  var html = template(context);
  $("#list").append(html);
}
