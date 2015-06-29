
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = 875;
canvas.height = 300;

// var batImage = new Image();
// batImage.src = '/images/vampires.png'
var bossOne = new Image();
bossOne.src = '/images/levelone.png'

//Robot Constructor
var Robot = function Robot(options) {
	
	var frameIndex;
	
	//inherent properties
	this.frameIndex = 0,
	this.tickCount = 0,
	this.ticksPerFrame = options.ticksPerFrame || 0,
	this.numberOfFrames = options.numberOfFrames || 1,
	this.xpos = options.xpos || 25,
	this.ypos = options.ypos || 200,
	this.direction = 1;
	this.dirIndex = 0;
	
	//Passed attributes
	this.health = options.health;
	this.fireRate = options.fireRate;
	this.sheetX = options.sheetX;
	this.sheetY = options.sheetY;
	this.context = options.context;
	this.width = options.width;
	this.height = options.height;
	this.image = options.image;

}

Robot.prototype.render = function render(){

	//img,sx,sy,sw,sh,dx,dy,dw,dh
	this.context.drawImage(
		this.image,
		this.sheetX[this.dirIndex][this.frameIndex],
		this.sheetY[this.dirIndex][this.frameIndex],
		this.width[this.dirIndex][this.frameIndex],
		this.height[this.dirIndex][this.frameIndex],
		this.xpos,
		this.ypos,
		this.width[this.dirIndex][this.frameIndex] *.5,
		this.height[this.dirIndex][this.frameIndex] *.5
		);
		
}

//Update frames
Robot.prototype.update = function update(){
	
	//erase previous
	this.context.clearRect(	this.xpos,
													this.ypos,
													this.width[this.dirIndex][this.frameIndex],
													this.height[this.dirIndex][this.frameIndex])
	
	//updates pertinent positions
	this.tickCount += 1;

	if (this.tickCount > this.ticksPerFrame) {

		this.tickCount = 0;

			// If the current frame index is in range
			if (this.frameIndex < this.numberOfFrames - 1) {	
					// Go to the next frame
					this.frameIndex += 1;
			} else {
					this.frameIndex = 0;
			}
	}
	if (this.xpos > 800 || this.xpos < 25) {
		this.dirIndex += this.direction;
		this.direction *= -1;
	}
	this.xpos += 1 * this.direction;		
}


//TEST BATOBJ
// var batObj = {
//   context: canvas.getContext("2d"),
//   width: [62, 75, 81, 74, 69, 52, 50, 51, 49, 52, 74],
//   height: [91, 91, 100, 91, 78, 68, 74, 69, 76, 78, 92],
//   image: batImage,
//   numberOfFrames: 11,
//   ticksPerFrame: 10,
//   sheetX: [17, 109, 196, 310, 414, 515, 596, 669, 744, 811, 881],
//   sheetY: [154, 153, 143, 138, 148, 166, 164, 157, 149, 148, 136]
// }

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

bossOne.addEventListener("load", gameLoop);
