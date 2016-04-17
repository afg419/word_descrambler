import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import Game from "./game";
import Lobby from "./lobby";

var GameCycle = React.createClass({
  getInitialState(){
    return {
            updaterCloseSend: updater(this.renderIncrement, ""),
            counter: {},
           };
  },

  renderIncrement(reply){
    this.setState({counter: reply});
    console.log(reply);
  },

  inGame(){
    return this.state.counter.active_game;
  },

  gameOrLobby(){
    if (this.inGame()){
      return (<Game counter={this.state.counter}
                                user={this.state.user}
                        setMainState={this.setMainState}
                           sendReset={this.sendReset}/>);
    } else {
      return (<Lobby counter={this.state.counter}
                                user={this.state.user}
                        setMainState={this.setMainState}
                           sendReset={this.sendReset}/>);
    }
  },

  quitGame(){
    this.props.setMainState({pageView: 1});
    this.state.updaterCloseSend.close();
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
