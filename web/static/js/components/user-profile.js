import React from "react";
import ReactDOM from "react-dom";

var UserProfile = React.createClass({
  render(){
    return(
      <div className="container user-profile">
        <h4>Username: {this.props.user.username}</h4>
        <h4>Top Score: {this.props.user.topScore}</h4>
        <h4>Average Score: {this.props.user.topScore}</h4>
        <h4>Total Wins: {this.props.user.topScore}</h4>
        <h4>Total Plays: {this.props.user.topScore}</h4>
      </div>
    );
  }

});

module.exports = UserProfile;
