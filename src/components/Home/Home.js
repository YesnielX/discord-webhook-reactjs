import React, { PureComponent } from "react";
import Header from "../Header/Header";
import SaveURL from "../SaveURL/SaveURL";
import SendMessage from "../SendMessage/SendMessage";
//import "./Home.styles";

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div>
        <Header />
        <div className="container">
          <SaveURL />
          <SendMessage />
        </div>
      </div>
    );
  }
}

export default Home;
