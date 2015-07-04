var canvas = document.getElementById('canvas');
var bcanvas = document.getElementById('bcanvas');
var context = canvas.getContext('2d');
var ctx = bcanvas.getContext('2d');
var tileSpace = document.getElementById('under');
var fire = document.getElementsByClassName('fire');
var score = document.getElementsByClassName('score')[0];
var next = document.getElementById('next');

bcanvas.width = 875;
canvas.width = 875;
bcanvas.height = 300;
canvas.height = 300;

//prices
//3.1

ctx.fillStyle = "black";
ctx.font = "bold 24px Arial";
ctx.fillText("600", 65, 295);

//4.1
ctx.fillText("500", 225, 295);

//5.0
ctx.fillText("400", 415, 295);

//4.2
ctx.fillText("500", 610, 295)

//3.2
ctx.fillText("600", 765, 295);

var xhr = new XMLHttpRequest;
xhr.open('get', '/update', 'true');
xhr.addEventListener('load', function () {
  var gameState = JSON.parse(xhr.response).gameState
  var scrap = gameState.scrap;
  console.log(gameState);
  tileSpace.addEventListener('click', function (e) {
    console.log(sortTile(e.target.id))
  	if (e.target.className === 'tiles-inactive'){
  		gameState = buyTileSet(sortTile(e.target.id), gameState);
      console.log(gameState, "updated")
      score.innerHTML = gameState.scrap;
  	}
  })
  next.addEventListener('click', function () {
    var xhr2 = new XMLHttpRequest;
    xhr2.open('post', '/update', 'true')
    xhr2.addEventListener('load', function () {
      console.log(xhr2.response);
      location.href = "/level2"
    })
    xhr2.setRequestHeader('Content-type','application/json');
    console.log(gameState);
    xhr2.send(JSON.stringify(gameState));
  })
})
xhr.send();

