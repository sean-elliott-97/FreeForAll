var dogData;
var dictionaryData;

//cards should be saved on refresh
var existingDogs = JSON.parse(localStorage.getItem("dogsList"));
if(existingDogs==null)existingDogs=[];
else{
$(".cardsList").append(existingDogs);
}

$("#search").click(function () {
  dogBreed = $("#breed").val();

  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then((response) => response.json())
    .then((data) => {
      dogData = data;

      dogPicture = dogData.message;
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dogBreed}`)
        .then((response) => response.json())
        .then((data) => {
          dictionaryData = data;
          var x = "<div class = 'card'><h1>" +
          dictionaryData[0].word +
          "</h1>" +
          "<img src = '" +
          dogData.message +
          "'>" +
          "<p>" +
          dictionaryData[0].meanings[0].definitions[0].definition +
          "</p></div>";
          existingDogs.push(x);

          $(".cardsList").append(x
           
          );
          localStorage.setItem("dogsList",JSON.stringify(existingDogs));
        });
    });
});


