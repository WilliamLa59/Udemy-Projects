
// dectects button press
for(var i =0; i < document.querySelectorAll(".drum").length; i++){
    document.querySelectorAll("button")[i].addEventListener("click",function () {
        // grabs which button is pressed and stores it in a variable 
        var buttonInnerHTML = this.innerHTML;   

        // calls makeSound and buttonAnimationFunction and passes it which button was press
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });

}

// dectects keypress
document.addEventListener("keydown", function(e) {
    // upon key press call makeSound and buttonAnimation and pass it which key was pressed
    makeSound(e.key);
    buttonAnimation(e.key);
});

// accepts a parameter (a letter, either from a button press or key press) 
// and plays a specific sound based on what letter it recives
function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;

        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;

        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;

        default: console.log();

    }
}

// accepts a parameter (a letter, either from a button press or key press) 
// applies the style class "pressed" to the appropriate button that was pressed
function buttonAnimation(currentKey){
    var activeButton = document.querySelector("."+currentKey);

    //adds pressed class on activation
    activeButton.classList.add("pressed");

    //removes pressed class after 100 milliseconds
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}