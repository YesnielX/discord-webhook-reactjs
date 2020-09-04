import React, { PureComponent } from "react";
import logo from '../../logo.svg';

class Header extends PureComponent { 
  render () {
    return (
      <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>React Discord WebHook</p>
      </header>
    </div>
    );
  }
}

export default Header;
