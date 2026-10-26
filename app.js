let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetbtn");
let newbtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgcont = document.querySelector(".msg-container");
let draw = document.querySelector(".draw");

let count = 0;
let turn0 = true;

let winningpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],   // ← missing pattern added
    [3, 4, 5],
    [6, 7, 8]
];

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const resetgame = () => {
    turn0 = true;
    count = 0;                    // ← reset count
    enableboxes();
    msgcont.classList.add("hide");
    draw.classList.add("hide");   // ← hide draw message
};

const showwinner = (winner) => {
    msg.innerText = `Winner is ${winner}`;
    msgcont.classList.remove("hide");
    draw.classList.add("hide");   // ensure draw is hidden
    disableboxes();
};

const drawsituation = () => {
    draw.classList.remove("hide");
    msgcont.classList.add("hide"); // optional: hide winner msg
    disableboxes();
};

const checkwinner = () => {
    for (let pattern of winningpatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showwinner(pos1val);
                return true;   // winner found
            }
        }
    }
    return false;              // no winner
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkwinner();

        // Only declare draw if board is full AND there is no winner
        if (count === 9 && !isWinner) {
            drawsituation();
        }
    });
});

resetbtn.addEventListener("click", resetgame);
newbtn.addEventListener("click", resetgame);