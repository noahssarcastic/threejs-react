import React, { useState, useEffect } from "react";

import ExampleViz from "./ExampleViz";

const App = () => {
  const [wells, setWells] = useState([]);

  const loadWells = () => {
    fetch("http://localhost:3000/wells")
      .then((res) => res.json())
      .then(
        (wells) => {
          setWells(wells);
        },
        (error) => {
          console.log("loadWells: ", error);
        }
      );
  };

  useEffect(() => {
    loadWells();
    // console.log(wells);
  }, []);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        position: "relative",
        padding: "16px",
        "box-sizing": "border-box",
        "background-color": "#000",
      }}
    >
      <ExampleViz wells={wells} />
    </div>
  );
};

export default App;
