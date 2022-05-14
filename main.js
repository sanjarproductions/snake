const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let titleCount = 20;
let titleSize = canvas.width / titleCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLenght = 2;

let appleX = 5;
let appleY = 5;

let inputXVelocity = 0;
let inputYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

//
function drawGame(){
    xVelocity = inputXVelocity;
    yVelocity = inputYVelocity;

    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if (score > 5){
        speed = 9;
    }
    if (score > 10){
        speed = 11;
    }

    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //
    if (headX < 0 ){
        gameOver = true;
    } else if (headX === titleCount){
        gameOver = true;
    } else if (headY < 0){
        gameOver = true;
    } else if (headY === titleCount){
        gameOver = true;    
    }  

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        if (gameOver){
            ctx.fillStyle = "white";
            ctx.font = "50px Poppins";
    
            ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
        }

        ctx.fillText("Game Over", canvas.width / 6.5, canvas.height / 2);
    }
        
    return gameOver;
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana"
    ctx.fillText("Score" + score, canvas.width- 50, 10);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'green';
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * titleCount,part.y * titleCount,titleSize,titleSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLenght){
        snakeParts.shift();
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * titleCount, headY * titleCount, titleSize,titleSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple(){
    ctx.fillStyle = "red";
     ctx.fillRect(appleX* titleCount,appleY* titleCount,titleSize,titleSize)
}
function checkAppleCollision(){

    if(appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * titleCount);
        appleY = Math.floor(Math.random() * titleCount);
        tailLenght++;
        score++;
        gulpSound.play();
    }
}
document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //
    if(event.keyCode == 38 || event.keyCode == 87){
        if(inputYVelocity == 1) return;
        inputYVelocity = -1;
        inputXVelocity = 0;
    }

    if(event.keyCode == 40 || event.keyCode == 83){
        if(inputYVelocity == -1) return;
        inputYVelocity = 1;
        inputXVelocity = 0;
    }

    if(event.keyCode == 37 || event.keyCode == 65){
        if(inputXVelocity == 1) return;
        inputYVelocity = 0;
        inputXVelocity = -1;
    }

    if(event.keyCode == 39 || event.keyCode == 68){
        if(inputXVelocity == -1)  return;
        inputYVelocity = 0;
       inputXVelocity = 1;
    }
}

drawGame();
