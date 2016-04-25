import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";

var PastGame = React.createClass({
  render(){
    return(
      <div>
        <h3 className="center">Last Game</h3>
        <div className="container past-game-profile">
          <h4>Your Score: {this.props.enteredWords.length} </h4>
          <h4>Top Scoring Player: {"Feature Coming Soon"} </h4>
          <h5 className="left-indent"> Score: {"Feature Coming Soon"} </h5>
          <h4>Average Score: {"Feature Coming Soon"} </h4>
        </div>
      </div>
    );
  }
});

module.exports = PastGame;
