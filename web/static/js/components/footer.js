import React from "react";
import ReactDOM from "react-dom";

var Footer = React.createClass({
  render(){
    return(
      <div className="center">
        <p>{this.props.message}</p>
      </div>
    );
  }
});

module.exports = Footer;
