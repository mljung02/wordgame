var scoreCalc = function(word) {
  var temp = 0;
  for (var i = 0; i < word.length; i++) {
    temp += letterScores[word[i]]
  }
  return temp * 10;
}

function createCountDown(timeRemaining) {
    var startTime = Date.now();
    return function() {
       return timeRemaining - ( Date.now() - startTime );
    }
}