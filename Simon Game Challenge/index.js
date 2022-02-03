var buttonColours = ["red", "blue", "green","yellow"];
var level = 0;;
var started = false;
var gamePattern = [];
var userClickedPattern = [];

$(document).on('keypress',function(e){
    if (started == false){
        nextSequence();
        started = true;
    }
})

function nextSequence() {

    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * (3 + 1));
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

    level++;
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.indexOf(userChosenColour));
    console.log(userClickedPattern);
})

function animatePress(currentColour) {
    $("."+ currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+ currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
      
        var correctCount = 0;
        for (var i = 0; i < gamePattern.length; i++) {
            if(gamePattern[i] === userClickedPattern[i]){
        
                correctCount++;
            }
        }
        if(correctCount === gamePattern.length){
            console.log("success");
            setTimeout(function(){
                userClickedPattern=[];
                nextSequence();
            }, 1000);
        }
    }else {
        console.log("wrong");
        var wrong = new Audio ('sounds/wrong.mp3');
        wrong.play;
        $("#level-title").html("Game Over, Press Any Key To Restart");
        $('body').addClass("game-over");
        setTimeout(function(){
            $('body').removeClass("game-over");  
        }, 200);
        startOver()
    }
}

// function checkAnswer(currentLevel) {
//     console.log(currentLevel);
//     if (gamePattern[currentLevel] == userClickedPattern[currentLevel]){
//         for (var x = 0; x < gamePattern.length; x++){
//             if (gamePattern[x] !== userClickedPattern[x]){
//                 console.log("wrong");
//                 var wrong = new Audio ('sounds/wrong.mp3');
//                 wrong.play;
//                 $("#level-title").html("Game Over, Press Any Key To Restart");
//                 $('body').addClass("game-over");
//                 setTimeout(function(){
//                     $('body').removeClass("game-over");  
//                 }, 200);
//                 startOver()
//             }else {
//                 console.log("success");
//                 setTimeout(function () {
//                     userClickedPattern=[];
//                     nextSequence();
//                 }, 1000);
//             }
//         }
//     }
// }

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern= [];
    started = false;
}