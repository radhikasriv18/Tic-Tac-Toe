function gameboard() {
  const board = new Array(9).fill(null);
  const player1 = "X";
  const player2 = "O";

  const winningCombination = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // diagonal (top-left to bottom-right)
    [2, 4, 6],
  ];

  function wincheck() {
    for (let i = 0; i < winningCombination.length; i++) {
      const [a, b, c] = winningCombination[i];
      if (board[a] !== null && board[a] == board[b] && board[a] == board[c]) {
        return true;
      }
    }
    return false;
  }

  let currentPlayer = player1;
  let count = 0;
  function placeMove(index) {
    if (board[index] === null) {
      board[index] = currentPlayer;
      document.getElementById(`cell-${index}`).innerText = currentPlayer;

      if (wincheck()) {
        console.log(`${currentPlayer} wins`);
        showwinner(currentPlayer);
        return;
      } else {
        count++;
        if (count === 9 && !wincheck()) {
          console.log("it's a tie");
          tie();
        }
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1; // Switch player
    } else {
      console.log("Spot is already taken!");
    }
  }

  function showwinner(player) {
    const message = document.getElementById("winner-message");
    message.innerText = `${player} wins`;
    $("#winnerModal").modal("show");
  }

  function tie() {
    const message = document.getElementById("winner-message");
    message.innerText = `It's a tie`;
    $("#winnerModal").modal("show");
  }
  function reset() {
    board.fill(null);
    currentPlayer = player1;
    count = 0;
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.innerText = ""; // Clear all cell text
    });

    $("#winnerModal").modal("hide");
  }

  const resetButton = document.getElementById("reset-button");
  resetButton.onclick = reset;
  return { board, placeMove };
}

const game = gameboard(); // Create an instance of Gameboard
// game.placeMove(0); // X
// game.placeMove(1); // O
// game.placeMove(2); // X
// game.placeMove(4); // O
// game.placeMove(3); // X
// game.placeMove(5); // O
// game.placeMove(7); // X
// game.placeMove(6); // O
// game.placeMove(8); // X

const cells = document.querySelectorAll(".cell");
cells.forEach((cell, index) => {
  cell.onclick = function () {
    game.placeMove(index); // Call placeMove with the respective index
  };
});

console.log(game.board);
