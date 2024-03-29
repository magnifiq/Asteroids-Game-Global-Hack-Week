const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    let playerX = 300; 
    let playerY = 200; 
    let asteroids = []; 
    let gameInterval;

    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    
    startGame();

    
    function startGame() {
      gameInterval = setInterval(updateGame, 20); 
      createAsteroids();
    }

    function createAsteroids() {
      for (let i = 0; i < 10; i++) {
        let asteroid = document.createElement('div');
        asteroid.className = 'asteroid';
        asteroid.style.left = Math.floor(Math.random() * 750) + 'px';
        asteroid.style.top = Math.floor(Math.random() * 550) + 'px';
        gameContainer.appendChild(asteroid);
        asteroids.push(asteroid);
      }
    }

    
    function updateGame() {
      movePlayer();
      moveAsteroids();
      checkCollision();
    }

    
    function movePlayer() {
      if (playerX >= 0 && playerX <= 750) {
        if (keys.left) {
          playerX -= 5;
        }
        if (keys.right) {
          playerX += 5;
        }
        if (keys.up) {
          playerY -= 5;
        }
        if (keys.down) {
          playerY += 5;
        }
      }
      player.style.left = playerX + 'px';
      player.style.top = playerY + 'px';
    }

    
    function moveAsteroids() {
      for (let i = 0; i < asteroids.length; i++) {
            let asteroid = asteroids[i];
            let x = parseInt(asteroid.style.left);
            let y = parseInt(asteroid.style.top);
            let dx = Math.floor(Math.random() * 5) - 2; 
            let dy = Math.floor(Math.random() * 5) - 2; 
            x += dx;
            y += dy;

            
            if (x < 0 || x > 750 || y < 0 || y > 550) {
            dx = -dx; 
            dy = -dy; 
            }
            asteroid.style.left = x + 'px';
            asteroid.style.top = y + 'px';
        }
    }


    function checkCollision() {
        for (let i = 0; i < asteroids.length; i++) {
            let asteroid = asteroids[i];
            let asteroidX = parseInt(asteroid.style.left);
            let asteroidY = parseInt(asteroid.style.top);
            let asteroidWidth = parseInt(asteroid.style.width);
            let asteroidHeight = parseInt(asteroid.style.height);

            if (
            playerX < asteroidX + asteroidWidth &&
            playerX + playerWidth > asteroidX &&
            playerY < asteroidY + asteroidHeight &&
            playerY + playerHeight > asteroidY
            ) {
            
            endGame();
            break;
            }

            for (let j = i + 1; j < asteroids.length; j++) {
            let otherAsteroid = asteroids[j];
            let otherAsteroidX = parseInt(otherAsteroid.style.left);
            let otherAsteroidY = parseInt(otherAsteroid.style.top);

            if (
                asteroidX < otherAsteroidX + asteroidWidth &&
                asteroidX + asteroidWidth > otherAsteroidX &&
                asteroidY < otherAsteroidY + asteroidHeight &&
                asteroidY + asteroidHeight > otherAsteroidY
            ) {
                
                alert('Asteroids collided!');
                break;
            }
            }
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        alert('Game Over');
    }

    
    let keys = {
        left: false,
        right: false,
        up: false,
        down: false
    };

    
    function handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            keys.left = true;
        }
        if (event.key === 'ArrowRight') {
            keys.right = true;
        }
        if (event.key === 'ArrowUp') {
            keys.up = true;
        }
        if (event.key === 'ArrowDown') {
            keys.down = true;
        }
    }

    function handleKeyUp(event) {
        if (event.key === 'ArrowLeft') {
            keys.left = false;
        }
        if (event.key === 'ArrowRight') {
            keys.right = false;
        }
        if (event.key === 'ArrowUp') {
            keys.up = false;
        }
        if (event.key === 'ArrowDown') {
            keys.down = false;
        }
    }
