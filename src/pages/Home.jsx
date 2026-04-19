import { useState, useEffect, useRef } from "react";
import { generateWords } from "../wordGenerator";
import { useAuth } from "../context/AuthContext";

function Home() {
  const [currentText, setCurrentText] = useState(() => generateWords(50).join(" "));
  const [text, setText] = useState("");
  const [time, setTime] = useState(30);
  const [isTyping, setIsTyping] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testFinished, setTestFinished] = useState(false);
  const [rawWpm, setRawWpm] = useState(0);
  
  const { addTestResult } = useAuth();
  const inputRef = useRef(null);

  useEffect(() => {
    if (testFinished) {
      addTestResult({
        wpm,
        accuracy,
        rawWpm,
        mode: "time 30"
      });
    }
  }, [testFinished]);

  useEffect(() => {
    let timer;
    if (isTyping) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsTyping(false);
            setTestFinished(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTyping]);

  const handleTyping = (e) => {
    if (testFinished) return;
    
    const value = e.target.value;
    if (value.length > currentText.length) return;

    if (!isTyping && value.length > 0) {
      setIsTyping(true);
    }

    setText(value);
    calculateStats(value);

    if (value.length === currentText.length) {
      setIsTyping(false);
      setTestFinished(true);
    }
  };

  const calculateStats = (inputText) => {
    const timeSpent = (30 - time) / 60; // in minutes
    if (timeSpent <= 0) return;

    let correctChars = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === currentText[i]) {
        correctChars++;
      }
    }

    const calculatedWpm = Math.round((correctChars / 5) / timeSpent);
    const calculatedRawWpm = Math.round((inputText.length / 5) / timeSpent);
    const calculatedAccuracy = inputText.length === 0 
      ? 100 
      : Math.round((correctChars / inputText.length) * 100);

    setWpm(calculatedWpm);
    setRawWpm(calculatedRawWpm);
    setAccuracy(calculatedAccuracy);
  };

  const restartTest = () => {
    setText("");
    setTime(30);
    setIsTyping(false);
    setWpm(0);
    setRawWpm(0);
    setAccuracy(100);
    setTestFinished(false);
    setCurrentText(generateWords(50).join(" "));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (testFinished) {
    return (
      <div className="container result-screen">
        <h1 className="title">Test Finished</h1>
        <div className="stats-grid">
          <div className="stat-box">
            <span className="stat-label">wpm</span>
            <span className="stat-value">{wpm}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">acc</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">raw</span>
            <span className="stat-value">{rawWpm}</span>
          </div>
        </div>
        <button onClick={restartTest} className="restart-btn">
          Restart Test
        </button>
      </div>
    );
  }

  return (
    <div className="container" onClick={focusInput}>
      <header className="header">
        <div className="live-stats">
          <span>{time}s</span>
          <span>{wpm} wpm</span>
          <span>{accuracy}% acc</span>
        </div>
      </header>

      <div className="typing-area">
        <input
          ref={inputRef}
          type="text"
          className="hidden-input"
          value={text}
          onChange={handleTyping}
          autoFocus
        />
        <div className="words-wrapper">
          {currentText.split(" ").map((word, wIdx, wordArr) => {
            const globalWordStart = wordArr
              .slice(0, wIdx)
              .reduce((acc, curr) => acc + curr.length + 1, 0);

            return (
              <div key={wIdx} className="word">
                {word.split("").map((char, i) => {
                  const index = globalWordStart + i;
                  let state = "";
                  if (index < text.length) {
                    state = char === text[index] ? "correct" : "incorrect";
                  }
                  const isCurrent = index === text.length;

                  return (
                    <span
                      key={index}
                      className={`char ${state} ${isCurrent ? "current" : ""}`}
                    >
                      {isCurrent && <div className="caret"></div>}
                      {char}
                    </span>
                  );
                })}
                {wIdx < wordArr.length - 1 && (() => {
                  const index = globalWordStart + word.length;
                  let state = "";
                  if (index < text.length) {
                    state = " " === text[index] ? "correct" : "incorrect";
                  }
                  const isCurrent = index === text.length;
                  return (
                    <span
                      key={index}
                      className={`char ${state} ${isCurrent ? "current" : ""} space`}
                    >
                      {isCurrent && <div className="caret"></div>}
                      {"\u00A0"}
                    </span>
                  );
                })()}
              </div>
            );
          })}
          {text.length === currentText.length && (
            <div className="word">
              <span className="char current space">
                <div className="caret"></div>
                {"\u00A0"}
              </span>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Press <span className="key-hint">Tab</span> + <span className="key-hint">Enter</span> to quickly restart</p>
      </footer>
    </div>
  );
}

export default Home;
