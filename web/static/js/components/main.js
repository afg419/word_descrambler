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
            counter: {},
            updater: undefined,
            inCyclePlayers: []
           };
  },

  renderIncrement(reply){
    this.setState({counter: reply});
  },

  updateUserData(reply){
    this.setState({user: reply}, () => {
      console.log("Checkout my new user");
    });
  },

  updateInCyclePlayers(reply){
    this.setState({inCyclePlayers: reply}, ()=>{
      console.log("Checkout my new in cyclers!");
      console.log(this.state.inCyclePlayers);
    });
  },

  setMainState(info){
    this.setState(info);
  },

  componentDidMount(){
    this.getUserInfo();
  },

  getUserInfo(){
    $.ajax({
      url: '/api/v1/sessions',
      type: 'GET',
      success: (user) => {
        if(user){
          this.setMainState(
           {user: user,
            message: user.username,
            pageView: 1,
            updater: updater(this.renderIncrement,
                                    user.username,
                              this.updateUserData,
                        this.updateInCyclePlayers)}
          );
        } else
          this.setState({message: ""});
        }
      }
    );
  },

  currentPage(){
    switch(this.state.pageView) {
    case 0:
      return <Authorize
                getUserInfo={this.getUserInfo}
                setMainState={this.setMainState}/>;
    case 1:
      return <Profile
                inCyclePlayers={this.state.inCyclePlayers.users}
                updater={this.state.updater}
                user={this.state.user}
                counter={this.state.counter}
                setMainState={this.setMainState}/>;
    case 2:
      return <GameCycle
                inCyclePlayers={this.state.inCyclePlayers.users}
                updater={this.state.updater}
                counter={this.state.counter}
                user={this.state.user}
                setMainState={this.setMainState} />;
    }
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
