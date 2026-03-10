import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const sampleText = "The quick brown fox jumps over the lazy dog";

  const [text, setText] = useState("");
  const [time, setTime] = useState(30);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testFinished, setTestFinished] = useState(false);

  useEffect(() => {
    let timer;

    if (isTyping && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    if (time === 0) {
      setIsTyping(false);
      setTestFinished(true);
    }

    return () => clearInterval(timer);
  }, [isTyping, time]);

  const handleTyping = (e) => {
    const value = e.target.value;
    setText(value);

    if (!isTyping) {
      setIsTyping(true);
    }

    calculateWPM(value);
    calculateAccuracy(value);
  };

  const calculateWPM = (inputText) => {
    const words = inputText
      .trim()
      .split(" ")
      .filter((word) => word !== "").length;

    const timeSpent = 30 - time;

    if (timeSpent > 0) {
      const wpmValue = Math.round((words / timeSpent) * 60);
      setWpm(wpmValue);
    }
  };

  const calculateAccuracy = (inputText) => {
    let correctChars = 0;

    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === sampleText[i]) {
        correctChars++;
      }
    }

    const accuracyValue =
      inputText.length === 0
        ? 100
        : Math.round((correctChars / inputText.length) * 100);

    setAccuracy(accuracyValue);
  };

  const restartTest = () => {
    setText("");
    setTime(30);
    setIsTyping(false);
    setWpm(0);
    setAccuracy(100);
    setTestFinished(false);
  };

  if (testFinished) {
    return (
      <div className="container">
        <h1>Test Finished</h1>

        <h2>WPM: {wpm}</h2>
        <h2>Accuracy: {accuracy}%</h2>

        <button onClick={restartTest} className="restart-btn">
          Restart Test
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>TypeShift</h1>

      <h2>Time: {time}s</h2>
      <h2>WPM: {wpm}</h2>
      <h2>Accuracy: {accuracy}%</h2>

      <p className="sample-text">
        {sampleText.split("").map((char, index) => {
          let color = "";

          if (index < text.length) {
            color = char === text[index] ? "green" : "red";
          }

          return (
            <span key={index} style={{ color: color }}>
              {char}
            </span>
          );
        })}
      </p>

      <textarea
        className="textbox"
        placeholder="Start typing here..."
        value={text}
        onChange={handleTyping}
        disabled={time === 0}
      />

      <button onClick={restartTest} className="restart-btn">
        Restart Test
      </button>
    </div>
  );
}

export default App;
