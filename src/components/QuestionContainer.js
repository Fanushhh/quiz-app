import React, { useState, useEffect } from "react";
import Question from "./Question";
import "../index.css";

export default function QuestionContainer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [option, setOption] = useState('');
  const [isWon, setIsWon] = useState(false);
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://the-trivia-api.com/api/questions?limit=10&region=RO&difficulty=hard"
      );
      const receivedData = await res.json();
      const reconstructedData = receivedData.map(question => ({
        ...question,
        answers:[question.correctAnswer, ...question.incorrectAnswers].sort(() => Math.random() - 0.5)

      }))
      setData(reconstructedData);
      setLoading(false);
      console.log(reconstructedData)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (option === data[questionIndex].correctAnswer) {
      setScore((score) => score + 1);
    }
    if (questionIndex < data.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsWon(!isWon);
    }
    setOption('');
    
  }
  const handleChange = (e) => {
    setOption(e.target.value);
  };
  const restartQuiz = ()=>{
    window.location.reload();
  }
  
  return (
    
    <main>
      {isWon ? (
        <div className="question-container">
          <p>You {score > 5 ? "won" : "lost"} Your score was: {score}</p>
          <button onClick={restartQuiz}>Try again</button>
        </div>
      ) : (
        <div className="question-container">
          {loading ? 
          (
            <div>Loading...</div>
          ) : 
          (
            <Question
              isChecked={option}
              handleChange={handleChange}
              onFormSubmit={handleSubmit}
              data={data[questionIndex]}
            />
          )}
        </div>
      )}
    </main>
  );
}
