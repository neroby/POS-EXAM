import React, { useState } from "react";
import "./App.css";
import TestData from "./TestData.json";

function App() {
  // properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const questions = TestData.wordList;

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  // try again back to defult
  const tryAgain = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>Part Of Speech</h1>

      {/* 2. current Score */}
      <h2>Current Score: {score} </h2>

      {/* 5. Show result  */}
      {showResults ? (
        /* final-result*/

        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} - (
            {parseInt((score / questions.length) * 100)}%)
            {/* parseInt to make the result not like 26.3333333 */}
          </h2>
          <button onClick={() => tryAgain()}>Try Again</button>
        </div>
      ) : (
        /* 3. Question Card */
        <div className="question-card">
          {/* current Question */}
          <h2>
            Question {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].word}</h3>
          {/* list of possible answers */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.pos}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
