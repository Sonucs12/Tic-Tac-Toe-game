const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const box5 = document.getElementById("box5");
const box6 = document.getElementById("box6");
const box7 = document.getElementById("box7");
const box8 = document.getElementById("box8");
const box9 = document.getElementById("box9");
let chance = document.getElementById("chance");
let player = "X";
const boxes = document.querySelectorAll(".box");
// Add click event to all boxes
boxes.forEach((box) => {
  box.addEventListener("click", handleBoxClick);
});
// Function to remove click event listeners
function removeClickEventListeners() {
  boxes.forEach((box) => {
    box.removeEventListener("click", handleBoxClick);
  });
}
// Handle click function on boxes
function handleBoxClick() {
  if (this.textContent === "") {
    this.textContent = player;
    this.setAttribute("data-content", player);
    this.style.backgroundColor = "blue";

    // Check for a winner
    const winningBoxes = winnerPlayer(boxes);
    if (winningBoxes) {
      highlightWinningBoxes(winningBoxes.boxes);
      removeClickEventListeners();
      updateScore();
      setTimeout(() => {
        resetGame();
      }, 5000);
      return;
    }
    // Check for a draw
    if (checkForDraw()) {
      setTimeout(() => {
        chance.textContent = "Game Draw";
        setTimeout(() => {
          resetGame();
        }, 2000);
      }, 1000);

      removeClickEventListeners();
      return;
    }

    if (player === "X") {
      player = "O";
    } else {
      player = "X";
    }
    highlightPlayer();
  }
}

// Function to check for a winner and return winning boxes
function winnerPlayer() {
  // Check rows
  if (
    box1.textContent !== "" &&
    box1.textContent === box2.textContent &&
    box2.textContent === box3.textContent
  ) {
    return { player: box1.textContent, boxes: [box1, box2, box3] };
  }
  if (
    box4.textContent !== "" &&
    box4.textContent === box5.textContent &&
    box5.textContent === box6.textContent
  ) {
    return { player: box4.textContent, boxes: [box4, box5, box6] };
  }
  if (
    box7.textContent !== "" &&
    box7.textContent === box8.textContent &&
    box8.textContent === box9.textContent
  ) {
    return { player: box7.textContent, boxes: [box7, box8, box9] };
  }

  // Check columns
  if (
    box1.textContent !== "" &&
    box1.textContent === box4.textContent &&
    box4.textContent === box7.textContent
  ) {
    return { player: box1.textContent, boxes: [box1, box4, box7] };
  }
  if (
    box2.textContent !== "" &&
    box2.textContent === box5.textContent &&
    box5.textContent === box8.textContent
  ) {
    return { player: box2.textContent, boxes: [box2, box5, box8] };
  }
  if (
    box3.textContent !== "" &&
    box3.textContent === box6.textContent &&
    box6.textContent === box9.textContent
  ) {
    return { player: box3.textContent, boxes: [box3, box6, box9] };
  }

  // Check diagonals
  if (
    box1.textContent !== "" &&
    box1.textContent === box5.textContent &&
    box5.textContent === box9.textContent
  ) {
    return { player: box1.textContent, boxes: [box1, box5, box9] };
  }
  if (
    box3.textContent !== "" &&
    box3.textContent === box5.textContent &&
    box5.textContent === box7.textContent
  ) {
    return { player: box3.textContent, boxes: [box3, box5, box7] };
  }

  return null;
}

// Function to highlight winning boxes
function highlightWinningBoxes(winningBoxes) {
  let isHighlighted = false;
  const interval = setInterval(() => {
    winningBoxes.forEach((box) => {
      if (isHighlighted) {
        box.style.backgroundColor = "blue";
      } else {
        box.style.backgroundColor = "#4caf50";
      }
    });
    isHighlighted = !isHighlighted;
  }, 250);

  setTimeout(() => {
    clearInterval(interval);
    winningBoxes.forEach((box) => {
      box.style.backgroundColor = "blue";
    });
  }, 2000);
}

function checkForDraw() {
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].textContent === "") {
      return false;
    }
  }
  return true;
}

function resetGame() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.removeAttribute("data-content");
    box.style.backgroundColor = "red";
    resetHighlightPlayer()

  });

  player = "X";

  boxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick);
  });
}

const playerO = document.querySelector(".player-o");
const playerX = document.querySelector(".player-x");
function highlightPlayer() {
  if (player === "X") {
    chance.textContent = "X Turn";
    playerX.classList.add("active");
    playerO.classList.remove("active");
  } else {
    chance.textContent = "O Turn";
    playerO.classList.add("active");
    playerX.classList.remove("active");
  }
}

function resetHighlightPlayer() {
  chance.textContent = "Start game or select player";
  if (playerX.classList.contains("active")) {
    playerX.classList.add("active");
    playerO.classList.remove("active");
  } else {
    playerO.classList.remove("active");
    playerX.classList.add("active");
  }
}

let scoreOfx = 0;
let scoreOfo = 0;
const scorex = document.getElementById('scorex');
const scoreo = document.getElementById('scoreo');
function updateScore() {
  const winningPlayer = winnerPlayer();
  if (winningPlayer && winningPlayer.player === "X") {
    scoreOfx++;
    scorex.textContent = `Score: ${scoreOfx}`;
    chance.textContent = "Player X is Winner";
  } else if (winningPlayer && winningPlayer.player === "O") {
    scoreOfo++;
    scoreo.textContent = `Score: ${scoreOfo}`;
    chance.textContent = "Player O is Winner";
  }
}

function resetScores() {
  scoreOfx = 0;
  scoreOfo = 0;
  scorex.textContent = "Score: 0";
  scoreo.textContent = "Score: 0";
}
document.getElementById("restart").addEventListener("click", restart);

function restart() {
  resetScores();
  resetGame();
  chance.textContent = "Start game or select player";
}