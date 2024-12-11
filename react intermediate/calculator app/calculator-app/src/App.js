import React, { useState } from "react";
import "./App.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("basic");

  const handleInput = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      setInput(eval(input).toString());
    } catch (error) {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const handleScientificOperation = (operation) => {
    try {
      let result;
      switch (operation) {
        case "sin":
          result = Math.sin(eval(input)).toString();
          break;
        case "cos":
          result = Math.cos(eval(input)).toString();
          break;
        case "tan":
          result = Math.tan(eval(input)).toString();
          break;
        case "sqrt":
          result = Math.sqrt(eval(input)).toString();
          break;
        case "log":
          result = Math.log10(eval(input)).toString();
          break;
        case "ln":
          result = Math.log(eval(input)).toString();
          break;
        default:
          result = "Error";
      }
      setInput(result);
    } catch (error) {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <h1>Calculator </h1>
      <div className="display">{input || "0"}</div>
      <div className="mode-toggle">
        <button onClick={() => setMode("basic")}>Basic Mode</button>
        <button onClick={() => setMode("scientific")}>Scientific Mode</button>
      </div>
      <div className="buttons">
        <button onClick={clearInput}>C</button>
        <button onClick={() => handleInput("(")}>(</button>
        <button onClick={() => handleInput(")")}>)</button>
        <button onClick={() => handleInput("/")}>/</button>

        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("*")}>*</button>

        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("-")}>-</button>

        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("+")}>+</button>

        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput(".")}>.</button>
        <button onClick={calculateResult}>=</button>
      </div>

      {mode === "scientific" && (
        <div className="scientific-buttons">
          <button onClick={() => handleScientificOperation("sin")}>sin</button>
          <button onClick={() => handleScientificOperation("cos")}>cos</button>
          <button onClick={() => handleScientificOperation("tan")}>tan</button>
          <button onClick={() => handleScientificOperation("sqrt")}>√</button>
          <button onClick={() => handleScientificOperation("log")}>log</button>
          <button onClick={() => handleScientificOperation("ln")}>ln</button>
        </div>
      )}
    </div>
  );
};

export default Calculator;























