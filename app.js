let board = ["", "", "", "", "", "", "", "", ""];
let turn = document.getElementById("turn")
const list = document.querySelector('#list');
let Xturn = true;
let winnerDisplay = document.getElementById("winner")
const button = document.querySelector("button");

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkTheWinner() {
    const player = Xturn ? "X" : "O";

    let winner = winningCombos.some(combo =>
        combo.every(index => board[index] === player)
    );

    return winner ? player : null;
}

for (let i = 0; i < board.length; i++) {
    const cell = document.createElement("div");
    const cellEl = list.appendChild(cell);
    cellEl.textContent = board[i];
    cell.setAttribute('id', 'cell');
    cellEl.addEventListener('click', () => {
        if (board[i] === "") {  // Allow move only if the cell is empty
            if (Xturn) {
                board[i] = "X";
                cellEl.textContent = board[i];
                turn.innerText = `It is the turn of O`;
            } else {
                board[i] = "O";
                cellEl.textContent = board[i];
                turn.innerText = `It is the turn of X`;
            }

            console.log(i);
            console.log(checkTheWinner());

            if (checkTheWinner() !== null) {
                winnerDisplay.innerText = `Winner is: ${checkTheWinner()}`;
                list.style.display = 'none';
                button.style.display = 'block';
                return;
            } else if (checkTheWinner() === null && board.every(str => str !== "")) {
                winnerDisplay.innerText = "Tie";
                list.style.display = 'none';
                button.style.display = 'block';
            }

            Xturn = !Xturn;  // Toggle turn
        }
    });
}

button.addEventListener("click", () => {
    location.reload();
});
