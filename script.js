const cont = document.querySelector("#container");
const algo_printer = document.querySelector("#bt");

let player_turn = "X";
const render_board = (b) => {
  clear_board();
  b.forEach((s, i) => {
    div = document.createElement("div");
    div.textContent = s;
    div.id = `${i}`;
    div.addEventListener("click", makeMove);
    cont.appendChild(div);
  });
};
const clear_board = () => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};
const makeMove = (e) => {
  e.target.textContent = player_turn;
  board[e.target.id] = player_turn;
  player_turn == "O" ? (player_turn = "X") : (player_turn = "O");
  computerMove();
};
const computerMove = () => {
  minimax(board, "O");
  board[best_choice] = "O";
  render_board(board);
  player_turn == "O" ? (player_turn = "X") : (player_turn = "O");
};
const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
render_board(board);
const available_moves = (play) => {
  let moves = [];
  play.forEach((el, i) => {
    if (el == " ") moves.push(i);
  });
  return moves;
};
const win_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
const check_win = (play) => {
  let win = false;
  let winner = "";
  win_conditions.forEach((wc) => {
    if (wc.every((i) => play[i] == "O")) {
      win = true;
      winner = "O";
      return [win, winner];
    }
    if (wc.every((i) => play[i] == "X")) {
      win = true;
      winner = "X";
      return [win, winner];
    }
  });
  return [win, winner];
};

const score = (game, player) => {
  if (player == "O" && check_win(game)[0]) return 10;
  if (player == "X" && check_win(game)[0]) return -10;
  return 0;
};

let best_choice;

const minimax = (game, player) => {
  if (check_win(game)[0]) return score(game, player == "O" ? "X" : "O");
  const scores = [];
  const moves = [];
  available_moves(game).forEach((move) => {
    const possible_game = [...game];
    possible_game[move] = player;
    player_now = player == "O" ? "X" : "O";
    scores.push(minimax(possible_game, player_now));
    moves.push(move);
  });
  if (player == "O") {
    if (scores.length > 0) {
      const max = Math.max(...scores);
      const index = scores.indexOf(max);
      best_choice = moves[index];
      return max;
    } else return 0;
  } else {
    if (scores.length > 0) {
      const min = Math.min(...scores);
      const index = scores.indexOf(min);
      best_choice = moves[index];
      return min;
    } else return 0;
  }
};

algo_printer.addEventListener("click", () => {
  minimax(board, "O");
  console.log(best_choice);
});
