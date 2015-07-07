var word31 = '',
    word32 = '',
    word41 = '',
    word42 = '',
    word50 = ''

var timerDown;

//Calculates score based on scrabble tile values times 10
var scoreCalc = function(word) {
  var tempArray = [];
  var temp = 0;
  var bonus = 1;
  for (var i = 0; i < word.length; i++) {
    temp += letterScores[word[i]]
  }
  temp *= 10;
  tempArray.push(temp);
  tempArray.push(temp);
  if (word.length > 4) {
    for (var i = 4; i < word.length; i++) {
      bonus += .15;
    }
    tempArray.push(bonus)
    tempArray[0] = Math.round(tempArray[0] * tempArray[2]);
  }
  console.log(tempArray);
  return tempArray;
}

//Creates link to buy phase
var nextLevel = function(gameState){
  var request = new XMLHttpRequest;
  request.open('POST','/update','true');
  request.addEventListener('load', function () {
    next.innerHTML = "";
    var a = document.createElement('a');
    a.href = '/start';
    a.innerHTML = 'Continue to Buy Phase';
    next.appendChild(a);
    console.log(request.response)
  })
  console.log(score.innerHTML)
  gameState.scrap = parseInt(score.innerHTML);
  gameState.totalScrap += parseInt(score.innerHTML);
  gameState.phase = 2;
  request.setRequestHeader('Content-type','application/json');
  request.send(JSON.stringify(gameState));
}

//Grabs a clicked letter and moves into to the word div
var selectLetter = function(e) {
  word.innerHTML += e.target.innerHTML;
  e.target.innerHTML = "";
  e.target.style.backgroundImage = 'none';
}

//populates the letters and toggles active for game start
var generate = function(){
  active = !active;
  clearBoard();
  for (var i = 0; i < letterGen; i++) {
    var letter = document.createElement('div');
    letter.className = "letter"
    letter.innerHTML = randomWeightedLetter().toUpperCase();
    letters.appendChild(letter);
  }
}

//checks the word div against the dictionary and makes dom manipulations
var checkWord = function(){
  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i] === word.innerHTML.toUpperCase()) {
      var wordScore = scoreCalc(word.innerHTML.toLowerCase())
      score.innerHTML = parseInt(score.innerHTML) + wordScore[0];
      if (wordScore[2]) {
        bonus.innerHTML = Math.round((wordScore[2]-1)*100) + "%"
        setTimeout(function () {
          bonus.innerHTML = "";
        },4000)
      }
      clearWord();
      msg.innerHTML = "";
      var found = true;
      break;
    }
  }
  if (!found) {
    msg.innerHTML = "Word not found";
    clearWord();
    setTimeout(function () {
      msg.innerHTML = "";
    }, 3000)
  }
}

//clears the word box;
var clearWord = function(){
  word.innerHTML = "";
}

//returns true if a word is found in dictionary
var wordCheck = function(word){
  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i] === word.toUpperCase()) {
      return true;
      break;
    }
  }
  return false;
}

//Creates a timer based upon a passed in time function
var createTimer = function(time, gameState){
  timerDown = setInterval(function () {
    timer.innerHTML = time;
    time--
    if (time < 0) {
      console.log('time out!')
      clearInterval(timerDown);
      active = !active;
      clearBoard();
      nextLevel(gameState);
    }
  }, 1000)
}

//Clears letters and word
var clearBoard = function() {
  letters.innerHTML = "";
  word.innerHTML = "";
  msg.innerHTML = "";
}

//generates a random letter based on scrabble distribution
var randomWeightedLetter = function(l) {
  var temp = ''
  var i = 0
  if (l === 'v') {
    while (
      temp != 'a' && 
      temp != 'e' &&
      temp != 'i' &&
      temp != 'o' &&
      temp != 'u' &&
      temp != 'y') {
      temp = alph[Math.floor(Math.random() * alph.length)]
    }
    return temp
  } else if (l === 'c') {
    temp = alph[Math.floor(Math.random() * alph.length)]
    while (
      temp === 'a' || 
      temp === 'e' ||
      temp === 'i' ||
      temp === 'o' ||
      temp === 'u'
      ) {
      temp = alph[Math.floor(Math.random() * alph.length)]
    }
    return temp
  } else {
    return alph[Math.floor(Math.random() * alph.length)]
  }
}

//rerolls the value of all unlocked tiles
var tileRoll = function() {
  for (var i = 0; i < tiles.length; i++) {
    if(!tiles[i].id[5]){
      tiles[i].innerHTML = randomWeightedLetter();
    }
  }
  for (var i = 0; i < tilesc.length; i++) {
    if(!tilesc[i].id[5]){
      tilesc[i].innerHTML = randomWeightedLetter('c');
    }
  }
  for (var i = 0; i < tilesv.length; i++) {
    if(!tilesv[i].id[5]){
      tilesv[i].innerHTML = randomWeightedLetter('v');
    }
  }
}

