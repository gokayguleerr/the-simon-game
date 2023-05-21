//* Defining HTML Elements
const body = document.querySelector("body");
const infoTitle = document.querySelector(".header-container > h2");
const levelTitle = document.querySelector("#level-title");
const gameButtons = document.querySelector(".game-buttons");


//* Defining Audio Variables
const redSound = new Audio("./sounds/red.mp3");
const greenSound = new Audio("./sounds/green.mp3");
const blueSound = new Audio("./sounds/blue.mp3");
const yellowSound = new Audio("./sounds/yellow.mp3");
const wrongSound = new Audio("./sounds/wrong.mp3");


//* Defining Other Variables
var colours = ["red", "green", "blue", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var score = 0;


function playSound (name) {
  var audio = new Audio("./sounds/" + name + ".mp3")
  audio.play();
}

function nextSequence () {
  userClickedPattern = [];

  level++;
  score++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = colours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(60).fadeIn(60);
  playSound(randomChosenColour);
}

$(".game-buttons").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

$(document).keypress(function() {
  if (!started) {
    score = 0;
    levelTitle.textContent = "Level" + level;
    infoTitle.textContent = "";
    nextSequence();
    started = true;
  }
});

function checkAnswer (currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong...");
    playSound("wrong")
    $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);
      $("#level-title").text("Game Over Buddy! Your score is: " + score);
      $("#info-title").text("Press any key to restart buddy");
      startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

levelTitle.textContent = "";