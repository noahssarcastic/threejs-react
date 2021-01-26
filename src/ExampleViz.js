import * as React from "react";
import { Canvas } from "react-three-fiber";
import Controls from "./Controls";
import * as THREE from "three";

const ExampleViz = ({}) => {
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

  const geometry = new THREE.BufferGeometry();

  const points = [];
  let i;
  for (i = 0; i < polyline.points.length; i++) {
    let point = polyline.points[i];
    points.push(new THREE.Vector3(point[0], point[1], point[2]));
  }
  const materials = [];
  for (i = 0; i < polyline.colors.length; i++) {
    let color = polyline.colors[i];
    let material = new THREE.LineBasicMaterial({
      color: color,
      linewidth: 10,
      linecap: "round",
      linejoin: "round",
    });
    materials.push(material);
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  for (i = 0; i < polyline.points.length - 1; i++) {
    lineGeometry.addGroup(i, 2, i);
  }

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
      <line
        position={[0, -2.5, -10]}
        geometry={lineGeometry}
        material={materials}
      />
    </Canvas>
  );
};

export default ExampleViz;
