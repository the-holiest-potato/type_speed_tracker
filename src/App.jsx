import { useState, useEffect } from "react";
import "./App.css";

function App() {

  const sampleText = "The quick brown fox jumps over the lazy dog";

  const [text, setText] = useState("");
  const [time, setTime] = useState(30);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    let timer;

    if (isTyping && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
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
  };

  const calculateWPM = (inputText) => {

    const words = inputText.trim().split(" ").filter((word) => word !== "").length;
    const timeSpent = 30 - time;

    if (timeSpent > 0) {
      const wpmValue = Math.round((words / timeSpent) * 60);
      setWpm(wpmValue);
    }
  };

  return (
    <div className="container">

      <h1>Typing Speed Test</h1>

      <h2>Time: {time}s</h2>
      <h2>WPM: {wpm}</h2>

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

    </div>
  );
}

export default App;