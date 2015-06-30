var word31 = '',
    word32 = '',
    word41 = '',
    word42 = '',
    word50 = ''
    
//Calculates score based on scrabble tile values times 10
var scoreCalc = function(word) {
  var temp = 0;
  for (var i = 0; i < word.length; i++) {
    temp += letterScores[word[i]]
  }
  return temp * 10;
}


//Grabs a clicked letter and moves into to the word div
var selectLetter = function(e) {
  word.innerHTML += e.target.innerHTML;
  e.target.innerHTML = "";
}

//populates the letters and toggles active for game start
var generate = function(){
  active = !active;
  clearBoard();
  for (var i = 0; i < letterGen; i++) {
    var letter = document.createElement('div');
    letter.className = "letter"
    letter.innerHTML = randomWeightedLetter();
    letters.appendChild(letter);
  }
}

//checks the word div against the dictionary and makes dom manipulations
var checkWord = function(){
  for (var i = 0; i < dictionary.length; i++) {
    if (dictionary[i] === word.innerHTML.toUpperCase()) {
      score.innerHTML = parseInt(score.innerHTML) + scoreCalc(word.innerHTML.toLowerCase());
      word.innerHTML = "";
      msg.innerHTML = "";
      var found = true;
      break;
    }
  }
  if (!found) {
    msg.innerHTML = "Not a real word!"
  }
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
var createTimer = function(time){
  var timerDown = setInterval(function () {
    timer.innerHTML = time;
    time--
    if (time < 0) {
      clearInterval(timerDown);
      active = !active;
      clearBoard();
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
var randomWeightedLetter = function() {
  return alph[Math.floor(Math.random() * alph.length)]
}

//rerolls the value of all unlocked tiles
var tileRoll = function() {
  for (var i = 0; i < tiles.length; i++) {
    if(!tiles[i].id[5]){
      tiles[i].innerHTML = randomWeightedLetter();
    }
  }
}

//locks tiles and checks for wordlocks
var toggleTile = function (e) {
  var tileDiv = sortTile(e.id);
  if (!e.id[5]){
    e.id += '.locked'
    e.style.borderColor = 'red';
  }
  else {
    e.id = e.id.substring(0,5);
    e.style.borderColor = 'black';
  }
  if (checkLock(tileDiv)) {
    activate(tileDiv)
  }
}

var checkLock = function (tileDiv) {
  //3.1
  if (tileDiv === '31') {
    if (tiles[0].id[5] && tiles[1].id[5] && tiles[2].id[5]) {
      word31 = '';
      for (var i = 0; i < 3; i++) {
        word31 += tiles[i].innerHTML
      }
      console.log(word31)
      return true;
    }
  }
  //3.2
  else if (tileDiv === '32') {
    if (tiles[16].id[5] && tiles[17].id[5] && tiles[18].id[5]) {
      word32 = '';
      for (var i = 16; i < 19; i++) {
        word32 += tiles[i].innerHTML
      }
      console.log(word32)
      return true;
    }
  }
  //4.1
  else if (tileDiv === '41') {
    if (tiles[3].id[5] && tiles[4].id[5] && tiles[5].id[5] && tiles[6].id[5]) {
      word41 = '';
      for (var i = 3; i < 7; i++) {
        word41 += tiles[i].innerHTML
      }
      console.log(word41);
      return true;
    }
  }
  //4.2
  else if (tileDiv === '42') {
    if (tiles[12].id[5] && tiles[13].id[5] && tiles[14].id[5] && tiles[15].id[5]) {
      word42 = '';
      for (var i = 12; i < 16; i++) {
        word42 += tiles[i].innerHTML
      }
      console.log(word42);
      return true;
    }
  }
  //5.0
  else if (tileDiv === '50') {
    if (tiles[7].id[5] && tiles[8].id[5] && tiles[9].id[5] && tiles[10].id[5] && tiles[11].id[5]) {
      word50 = '';
      for (var i = 7; i < 12; i++) {
        word50 += tiles[i].innerHTML
      }
      console.log(word50);
      return true;
    }
  }
}

var sortTile = function(id) {
  //3.1
  if (id[0] === '3' && id[2] === '1') {
    return '31'
  }
  //3.2
  else if (id[0] === '3' && id[2] === '2') {
    return '32'
  }
  //4.1
  else if (id[0] === '4' && id[2] === '1') {
    return '41'
  }
  //4.2
  else if (id[0] === '4' && id[2] === '2') {
    return '42'
  }
  //5.0
  else if (id[0] === '5') {
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

var fireAway = function(tileDiv){
  console.log('fire away!')
  
  if (tileDiv === '31') {
    bossOneAl.damageCheck(35,105);
    for (var i = 0; i < fire[0].children.length; i++) {
      fire[0].children[i].style.background = '#F6F4D2';
      toggleTile(fire[0].children[i]);
    }
  }
  if (tileDiv === '41') {
    bossOneAl.damageCheck(175,140);
    for (var i = 0; i < fire[1].children.length; i++) {
      fire[1].children[i].style.background = '#F6F4D2';
      toggleTile(fire[1].children[i]);
    }
  }
  if (tileDiv === '50') {
    bossOneAl.damageCheck(350,175);
    for (var i = 0; i < fire[2].children.length; i++) {
      fire[2].children[i].style.background = '#F6F4D2';
      toggleTile(fire[2].children[i]);
    }
  }
  if (tileDiv === '42') {
    bossOneAl.damageCheck(560,140);
    for (var i = 0; i < fire[3].children.length; i++) {
      fire[3].children[i].style.background = '#F6F4D2';
      toggleTile(fire[3].children[i]);
    }
  }
  if (tileDiv === '32') {
    bossOneAl.damageCheck(735,105);
    for (var i = 0; i < fire[4].children.length; i++) {
      fire[4].children[i].style.background = '#F6F4D2';
      toggleTile(fire[4].children[i]);
    }
  }
}