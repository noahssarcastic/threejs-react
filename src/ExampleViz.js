import React, { useEffect, useState } from "react";
import { Canvas, extend, useResource } from "react-three-fiber";
import { ConvexGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

import Controls from "./Controls";
import PointSphere from "./PointSphere";
import Camera from "./Camera";
import Scene from "./Scene";
import Polyline from "./Polyline";
import DelaunaySurface from "./DelaunaySurface";

extend({ ConvexGeometry });

const ExampleViz = (props) => {
  const { wells } = props;

  const stratigraphyConfig = {
    layers: [
      "topo",
      "etchegoin",
      "macoma",
      "chanac",
      "mclure",
      "santa_margarita",
      "fuitvale",
      "round_mountain",
      "olcese",
      "freeman_jewett",
      "vedder",
      "eocene",
      "cretaceous",
      "basement",
    ],
    colors: [
      "#2f4f4f",
      "#8b4513",
      "#228b22",
      "#4b0082",
      "#ff0000",
      "#ffff00",
      "#00ff00",
      "#00ffff",
      "#0000ff",
      "#ff00ff",
      "#eee8aa",
      "#6495ed",
      "#ff69b4",
    ],
  };

  const mesh = useResource();

  const [topo, setTopo] = useState([]);
  const [polylines, setPolylines] = useState([]);

  useEffect(() => {
    if (wells.length <= 0) return;

    let i, xmin, xmax, ymin, ymax, zmin, zmax;
    let layers = stratigraphyConfig.layers;
    for (i = 0; i < wells.length; i++) {
      let well = wells[i];

      if (typeof xmin === "undefined") {
        xmin = well.x;
        xmax = well.x;
        ymin = well.y;
        ymax = well.y;
        zmin = well[layers[layers.length - 1]];
        zmax = well[layers[0]];
        continue;
      }

      xmin = Math.min(well.x, xmin);
      xmax = Math.max(well.x, xmax);
      ymin = Math.min(well.y, ymin);
      ymax = Math.max(well.y, ymax);
      zmin = Math.min(well[layers[layers.length - 1]], zmin);
      zmax = Math.max(well[layers[0]], zmax);
    }

    let xrange = xmax - xmin,
      yrange = ymax - ymin,
      zrange = zmax - zmin,
      scale = 20,
      offset = scale / 2;

    // Draw polylines
    let polylines = [];
    for (i = 0; i < wells.length; i++) {
      let well = wells[i];
      let points = [];
      let j;
      for (j = 0; j < stratigraphyConfig.layers.length; j++) {
        let layerName= layers[j];
        points.push([
          ((well.x - xmin) / xrange) * scale - offset, 
          ((well.y - ymin) / yrange) * scale - offset, 
          ((well[layerName] - zmin) / zrange) * scale
        ]);
      }
      polylines.push(points);
      // const layer_data = wells.map((well) => {
      //   return {
      //     x: ((well.x - xmin) / xrange) * scale - offset,
      //     y: ((well.y - ymin) / yrange) * scale - offset,
      //     z: ((well.topo - zmin) / zrange) * scale - offset,
      //   };
      // });
      // setTopo(topo_data);
      // <PointSphere ref={mesh} data={topo} />
      // <DelaunaySurface vertices={topo} />
    }
    setPolylines(polylines);
  }, [wells]);

  // if (topo.length <= 0) return null;

  return (
    <Canvas>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <Scene />

      {polylines.map((points, i) => <Polyline key={`polyline-${i}`} points={points} colors={stratigraphyConfig.colors}/>)}
    </Canvas>
  );
};

export default ExampleViz;
