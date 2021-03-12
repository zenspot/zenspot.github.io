var game = document.getElementById("game");
var scoreBar = document.getElementById("score-bar");
var scoreText = document.getElementById("score-text");
var retryBtn = document.getElementById("retry-btn");
var backBtn = document.getElementById("back-btn");
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");

// To start jumping state, score and gameEnded state at 0
var jumping = 0;
var counter = 0;
var gameEnded = 0;

hole.addEventListener('animationiteration', () => {
  // To generate random number between -150 and -350
  var random = -((Math.random() * 200) + 150);
  // To set current new hole's margin from top to random number
  hole.style.top = random + "px";
  // To increment score by 1 if game has not ended
  if (gameEnded == 0) {
    counter++;
  }
}, true);

var gravityInterval = setInterval(function () {
  // To get character's margin from top
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

  // To add "gravity" by adding 3px to character's margin from top, if bird is not jumping
  if (jumping == 0) {
    character.style.top = (characterTop + 3) + "px";
  }

  var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var cTop = -(500 - characterTop);

  // To end game if bird is down or bird hits block without hitting hole
  if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
    // To show game over message and display score
    displayScore(counter);
  }
}, 10);

function jump() {
  // To set jumping state to 1
  jumping = 1;

  // To start jumping interval counter at 0
  let jumpCount = 0;

  var jumpInterval = setInterval(function () {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    // To jump, in intervals of  if bird is not about to escape frame
    if ((characterTop > 6) && (jumpCount < 15)) {
      character.style.top = (characterTop - 5) + "px";
    }

    // To prevent jump-spamming
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }

    jumpCount++;
  }, 10);
}

function displayScore(score) {
  // To insert score into scoreText
  scoreText.innerHTML = score;
  // To set gameEnded to 1
  gameEnded = 1;

  // To hide game, then display scoreBar and clear gravityInterval
  game.classList.add("hide");
  setTimeout(function () {
    scoreBar.style.display = "flex";
    clearInterval(gravityInterval);
  }, 300);
  // To reset score
  // counter = 0;
  // To reset character's position
  // character.style.top = 250 + "px";
}

game.addEventListener("click", jump, true);
retryBtn.addEventListener("click", () => { location.reload(); }, true);
backBtn.addEventListener("click", () => { window.location = "index.html"; }, true);