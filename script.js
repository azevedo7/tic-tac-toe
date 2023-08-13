// Create grid for game
function CreateBoard() {
    const rows = 3;
    const cols = 3;

    let board = [];
    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let k = 0; k < cols; k++) {
            board[i].push(Cell());
        }
    }
    const getBoard = () => board;

    const play = (row, col, player) => {
        // Return true if player succeds, else false
        const cell = board[row][col]
        if (cell.getValue() == ' ') {
            cell.changeValue(player);
            return true;
        }
        return false;
    }

    // Console Print
    const printBoard = () => {
        for(let i = 0; i<rows; i++) {
            console.log(`| ${board[i][0].getValue()} | ${board[i][1].getValue()} | ${board[i][2].getValue()} | ${i}`)
        }
    }

    //Check for winner
    const checkWin = () => {
        //Return player if won, return false if no one wins, true if tie
        let playsLeft = 0;
        
        // Calc plays left 
        for(let i = 0; i < rows; i++) {
            for(let k = 0; k < cols; k++) {
                if (board[i][k].isEmpty()) {playsLeft++};
            }
        }


        //Check rows and cols
        for(let i = 0; i < rows; i++) {
            if((board[i][0].getValue() == board[i][1].getValue()) && (board[i][1].getValue() == board[i][2].getValue()) && !board[i][0].isEmpty()) {
                return board[i][0].getPlayer();
            }

            if((board[0][i].getValue() == board[1][i].getValue()) && (board[1][i].getValue() == board[2][i].getValue()) && !board[0][i].isEmpty()) {
                return board[0][i].getPlayer();
            }
        }

        //Check vertical
        if((board[0][0].getValue() == board[1][1].getValue()) && (board[1][1].getValue() == board[2][2].getValue()) && !board[1][1].isEmpty()) {
            return board[1][1].getPlayer();
        }

        if((board[2][0].getValue() == board[1][1].getValue()) && (board[1][1].getValue() == board[2][0].getValue()) && !board[1][1].isEmpty()) {
            return board[1][1].getPlayer();
        }

        // If no plays left, tie
        if(playsLeft == 0) {
            return true;
        }
        return false;
    }

    return {getBoard, play, printBoard, checkWin};
}

function Cell() {
    let value = ' ';
    let player;

    const changeValue = (playr) => {
        value = playr.marker;
        player = playr;
    }
    
    const isEmpty = () => {if (player) {
        return false;
    } else {
        return true;
    }};

    const getValue = () => value;
    const getPlayer = () => player;
    return {
        changeValue,
        getValue,
        getPlayer,
        isEmpty,
    };
}


function gameControl () {
    let board = CreateBoard();

    const player = [
        {
            name: 'Player 1',
            marker: 'X'
        },
        {
            name: 'Player 2',
            marker: 'O'
        }
    ]

    let playerTurn = player[0];
    const getTurn = () => playerTurn;

    const changeTurn = () => {(playerTurn == player[0] ? playerTurn=player[1] : playerTurn=player[0])}
    
    return{
        changeTurn,
        getTurn,
        getBoard: board.getBoard,
    };
}

const displayControl = () => {
    game = gameControl();


}

displayControl();