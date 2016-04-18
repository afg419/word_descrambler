import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import Game from "./game";
import Lobby from "./lobby";

var GameCycle = React.createClass({
  inGame(){
    return this.props.counter.active_game;
  },

  gameOrLobby(){
    if (this.inGame()){
      return (<Game  counter={this.props.counter}
                        user={this.props.user}
                setMainState={this.props.setMainState} />);
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
