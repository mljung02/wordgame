var letterGen = 100;
var wordbox = document.getElementById('wordbox');
var word = document.getElementById('word');
var spin = document.getElementById('spin');
var enter = document.getElementById('enter');
var score = document.getElementById('score');
var msg = document.getElementById('msg');



spin.addEventListener("click", function(){
  wordbox.innerHTML = "";
  word.innerHTML = "";
  msg.innerHTML = "";
  for (var i = 0; i < letterGen; i++) {
    var letter = document.createElement('div');
    letter.className = "letter"
    letter.innerHTML = alph[Math.floor(Math.random() * alph.length)]
    wordbox.appendChild(letter);
  }
})

var select = function(e) {
  if (e.target.className === 'letter') {
    word.innerHTML += e.target.innerHTML;
    e.target.innerHTML = "";
  }
}

wordbox.addEventListener('click', select)

enter.addEventListener('click', function(){
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
})

