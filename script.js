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

function mouseUp() {
    document.getElementById("myCanvas").style = "cursor: url(hammer.jpg),auto";
}

function mouseDown() {
    document.getElementById("myCanvas").style = "cursor: url(hammer2.jpg),auto";
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
    this.appear = function () {  //method xuat hien ho
        let size = RADIUS_CIRCLE * 2;
        let img = new Image();
        img.src = this.image;
        ctx.drawImage(img, (this.x - size / 2), (this.y - size / 2), size, size); //ve hinh anh cac ho
        this.selectedBall = true;
    };
}

function initCircles() {
    let circle;
    for (let i = 0; i < pos.length; i++) {
        let color = "white";
        circle = new Circle(pos[i][0] * 4, pos[i][1] * 3, RADIUS_CIRCLE, color, i);
        circles.push(circle);
    }
}

function drawCircles() {
    for (let circle of circles) {
        circle.draw();
    }
}

initCircles();


