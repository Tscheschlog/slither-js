var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

let x = [70,60],y = [50,50],vx = 10,vy = 10;
var snakeLength = 2;
var score = 0;
var lastDirection = 3;

let lastPosition = [0, 0];

document.getElementById("score-text").innerHTML = "Score: " + score;


function updateRectPosition(xPos,yPos) {
	var rectangle = new Path2D();
	var glow = new Path2D();
	rectangle.rect(xPos, yPos, 10, 10);
	glow.rect(xPos-1.5, yPos-1.5, 13, 13);

	ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
	ctx.fill(glow);
	ctx.fillStyle = "white";
	ctx.fill(rectangle);
	
}

function updateSnakeTrail(x_list, y_list){
	
	for(let i =1; i < snakeLength;i++){
		
		let temp_x = x_list[i];
		let temp_y = y_list[i];
		
		x_list[i] = lastPosition[0];
		y_list[i] = lastPosition[1];
		
		lastPosition[0] = temp_x;
		lastPosition[1] = temp_y;
		
		
	}
	for(let i = 0; i < snakeLength;i++){

		updateRectPosition(x_list[i], y_list[i]);
		
	}
}


let apple = [150, 50];


function updateApplePosition(xPos,yPos) {
	var rectangle = new Path2D();
	var glow = new Path2D();
	rectangle.rect(xPos, yPos, 10, 10);
	glow.rect(xPos-1.5, yPos-1.5, 13, 13);

	ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
	ctx.fill(glow);
	ctx.fillStyle = "rgba(255, 0, 0, 1)";
	ctx.fill(rectangle);
}

function spawnNewApple(headX, headY) {
	
	if(headX == apple[0] && headY == apple[1]){
		
		score++;
		document.getElementById("score-text").innerHTML = "Score: " + score;
		
		
		let newX = (Math.floor(Math.random() * 28) + 1)*10;
		let newY = (Math.floor(Math.random() * 13) + 1)*10;

		snakeLength++;
		x.push(0);
		y.push(0);
		apple[0] = newX;
		apple[1] = newY;

	}
	//console.log(headX,headY,apple[0],apple[1]);
	updateApplePosition(apple[0],apple[1]);
}

let wallHit = false;
let bodyHit = false

function checkBodyHit() {
	
	headX = x[0];
	headY = y[0];
	
	for(var i = 1;i < snakeLength;i++){
		
		if(headX == x[i] && headY == y[i]) bodyHit = true;
	}
}


var gameLoop = setInterval(function(){ 
    //this code runs every second 
	
	lastPosition[0] = x[0];
	lastPosition[1] = y[0];


	switch(lastDirection){
	
		case 1:
			//left
			x[0] -= vx;
			if(x[0] < 0){
				x[0] = 0;
				wallHit = true;
			}
			break;
		case 2:
			//up
			y[0] -= vy;
			if(y[0] < 0){
				y[0] = 0;
				wallHit = true;
			}
			break;
		case 3:
			//right
			x[0] += vx;
			if(x[0] > 290){
				x[0] = 290;
				wallHit = true;
			}
			break;
		case 4:
			//down
			y[0] += vy;
			if(y[0] > 140){
				y[0] = 140;
				wallHit = true;
			}
			break;
	}
	checkBodyHit();
	if(wallHit || bodyHit){
		document.getElementById("game-over-text").style.display = "inline";
		document.getElementById("restart-text").style.display = "inline";
		clearInterval();
	}else{
		ctx.clearRect(0, 0, 300, 150);
		spawnNewApple(x[0], y[0]);
		updateSnakeTrail(x, y);
	}
}, 70);


document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
            //console.log('left');
			if(lastDirection == 3)break;
			lastDirection = 1;
            break;
        case 38:
           //console.log('up');
		   	if(lastDirection == 4)break;
		   lastDirection = 2;
            break;
        case 39:
            //console.log('right');
			if(lastDirection == 1)break;
			lastDirection = 3;
            break;
        case 40:
            //console.log('down');
			if(lastDirection == 2)break;
			lastDirection = 4;
            break;
		case 32:
			//console.log("space bar");
			window.location.reload();
			break;
    }
	updateRectPosition();
});
