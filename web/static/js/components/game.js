import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import GameHelper from "./helpers/game-helper";

var Game = React.createClass({
  getInitialState(){
    return { letters: [], letterObject: {}, enteredWords: [], gh: new GameHelper()};
  },

  componentDidMount(){
    this.setState(
                  {letters: this.props.counter.letters,
              letterObject: this.state.gh.createLettersObject(this.props.counter.letters)}
                 );
  },

  checkWord(event){
    if(event.keyCode == 13){
      debugger;
      var inputString = (this.refs.wordInput.value);
      var inputObj = this.state.gh.createLettersObject(inputString.split(""));

      if(!this.state.gh.compareLetterObjects(inputObj, this.state.letterObject)){
        this.props.setMainState({message: "You can only use the letters above!"});
      } else if (!true){
        this.props.setMainState({message: "That doesn't look like a word..."});
      } else if (this.state.gh.isRepeat(inputString, this.props.enteredWords)) {
        this.props.setMainState({message: "Only once per word please"});
      } else {
        this.refs.wordInput.value = "";
        this.props.addEnteredWord(inputString);
      }
    }
  },

  formattedLetters(){
    return (this.state.letters.map( (letter, i) => {
      return <span key={i} style={{marginLeft: "1.05em"}}>{letter}</span>;
    }));
  },

  formattedEnteredWords(){
    return (this.props.enteredWords.map( (word, i) => {
      return <span key={i} style={{marginLeft: "1.05em"}}>{word}</span>;
    }));
  },


  render(){
    return(
      <div className="center">
        <div className="container">
          <div className="container letter-box">{this.formattedLetters()}</div>
          <input ref="wordInput" spellCheck="true" className="word-input" onKeyDown={this.checkWord} placeholder=" Type words using the letters above"/>
          <div className="vertical-spacer"></div>
          <div className="game-state">
            <div>Time remaining: {this.props.counter.main}</div>
            <div className="container word-results">{this.formattedEnteredWords()}</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Game;
