import React, { useContext } from "react";
import { QuizContext } from "../../store/QuizContext";

const Results = (props) => {
  return <h3>You scored: {props.score}</h3>;
};
export default Results;
