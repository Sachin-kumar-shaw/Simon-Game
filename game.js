var x = 0;
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var level = 0;
$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    animatePress($(this).attr("id"));
    if($(this).attr("id") !== gamePattern[x]){
        $("h1").text("Game Over, Press any key to Restart.");
        $("body").attr("class","game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        started = true;
        level = 0;
        x = 0;
        gamePattern = [];
        playSound("wrong");
        return
    }
    playSound($(this).attr("id"));
    x++;
    if(x === gamePattern.length){
        x=0;
        setTimeout(function(){
            nextSequence();
        },1000);
    }
});


function nextSequence(){
    level++;
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
var started = true;
$(document).keypress(function(){
    if(started === true){
        started = false;    
        nextSequence();
    }
})