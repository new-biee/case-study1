let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext("2d");
let pos = [[50, 40], [90, 40], [130, 40],
    [50, 80], [90, 80], [130, 80],
    [50, 120], [90, 120], [130, 120]];


let currentBallIndex = 0;
let score = 0;
let circles = [];

let RADIUS_CIRCLE = 55;
let limitTime = 31;
let timeout = 1000;
let isGameOver = false;
initCircles();
drawGame();
document.addEventListener("click", calculateScore);

function mouseUp() {
    document.getElementById("myCanvas").style = "cursor: url(hammer.jpg),auto";
}

function mouseDown() {
    document.getElementById("myCanvas").style = "cursor: url(hammer2.jpg),auto";
}

function drawGame() {
    if (!isGameOver) {
        limitTime--;
        document.getElementById("timeUp").innerHTML = limitTime;
        if (limitTime <= 0) {
            isGameOver = true;
            document.getElementById("gameOver").style.display = "block";
            return;
        }
        ctx.clearRect(0, 0, 1200, 800);
        let a = Math.floor(Math.random() * 9); // return value random from: 0-9
        drawCircles();
        circles[currentBallIndex].selectedBall = false;
        currentBallIndex = a;   //point to next circle
        circles[a].appear();
        setTimeout(drawGame, timeout);
    } else {
        alert("Game over! Your score: " + score);
    }
}

function Circle(x, y, radius, color, id) {  //class Circle
    this.id = id;
    this.x = x;
    this.y = y;
    this.selectedBall = false;
    this.radius = radius;
    this.color = color;
    this.image = "mole.png";
    this.image2 = "hole.png";
    this.draw = function () {   //method ve
        ctx.beginPath();
        let img = new Image();
        img.src = this.image2;
        ctx.drawImage(img, (this.x - 33), (this.y - 33), 66, 66); //ve hinh anh
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    };
    this.appear = function () {  //method appear
        let size = RADIUS_CIRCLE * 2;
        let img = new Image();
        img.src = this.image;
        ctx.drawImage(img, (this.x - size / 2), (this.y - size / 2), size, size); //ve hinh anh
        this.selectedBall = true;
    };
}

function initCircles() {
    let circle;
    for (let i = 0; i < pos.length; i++) {
        let color = "#10490a";
        circle = new Circle(pos[i][0] * 4, pos[i][1] * 3, RADIUS_CIRCLE, color, i);
        circles.push(circle);
    }
}

function drawCircles() {
    for (let circle of circles) {
        circle.draw();
    }
}

function calculateScore(event) {    //ham tinh diem
    let selectedCircle;
    for (let circle of circles) {
        if (circle.selectedBall) {
            selectedCircle = circle;
            break;
        }
    }
    if (!selectedCircle) {
        alert("can't select the ball!!");
    }
    let rect = canvas.getBoundingClientRect();  // khoang cach tu canvas den mep cua so cua browser
    let clickX = event.x - rect.left;
    let clickY = event.y - rect.top;
    let distance = Math.pow((selectedCircle.x - clickX), 2) + Math.pow((selectedCircle.y - clickY), 2);
    if (distance <= Math.pow(selectedCircle.radius, 2)) {
        score++;
        document.querySelector("#currentScore>span").innerHTML = score;
    } else {
        console.log("miss score! pos click:" + clickX + ":" + clickY + "; distance:" + distance + "; radius cmp:" + Math.pow(selectedCircle.radius, 2) + " c_ID:" + selectedCircle.id);
    }
}


