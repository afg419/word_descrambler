import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";

var Game = React.createClass({
  getInitialState(){
    return {
            updaterCloseSend: updater(this.renderIncrement, ""),
            counter: 0
           };
  },

  renderIncrement(reply){
    if(reply){
      this.setState({counter: reply});
      console.log(reply);
    }
  },

  quitGame(){
    this.props.setMainState({pageView: 1});
  },

  render(){
    return(
      <div className="center">
        <div className="container">
          <div className="container letter-box"></div>
          <input className="word-input" placeholder=" Type words using the letters above"/>
          <div className="vertical-spacer"></div>
          <div className="game-state">
          <div>Time remaining: {this.state.counter}</div>
          <div className="container word-results"></div>
          </div>
        </div>
        <button onClick={this.quitGame}>Quit</button>



      </div>
    );
  }
});

module.exports = Game;
