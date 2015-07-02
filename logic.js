module.exports = function(user, records) {
  master={errors: []};
  if(user.email) {
    for (var i = 0; i < records.length; i++) {
      if (user.email.toLowerCase() === records[i].email.toLowerCase()){
        master.errors.push("A user with that email already exists")
      }
    }
  }
  if (user.email === "" || allSpaces(user.email)){
    master.errors.push("Email cannot be blank.");
  }
  if (user.pw && user.pw.length < 5) {
    master.errors.push('Password must be at least 5 characters')
  }
  return master
}

var allSpaces = function(string){
  if (string === "" || string === undefined) { return false }
  if (string) {
    for (var i = 0; i < string.length; i++) {
      if (string[i] !== " ") {
        return false;
      }
    }
  }
  return true;
}