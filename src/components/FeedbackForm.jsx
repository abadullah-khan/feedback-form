import React, { Component } from "react";

import styles from "../styles/feedbackForm.module.css";

export class FeedbackForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    data: {},
    loading: false,
    error: null,
    selectedChoices: [],
    message: "",
    feedback: {
      questions: [],
      choices: [],
    },
  };
  componentDidMount() {
    this.fetchForm();
  }
  fetchForm = async () => {
    try {
      this.setState({ ...this.state, loading: true });
      const data = await (
        await fetch(
          "https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?unitID=1"
        )
      ).json();
      this.setState({
        data: data,
        loading: false,
      });
    } catch (error) {
      this.setState({
        ...this.state,
        loading: false,
        error: error.message,
      });
    }
  };
  handleChange = (questionIndex, choiceIndex) => {
    const { selectedChoices } = this.state;
    const updatedChoices = [...selectedChoices];
    updatedChoices[questionIndex] = choiceIndex;
    this.setState({
      selectedChoices: updatedChoices,
    });
  };
  submit = (e) => {
    e.preventDefault();
    const { data, selectedChoices } = this.state;

    const filteredChoices = selectedChoices.filter(
      (selectedChoice) => selectedChoice !== "" && selectedChoice !== undefined
    );

    if (filteredChoices.length < 5) {
      this.setState({
        ...this.state,
        message: "Please answer all the questions",
      });
      return;
    }
    const feedbackData = {
      questions: data.feedbackQuestions,
      choices: filteredChoices.map((selectedChoice, index) => {
        const choices = data.choices[index];
        return choices[selectedChoice];
      }),
    };
    this.props.upLifter(feedbackData);
  };
  render() {
    const { data, error, loading, selectedChoices, message } = this.state;
    if (loading) {
      return <div className="loading">Loading...</div>;
    }
    if (error) {
      return <div className="error">Error : {this.state.error}</div>;
    }
    return (
      <form onSubmit={(e) => this.submit(e)}>
        <div className={styles.container}>
          {data?.feedbackQuestions?.map((question, questionIndex) => (
            <div className={styles.wrapper} key={questionIndex}>
              <p>
                <span>{questionIndex + 1}.</span> {question}
              </p>
              <div className={styles.choiceContainer}>
                {data.choices[questionIndex].map((choice, choiceIndex) => (
                  <label key={choiceIndex}>
                    <input
                      type="radio"
                      name={questionIndex}
                      value={choice}
                      checked={selectedChoices[questionIndex] === choiceIndex}
                      onChange={() =>
                        this.handleChange(questionIndex, choiceIndex)
                      }
                    />
                    {choice}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        {message && <span>{message}</span>}
        <div className={styles.buttonContainer}>
          <button type="submit" title="click to submit the form">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default FeedbackForm;
