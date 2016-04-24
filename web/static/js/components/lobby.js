import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import UserStats from "./user-stats";
import GameProfile from "./game-profile";

var Lobby = React.createClass({

  render(){
    return(
      <div className="center">
        <div className="container">
          <div>Time remaining: {this.props.counter.main}</div>

          <UserStats user={this.props.user} container="user-profile"/>
            <div className="vertical-spacer">
            </div>

          <GameProfile counter={this.props.counter} user={this.props.user} inCyclePlayers={this.props.inCyclePlayers}/>
            <div className="vertical-spacer">
            </div>
        </div>
      </div>
    );
  }
});

module.exports = Lobby;
