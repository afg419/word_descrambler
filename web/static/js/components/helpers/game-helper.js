class GameHelper{

  isWord(string){
    return true;
  }

  isRepeat(string, array){
    return (array.indexOf(string) > -1);
  }

  createLettersObject(inputString){
    var letterObject = {};
    inputString.forEach((letter) => {
      if(letterObject[letter] === undefined){
        letterObject[letter] = 0;
      }
      letterObject[letter] += 1;
    });
    return letterObject;
  }

  compareLetterObjects(ob1, ob2){
    var response = true;
    for (var letter in ob1) {
      if (ob1.hasOwnProperty(letter)) {
        response = response && (ob1[letter] <= ob2[letter]);
      }
    }
    return response;
  }

}

module.exports = GameHelper;
