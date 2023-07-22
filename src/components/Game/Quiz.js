import { React, useEffect, useState, useContext } from "react";
import styles from "./Quiz.module.css";

import { QuizContext } from "../../store/QuizContext";
import Results from "./Results";
import Layout from "../UI/Layout";
import CustomBtn from "../UI/CustomBtn";

export default function Quiz({ data }) {
  const { category, index, setIndex } = useContext(QuizContext);

  const [question, setQuestion] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [score, setScore] = useState(0);
  const [correctAns, setCorrectAns] = useState([]);
  const [incorrectAns, setIncorrectAns] = useState([]);

  const [arrayOfAnswers, setArrayOfAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [isSelected, setIsSelected] = useState(null);
  const [showFinishBtn, setShowFinishBtn] = useState(false);

  // console.log("data from Quiz: ", data);

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

  // console.log("correct answer: ", correctAns);

  const nextQuestionHandler = () => {
    if (index < data.length - 1) {
      setQuestion(data[index].question);
      setIndex(index + 1);
      setQuestionNumber((questionNumber) => questionNumber + 1);
    } else {
      setShowFinishBtn(true);
    }

    if (selectedAnswer === correctAns) {
      setScore((score) => score + 1);
    }
    setIsSelected(null);
  };

  const prevQuestionHandler = () => {
    if (index < data.length - 1) {
      setQuestion(data[index].question);
      setIndex(index - 1);
      setQuestionNumber((questionNumber) => questionNumber - 1);
    }

    if (score > 0) {
      setScore((score) => score - 1);
    }

    if (index === 0) {
      setScore(0);
    }

    setIsSelected(null);
  };

  // console.log(index);

  // console.log("score: ", score);

  const onAnswerSelect = (value, index) => {
    setSelectedAnswer(value);
    setIsSelected(index);
  };
  console.log("onasnswerselect: ", selectedAnswer);
  console.log("selected: ", isSelected);

  const answersBtnsClassesTach =
    "pa2 ma3 ba b--light-gray br4 shadow-1 w-100 pointer";

  return !showFinishBtn ? (
    <Layout>
      <div className={styles.header}>
        <h3 className="ml-2">Category: {category}</h3>
        <h3>Your Score: {score}</h3>
        <h3 className="">Question nr. {questionNumber} </h3>
      </div>
      <p className={styles.question}>{question}</p>
      <div className={styles.answersContainer}>
        <div className={styles.answers}>
          {arrayOfAnswers &&
            arrayOfAnswers.map((answers, index) => {
              return (
                <div className={styles.answersBtns} key={index}>
                  <button
                    className={
                      isSelected === index
                        ? `${answersBtnsClassesTach} ${styles.active}`
                        : `${answersBtnsClassesTach}`
                    }
                    onClick={() => onAnswerSelect(answers, index)}
                    value={answers}
                  >
                    {answers}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.actionBtnsContainer}>
        <button
          className={`pa2 ma3 ba b--light-gray br4 shadow-1 w-50 pointer${
            index === 0 ? "disabledButton" : ""
          }`}
          onClick={prevQuestionHandler}
          disabled={index === 0}
        >
          Previous
        </button>
        <button
          className="pa2 ma3 ba b--light-gray br4 shadow-1 w-50 pointer"
          onClick={nextQuestionHandler}
        >
          Next
        </button>
      </div>
    </Layout>
  ) : (
    <Results score={score} />
  );
}
