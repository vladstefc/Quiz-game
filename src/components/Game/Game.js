import { React, useState, useContext } from "react";
import styles from "./Game.module.css";
import { Form } from "semantic-ui-react";
import { QuizContext } from "../../store/QuizContext";

import Quiz from "./Quiz";
import Layout from "../UI/Layout";
import CustomBtn from "../UI/CustomBtn";

export default function Game({ arrayOfData }) {
  const [difficulty, setDifficulty] = useState("easy");
  const [nrOfQ, setNrOfQ] = useState(5);
  const [categoryID, setCategoryID] = useState(9);
  const [data, setData] = useState([]);

  const { startPlay, setStartPlay, category, setCategory, index, setIndex } =
    useContext(QuizContext);

  const difficulties = ["easy", "medium", "hard"];

  const nrOfQHandler = (e) => {
    setNrOfQ(e.target.value);
  };

  const onPlay = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=${nrOfQ}&category=${categoryID}&difficulty=${difficulty}`
      );
      const quiz = await response.json();
      setData(quiz.results);
    } catch (error) {
      console.log(error);
    }
    setStartPlay(true);
    setIndex(0);
  };

  const eventHandler = (e) => {
    const selectedIndex = e.target.selectedIndex;
    setCategoryID(arrayOfData[selectedIndex].id);
    setCategory(e.target.value);
  };

  return !startPlay ? (
    <Layout>
      <Form className="pa3 w-100 flex flex-column justify-center items-center white">
        <h2>Quizy</h2>
        <Form.Field style={{ color: "#ffffff" }}>
          <label style={{ color: "#ffffff" }}>Category</label>
          <select onChange={eventHandler}>
            {arrayOfData.map((cat) => {
              return (
                <option key={cat.id} id={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              );
            })}
          </select>
        </Form.Field>
        <Form.Field style={{ width: "100%" }}>
          <label style={{ color: "#ffffff" }}>Difficulty</label>

          <select
            className="w-100 text-center"
            onChange={(e) => {
              setDifficulty(e.target.value);
            }}
          >
            {difficulties.map((diff) => {
              return (
                <option key={diff} value={diff}>
                  {diff}
                </option>
              );
            })}
          </select>
        </Form.Field>
        <Form.Field style={{ width: "100%" }}>
          <label style={{ color: "#ffffff" }}>Number of questions</label>
          <p>Please type a number between 5 and 20:</p>
          <input onChange={nrOfQHandler} value={nrOfQ}></input>
        </Form.Field>
        <CustomBtn onClick={onPlay}>Play</CustomBtn>
      </Form>
    </Layout>
  ) : (
    <Quiz data={data} index={index} />
  );
}
