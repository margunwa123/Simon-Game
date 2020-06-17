/**
 * There are 3 steps, which will be flagged and commented for this game
 * 1. Play a button
 * 2. Get and check user input
 * 3. Proceed to next stage/ Game over
 */

// set ups
let colors = [
  "red",
  "green",
  "blue",
  "yellow"
]

let userInput = []
let answer = []
let currentLevel = 0
let currentIndex = 0

function initialize() {
  $(".btn").unbind();
  $(".btn").click(getUserInput)
  userInput = [];
  answer = [];
  currentLevel = 0;
  currentIndex = 0;
  nextLevel();
  $(document).unbind();
}

// 1. Play a button
function nextLevel() {
  currentIndex = 0;
  userInput = []
  currentLevel++;
  $("#level-title").text("Level " + currentLevel)
  let randomColor = getRandomColor()
  answer.push(randomColor)

  console.log(answer)
  setTimeout(() => {
    playAudio(randomColor)
    $(`#${randomColor}`).addClass("button-answer");
    setTimeout(() => {
      $(`#${randomColor}`).removeClass("button-answer");      
    }, 100);
  }, 500);
}

function getRandomColor() {
  let idx = Math.floor(Math.random() * 4);
  return colors[idx];
}

//2. Get and check user input
function getUserInput(event) {
  let color = event.target.id;
  animateAndPlayButton(color)
  userInput.push(color);
  checkAndGoToNextLevel();
}

function animateAndPlayButton(color) {
  playAudio(color);
  $(`#${color}`).addClass("pressed")
  setTimeout(() => {
    $(`#${color}`).removeClass("pressed")
  }, 100);
}

function checkUserInput() {
  return userInput[currentIndex] === answer[currentIndex];
}

function playAudio(color) {
  // why we do this? so that audios with the same color can play simultaneously
  // whereas in audios[color].play();, we cant play the audio simultaneously
  let audio = new Audio(`sounds/${color}.mp3`)
  audio.play();
}

// 3. Proceed to next stage or GAME OVER
function checkAndGoToNextLevel() {
  if(checkUserInput()) {
    currentIndex++;
    if(currentIndex === currentLevel) {
      nextLevel();
    }
  }
  else {
    gameOver();
  }
}

function gameOver() {
  $(".btn").unbind();
  $(".btn").click((event) => {
    let color = event.target.id;
    animateAndPlayButton(color);
    playAudio("wrong")
    $("body").addClass("game-over")
    setTimeout(() => {
      $("body").removeClass("game-over")
    }, 100);
  })
  playAudio("wrong")
  $("body").addClass("game-over")
  setTimeout(() => {
    $("body").removeClass("game-over")
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart");
  run();
}

function run() {
  $(document).keydown(() => { 
    initialize()
  });
}

// the main game
run()