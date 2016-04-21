import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import UserStats from "./user-stats";

var Lobby = React.createClass({
  render(){
    return(
      <div className="center">
        <div className="container">
          <div>Time remaining: {this.props.counter.main}</div>
            <UserStats user={this.props.user} container="word-results"/>
        </div>
      </div>
    );
  }
});

module.exports = Lobby;
