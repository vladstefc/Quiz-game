import { React, useEffect, useState, useCallback, useContext } from "react";
import styles from "./Game.module.css";
import { Button, Segment } from "semantic-ui-react";

import { QuizContext } from "../../store/QuizContext";
import Results from "./Results";
import Layout from "../UI/Layout";

export default function Quiz({ data }) {
  const [result, setResult] = useState([]);
  const { quiz, category, index, setIndex } = useContext(QuizContext);

  // const [index, setIndex] = useState(0);

  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState([]);
  const [incorrectAns, setIncorrectAns] = useState([]);

  const [arrayOfAnswers, setArrayOfAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [showFinishBtn, setShowFinishBtn] = useState(false);

  console.log("data from Quiz: ", data);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setQuestion(data[index].question);
    setCorrectAns(data[index].correct_answer);
    setIncorrectAns(data[index].incorrect_answers);
    const mergedAns = [correctAns, ...incorrectAns];
    setArrayOfAnswers(shuffleArray(mergedAns));
  }, [index, correctAns, incorrectAns, data]);

  console.log("correct answer: ", correctAns);
  // console.log("incorrect answ: ", incorrectAns);
  // console.log("array of answers: ", arrayOfAnswers);

  const nextQuestion = () => {
    if (index < data.length - 1) {
      setQuestion(data[index].question);
      setIndex(index + 1);
      setQuestionNumber((questionNumber) => questionNumber + 1);
      console.log("index: ", index);
    } else {
      setShowFinishBtn(true);
    }

    if (selectedAnswer === correctAns) {
      setScore((score) => score + 1);
    }
  };

  // console.log("score: ", score);

  const onAnswerSelect = (e) => {
    setSelectedAnswer(e.target.value);
  };
  // console.log("onasnswerselect: ", selectedAnswer);

  return !showFinishBtn ? (
    <Layout>
      <div
        className="flex justify-between flex-wrap items-center content-center text-center w-100"
        style={{
          outlineStyle: "dotted",
          outlineColor: "white",
          color: "white",
        }}
      >
        <h3 className="ml-2">Category: {category}</h3>
        <h3>Your Score: {score}</h3>
        <h3 className="">Question nr. {questionNumber} </h3>
      </div>
      <p className="pa3" style={{ color: "white" }}>
        {question}?
      </p>
      <div
        className="mw9 center ph3-ns"
        style={{ outlineStyle: "dotted", outlineColor: "white" }}
      >
        <div className="cf w-100 ph2-ns">
          {arrayOfAnswers &&
            arrayOfAnswers.map((answers) => {
              return (
                <div className="fl w-100 w-50-ns pa2">
                  <button
                    key={Math.random()}
                    className="pa2 ma3 ba b--light-gray br4 shadow-1 w-100 pointer"
                    onClick={onAnswerSelect}
                    value={answers}
                  >
                    {answers}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className="mw9 center ph3-ns">
        <div className="cf ph2-ns">
          <div className="fl w-100 w-50-ns pa2">
            <button
              className="pa2 ma3 ba b--light-gray br4 shadow-1 w-50 pointer"
              onClick={nextQuestion}
            >
              Next
            </button>
          </div>
          <div className="fl w-100 w-50-ns pa2">
            <button
              className="pa2 ma3 ba b--light-gray br4 shadow-1 w-50 pointer"
              onClick={nextQuestion}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Results score={score} />
  );
}
