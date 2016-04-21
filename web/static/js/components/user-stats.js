import React from "react";
import ReactDOM from "react-dom";

var UserStats = React.createClass({
  render(){
    return(
      <div>
        <h3>Your Stats</h3>
        <div className={"container " + this.props.container}>
        <ul>
          <li>TopScore: {this.props.user.top_score}</li>
          <li>AverageScore: {this.props.user.avg_score}</li>
          <li>TotalPlays: {this.props.user.total_plays}</li>
        </ul>
        </div>
      </div>
    );
  }
});

module.exports = UserStats;
