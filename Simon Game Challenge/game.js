var buttonColors = ["red", "blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;






function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#"+ randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    

}
 

$(".btn").on("click", function(){
     var userChosenColor = $(this).attr("id");
     console.log(userChosenColor);
     userClickedPattern.push(userChosenColor);
     console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){ 
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
 

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+ currentColor).removeClass("pressed");
    }, 100);
}


$(document).keypress(function(){
    if(!gameStarted){
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();         
            }, 1000);
        }
    } else{
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        console.log("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    gameStarted = false;

}