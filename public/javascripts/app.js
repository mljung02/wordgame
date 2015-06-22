var letterGen = 100;
var wordbox = document.getElementById('wordbox');
var word = document.getElementById('word');
var spin = document.getElementById('spin');
var enter = document.getElementById('enter');
// var dictionaryArray = dictionary.split("\n");

spin.addEventListener("click", function(){
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

console.log(dictionary[15000])

// enter.addEventListener('click', function(){
//   for (var i = 0; i < dictionaryArray.length; i++) {
//     if (dictionaryArray[i] === word.innerHTML) {
//       console.log('real word!')
//     }
//     else {
//       console.log('word not found!')
//     }
//   }
// })