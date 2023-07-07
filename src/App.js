import React, { Component } from "react";
import FeedbackForm from "./components/FeedbackForm";

import "./App.css";
import Result from "./components/Result";

export class App extends Component {
  state = {
    feedback: null,
  };
  upLifter = (feedbackData) => {
    this.setState({
      feedback: feedbackData,
    });
  };
  render() {
    const { feedback } = this.state;
    console.log(feedback);
    return (
      <div className="App">
        {!feedback ? (
          <FeedbackForm upLifter={this.upLifter} />
        ) : (
          <Result data={feedback} />
        )}
      </div>
    );
  }
}

export default App;
