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

document.addEventListener("click", calculateScore);

