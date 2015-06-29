
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

//checks the word div against the dictionary
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

var randomWeightedLetter = function() {
  return alph[Math.floor(Math.random() * alph.length)]
}

var tileRoll = function() {
  for (var i = 0; i < tiles.length; i++) {
    if(!tiles[i].id[5]){
      tiles[i].innerHTML = randomWeightedLetter();
    }
  }
}

var toggleTile = function (e) {
  if (!e.target.id[5]){
    e.target.id += '.locked'
  }
  else {
    e.target.id = e.target.id.substring(0,5)
  }
}