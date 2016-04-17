import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import Authorize from "./authorize";
import Profile from "./profile";
import Header from "./header";
import Footer from "./footer";
import GameCycle from "./game-cycle";

var Main = React.createClass({
  getInitialState(){
    return {
            user: {},
            pageView: 0,
            message: "HEY",
            counter: {}
           };
  },

  // sendReset(){
  //   console.log("nice clicking ");
  //   this.state.updaterCloseSend.send();
  //   this.getUserInfo();
  //   console.log("supposedly sent");
  // },

  setMainState(info){
    this.setState(info);
  },

  getUserInfo(){
    $.ajax({
      url: '/api/v1/sessions',
      type: 'GET',
      success: (user) => {
        if(user){
          this.setMainState({user: user, message: user.username, pageView: 1});
        } else
          this.setState({message: ""});
        }
      }
    );
  },

  currentPage(){
    switch(this.state.pageView) {
    case 0:
      return <Authorize setMainState={this.setMainState}/>;
    case 1:
      return <Profile user={this.state.user} setMainState={this.setMainState}/>;
    case 2:
      return <GameCycle counter={this.state.counter} user={this.state.user} setMainState={this.setMainState} sendReset={this.sendReset}/>;
    }
  },

  componentDidMount(){
    this.getUserInfo();
  },

  render() {
    return (
      <div>
        <Header />
        {this.currentPage()}
        <Footer message={this.state.message}/>
      </div>
    );
  }
});

module.exports = Main;
