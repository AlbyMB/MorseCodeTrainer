let spacebarPressTimer;
let typed = false;
let spacebarPressed = false;


const morseDict = {
    '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y', '--..': 'Z'
};

document.addEventListener('DOMContentLoaded', function() {
    const targetDiv = document.getElementById('input');
    targetDiv.textContent = '';
    targetDiv.focus();
    startGeneratingLetters();
});

function createLetter() {
    const container = document.getElementById("dropper");
    const letter = document.createElement("div");
    letter.classList.add("letter");

    letter.textContent = String.fromCharCode(Math.random() * 26 + 65);
    letter.classList.add(`${letter.textContent}`);
    const rect = container.getBoundingClientRect();

    const randomX = Math.floor(Math.random() * (rect.width - 50 - 50 + 1)) + 50;
    letter.style.left = randomX + "px";

    const duration = Math.floor(Math.random() * (10 + 5 + 1)) + 5;
    letter.style.animationDuration = duration + "s";

    container.appendChild(letter);

    letter.addEventListener('animationend', () => {
        letter.remove();
    });
}

function startGeneratingLetters() {
    setInterval(() => {
        if (Math.random() < 0.5) {
            createLetter();
        }
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        const targetDiv = document.getElementById('input');
        let input = targetDiv.children;
        let morse = '';

        for (var i = 0; i < input.length; i++) {
            if (input[i].className === 'dot') {
                morse += '.';
            } else if (input[i].className === 'dash') {
                morse += '-';
            }
        }
        targetDiv.innerHTML = '';
        console.log(morseDict[morse]);

        if (morseDict[morse]) {
            const dropper = document.getElementById('dropper');
            const letters = dropper.getElementsByClassName(morseDict[morse]);
            if (letters.length > 0) {
                letters[0].remove();
            }
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !spacebarPressed) {
        event.preventDefault();
        spacebarPressed = true; 
        typed = false;
        spacebarPressTimer = setTimeout(function() {
            const targetDiv = document.getElementById('input');
            if (targetDiv) {
                targetDiv.appendChild(document.createElement('div')).className = 'dash';
                typed = true;
            }
            spacebarPressTimer = null;
        }, 200);
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        spacebarPressed = false; 
        if (spacebarPressTimer) {
            clearTimeout(spacebarPressTimer);
            spacebarPressTimer = null;
            if (!typed) {
                const targetDiv = document.getElementById('input');
                if (targetDiv) {
                    targetDiv.appendChild(document.createElement('div')).className = 'dot';
                }
            }
        }
    }
});

function SetMode(mode){
    document.getElementById(mode).style.color = "var(--select)";    
}