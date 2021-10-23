const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://free-to-play-games-database.p.rapidapi.com/api/games",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "01ff162b2emsh25f9dbe46c3425dp1a7934jsn9611ab8ca59a"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

var thumbnailImg = response[i].thumbnail

thumbnailImg.click(gameURL())

function gameURL() {
	$(response[i].game_url).click(); 
}