let spacebarPressTimer;
let typed;

document.addEventListener('DOMContentLoaded', function() {
    const targetDiv = document.getElementById('input');
    if (targetDiv) {
        targetDiv.textContent = '';
    }
});

document.addEventListener('mousemove', function(event) {
    const targetDiv = document.getElementById('game');
    if (targetDiv) {
        const rect = targetDiv.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        targetDiv.style.background = `radial-gradient(circle at ${x}px ${y}px, #000000 0%, #373737 250%)`;
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        const targetDiv = document.getElementById('input');
        let input = targetDiv.textContent;
        targetDiv.textContent = '';
    }
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        event.preventDefault();
        if (!spacebarPressTimer) {
            spacebarPressTimer = setTimeout(function() {
                const targetDiv = document.getElementById('input');
                if (targetDiv) {
                    targetDiv.appendChild(document.createElement('div')).className='dash';
                    typed = true;
                }
                spacebarPressTimer = null;
            }, 300); // Adjust the duration for long press as needed
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (event.code === 'Space') {
        if (spacebarPressTimer) {
            clearTimeout(spacebarPressTimer);
            spacebarPressTimer = null;
            if (!typed) {
                const targetDiv = document.getElementById('input');
                if (targetDiv) {
                    targetDiv.appendChild(document.createElement('div')).className='dot';
                }
            }
            else {
                typed = false;
            }
        }
    }
});