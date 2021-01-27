import {
  MeshStandardMaterial,
  MeshBasicMaterial,
  BufferGeometry,
  BufferAttribute,
  DoubleSide,
  Color,
} from "three";
import { useState, useEffect } from "react";

import triangulate from "./utils";

const DelaunaySurface = (props) => {
  console.log("render");

  const { vertices, color } = props;

  const [material, setMaterial] = useState();
  const [geometry, setGeometry] = useState();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    console.log("draw");

    const computeFaces = () => {
      const projectedPoints = vertices.map(({ x, y, z }) => [x, y]);
      const triangulation = triangulate(projectedPoints);
      return triangulation;
    };

    const drawGeometry = (faces) => {
      const geometry = new BufferGeometry();
      let positions = [];
      let i;
      for (i = 0; i < faces.length; i += 3) {
        //create a triangular geometry
        let v0 = vertices[faces[i]];
        positions.push(v0.x, v0.y, v0.z);
        let v1 = vertices[faces[i + 1]];
        positions.push(v1.x, v1.y, v1.z);
        let v2 = vertices[faces[i + 2]];
        positions.push(v2.x, v2.y, v2.z);
      }
      geometry.computeFaceNormals();
      geometry.computeVertexNormals();
      geometry.setAttribute(
        "position",
        new BufferAttribute(Float32Array.from(positions), 3)
      );
      setGeometry(geometry);
    };

    drawGeometry(computeFaces());
  }, [vertices]);

  useEffect(() => {
    console.log("material");

    const material = new MeshBasicMaterial({
      color: color,
      opacity: 0.6,
      transparent: !hovered,
    });
    material.side = DoubleSide;
    setMaterial(material);
  }, [color, hovered]);

  return (
    <mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      geometry={geometry}
      material={material}
      onClick={(e) => {
        e.stopPropagation();
        console.log(e);
      }}
    />
  );
};

export default DelaunaySurface;
