import React from "react";
import ReactDOM from "react-dom";

var UserStats = React.createClass({
  render(){
    return(
      <div>
        <h3>{this.props.user.username}'s scram stats</h3>
        <div className={"container " + this.props.container}>
          <h4>TopScore: {this.props.user.top_score}</h4>
          <h4>AverageScore: {this.props.user.avg_score}</h4>
          <h4>TotalPlays: {this.props.user.total_plays}</h4>
        </div>
      </div>
    );
  }
});

module.exports = UserStats;
