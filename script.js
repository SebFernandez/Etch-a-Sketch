//Grabbing HTML elements.
var titleWebsite = document.getElementById("title");
var iconEdit = document.getElementById("icon");
var container = document.getElementById("container");
var crazyBox = document.getElementById("crazy");
var blackBox = document.getElementById("black");
var rainbowBox = document.getElementById("rainbow");

//Variables to work on.
var rows;
var cols;
var rowNumber;
var columnNumber;

//By default black is the color of background that box will have when user points with cursor.
var black = true;
var crazy = false;
var rainbow = false;
var rainbowColors = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
var rainbowIndex = 0;

//Erase existing grid.
function clearGrid() {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}

function paintBlack() {
    black = true;
    crazy = false;
    rainbow = false;
}

function paintCrazy ()  {
    crazy = true;
    black = false;
    rainbow = false;
}

function paintRainbow ()    {
    crazy = false;
    black = false;
    rainbow = true;
}

//Crazy color function is weird shit that works. Source: https://www.paulirish.com/2009/random-hex-color-code-snippets/
function colorBox (e)   {
    if (black == true)  {
        this.style.backgroundColor = '#000000';
        titleWebsite.style.borderBottomColor = '#000000';
    }   else if (crazy == true) {
        this.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        crazyBox.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        titleWebsite.style.borderBottomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    }   else if (rainbow == true)   {
        this.style.backgroundColor = rainbowColors [rainbowIndex];
        rainbowBox.style.backgroundColor = rainbowColors [rainbowIndex];
        titleWebsite.style.borderBottomColor = rainbowColors[rainbowIndex];
        rainbowIndex++;
        if (rainbowIndex < 6)   {
            rainbowIndex++;
        }   else    {
            rainbowIndex = 0;
        }
    }
}

//Draws grid.
function drawGrid(numberR, numberC) {
    for (rows = 0; rows < numberR; rows++) {
        var row = document.createElement("div");
        for (cols = 0; cols < numberC; cols++) {
            var box = document.createElement("div");
            box.className = 'box';
            box.addEventListener ('mouseover', colorBox);
            row.appendChild(box);
        }
        row.classList.add("row");
        container.appendChild(row);
    }
}

//Main.
function etchASketch(e) {
    rowNumber = document.getElementById("row-input").value;
    columnNumber = document.getElementById("column-input").value;

    clearGrid();
    drawGrid(rowNumber, columnNumber);
}

drawGrid(8, 8);
iconEdit.addEventListener('click', etchASketch);
blackBox.addEventListener ('click', paintBlack);
crazyBox.addEventListener('click', paintCrazy);
rainbowBox.addEventListener('click', paintRainbow);