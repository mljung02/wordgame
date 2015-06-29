
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var tiles = document.getElementsByClassName('tiles');
var tileSpace = document.getElementById('under')

canvas.width = 875;
canvas.height = 300;

var bossOne = new Image();
bossOne.src = '/images/levelone.png'

var bossOneAlObj = {
	context: canvas.getContext("2d"),
	width: [[109,59,80],[104,59,80]],
	height: [[128,128,128],[127,127,127]],
	sheetX: [[116,245,359],[119,248,362]],
	sheetY: [[23,23,23],[173,173,173]],
	image: bossOne,
	numberOfFrames: 3,
	ticksPerFrame: 8,
}

var bossOneAl =	new Robot(bossOneAlObj)

function gameLoop () {

  window.requestAnimationFrame(gameLoop);
	// setTimeout(gameLoop, 100)
  bossOneAl.update();
  bossOneAl.render();
}

tileRoll();
document.body.addEventListener('load', setInterval(tileRoll, 4000));
bossOne.addEventListener("load", gameLoop);
tileSpace.addEventListener('click', function (e) {
	if (e.target.className === 'tiles') {
		toggleTile(e);
	}
})
