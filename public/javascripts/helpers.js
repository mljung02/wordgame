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