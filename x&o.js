let currentPlayer = 'X';
let gameboard = ["", "", "", "", "", "", "", "", ""];
let putmark = true;
let gameover = false

const wins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [3,4,6]];

function changeturns(boxindex){
    if(gameboard[boxindex] !== '' || !putmark){
        return;
    }
    gameboard[boxindex] = currentPlayer;
    scores();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('click', playturn, false);
});

function playturn(boxclick){
    const clicked = boxclick.target;
    const boxindex = parseInt(clicked.id.replace('box-', ''))-1;
    if (gameboard[boxindex] !== '' || !putmark){
        return;
    }
    changeturns(boxindex);
    updatechange();
}

function updatechange(){
    for(let i = 0; i < boxes.length; i++){
        boxes[i].innerText = gameboard[i]
    }
}

function scores(){
    let roundwin = false;
    for (let i = 0; i < wins.length; i++) {
        const [a,b,c] = wins[i];

        if(gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]){
            roundwin = true;
            break;
        }      
    }
    if(roundwin){
        winner(currentPlayer);
        putmark = gameover;
        return;
    }
    let draw = !gameboard.includes('');

    if(draw){
        itsdraw();
        putmark = gameover;
    }
}

function winner(player){
    const msg = document.getElementById('message');
    msg.innerText = `Player ${player} Wins!`;
}

function itsdraw(player){
    const msg = document.getElementById('message');
    msg.innerText = "It's a draw!";
}

function gamereset(){

    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let putmark = true;
    let currentPlayer = 'X';
    document.querySelectorAll(".box").forEach((box) => (box.textContent = ""));
    document.getElementById('message').innerText = '';
}

const reset = document.getElementById("reset");
reset.addEventListener('click', gamereset, false);