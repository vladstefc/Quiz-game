import { React, useState, useContext } from "react";
import styles from "./Game.module.css";
import { Button, Form } from "semantic-ui-react";
import { QuizContext } from "../../store/QuizContext";

import Quiz from "./Quiz";
import Layout from "../UI/Layout";

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

  console.log("index from play: ", index);

  const eventHandler = (e, key) => {
    setCategoryID({ categoryID: key });
  };

  const onSelect = (e) => {
    setCategory(e.target.value);
  };

  return !startPlay ? (
    <Layout>
      <Form className="pa3 w-100 flex flex-column justify-center items-center white">
        <h2>Quizy</h2>
        <Form.Field style={{ color: "#ffffff" }}>
          <label style={{ color: "#ffffff" }}>Category</label>
          <select onChange={onSelect}>
            {arrayOfData.map((cat) => {
              return (
                <option
                  key={cat.id}
                  id={cat.id}
                  value={cat.name}
                  onChange={() => eventHandler(cat.id)}
                >
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
        <button
          className={styles.cssbuttonsIoButton}
          type="submit"
          onClick={onPlay}
        >
          {" "}
          Get started
          <div className={styles.icon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
              ></path>
            </svg>
          </div>
        </button>
      </Form>
    </Layout>
  ) : (
    <Quiz data={data} index={index} />
  );
}

{
  /* <Button type="submit" onClick={onPlay}>
              Play
            </Button> */
}
