// var url = "http://colormind.io/api/";
// var data = {
// 	model : "default",
// 	input : [[44,43,44],[90,83,82],"N","N","N"]
// }

// var http = new XMLHttpRequest();

// http.onreadystatechange = function() {
// 	if(http.readyState == 4 && http.status == 200) {
// 		var palette = JSON.parse(http.responseText).result;
// 	}
// }

// http.open("POST", url, true);
// http.send(JSON.stringify(data));

// [[42, 41, 48], [90, 83, 84], [191, 157, 175], [188, 138, 125], [215, 170, 66]]
// note that the input colors have changed as well, by a small amount

const settings = {
  async: true,
  crossDomain: true,
  url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
  method: "GET",
  headers: {
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    "x-rapidapi-key": "01ff162b2emsh25f9dbe46c3425dp1a7934jsn9611ab8ca59a",
  },
};
$.ajax(settings).done(function (response) {
  for (var i = 0; i < response.length; i++) {
    var gImg = "<img src =" + response[i].thumbnail + ">";
    var gURL = "<a href = " + response[i].game_url + "target='blank'</a>";
    $("#gamesList").append(
      "<div class='card'>",
      gImg,
      "<div class='container'>",
      "<p><b>",
      response[i].title,
      "</b></p>",
      "     ",
      gURL,
      "</div></div>"
    );

    console.log(response[i].thumbnail);
  }

  console.log(response);
});
