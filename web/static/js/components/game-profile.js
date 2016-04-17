import React from "react";
import ReactDOM from "react-dom";

var GameProfile = React.createClass({
  render(){
    return(
      <div className="container game-profile">
        <h4>Top Player: </h4>
        <h5 className="left-indent">Top Score: {}</h5>
        <h5 className="left-indent">Average Score: {}</h5>
        <h4>Total Players: {}</h4>
        <h4>Time Remaining: {}</h4>
      </div>
    );
  }
});

module.exports = GameProfile;
