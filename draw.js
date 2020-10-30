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

drawGame();