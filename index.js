let spacebarPressTimer;
let typed;

document.addEventListener('DOMContentLoaded', function() {
    const targetDiv = document.getElementById('input');
    if (targetDiv) {
        targetDiv.textContent = '';
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
            }, 300);
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