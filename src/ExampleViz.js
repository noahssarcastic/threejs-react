import React, {useEffect, useState} from 'react';
import { Canvas, extend, useResource } from 'react-three-fiber'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

import Controls from './Controls';
import PointSphere from './PointSphere'
import Camera from './Camera'
import Scene from './Scene' 
import Polyline from './Polyline' 
import DelaunaySurface from './DelaunaySurface';

extend({ ConvexGeometry });

const ExampleViz = (props) => {
  const {wells} = props;

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

  const mesh = useResource();
  
  const [topo, setTopo] = useState([]) 

  useEffect(() => {
    if (wells.length > 0) {

      let i, xmin, xmax, ymin, ymax, zmin, zmax;
      for (i = 0; i < wells.length; i++) {
        if (typeof xmin === 'undefined') {
          xmin = wells[i].x;
          xmax = wells[i].x;
          ymin = wells[i].y;
          ymax = wells[i].y;
          zmin = wells[i].topo;
          zmax = wells[i].topo;
          continue;
        } 

        xmin = Math.min(wells[i].x, xmin);
        xmax = Math.max(wells[i].x, xmax);
        ymin = Math.min(wells[i].y, ymin);
        ymax = Math.max(wells[i].y, ymax);
        zmin = Math.min(wells[i].topo, zmin);
        zmax = Math.max(wells[i].topo, zmax);
      }

      // console.log(xmin, xmax, ymin, ymax, zmin, zmax);

      const topo_data = wells.map(well => {
        return {
          x: ((well.x-xmin)/(xmax-xmin))*20 - 10, 
          y: ((well.y-ymin)/(ymax-ymin))*20 - 10, 
          z: ((well.topo-zmin)/(zmax-zmin))*20 - 10
        };
      });
      setTopo(topo_data);
      // console.log(topo_data)
    }
  }, [wells]); 

  if (topo.length <= 0) return null;

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
      <Polyline points={polyline.points} colors={polyline.colors}/>
      {/*<mesh ref={mesh} position={[0, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial attach="material" color="#fff" />
      </mesh>*/}
      <PointSphere ref={mesh} data={topo}/>
      <Scene />
      <DelaunaySurface vertices={topo}/>
    </Canvas>
  );
};

export default ExampleViz;
