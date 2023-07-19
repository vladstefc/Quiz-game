import { useState, useEffect } from "react";

import "./App.css";
import Game from "./components/Game/Game";
import Quiz from "./components/Game/Quiz";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import Rank from "./components/Rank/Rank";
import Register from "./components/register/Register";

import { QuizContext } from "./store/QuizContext";

function App() {
  const [input, setInput] = useState("");
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userJoined, setUserJoined] = useState("");
  const [userRank, setUserRank] = useState(0);

  const [arrayOfData, setArrayOfData] = useState([]);

  const [startPlay, setStartPlay] = useState(false);

  const [category, setCategory] = useState("");

  const [index, setIndex] = useState(0);

  let quiz = {};

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const loadUser = (data) => {
    setUserID(data.id);
    setUserName(data.name);
    setUserEmail(data.email);
    setUserJoined(data.joined);
    setUserRank(data.rank);
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setRoute("signout");
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute("route");
  };

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
        }}
      >
        {/* <Navbar isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <h2>asdsd</h2>
          <Rank name={userName} rank={userRank} />
          <Game />
        </div>
      ) : route === "signin" ? (
        <Login onRouteChange={onRouteChange} loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRouteChange} loadUser={loadUser} />
      )} */}
        {/* {!startPlay ? <Game arrayOfData={arrayOfData} /> : <Quiz />} */}
        <Game arrayOfData={arrayOfData} />
        {/* <Quiz /> */}
      </QuizContext.Provider>
    </div>
  );
}

export default App;
