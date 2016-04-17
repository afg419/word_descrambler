import React from "react";
import ReactDOM from "react-dom";

var Header = React.createClass({
  render(){
    return(
      <header className="center">
        <h1 style={{marginBottom: '1em'}}>Word Scram!</h1>
      </header>
    );
  }
});

module.exports = Header;
