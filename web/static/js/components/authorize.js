import React from "react";
import ReactDOM from "react-dom";
import DoubleButtons from "./double-buttons";

var Authorize = React.createClass({
  getInitialState(){
    return { message: "" };
  },

  createAccount(){
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    $.ajax({
      url: '/api/v1/sessions/new',
      type: 'GET',
      data: {username: username, password: password},
      success: (user) => {
        if(user){
          this.props.setMainState({message: "Created account and logged in as "+ username});
          this.props.getUserInfo();
        } else
          this.props.setMainState({message: "Username already taken or password not long enough"});
        }
      }
    );
  },

  loginExisting(){
    let username = this.refs.username.value;
    let password = this.refs.password.value;

    $.ajax({
      url: '/api/v1/sessions',
      type: 'POST',
      data: {username: username, password: password},
      success: (user) => {
        if(user){
          this.props.setMainState({message: "Logged in as " + username});
          this.props.getUserInfo();
        } else {
          this.props.setMainState({message: "Make a new account for " + username + " first!"});
        }
      }
    });
  },

  render(){
    return(
      <div className="center">
        <div>

          <div className="center">
            <input ref='username' placeholder='username' /><br></br>
            <input ref='password' placeholder='password' />
          </div>

          <div className="vertical-spacer">
          </div>

          <DoubleButtons firstButton={{action: this.createAccount, text: "Create new Account" }}
            secondButton={{action: this.loginExisting, text:"Login to Pre-existing Account"}} />

        </div>
      </div>
    );
  }
});

module.exports = Authorize;
