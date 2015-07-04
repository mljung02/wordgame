module.exports = { 
  validate: function(user, records){
    master={errors: []};
    if(user.email) {
      for (var i = 0; i < records.length; i++) {
        if (user.email.toLowerCase() === records[i].email.toLowerCase()){
          master.errors.push("A user with that email already exists")
        }
      }
    }
    if (user.email === "" || this.allSpaces(user.email)){
      master.errors.push("Email cannot be blank.");
    }
    if (user.pw && user.pw.length < 5) {
      master.errors.push('Password must be at least 5 characters')
    }
    return master
  },

  allSpaces: function(string){
    if (string === "" || string === undefined) { return false }
    if (string) {
      for (var i = 0; i < string.length; i++) {
        if (string[i] !== " ") {
          return false;
        }
      }
    }
    return true;
  },

  emptyGame: function () {
    var gameState = {}
    gameState.fire31 = [0,0,0,1]
    gameState.fire32 = [0,0,0,1]
    gameState.fire41 = [0,0,0,0,1]
    gameState.fire42 = [0,0,0,0,1]
    gameState.fire50 = [0,0,0,0,0,1]
    gameState.scrap = 0;
    gameState.level = 1;
    gameState.phase = 1;
    return gameState
  }
}