//locks tiles and checks for wordlocks
var toggleTile = function (e) {
  var tileDiv = sortTile(e.id);
  if (!e.id[5]){
    e.id += '.locked'
    e.style.borderColor = '#3BD2FF';
  }
  else {
    e.id = e.id.substring(0,5);
    if (e.className === 'tilesc') {
      e.style.borderColor = 'brown';
    } else if (e.className === 'tilesv') {
      e.style.borderColor = 'blue'
    } else {
      e.style.borderColor = 'black'
    }
  }
  if (checkLock(tileDiv)) {
    activate(tileDiv)
  }
}

var checkLock = function (tileDiv) {
  //3.1
  if (tileDiv === '31') {
    if (fire[0].children[0].id[5] && fire[0].children[1].id[5] && fire[0].children[2].id[5]) {
    // if (tiles[0].id[5] && tiles[1].id[5] && tiles[2].id[5]) {
      word31 = '';
      for (var i = 0; i < 3; i++) {
        word31 += fire[0].children[i].innerHTML
      }
      console.log(word31)
      return true;
    }
  }
  //3.2
  else if (tileDiv === '32') {
    if (fire[4].children[0].id[5] && fire[4].children[1].id[5] && fire[4].children[2].id[5]) {
      word32 = '';
      for (var i = 0; i < 3; i++) {
        word32 += fire[4].children[i].innerHTML
      }
      console.log(word32)
      return true;
    }
  }
  //4.1
  else if (tileDiv === '41') {
    if (fire[1].children[0].id[5] && fire[1].children[1].id[5] && 
      fire[1].children[2].id[5] && fire[1].children[3].id[5]) {
      word41 = '';
      for (var i = 0; i < 4; i++) {
        word41 += fire[1].children[i].innerHTML
      }
      console.log(word41);
      return true;
    }
  }
  //4.2
  else if (tileDiv === '42') {
    if (fire[3].children[0].id[5] && fire[3].children[1].id[5] && 
      fire[3].children[2].id[5] && fire[3].children[3].id[5]) {
      word42 = '';
      for (var i = 0; i < 4; i++) {
        word42 += fire[3].children[i].innerHTML
      }
      console.log(word42);
      return true;
    }
  }
  //5.0
  else if (tileDiv === '50') {
    if (fire[2].children[0].id[5] && fire[2].children[1].id[5] && 
      fire[2].children[2].id[5] && fire[2].children[3].id[5] && fire[2].children[4].id[5]) {
      word50 = '';
      for (var i = 0; i < 5; i++) {
        word50 += fire[2].children[i].innerHTML
      }
      console.log(word50);
      return true;
    }
  }
}

var sortTile = function(id) {
  //3.1
  if (id[1] === '3' && id[2] === '1') {
    return '31'
  }
  //3.2
  else if (id[1] === '3' && id[2] === '2') {
    return '32'
  }
  //4.1
  else if (id[1] === '4' && id[2] === '1') {
    return '41'
  }
  //4.2
  else if (id[1] === '4' && id[2] === '2') {
    return '42'
  }
  //5.0
  else if (id[1] === '5') {
    return '50'
  }
}

var activate = function(tileDiv){
  if (tileDiv === '31' && wordCheck(word31)) {
    for (var i = 0; i < fire[0].children.length; i++) {
      fire[0].children[i].style.background = 'purple'
    }
  }
  if (tileDiv === '41' && wordCheck(word41)) {
    for (var i = 0; i < fire[1].children.length; i++) {
      fire[1].children[i].style.background = 'purple'
    }
  }
  if (tileDiv === '50' && wordCheck(word50)) {
    for (var i = 0; i < fire[2].children.length; i++) {
      fire[2].children[i].style.background = 'purple'
    }
  }
  if (tileDiv === '42' && wordCheck(word42)) {
    for (var i = 0; i < fire[3].children.length; i++) {
      fire[3].children[i].style.background = 'purple'
    }
  }
  if (tileDiv === '32' && wordCheck(word32)) {
    for (var i = 0; i < fire[4].children.length; i++) {
      fire[4].children[i].style.background = 'purple'
    }
  }
}

