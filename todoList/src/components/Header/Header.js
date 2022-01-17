import React, { Component } from "react";
import './header.css';

export class Header extends Component {
  render() {
    return (
      <div className="header__">
        <div className="header__content">
          My {"  "}
          <span className="text_blue">To-do's</span>
        </div>
      </div>
    );
  }
}

export default Header;
