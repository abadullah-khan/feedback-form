import React, { Component } from "react";
import styles from "../styles/result.module.css";

export class Result extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className={styles.result}>
        <h1>Thanks for the feedback!</h1>
        {data?.questions.map((question, index) => (
          <div key={index}>
            <p>
              {index + 1}. {question}
            </p>
            <span>-{data?.choices[index]}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Result;
