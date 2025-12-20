let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let maxAttempts = 10;
let bestScore = localStorage.getItem("bestScore")||null;
if(bestScore){
    document.getElementById("bestScore").innerText = `🏆 Best Score: ${bestScore} attempts`;
}

window.onload = function() {
    document.getElementById('guessInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            checkGuess();
        }
    });
};

function checkGuess() {
    let input = document.getElementById('guessInput');
    let checkBtn = document.getElementById('check');
    let messge = document.getElementById('message');

    
    let guess = Number(input.value);

  
    if(input.value === "" || isNaN(input.value)){
        messge.innerText = "⚠️ Please enter a number between 1 and 10.";
    }else{
    attempts++;
    document.getElementById('attempts').innerText = `Attempts: ${attempts} / ${maxAttempts}`;

    if(guess === randomNumber){
        messge.innerHTML = `<span id="win">🎉Correct! You won!</span>`;
        input.disabled = true;
        checkBtn.disabled = true;

        if(!bestScore||attempts < bestScore){
            bestScore = attempts;
            localStorage.setItem("bestScore",bestScore);
            document.getElementById("bestScore").innerText = `🏆 Best Score: ${bestScore} attempts`;
        }
    }else if(attempts >= maxAttempts){
        messge.innerHTML = `<span class="loss">❌ Game Over! The correct number was ${randomNumber}.</span>`;
        input.disabled = true;
        checkBtn.disabled = true;
    }else if(guess > randomNumber){
        messge.innerText = "⬆️ Too high! Try again.";
    }else{
        messge.innerText = "⬇️ Too low! Try again.";
    }

    document.getElementById("guessInput").value = "";
}
}

function resetGame(){
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    let massage = document.getElementById('message');
    let attemptsDisplay = document.getElementById('attempts');
    let guessInput = document.getElementById('guessInput');
    massage.innerText = "";
    attemptsDisplay.innerText = "";
    document.getElementById('check').disabled = false;
    guessInput.disabled = false;
    guessInput.value = "";
}
