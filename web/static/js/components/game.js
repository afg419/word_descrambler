import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";

var Game = React.createClass({
  letters(){
    return (this.props.counter.letters.map( (letter, i) => {
      return <span key={i} style={{marginLeft: "1.05em"}}>{letter}</span>;
    }));
  },

  render(){
    return(
      <div className="center">
        <div className="container">
          <div className="container letter-box">{this.letters()}</div>
          <input className="word-input" placeholder=" Type words using the letters above"/>
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