var fireAway = function(tileDiv, gameState){
  console.log('fire away!')
  
  if (tileDiv === '31') {
    bossOneAl.damageCheck(35,105,gameState.fire31[3]);
    for (var i = 0; i < fire[0].children.length; i++) {
      fire[0].children[i].innerHTML = "";
      fire[0].children[i].style.background = '#E6FDF8';
      toggleTile(fire[0].children[i]);
    }
  }
  if (tileDiv === '41') {
    bossOneAl.damageCheck(175,140,gameState.fire41[4]);
    for (var i = 0; i < fire[1].children.length; i++) {
      fire[1].children[i].innerHTML = "";
      fire[1].children[i].style.background = '#E6FDF8';
      toggleTile(fire[1].children[i]);
    }
  }
  if (tileDiv === '50') {
    bossOneAl.damageCheck(350,175,gameState.fire50[5]);
    for (var i = 0; i < fire[2].children.length; i++) {
      fire[2].children[i].innerHTML = "";
      fire[2].children[i].style.background = '#E6FDF8';
      toggleTile(fire[2].children[i]);
    }
  }
  if (tileDiv === '42') {
    bossOneAl.damageCheck(560,140,gameState.fire42[4]);
    for (var i = 0; i < fire[3].children.length; i++) {
      fire[3].children[i].innerHTML = "";
      fire[3].children[i].style.background = '#E6FDF8';
      toggleTile(fire[3].children[i]);
    }
  }
  if (tileDiv === '32') {
    bossOneAl.damageCheck(735,105,gameState.fire32[3]);
    for (var i = 0; i < fire[4].children.length; i++) {
      fire[4].children[i].innerHTML = "";
      fire[4].children[i].style.background = '#E6FDF8';
      toggleTile(fire[4].children[i]);
    }
  }
}

//sets timer for l2 and incremetally decreases energy bar, ends game when timer runs out
var energyLoss = function(time){
  var initTime = time;
  var timePercent = .99;
  timerDown = setInterval(function () {
    if (time < initTime*timePercent) {
      timePercent = time/initTime;
      ctx.clearRect(115+720*timePercent,9,72,12);
    }
    time -= .25
    if (time < 0) {
      ctx.clearRect(115,9,720,12);
      clearInterval(timerDown);
      bossOneAl.gameOver();
    }
  }, 250)
}

//Buy tile
var buyTileSet = function(tileDiv, gameState) {
  if (tileDiv === '31' && gameState.scrap >= 500) {
    for (var i = 0; i < fire[0].children.length; i++) {
      fire[0].children[i].className = 'tiles';
      gameState.fire31[i]++;
    }
    gameState.fire31[3]++
    gameState.scrap -= 500;
    return gameState;
  }
  if (tileDiv === '41' && gameState.scrap >= 400) {
    for (var i = 0; i < fire[1].children.length; i++) {
      fire[1].children[i].className = 'tiles';
      gameState.fire41[i]++;
    }
    gameState.fire41[4]++
    gameState.scrap -= 400;
    return gameState;
  }
  if (tileDiv === '50' && gameState.scrap >= 300) {
    for (var i = 0; i < fire[2].children.length; i++) {
      fire[2].children[i].className = 'tiles';
      gameState.fire50[i]++;
    }
    gameState.fire50[5]++
    gameState.scrap -= 300;
    return gameState;
  }
  if (tileDiv === '42' && gameState.scrap >= 400) {
    for (var i = 0; i < fire[3].children.length; i++) {
      fire[3].children[i].className = 'tiles';
      gameState.fire42[i]++;
    }
    gameState.fire42[4]++
    gameState.scrap -= 400;
    return gameState;
  }
  if (tileDiv === '32' && gameState.scrap >= 500) {
    for (var i = 0; i < fire[4].children.length; i++) {
      fire[4].children[i].className = 'tiles';
      gameState.fire32[i]++;
    }
    gameState.fire32[3]++
    gameState.scrap -= 500;
    return gameState;
  }
  return gameState;
}

