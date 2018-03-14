var gSelectedElCell = null;
var gLevel = { size: 4, mineCount: 2 };
var gState = { isGameOn: false, shownCount: 0, markedCount: 0, minesCount: 0, clickCount: 0, secsPassed: 0 };
var gInterval;
var elTime = document.querySelector('.timer');
var gBoard;
var newGboard;
var gRender;



function initGame() {
    gBoard = buildBoard(gLevel.size);
    newGboard = newBuildBoard(gBoard);
    console.table(newGboard);
    gRender = renderBoard(newGboard);

}

function changeGameLevel(elLevel) {
    var elLevelWanted = elLevel.className;

    if (elLevelWanted === 'beginner') {
        gLevel = { size: 4, mineCount: 2 };
    } else if (elLevelWanted === 'medium') {
        gLevel = { size: 6, mineCount: 5 };
    } else if (elLevelWanted === 'expert'){
        gLevel = { size: 8, mineCount: 15 };
    }
    resetGame();
}

function resetGame() {
    clearInterval(gInterval);
    gState.clickCount = 0;
    var elTime = document.querySelector('.timer');
    gState.secsPassed = 0;
    elTime.innerHTML = 'Time: ' +gState.secsPassed;
    if (gState.clickCount === 1) {
        setTime('Timer : ' + gState.secsPassed++)
        gInterval = setInterval(function () {
            setTime('Timer : ' + gState.secsPassed++)
        }, 1000)
    }
    initGame();



    
}

function setTime(time) {
    elTime.innerHTML = 'Time: ' +gState.secsPassed;
}
setTime('Timer : 0');
var playGame = initGame();
function buildBoard(size) {
    var cells = [];
    for (var i = 0; i < gLevel.mineCount; i++) {
        cells.push('💣')
    }
    var limit = gLevel.size ** 2 - gLevel.mineCount
    for (var j = 0; j < limit; j++) {
        cells.push('')
    }
    shuffle(cells);
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = cells.pop();
        }
    }

    return board;

}

function newBuildBoard(board) {
    var newBoard = []
    for (var i = 0; i < board.length; i++) {
        newBoard[i] = [];
        for (var j = 0; j < board[0].length; j++) {
            newBoard[i][j] = gBoard[i][j];
            if (newBoard[i][j] === '') newBoard[i][j] = getNeighborsCount(board, i, j);
        }
    }

    return newBoard;

}


function renderBoard(newBoard) {
    var tblNums = document.querySelector('.tbl-mine');
    var strHtml = '';
    for (var i = 0; i < newBoard.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < newBoard[0].length; j++) {
            var cell = newGboard[i][j];
            var tdId = 'cell-' + i + '-' + j;

            strHtml += '<td onclick="cellClicked(this, ' + i + ',' + j + ', newGboard)" onmousedown="cellMarked(this, event, ' + i + ',' + j + ')"><span id="' + tdId + '" class="hidenCell">' + cell + '</span></td>'


        }
        strHtml += '</tr>'
    }
    tblNums.innerHTML = strHtml;
}

function expandShown(board, elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 2; i <= rowIdx + 2; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 2; j <= colIdx + 2; j++) {
            if (j < 0 || j >= board[i].length) continue;
            var elCellspan = document.querySelector('#cell-' + i + '-' + j);
            if (board[i][j] !== '💣' && (elCellspan.classList.contains('hidenCell'))) {
                elCellspan.classList.remove('hidenCell');
                gState.shownCount++;

            }


        }
    }
    console.log('this is the shown counter:', gState.shownCount);
}


function getSelector(i, j) {
    return '#cell-' + i + '-' + j
}



function cellMarked(elCell, event, i, j) {
    var xButton = event.button;
    if (xButton === 2) {

        var elCellspan = document.querySelector('#cell-' + i + '-' + j);

        if (elCellspan.classList.contains('hidenCell')) {
            elCellspan.classList.remove('hidenCell');
            elCellspan.innerHTML = '🎌';
            gState.markedCount++;
            console.log('this is the mark count', gState.markedCount);

        } else if (elCellspan.innerHTML === '🎌' && (!elCellspan.classList.contains('hidenCell'))) {
            console.log('this is a flag');
            elCellspan.classList.add('hidenCell');
            gState.markedCount--;
            elCellspan.innerHTML = newGboard[i][j];


        }
        checkGameOver(newGboard);

    }
}



function cellClicked(elCell, i, j, board) {
    if (!gSelectedElCell) {
        var elCellspan = elCell.querySelector('.hidenCell');
        elCellspan.classList.remove('hidenCell');
        gState.shownCount++;
        console.log('this is the shown counter:', gState.shownCount);
        gState.clickCount++
        if (gState.clickCount === 1) {
            setTime('Timer : ' + gState.secsPassed++)
            gInterval = setInterval(function () {
                setTime('Timer : ' + gState.secsPassed++)
            }, 1000)
        }

        if (elCellspan.innerHTML === '0') {
            expandShown(newGboard, elCell, i, j);
        }
        if (elCellspan.innerHTML === '💣') {
            clearInterval(gInterval);
            gSelectedElCell = true;
            alert('You are on a mine!, you lost the game!');

        }
         checkGameOver(newGboard);

    }
}


function getNeighborsCount(board, rowIdx, colIdx) {
    var neigboursCount = 0;

    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (!(i >= 0 && i < board.length)) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if ((i === rowIdx && j === colIdx) ||
                (j < 0 || j >= board[i].length)) continue;

            if (board[i][j]) neigboursCount++;
        }
    }
    return neigboursCount;
}

function checkGameOver(board, i, j) {
    if (gState.shownCount === gLevel.size * gLevel.size - gState.markedCount) {
        var res = true;

        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {
                var elCellspan = document.querySelector('#cell-' + i + '-' + j);

                if (board[i][j] !== '💣' && elCellspan.innerHTML === '🎌') {
                    res = false;
                }

            }
        }
        console.log('you win the game ', res);
        if (res === true) {
            alert('you won!!!');
            clearInterval(gInterval);
        }
    }

}

function shuffle(items) {

    var j, tempItem, i;
    for (i = items.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        tempItem = items[i];
        items[i] = items[j];
        items[j] = tempItem;
    }
    return items;
}