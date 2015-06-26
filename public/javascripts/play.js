
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// context.fillRect(700, 0, 100, 300)

canvas.width = 800;
canvas.height = 300;

var coinImage = new Image();
coinImage.src = "/images/coin-sprite-animation.png";


function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
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
        };
		
		that.render = function () {
		
		  // Clear the canvas
		  that.context.clearRect(0, 0, that.width, that.height);
		  
		  // Draw the animation
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    0,
		    0,
		    that.width / numberOfFrames,
		    that.height);
		};
		
		return that;
	}

var coin = sprite({
    context: canvas.getContext("2d"),
    width: 1000,
    height: 100,
    image: coinImage,
    numberOfFrames: 10,
		ticksPerFrame: 4,
});

function gameLoop () {

  window.requestAnimationFrame(gameLoop);
  
  coin.update();
  coin.render();
}

coinImage.addEventListener("load", gameLoop)

// window.addEventListener('load', function () {
//   coin.render();
// })
