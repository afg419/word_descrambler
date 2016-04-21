import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import Game from "./game";
import Lobby from "./lobby";

var GameCycle = React.createClass({
  getInitialState(){
    return {enteredWords: []};
  },

  componentWillReceiveProps(nextProps){
    if(this.inGame() && !this.inGame(nextProps.counter)){
      this.endGame();
    } else if (!this.inGame() && this.inGame(nextProps.counter)){
      this.startGame();
    }
  },

  inGame(counter = this.props.counter){
    return counter.active_game;
  },

  addEnteredWord(word){
    var eW = this.state.enteredWords;
    this.setState({enteredWords: eW.concat([word])});
  },

  startGame(){
    this.setState({enteredWords: []});
  },

  endGame(){
    this.props.updater.send({score: this.state.enteredWords.length});
  },

  gameOrLobby(){
    if (this.inGame()){
      return (<Game  counter={this.props.counter}
                        user={this.props.user}
                setMainState={this.props.setMainState}
                     updater={this.props.updater}
                enteredWords={this.state.enteredWords}
              addEnteredWord={this.addEnteredWord} />);
    } else {
      return (<Lobby counter={this.props.counter}
                        user={this.props.user}
                setMainState={this.props.setMainState} />);
    }
  },

  quitGame(){
    this.props.setMainState({pageView: 1});
  },

  render(){
    return(
      <div className="center">
        {this.gameOrLobby()}
        <button onClick={this.quitGame}>Quit</button>
      </div>
    );
  }
});

module.exports = GameCycle;
