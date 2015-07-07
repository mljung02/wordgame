
var canvas = document.getElementById('canvas');
var bcanvas = document.getElementById('bcanvas');
var context = canvas.getContext('2d');
var ctx = bcanvas.getContext('2d')
var tiles = document.getElementsByClassName('tiles');
var tilesc = document.getElementsByClassName('tilesc');
var tilesv = document.getElementsByClassName('tilesv');
var tileSpace = document.getElementById('under');
var fire = document.getElementsByClassName('fire');
var tileInterval,
		requestId;
var rollTime = 2500;
var timer = document.getElementById('timer');
var next = document.getElementById('next');
var gameover = document.getElementById('gameover');
var upgrades = document.getElementsByClassName('up');
var gg = false;

bcanvas.width = 875;
canvas.width = 875;
bcanvas.height = 300;
canvas.height = 300;

var xhrreq = new XMLHttpRequest;
xhrreq.open('get', '/update', false)
xhrreq.send(null);
var gameState = JSON.parse(xhrreq.response).gameState

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
	maxHealth: 1 + (Math.pow(2, gameState.level)),
	speed: 1 + ((gameState.level - 1)/4)
}


var gameTime = 120 - ((gameState.level -1)*5);

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

//Boss Initialization
var bossOneAl =	new Robot(bossOneAlObj)

//game
function gameLoop () {
	
	bossOneAl.update();
	bossOneAl.render();
	requestId = window.requestAnimationFrame(gameLoop, canvas);
	// setTimeout(gameLoop, 100)
}



var xhr = new XMLHttpRequest;
xhr.open('get', '/update', 'true')
xhr.addEventListener('load', function () {
	var gameState = JSON.parse(xhr.response).gameState
	decodeGameState(gameState)
	setTimeout(function () {
		tileInterval = setInterval(tileRoll, rollTime);
	},2500)
	setTimeout(function () {
		// document.body.addEventListener('load', tileInterval);
		heart.addEventListener('load', energyLoss(gameTime));
		bossOne.addEventListener("load", start());
		tileSpace.addEventListener('click', function (e) {
			if (
				(e.target.className === 'tiles' ||
				e.target.className === 'tilesc' ||
				e.target.className === 'tilesv') && e.target.style.background === 'purple'){
				fireAway(sortTile(e.target.id), gameState)
			}
			else if (
				(e.target.className === 'tiles' ||
				e.target.className === 'tilesc' ||
				e.target.className === 'tilesv') && e.target.style.background != 'purple') {
				toggleTile(e.target);
			}
		})
	}, 5000)
	next.addEventListener('click', function () {
		location.href = "/start"
	})
	gameover.addEventListener('click', function () {
		location.href= "/"
	})
})
xhr.send()

