import { useState, useEffect } from "react";

import "./App.css";
import Game from "./components/Game/Game";
import Quiz from "./components/Game/Quiz";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Rank from "./components/Rank/Rank";
import Register from "./components/register/Register";
import RootLayout from "./components/navbar/Root";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { QuizContext } from "./store/QuizContext";

function App() {
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  // const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  // const [userRank, setUserRank] = useState(0);

  const [arrayOfData, setArrayOfData] = useState([]);
  const [startPlay, setStartPlay] = useState(false);
  const [category, setCategory] = useState("General Knowledge");
  const [index, setIndex] = useState(0);

  let quiz = {};

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((res) => {
        setArrayOfData(res.trivia_categories);
      });
  }, []);

  return (
    <div className="App">
      <QuizContext.Provider
        value={{
          startPlay,
          setStartPlay,
          quiz,
          category,
          setCategory,
          index,
          setIndex,
          userName,
          setUserName,
        }}
      >
        <Router>
          <div>
            <section>
              <Routes>
                {" "}
                {/* <Route path="/" element={<Game arrayOfData={arrayOfData} />} /> */}
                <Route
                  path="/game"
                  element={<Game arrayOfData={arrayOfData} />}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
              </Routes>
            </section>
          </div>
        </Router>

        {/* <Game arrayOfData={arrayOfData} /> */}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
