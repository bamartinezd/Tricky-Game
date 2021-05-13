const trickyContainer = document.getElementById("tricky-container");
const alertElement = document.getElementById("alert-message");
const restartGame = document.getElementById("restart-game");
const layerOver = document.getElementById("layer-over");

let itemsArray = [];
let currentValue = ["fas", "fa-times"];

function loadElements() {
    addRowsToTrickContainer();
}

function addRowsToTrickContainer() {
    for (let i = 0; i < 3; i++) {
        const rowElement = createTrickyRow(i);
        trickyContainer.append(rowElement);
    }
}

function createTrickyRow(rowId) {
    const trickyRow = document.createElement("div");
    trickyRow.classList.add("tricky-row");

    for (let i = 0; i < 3; i++) {
        const square = createTrickySquare(`${rowId}-${i}`);
        trickyRow.appendChild(square); 
    }
    
    return trickyRow;
}

function createTrickySquare(elementId) {
    const trickySquare = document.createElement("div");
    trickySquare.id = elementId;
    trickySquare.classList.add("square");
    
    return trickySquare;
}

function createIcon(classesName){
    const icon = document.createElement("i");

    for (let i = 0; i < classesName.length; i++) {
        icon.classList.add(classesName[i]);
    }

    return icon;
}

function drawContent(element) {
    const itemX = ["fas", "fa-times"];
    const itemO = ["far", "fa-circle"];

    if (element.children.length == 0) {
        currentValue = itemX[1] === currentValue[1] ? itemO : itemX;
        element.append(createIcon(currentValue));

        fillDataItems(element, currentValue);
    }
}

function fillDataItems(element, currentValue) {
    let objectItem = {
        row: element.id.split("-")[0],
        col: element.id.split("-")[1],
        value: currentValue[1]
    }; 

    itemsArray.push(objectItem);
    if (itemsArray.length>=5) {
        validateWinner();
    }
}

function validateWinner() {
    
    const testX = itemsArray.filter(x => x.value == "fa-times");
    validateByRowAndCol(testX);
    validateDiagonal(testX);

    const testO = itemsArray.filter(x => x.value == "fa-circle");
    validateByRowAndCol(testO);
    validateDiagonal(testO);
}

function validateDiagonal(itemsArrayFiltered) {
    if (itemsArrayFiltered.filter(x => x.row == x.col).length == 3) {
        showElements();

    }else if (itemsArrayFiltered.filter(x => (Number(x.row) + Number(x.col)) == 2).length == 3) {
        showElements();
    }
}



function validateByRowAndCol(itemsArrayFiltered) {
    for (let i = 0; i < 3; i++) {
        if (itemsArrayFiltered.filter(x => x.row==i).length == 3) {
            showElements();
            break;
        }else if (itemsArrayFiltered.filter(x => x.col==i).length == 3) {
            showElements();
            break;
        }
    }
}

loadElements();

for (let i = 0; i < 3; i++) {
    const element = trickyContainer.children[i];
    for (let j = 0; j < 3; j++) {
        const cell = element.children[j];
        
        cell.addEventListener("click", event => {
            drawContent(cell);
        });
    }
}

function showElements() {
    if (alertElement.classList.contains("hide-element")) {
        alertElement.classList.replace("hide-element", "show-element");
        restartGame.classList.replace("hide-element", "show-element");
        layerOver.classList.replace("hide-element", "show-element");
    }
}

function hideElements() {
    if (alertElement.classList.contains("show-element")) {
        alertElement.classList.replace("show-element", "hide-element");
        restartGame.classList.replace("show-element", "hide-element");
        layerOver.classList.replace("show-element", "hide-element");
    }
}

function playAgain() {
    hideElements();
    cleanSquares();
    itemsArray = [];
}

function cleanSquares() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const square = trickyContainer.children[i].children[j];
            if (square.children.length>0) {
                const childsSquare = square.children[0];
                square.removeChild(childsSquare);
            }
        }
    }
}

restartGame.addEventListener("click", playAgain);