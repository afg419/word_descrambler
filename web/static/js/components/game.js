import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";

var Game = React.createClass({
  getInitialState(){
    return { letters: [], letterObject: {}};
  },

  componentDidMount(){
    this.setState(
                  {letters: this.props.counter.letters,
              letterObject: this.createLettersObject(this.props.counter.letters)}
                 );
  },

  formattedLetters(){
    return (this.state.letters.map( (letter, i) => {
      return <span key={i} style={{marginLeft: "1.05em"}}>{letter}</span>;
    }));
  },

  checkWord(event){
    if(event.keyCode == 13){
      var inputString = (this.refs.wordInput.value).split("");
      var inputObj = this.createLettersObject(inputString);
      if(this.compareLetterObjects(inputObj, this.state.letterObject)){
        alert("LEGAL");
      } else {
        alert("ILLEGAL");
      }
    }
  },

  createLettersObject(inputString){
    var letterObject = {};
    inputString.forEach((letter) => {
      if(letterObject[letter] === undefined){
        letterObject[letter] = 0;
      }
      letterObject[letter] += 1;
    });
    return letterObject;
  },

  compareLetterObjects(ob1, ob2){
    var response = true;
    for (var letter in ob1) {
      if (ob1.hasOwnProperty(letter)) {
        response = response && (ob1[letter] <= ob2[letter]);
      }
    }
    return response;
  },

  render(){
    return(
      <div className="center">
        <div className="container">
          <div className="container letter-box">{this.formattedLetters()}</div>
          <input ref="wordInput" className="word-input" onKeyDown={this.checkWord} placeholder=" Type words using the letters above"/>
          <div className="vertical-spacer"></div>
          <div className="game-state">
          <div>Time remaining: {this.props.counter.main}</div>
          <div className="container word-results"></div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Game;
