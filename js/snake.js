const cvs = document.querySelector('#snake');
const context = cvs.getContext('2d');

//imgs
let backgroundImg = new Image();
backgroundImg.src = "img/ground.png";

let foodImg = new Image();
foodImg.src = "img/food.png";

const squareSize = 22;

// Loads audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

let snake = [];
snake[0] = {
  x: 12,
  y: 10 
};

let food = {
  x: Math.floor (Math.random()*15+1),
  y: Math.floor (Math.random()*12+3)
}

//score
let score = 0;


//control
let d;

let lastDirection = null;

document.addEventListener('keydown', direction);

function direction(event) {
  let key = event.keyCode;

  if(key == 37 && lastDirection != "RIGHT"){
    left.play(); 
    d = "LEFT";

  }
  else if(key == 38 && lastDirection != "DOWN") {
    up.play(); 
    d = "UP";
  }
  else if (key == 39 && lastDirection != "LEFT") {
    right.play(); 
    d = "RIGHT";
  }
  else if (key == 40 && lastDirection != "UP") {
    down.play(); 
    d = "DOWN";
  }
}

//mobile
let btnRight = document.querySelector('.btnRight');
btnRight.addEventListener('click', function(){
  up.play(); 
  d = "RIGHT";
});

let btnDown = document.querySelector('.btnDown');
btnDown.addEventListener('click', function(){
  down.play(); 
  d = "DOWN";
});


let btnLeft = document.querySelector('.btnLeft');
btnLeft.addEventListener('click', function(){
  left.play(); 
  d = "LEFT";
});


let btnUp = document.querySelector('.btnUp');
btnUp.addEventListener('click', function(){
  up.play(); 
  d = "UP";
});

//check COLISAO
function collision(head, array) {
  for(let i = 0; i < array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}

//Desenha Tudo
function draw() {
  context.drawImage(backgroundImg,0,0);

  //desenhando snake
  for(let i = 0; i < snake.length; i++) {
    x = snake[i].x * squareSize
    y = snake[i].y * squareSize

    context.fillStyle = (i == 0) ? "#fff" : "#7D86E3";
    //Draws snake block
    context.fillRect(x, y, squareSize, squareSize); 

    context.strokeStyle = "red";
    context.strokeRect(x, y, squareSize, squareSize);
  }

  //desenha comida
  foodX = food.x * squareSize
  foodY = food.y * squareSize
  context.drawImage(foodImg, foodX, foodY);

  //posicao antiga da cabeca
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  
  //direction
  if( d == "LEFT") snakeX -= 1;
  if( d == "UP") snakeY -= 1;
  if( d == "RIGHT") snakeX += 1;
  if( d == "DOWN") snakeY += 1;
  
  lastDirection = d;

  //eats the food
  if(snakeX == food.x && snakeY == food.y){
    eat.play();
    score++;
    //reposition apple
    food = {
      x: Math.floor (Math.random()*15+1),
      y: Math.floor (Math.random()*12+3)
    }
  }else{
     //remove rastro
    snake.pop();
  }
  
  let newHead = {
    x: snakeX,
    y: snakeY
  }

  //game over
  if(snakeX > 16 || snakeY > 16 || snakeX < 1 || snakeY < 3 || collision(newHead, snake)) {
    clearInterval(game);
    dead.play();
  }


  // Increase snake size
  snake.unshift(newHead);

  // Text
  context.fillStyle = "white";
  context.font = "45px Helvetica";
  context.fillText(score, 4*squareSize,2*squareSize);
}

let game = setInterval(draw, 150);
