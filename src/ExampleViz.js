import { Canvas } from "react-three-fiber";

import Controls from "./Controls";
import Polyline from './Polyline'

const ExampleViz = () => {
  const polyline = {
    points: [
      [0, 0, 1],
      [0, 0, 0.5],
      [0, 0, 0],
      [0, 0, -0.5],
      [0, 0, -1],
    ],
    colors: ["#FFFFFF", "#FF0000", "#00FF00", "#0000FF"],
  };

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <Polyline points={polyline.points} colors={polyline.colors}/>
    </Canvas>
  );
};

export default ExampleViz;
