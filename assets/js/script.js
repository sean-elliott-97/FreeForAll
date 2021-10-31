var dogData;
var dictionaryData;
//displays when image is loading
var spinner =
  "<div id ='spinner' class='preloader-wrapper small active'><div class='spinner-layer spinner-green-only'><div class='circle-clipper left'><div class='circle'></div></div><div class='gap-patch'><div class='circle'></div></div><div class='circle-clipper right'><div class='circle'></div></div></div></div>";

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
  if (!acceptableSearch.includes($("#breed").val().toLowerCase()) == true) {
    $("#breed").val("");

    $("#errorMessage").css("visibility", "visible");
    return;
  } else {
    $("#errorMessage").css("visibility", "hidden");
    //converts dogBreed to lowercase
    dogBreed = $("#breed").val().toLowerCase();
  }
  //adds loading spinner while card is being created
  $(".cardsList").append(spinner);
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
            "<div class = 'card'><h1 class = 'dogBreedName'>" +
            dictionaryData[0].word +
            "</h1>" +
            "<img src = '" +
            dogData.message +
            "'>" +
            "<p class = 'dogDefinition'>" +
            dictionaryData[0].meanings[0].definitions[0].definition +
            "</p></div>";
          existingDogs.push(x);

          $(".cardsList").append(x);
          localStorage.setItem("dogsList", JSON.stringify(existingDogs));
          //clears input field
          $("#breed").val("");
        });
      //removes the spinner after card is displayed
      $("#spinner").remove();
    });
  $("#clear").css("visibility", "visible");
});

//clears local storage
$("#clear").click(function () {
  localStorage.clear();
  location.reload();
});
