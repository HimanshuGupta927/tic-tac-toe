let boxes = document.querySelectorAll('.box');
let info = document.querySelector('.info');
let result = document.querySelector('.result');
let line = document.querySelector('.line');
let validMove;
let gameRunning = true;
let currentPlayer = 'X';
let counter = 0;
let X_score = 0;
let O_score = 0;

let playAgain = document.createElement('button')
playAgain.innerHTML = "Play Again";
playAgain.classList.add('btn')
playAgain.onclick = ()=>{
    window.location.reload();
}

function validMoveCheck(elem) {
    if ((elem.innerHTML === '') && (counter < 9)) {
        validMove = true;
        counter++;
    } else {
        validMove = false;
    }
}

function changePlayer() {
    return currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let i = 0;
    for (let arr of winConditions) {
        let a = boxes[arr[0]].innerHTML;
        let b = boxes[arr[1]].innerHTML;
        let c = boxes[arr[2]].innerHTML;

        if (((a === b) && (a === c)) && (a !== '')) {
            gameRunning = false;
            result.innerHTML = `<div class="winner">${a} Won!</div>`;
            result.appendChild(playAgain);
            line.classList.remove('hidden');
            break;
        } else if(counter === 9 && gameRunning){
            gameRunning = false;
            result.innerHTML = '<div class="winner">Tie!</div>';
            result.appendChild(playAgain)
        }
        i++;
    }
    
    switch(i){
        case 0:
            line.style.transform = "rotate(90deg) translateX(-150px)";
            break;
        case 1:
            line.style.transform = "rotate(90deg)";
            break;
        case 2:
            line.style.transform = "rotate(90deg) translateX(150px)";
            break;
        case 3:
            line.style.transform = "translateX(-150px)";
            break;
        case 4:
            line.style.transform = "";
            break;
        case 5:
            line.style.transform = "translateX(150px)";
            break;
        case 6:
            line.style.transform = "rotate(135deg)";
            break;
        case 7:
            line.style.transform = "rotate(45deg)";
            break;
    }
}
function updateBox(e) {
    validMoveCheck(this);
    if (validMove && gameRunning) {
        e.target.innerHTML = currentPlayer;
        currentPlayer === 'X' ? e.target.classList.add('green') : e.target.classList.add('red');
        changePlayer();
        info.innerHTML = `${currentPlayer}'s Turn!`
        if(counter > 4){
            checkWin();
        }
    }
}

Array.from(boxes).forEach((box) => {
    box.addEventListener('click', updateBox);
})