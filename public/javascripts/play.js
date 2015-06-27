
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.fillRect(700, 0, 100, 300)

canvas.width = 800;
canvas.height = 300;

var coinImage = new Image();
coinImage.src = "/images/coin-sprite-animation.png";
var batImage = new Image();
batImage.src = '/images/vampires.png'

function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1,
      xpos = 0,
      direction = 1;
		
    
    that.sheetX = options.sheetX;
    that.sheetY = options.sheetY;
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.image = options.image;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
            if (xpos > 700 || xpos < 0) {
              direction *= -1;
            }
          xpos += 1 * direction;
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(-5 + xpos, 200, that.width[frameIndex] + 40, that.height[frameIndex] +40);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    // frameIndex * that.width / numberOfFrames,
        that.sheetX[frameIndex],
        // 0
		    that.sheetY[frameIndex],
		    that.width[frameIndex],
		    that.height[frameIndex],
		    xpos,
		    200,
        that.width[frameIndex],
		    that.height[frameIndex]);
		};
		
		return that;
	}

// var coin = sprite({
//     context: canvas.getContext("2d"),
//     width: 1000,
//     height: 100,
//     image: coinImage,
//     numberOfFrames: 10,
// 		ticksPerFrame: 10,
// });

var batObj = {
  context: canvas.getContext("2d"),
  width: [62, 75, 81, 74, 69, 52, 50, 51, 49, 52, 74],
  height: [91, 91, 100, 91, 78, 68, 74, 69, 76, 78, 92],
  image: batImage,
  numberOfFrames: 11,
  ticksPerFrame: 10,
  sheetX: [17, 109, 196, 310, 414, 515, 596, 669, 744, 811, 881],
  sheetY: [154, 153, 143, 138, 148, 166, 164, 157, 149, 148, 136]
}

var bat = sprite(batObj)


function gameLoop () {

  window.requestAnimationFrame(gameLoop);
  
  bat.update();
  bat.render();
}

function batRender () {
  // context.drawImage(batImage, batObj.sheetX[0], batObj.sheetY[0], batObj.width[0], batObj.height[0], 0, 0, batObj.width[0], batObj.height[0]);
  // context.drawImage(coinImage, 0, 0)
  // context.drawImage(batImage, batObj.sheetX[0], batObj.sheetY[0], batObj.width, 68, 0, 0, 52, 68)
}

batImage.addEventListener("load", gameLoop);
// window.addEventListener('load', function () {
//   coin.render();
// })
