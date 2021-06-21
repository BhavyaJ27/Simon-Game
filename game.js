alert("hello");

var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var started=false;
var level=0;

//checking if the game started or not
$(document).keypress(function() {
  if (!started)
  {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Detecting the button clicked
  $(".btn").click(function(){

    var userChosenColour = $(this).attr("id");  //by using this keyword we detected which button was pressed and took its attribute id
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour); //sound for chosencolor

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  function checkAnswer(currentLevel)
  {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
     {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length)
      {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else
    {
      console.log("wrong");
      playSound("wrong");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
  }

function nextSequence()
{
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " +level);//changing heading acc to the leve;
  var randomNumber=Math.random();
  randomNumber=Math.floor(randomNumber*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //chosen color fades out
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //playing sound for chosen color
    playSound(randomChosenColour);
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
