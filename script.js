let gameActive = true;
document.addEventListener('keydown', function(event) {
    const player = document.getElementById('player');
    let top = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    let left = parseInt(window.getComputedStyle(player).getPropertyValue('left'));

    if (!gameActive) return;

    switch(event.key) {
        case 'w':
            if (top > 0) {
                player.style.top = (top - 5) + 'px';
            }
            break;
        case 'a': 
            if (left > 0) {
                player.style.left = (left - 5) + 'px';
            }
            break;
        case 's':
            if (top < 480) {
                player.style.top = (top + 5) + 'px';
            }
            break;
        case 'd':
            if (left < 480) {
                player.style.left = (left + 5) + 'px';
            }
            break;
    }
});

function moveZombie() {
    if (!gameActive) return;

    const zombie = document.getElementById('zombie');
    const player = document.getElementById('player');
    const playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'));
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    let zombieTop = parseInt(window.getComputedStyle(zombie).getPropertyValue('top'));
    let zombieLeft = parseInt(window.getComputedStyle(zombie).getPropertyValue('left'));

    if (zombieTop < playerTop) {
        zombieTop += 3; 
    } else if (zombieTop > playerTop) {
        zombieTop -= 3; 
    }

    if (zombieLeft < playerLeft) {
        zombieLeft += 3; 
    } else if (zombieLeft > playerLeft) {
        zombieLeft -= 3; 
    }

    zombie.style.top = zombieTop + 'px';
    zombie.style.left = zombieLeft + 'px';

    if (isColliding(player, zombie)) {
        infeccion();
    }
}

function isColliding(player, zombie) {
    const playerRect = player.getBoundingClientRect();
    const zombieRect = zombie.getBoundingClientRect();

    return !(
        playerRect.top > zombieRect.bottom ||
        playerRect.bottom < zombieRect.top ||
        playerRect.left > zombieRect.right ||
        playerRect.right < zombieRect.left
    );
}

function infeccion() {
    gameActive = false;
    alert('Has sido infectado');
    const choice = confirm("¿Quieres reiniciar el juego? (Aceptar para reiniciar, Cancelar para ir al menú)");
    if (choice) {
        location.reload(); 
    } else {
        window.location.href = 'index.html';   
    }
}

setInterval(moveZombie, 100);