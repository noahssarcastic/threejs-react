import {useRef, useEffect} from 'react';
import {Object3D} from 'three';

// re-use for instance computations
const scratchObject3D = new Object3D();

const PointSphere = ({ data }) => {
  const meshRef = useRef();
  const numPoints = data.length;

  // update instance matrices only when needed
  useEffect(() => {
    const mesh = meshRef.current;

    // set the transform matrix for each instance
    for (let i = 0; i < data.length; ++i) {
      const { x, y, z } = data[i];
      // console.log(x, y, z);

      scratchObject3D.position.set(x, y, z);
      scratchObject3D.rotation.set(0.5 * Math.PI, 0, 0); // cylinders face z direction
      scratchObject3D.updateMatrix();
      mesh.setMatrixAt(i, scratchObject3D.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  }, [data]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
      <cylinderBufferGeometry attach="geometry" args={[1.001, 0.001, 0.001, 32]} />
      <meshStandardMaterial attach="material" color="#fff" />
    </instancedMesh>
  );
};

export default PointSphere;
