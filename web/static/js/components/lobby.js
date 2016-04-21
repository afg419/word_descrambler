import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";

var Lobby = React.createClass({
  render(){
    return(
      <div className="center">
        <div className="container">
          <div>Time remaining: {this.props.counter.main}</div>
          <div className="container word-results">TopScore: {this.props.user.top_score}</div>
        </div>
      </div>
    );
  }
});

module.exports = Lobby;