var decodeGameState = function (gameState) {
  console.log(gameState.fire50, 'dcs')
  if (gameState.fire31[3] === 1) {
    for (var i = 0; i < fire[0].children.length; i++) {
      fire[0].children[i].className = 'tiles'
    }
  }
  if (gameState.fire32[3] === 1) {
    for (var i = 0; i < fire[4].children.length; i++) {
      fire[4].children[i].className = 'tiles'
    }
  }
  if (gameState.fire41[4] === 1) {
    for (var i = 0; i < fire[1].children.length; i++) {
      fire[1].children[i].className = 'tiles'
    }
  }
  if (gameState.fire42[4] === 1) {
    for (var i = 0; i < fire[3].children.length; i++) {
      fire[3].children[i].className = 'tiles'
    }
  }
  if (gameState.fire50[5] === 1) {
    for (var i = 0; i < fire[2].children.length; i++) {
      fire[2].children[i].className = 'tiles'
    }
  }
  upgrades[0].innerHTML = gameState.fire31[3];
  upgrades[1].innerHTML = gameState.fire41[4];
  upgrades[2].innerHTML = gameState.fire50[5];
  upgrades[3].innerHTML = gameState.fire42[4];
  upgrades[4].innerHTML = gameState.fire32[3];
  for (var i = 0; i < gameState.fire31.length - 1; i++) {
    if (gameState.fire31[i] === 3) {
      fire[0].children[i].className = 'tilesv';
    }
  }
  for (var i = 0; i < gameState.fire32.length - 1; i++) {
    if (gameState.fire32[i] === 3) {
      fire[4].children[i].className = 'tilesv';
    }
  }
  for (var i = 0; i < gameState.fire41.length - 1; i++) {
    if (gameState.fire41[i] === 3) {
      fire[1].children[i].className = 'tilesv';
    }
  }
  for (var i = 0; i < gameState.fire31.length - 1; i++) {
    if (gameState.fire42[i] === 3) {
      fire[3].children[i].className = 'tilesv';
    }
  }
  for (var i = 0; i < gameState.fire31.length - 1; i++) {
    if (gameState.fire50[i] === 3) {
      fire[2].children[i].className = 'tilesv';
    }
  }
  for (var i = 0; i < gameState.fire31.length - 1; i++) {
    if (gameState.fire31[i] === 2) {
      fire[0].children[i].className = 'tilesc';
    }
  }
  for (var i = 0; i < gameState.fire32.length - 1; i++) {
    if (gameState.fire32[i] === 2) {
      fire[4].children[i].className = 'tilesc';
    }
  }
  for (var i = 0; i < gameState.fire41.length - 1; i++) {
    if (gameState.fire41[i] === 2) {
      fire[1].children[i].className = 'tilesc';
    }
  }
  for (var i = 0; i < gameState.fire31.length - 1; i++) {
    if (gameState.fire42[i] === 2) {
      fire[3].children[i].className = 'tilesc';
    }
  }
  for (var i = 0; i < gameState.fire31.length - 1; i++) {
    if (gameState.fire50[i] === 2) {
      fire[2].children[i].className = 'tilesc';
    }
  }
}

var levelUp = function () {
  next.style.display = 'block';
}

var upgradeTileSet = function(tileDiv, gameState) {
  if (tileDiv === '31' && gameState.scrap >= 500) {
    fire[0].id += '1';
    gameState.fire31[3]++;
    gameState.scrap -= 500;
    return gameState;
  }
  if (tileDiv === '41' && gameState.scrap >= 400) {
    fire[1].id += '1';
    gameState.fire41[4]++;
    gameState.scrap -= 400;
    return gameState;
  }
  if (tileDiv === '50' && gameState.scrap >= 300) {
    fire[2].id += '1';
    gameState.fire50[5]++;
    gameState.scrap -= 300;
    return gameState;
  }
  if (tileDiv === '42' && gameState.scrap >= 400) {
    fire[3].id += '1';
    gameState.fire42[4]++;
    gameState.scrap -= 400;
    return gameState;
  }
  if (tileDiv === '32' && gameState.scrap >= 500) {
    fire[3].id += '1';
    gameState.fire32[3]++;
    gameState.scrap -= 500;
    return gameState;
  }
  return gameState;
}

var revealGameOver = function () {
  gameover.style.display = 'block';
}

var emptyGame = function () {
  var gameState = {}
  gameState.fire31 = [0,0,0,0]
  gameState.fire32 = [0,0,0,0]
  gameState.fire41 = [0,0,0,0,0]
  gameState.fire42 = [0,0,0,0,0]
  gameState.fire50 = [0,0,0,0,0,0]
  gameState.scrap = 0;
  gameState.totalScrap = 0;
  gameState.level = 1;
  gameState.phase = 1;
  gameState.timeBonus = 0;
  gameState.energyBonus = 0;
  return gameState
}

var upgradeOneTile = function (e, tileDiv, gameState) {
  var temp = parseInt(e.target.id[4]) + 1;
  e.target.id = e.target.id.substring(0,4);
  e.target.id += temp;
  if (tileDiv === '31' && gameState.scrap >= 300) {
    gameState.fire31[e.target.id[3]-1]++
    gameState.scrap -= 300;
    return gameState;
  }
  if (tileDiv === '41' && gameState.scrap >= 300) {
    gameState.fire41[e.target.id[3]-1]++;
    gameState.scrap -= 300;
    return gameState;
  }
  if (tileDiv === '50' && gameState.scrap >= 300) {
    gameState.fire50[e.target.id[3]-1]++;
    gameState.scrap -= 300;
    return gameState;
  }
  if (tileDiv === '42' && gameState.scrap >= 300) {
    gameState.fire42[e.target.id[3]-1]++;
    gameState.scrap -= 300;
    return gameState;
  }
  if (tileDiv === '32' && gameState.scrap >= 300) {
    gameState.fire32[e.target.id[3]-1]++;
    gameState.scrap -= 300;
    return gameState;
  }
  return gameState;
}