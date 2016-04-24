import React from "react";
import ReactDOM from "react-dom";

var GameProfile = React.createClass({
  totalPlayers(){
    if(this.props.inCyclePlayers){
      return this.props.inCyclePlayers.length;
    } else {
      return 0;
    }
  },

  topPlayer(){
    if(this.totalPlayers() > 0){
      return this.props.inCyclePlayers.sort( (p1, p2) => {
        return p2.avg_score - p1.avg_score;
      })[0];
    } else {
      return {username: " No current players",top_score: "NA", avg_score: "NA" };
    }
  },

  render(){
    return(
      <div className="container game-profile">
        <h4>Top Player: {this.topPlayer().username}</h4>
        <h5 className="left-indent">Top Score: {this.topPlayer().top_score}</h5>
        <h5 className="left-indent">Average Score: {this.topPlayer().avg_score}</h5>
        <h4>Total Players: {this.totalPlayers()}</h4>
        <h4>Time Remaining: {this.props.counter.main}</h4>
      </div>
    );
  }
});

module.exports = GameProfile;
