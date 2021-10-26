var wordSearch = $("#word").val();
var dogData;
var dictionaryData;

//breeds that can be searched
var acceptableSearch = [
  "beagle",
  "borzoi",
  "bouvier",
  "chihuahua",
  "coonhound",
  "corgi",
  "dachshund",
  "dalmatian",
  "deerhound",
  "doberman",
  "elkhound",
  "greyhound",
  "keeshond",
  "komondor",
  "labradoodle",
  "labrador",
  "leonberg",
  "malamute",
  "mastiff",
  "newfoundland",
  "papillon",
  "pekinese",
  "pitbull",
  "pomeranian",
  "poodle",
  "pug",
  "redbone",
  "rottweiler",
  "saluki",
  "schipperke",
  "schnauzer",
  "setter",
  "sheepdog",
  "weimaraner",
  "whippet",
  "wolfhound",
];

//cards should be saved on refresh
var existingDogs = JSON.parse(localStorage.getItem("dogsList"));
if (existingDogs == null) existingDogs = [];
else {
  $("#clear").css("visibility", "visible");
  $(".cardsList").append(existingDogs);
}

//allows users to search for random dog images by breed; creates a card with random dog image, breed and definition
$("#search").click(function () {
  if (!acceptableSearch.includes($("#breed").val()) == true) {
    $("#breed").val("");

    $("#errorMessage").css("visibility", "visible");
    return;
  } else {
    $("#errorMessage").css("visibility", "hidden");
    dogBreed = $("#breed").val();
  }
  $(".cardsList").append('');
  fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`)
    .then((response) => response.json())
    .then((data) => {
      dogData = data;

      dogPicture = dogData.message;
      
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dogBreed}`)
        .then((response) => response.json())
        .then((data) => {
          dictionaryData = data;
          var x =
            "<div class = 'card'><h1>" +
            dictionaryData[0].word +
            "</h1>" +
            "<img src = '" +
            dogData.message +
            "'>" +
            "<p>" +
            dictionaryData[0].meanings[0].definitions[0].definition +
            "</p></div>";
          existingDogs.push(x);

          $(".cardsList").append(x);
          localStorage.setItem("dogsList", JSON.stringify(existingDogs));
          
        });
       
     
    });
  $("#clear").css("visibility", "visible");
});

//clears local storage
$("#clear").click(function () {
  localStorage.clear();
  location.reload();
});
