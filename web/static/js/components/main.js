import React from "react";
import ReactDOM from "react-dom";
import updater from "../updater";
import Authorize from "./authorize";
import Game from "./game";

var Main = React.createClass({
  getInitialState(){
    return {
            pageView: 0,
            username: "",
            loggedIn: false,
             counter: parseInt($("#main")[0].className),
    updaterCloseSend: updater(this.renderIncrement, ""),
            topScore: 0,
           };
  },

  login(username, topscore){
    this.setState({ loggedIn: true, username: username, updaterCloseSend: updater(this.renderIncrement, username), topScore: 0 + topscore});
    console.log("LOGGED $#%@^ IN");
  },

  logout(){
    this.setState({ loggedIn: false, username: ""});
    console.log("LOGGED #$%#$ OUT");
  },

  sendReset(){
    console.log("nice clicking ");
    this.state.updaterCloseSend.send();
    this.getUserInfo();
    console.log("supposedly sent");
  },

  renderIncrement(reply){
    if(reply){
      this.setState({counter: reply});
    }
  },

  getUserInfo(){
    $.ajax({
      url: '/api/v1/sessions',
      type: 'GET',
      success: (reply) => {
        if(reply){
          debugger;
          this.login(reply.username, reply.top_score);
          this.setState({message: "Logged in as "+ reply.username});
        } else
          this.setState({message: ""});
        }
      }
    );
  },

  currentPage(){
    switch(this.state.pageView) {
    case 0:
      return <Authorize loggedIn={this.state.loggedIn} login={this.login} logout={this.logout}/>;
    case 1:
      return <Game getUserInfo={this.getUserInfo} counter={this.state.counter} loggedIn={this.state.loggedIn} sendReset={this.sendReset}/>;
    }
  },

  componentDidMount(){
    this.getUserInfo();
  },

  render() {
    return (
      <div>
        <h1>Ready to furiously click some buttons?!</h1>
        {this.currentPage()}
      </div>
    );
  }
});

module.exports = Main;
