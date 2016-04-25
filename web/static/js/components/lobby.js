import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import UserStats from "./user-stats";
import GameProfile from "./game-profile";
import PastGame from "./past-game";

var Lobby = React.createClass({
  render(){
    return(
      <div className="center">
        <div className="container profile-display">
          <UserStats user={this.props.user} container="user-profile"/>
            <div className="horizontal-spacer">
            </div>

          <GameProfile counter={this.props.counter} user={this.props.user} inCyclePlayers={this.props.inCyclePlayers}/>
            <div className="horizontal-spacer">
            </div>
        </div>
        <div>
          <div className="vertical-spacer">
          </div>
          <PastGame user={this.props.user} enteredWords={this.props.enteredWords}/>
        </div>
      </div>
    );
  }
});

module.exports = Lobby;
