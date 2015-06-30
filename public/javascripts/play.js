
var canvas = document.getElementById('canvas');
var bcanvas = document.getElementById('bcanvas');
var context = canvas.getContext('2d');
var ctx = bcanvas.getContext('2d')
var tiles = document.getElementsByClassName('tiles');
var tileSpace = document.getElementById('under');
var fire = document.getElementsByClassName('fire');
var requestId;
var rollTime = 3000;
var gameTime = 120;
var tileInterval = setInterval(tileRoll, rollTime)
var timer = document.getElementById('timer')

bcanvas.width = 875;
canvas.width = 875;
bcanvas.height = 300;
canvas.height = 300;


var bossOne = new Image();
bossOne.src = '/images/levelone.png'
var heart = new Image();
heart.src = '/images/heart.png'
var speech = new Image();
speech.src = '/images/speech-bubble.png'

var bossOneAlObj = {
	context: canvas.getContext("2d"),
	width: [[109,59,80,91],[104,59,80,91]],
	height: [[128,128,128,128],[127,127,127,128]],
	sheetX: [[116,245,359,0],[119,248,362,0]],
	sheetY: [[23,23,23,23],[173,173,173,23]],
	image: bossOne,
	numberOfFrames: 3,
	ticksPerFrame: 8,
	maxHealth: 3,
}

//Health Bars
ctx.fillStyle = "green";
ctx.font = "bold 12px Arial";
ctx.fillText("Energy", 35, 20);
ctx.fillRect(115,9,720,12)
ctx.fillStyle = "red";
ctx.font = "bold 12px Arial";
ctx.fillText("Language Modules", 35, 50);
ctx.strokeStyle= "red";
ctx.rect(175,39,660,12);
ctx.stroke();


// context.fillRect(0, 300, 9)
var bossOneAl =	new Robot(bossOneAlObj)

function gameLoop () {
	
	bossOneAl.update();
	bossOneAl.render();
  requestId = window.requestAnimationFrame(gameLoop, canvas);
	// setTimeout(gameLoop, 100)
}


tileRoll();

document.body.addEventListener('load', tileInterval);
heart.addEventListener('load', energyLoss(gameTime));
bossOne.addEventListener("load", start());
tileSpace.addEventListener('click', function (e) {
	if (e.target.className === 'tiles' && e.target.style.background === 'purple'){
		console.log(sortTile(e.target.id))
		fireAway(sortTile(e.target.id))
	}
	else if (e.target.className === 'tiles' && e.target.style.background != 'purple') {
		toggleTile(e.target);
	}
})
