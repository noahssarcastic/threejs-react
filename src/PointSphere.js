import { useEffect, forwardRef } from "react";
import { Object3D, MeshBasicMaterial, Mesh, Vector3 } from "three";
import { useThree } from "react-three-fiber";
import { ConvexBufferGeometry } from "three/examples/jsm/geometries/ConvexGeometry";

// re-use for instance computations
const scratchObject3D = new Object3D();

const PointSphere = forwardRef((props, meshRef) => {
  const { data } = props;

  const numPoints = data.length;

  const { scene } = useThree();

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

  const drawHull = () => {
    const points = data.map(({ x, y, z }) => new Vector3(x, y, z));
    const geometry = new ConvexBufferGeometry(points);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
  };

  useEffect(() => {
    // drawHull();
  }, []);

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, numPoints]}
      frustumCulled={false}
    >
      <sphereBufferGeometry attach="geometry" args={[0.1, 32, 32]} />
      <meshStandardMaterial attach="material" color="#fff" />
    </instancedMesh>
  );
});

export default PointSphere;
