var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var gameStarted = false;
var highScore = 1;

$(document).keydown(function() {
  if (gameStarted === false) {
    $("h1").html("level 1");
    nextSquence();
    gameStarted = true;
  }
});

$(".btn").click(function() {
  if (gameStarted === true) {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

async function nextSquence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  for (i = 0; i < gamePattern.length; i++) {
    await wait(500);
    $("#" + gamePattern[i]).fadeToggle(100).fadeToggle(100).fadeToggle(100).fadeToggle(100);
    playSound(gamePattern[i]);
  }
}


function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('')
    }, ms);
  })
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
  } else {
    $("h1").html("GAME OVER !<br>Press any key to retry");
    playSound("wrong");
    highScore = level;
    gameStarted = false;
    level = 1;
    gamePattern.length = 0;
    userClickedPattern.length = 0
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    return;
  }
  if (gamePattern.length === userClickedPattern.length) {
    userClickedPattern.length = 0;
    if(level>=highScore){
      highScore=level;
      $("h2").html("<h2>highscore: "+highScore);
    }
    setTimeout(function() {
      level++;
      $("h1").html("level " + level);
      nextSquence();
    }, 1000);
  }
}
