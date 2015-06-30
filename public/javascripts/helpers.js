
//Game start and stop.
var start = function() {
    if (!requestId) {
       gameLoop();
    }
}

var stop = function() {
    if (requestId) {
       window.cancelAnimationFrame(requestId);
       requestId = undefined;
    }
}

//draws a speech bubble
var speechFloat = function(xpos,ypos){
	context.drawImage(speech, xpos - 20, ypos, 105, 100)
}


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
	this.health = this.maxHealth = options.maxHealth;
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

Robot.prototype.damageCheck = function damageCheck(xFire,widthFire){
	if (	(this.xpos >= xFire && this.xpos <= xFire + widthFire) || 
				(this.xpos + this.width > xFire && this.xpos + this.width < xFire + widthFire)) {
		this.context.fillStyle = 'red'
		this.context.fillRect(175+(220*(this.maxHealth - this.health)),39,220,12)
		this.health--
		console.log(this.health, " health remaining");
		// this.context.fillStyle = 'purple';
		// this.context.fillRect(xFire, 200, widthFire, 200);
		
		this.context.strokeStyle = 'purple'
		this.context.lineWidth = 5
		this.context.beginPath();
		this.context.moveTo(xFire, 300);
		this.context.lineTo(xFire, 220);
		this.context.lineTo(xFire+widthFire,220);
		this.context.stroke();
		
		if (this.health <= 0) {
			this.defeat();
		}
	}
	else (
		console.log('Miss!')
	)
}

Robot.prototype.defeat = function defeat(){
	stop();
	this.stand();
	speechFloat(this.xpos, 90);
	this.context.fillStyle = "black";
	this.context.font = "bold 12px Arial";
	this.context.fillText("Will you be", this.xpos-5, 115);
	this.context.fillText("my friend?", this.xpos-5, 135);
	clearInterval(tileInterval);
}

Robot.prototype.stand = function stand(){
	console.log('stand');
	this.update();	
	//img,sx,sy,sw,sh,dx,dy,dw,dh
	this.context.drawImage(
		this.image,
		this.sheetX[this.dirIndex][3],
		this.sheetY[this.dirIndex][3],
		this.width[this.dirIndex][3],
		this.height[this.dirIndex][3],
		this.xpos,
		this.ypos,
		this.width[this.dirIndex][3] *.5,
		this.height[this.dirIndex][3] *.5
		);
		
}
