
var buttonColours = ["red","blue", "green", "yellow"];

var gamePattern = []; // Stores the randomly generated pattern

var userClickedPattern = [] //Stores the colour names choosen by the user

var started = false;

var level = 0;

//nextSequence func. first increases the level and mention it as heading & then chooses a random colour, flashes that and plays a sound, as well as add that color name to gamePattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level); //Changes h1 for every time this func is called
  var randomNumber = Math.floor(Math.random() * 4); //Chooses a random number b/w 0-3
  var randomChoosenColour = buttonColours[randomNumber]; //Chooses a random color from buttonColours array
  gamePattern.push(randomChoosenColour); //Add that random colour to the end of gamePattern array
  $("#"+randomChoosenColour).fadeOut(100).fadeIn(100); //Flashesh that randomly choosen buttonColour
  playSound(randomChoosenColour); //Plays the sound allocated to randomly choosen colour
}

//This event listener listens to the button clicked by user, add it to an array, plays a sound and animate that button
$(".btn").click(function () {
  var userChoosenColour = $(this).attr("id"); //Stores the id of the button clicked by user
  userClickedPattern.push(userChoosenColour); //Add the userChoosenColour to the end of userClickedPattern
  playSound(userChoosenColour); //Plays the sound allocated to the color that user chooses
  animatePress(userChoosenColour); //add animation to user choosen colour
  checkAnswer(userClickedPattern.length -1);
});

//Thus function plays sound of the color that is passed in it as argument
function playSound(name) {
  var myAudio = new Audio("sounds/"+name+".mp3");
  myAudio.play();
}

//The function animatePress gives a little animation to a color button passed in it as an arg.
function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed"); //add the class "pressed" to a button having color, that is passed in as arg.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100); //after a delay of 0.1s, the "pressed" class is removed from that button
}

//This event listener listens to keypress, and when it happens for first time, it calls nextSequence function
$(document).keypress(function () {
  if(!started) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    if(currentLevel===(gamePattern.length -1)) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
}
