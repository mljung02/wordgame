var canvas = document.getElementById('canvas');
var bcanvas = document.getElementById('bcanvas');
var context = canvas.getContext('2d');
var ctx = bcanvas.getContext('2d');
var tileSpace = document.getElementById('under');
var fire = document.getElementsByClassName('fire');
var score = document.getElementsByClassName('score')[0];
var next = document.getElementById('next');
var upgrades = document.getElementsByClassName('up');

bcanvas.width = 875;
canvas.width = 875;
bcanvas.height = 300;
canvas.height = 300;

//prices


var xhr = new XMLHttpRequest;
xhr.open('get', '/update', 'true');
xhr.addEventListener('load', function () {
  var gameState = JSON.parse(xhr.response).gameState
  var scrap = gameState.scrap;
  score.innerHTML = gameState.scrap;
  decodeGameState(gameState);
  console.log(gameState);
  ctx.fillStyle = "black";
  ctx.font = "bold 18px Arial";
  
  ctx.fillText('Welcome to the workshop.', 300, 50)
  ctx.fillText('Here you can spend scrap to create and upgrade your Language Injection Units.', 100,80)
  ctx.fillText('Click on any of the numbers on bottom to unlock or upgrade a tile-set.', 100,110)
  ctx.fillText('Upgraded tile-sets will be more effective, and each upgrade will cost a bit more', 100, 140)
  ctx.fillText('Click on any unlocked individual tile upgrade it for 300 scrap.', 100,170)
  ctx.fillText('One upgrade will make the tile only generate consonants.', 100, 200) 
  ctx.fillText('A second upgrade will generate only vowels.', 100,230)
  ctx.font = "bold 24px Arial";
  //3.1
  ctx.fillText(costCalc(500, 31, gameState), 65, 295);

  //4.1
  ctx.fillText(costCalc(400, 41, gameState), 225, 295);

  //5.0
  ctx.fillText(costCalc(300, 50, gameState), 415, 295);

  //4.2
  ctx.fillText(costCalc(400, 42, gameState), 610, 295)

  //3.2
  ctx.fillText(costCalc(500, 32, gameState), 765, 295);
  tileSpace.addEventListener('click', function (e) {
    if (e.target.className === 'up') {
      if (e.target.innerHTML > 0){
        gameState = upgradeTileSet(sortTile(e.target.id), gameState);
        score.innerHTML = gameState.scrap;
      } else {
        gameState = buyTileSet(sortTile(e.target.id), gameState);
        score.innerHTML = gameState.scrap;
      }
    }
  	if (e.target.className === 'tiles' || 
      e.target.className === 'tilesc'){
      console.log(e.target)
      upgradeOneTile(e, sortTile(e.target.id), gameState)
      score.innerHTML = gameState.scrap;
  	}
    decodeGameState(gameState);
    redrawCost(gameState);
  })
  next.addEventListener('click', function () {
    var xhr2 = new XMLHttpRequest;
    xhr2.open('post', '/update', 'true')
    xhr2.addEventListener('load', function () {
      console.log(xhr2.response);
      location.href = "/start"
    })
    xhr2.setRequestHeader('Content-type','application/json');
    gameState.phase = 3;
    xhr2.send(JSON.stringify(gameState));
  })
})
xhr.send();

