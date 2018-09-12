var startGame = confirm("Do you want to play a game?");
if(!startGame){
    alert("Not today.");
} else{
    var numberToGuess = Math.floor(Math.random() * 5) + 1;
    var guesses = 3;
    var userGuess;
    while(guesses > 0){
        userGuess = prompt("Try to guess the number between 1 and 5. Guesses left: " + guesses);
        if(Number(userGuess) == numberToGuess){
            alert("Congratulations! You are winner!");
            break;
        }
        guesses--;
        if(guesses == 0){
            alert("Today is not your day.");
            break;
        }
    }
}