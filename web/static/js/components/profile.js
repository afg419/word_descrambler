import React from "react";
import ReactDOM from "react-dom";
import DoubleButtons from "./double-buttons";
import UserStats from "./user-stats";
import GameProfile from "./game-profile";

var Profile = React.createClass({
  componentDidMount(){
    this.props.updater.togglePlayCycle(false);
  },

  joinGame(){
    this.props.setMainState({ pageView: 2 });
  },

  inGame(){
    return(this.props.counter.active_game);
  },

  logoutExisting(){
    $.ajax({
      url: '/api/v1/sessions',
      type: 'DELETE',
      success: (reply) => {
        if(reply){
          this.props.setMainState({pageView: 0,
                                    message: "Logged out",
                                       user: {},
                                    updater: undefined});
        }
      }
    });
  },

  render(){
    return(
      <div>
        <h2>Profile: {this.props.user.username}</h2>

        <div className="profile-display">
        <UserStats user={this.props.user} container="user-profile"/>
          <div className="horizontal-spacer">
          </div>

        <GameProfile counter={this.props.counter} user={this.props.user} inCyclePlayers={this.props.inCyclePlayers}/>
          <div className="horizontal-spacer">
          </div>
        </div>

        <div className="vertical-spacer">
        </div>

        <DoubleButtons firstButton={{action: this.logoutExisting, text: "Logout"}}
          secondButton={{action: this.joinGame, text:"Let's Play!"}} inGame={this.inGame()}/>
      </div>
    );
  }
});

module.exports = Profile;
