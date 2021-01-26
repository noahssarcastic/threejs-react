import React, {useEffect, useState, useRef} from 'react';
import { Canvas, extend } from 'react-three-fiber'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { Vector3, Box3 } from 'three'
import { useThree, useFrame, useResource } from 'react-three-fiber';

import Controls from './Controls';
import PointSphere from './PointSphere'
import Camera from './Camera'

extend({ ConvexGeometry });

const ExampleViz = (props) => {
  const {wells} = props;

  const mesh = useResource();
  
  const [topo, setTopo] = useState([]) 

  useEffect(() => {
    if (wells.length > 0) {
      const topo_data = wells.map(well => {
        return {x: well.x, y: well.y, z: well.topo}
      });
      setTopo(topo_data);
      // console.log(topo_data)
    }
  }, [wells]); 

  if (topo.length <= 0) return null;

  return (
    <Canvas>
      <Camera target={mesh} position={[0, 0, 10]}/>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        skyColor="#ffffbb"
        groundColor="#080820"
        intensity={1.0}
      />
      <mesh ref={mesh} position={[0, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial attach="material" color="#fff" />
      </mesh>
    </Canvas>
  );
};

export default ExampleViz;
