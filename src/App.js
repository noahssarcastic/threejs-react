import React, { useState, useEffect } from "react";

import ExampleViz from "./ExampleViz";

const App = () => {
  const [wells, setWells] = useState([]);

  const loadWells = async () => {
    return fetch("http://localhost:3000/wells")
      .then((res) => res.json())
      .then((well_data) => {
        setWells(well_data);
      })
      .catch((err) => {
        console.log("loadWells: ", err);
      });
  };

  useEffect(() => {
    loadWells();
  }, []);

  if (wells.length <= 0) {
    return null;
  }

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        position: "relative",
        padding: "16px",
        boxSizing: "border-box",
        backgroundColor: "#000",
      }}
    >
      <ExampleViz wells={wells} />
    </div>
  );
};

export default App;
