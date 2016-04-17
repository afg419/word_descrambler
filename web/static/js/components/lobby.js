import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";

var Lobby = React.createClass({
  getInitialState(){
    return {
            // updaterCloseSend: updater(this.renderIncrement, ""),
           };
  },

  // renderIncrement(reply){
  //   if(reply){
  //     if(!reply.active_game){
  //       this.props.setMainState({counter: reply});
  //     } else {
  //       this.props.setMainState({counter: reply, pageView: 2});
  //     }
  //     console.log(reply);
  //   }
  // },
  //
  // quitGame(){
  //   this.props.setMainState({pageView: 1});
  // },

  render(){
    return(
      <div className="center">
        <div className="container">
          <div>Time remaining: {this.props.counter.main}</div>
          <div className="container word-results"></div>
        </div>
      </div>
    );
  }
});

module.exports = Lobby;
