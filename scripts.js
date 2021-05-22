let canvas = document.getElementById("snake")
let context = canvas.getContext('2d')
let box = 32

let direction = 'right'

let snake = []
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function createBg(){
    context.fillStyle = '#FFEC67'
    context.fillRect(0,0,16 * box, 16 * box)
}

function evokeSnake(){
    for(let i = 0; i < snake.length; i++){
        context.fillStyle = "#161616"
        context.fillRect(snake[i].x, snake[i].y, box -1, box -1)
    }
}

function drawFood(){
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, box, box)
}


function update(event){
    if(event.keyCode == 37 || event.keyCode == 65 && direction != 'right') {direction = 'left'}
    if(event.keyCode == 38 || event.keyCode == 87 && direction != 'down') {direction = 'up'}
    if(event.keyCode == 39 || event.keyCode == 68 && direction != 'left') {direction = 'right'}
    if(event.keyCode == 40 || event.keyCode == 83 && direction != 'up') {direction = 'down'}
}

document.addEventListener('keydown', update)
let points = 0


document.addEventListener('keydown', function(event){console.log(event)})

let modal = document.querySelector('.modal')
function openModal() {
    modal.classList.add("active")
}

let pointsCount = document.querySelector("#points")
function countPoints(){
    pointsCount.innerHTML = points
}

// Mobile Controls

let upIcon = document.querySelector("#upIcon")
upIcon.addEventListener('click', function(){direction = 'up'})

let downIcon = document.querySelector("#downIcon")
downIcon.addEventListener('click', function(){direction = 'down'})

let leftIcon = document.querySelector("#leftIcon")
leftIcon.addEventListener('click', function(){direction = 'left'})

let rightIcon = document.querySelector("#rightIcon")
rightIcon.addEventListener('click', function(){direction = 'right'})



function runGame(){

    if(snake[0].x > 15 * box && direction == 'right') {snake[0].x = 0}
    if(snake[0].x < 0 * box && direction == 'left') {snake[0].x = 16 * box}
    if(snake[0].y > 15 * box && direction == 'down') {snake[0].y = 0}
    if(snake[0].y < 0 * box && direction == 'up') {snake[0].y = 16 * box}

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(gameInterval)

            countPoints()
            openModal()
        }
    }

    createBg()
    evokeSnake()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction == 'right'){ snakeX += box}
    if(direction == 'left'){ snakeX -= box}
    if(direction == 'up'){ snakeY -= box}
    if(direction == 'down'){ snakeY += box}


    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box
        food.y = Math.floor(Math.random() * 15 + 1) * box

        points++
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

   snake.unshift(newHead)
}


let gameInterval = setInterval(runGame, 110)
