import React, { useState } from "react";
import "./App.css";

const QuizApp = () => {
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizOver, setIsQuizOver] = useState(false);

  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState(0);

  const handleAnswer = (index) => {
    if (index === quiz[currentQuestion].correct) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizOver(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setIsQuizActive(true);
    setIsQuizOver(false);
  };

  const addQuestion = () => {
    const newQuiz = [...quiz, { question: newQuestion, options, correct: correctAnswer }];
    setQuiz(newQuiz);
    setNewQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer(0);
  };

  return (
    <div className="quiz-app">
      <h1>Quiz App</h1>
      {!isQuizActive ? (
        <div>
          <h2>Create Quiz</h2>
          <input
            type="text"
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
          ))}
          <label>
            Correct Answer:
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(Number(e.target.value))}
            >
              {options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </label>
          <button onClick={addQuestion}>Add Question</button>
          <button onClick={() => setIsQuizActive(true)}>Start Quiz</button>
        </div>
      ) : !isQuizOver ? (
        <div>
          <h2>{quiz[currentQuestion].question}</h2>
          {quiz[currentQuestion].options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(index)}>
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <h2>Quiz Over</h2>
          <p>Your Score: {score}/{quiz.length}</p>
          <button onClick={resetQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;























