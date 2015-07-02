var letterGen = 100;
var letters = document.getElementById('letters');
var word = document.getElementById('word');
var spin = document.getElementById('spin');
var enter = document.getElementById('enter');
var score = document.getElementById('score');
var msg = document.getElementById('msg');
var timer = document.getElementById('timer');
var next = document.getElementById('next');
var active = false;
var time = 5;

//Mega event listener
document.body.addEventListener('click', function(e){
  
  //Event listener for start button, toggles active to true.
  if (!active && e.target.id === 'spin'){
    generate();
    createTimer(time);
  }
  
  //After game start
  if (active){
    
    //checking against dictionary
    if(e.target.id === 'enter'){
      checkWord();
    }
    
    //moves letter from letters to word
    if(e.target.className === 'letter'){
      selectLetter(e);
    }
    
    if (e.target.id === 'clear') {
      clearWord();
    }
    
  }
})
