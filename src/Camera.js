import React, {useEffect, useRef} from 'react';
import { Vector3, Box3 } from 'three'
import { useThree, useFrame } from 'react-three-fiber';

const Camera = (props) => {
  const {
    target
  } = props;

  const ref = useRef();

  const { setDefaultCamera } = useThree()
  
  useEffect(() => void setDefaultCamera(ref.current), []) // Make the camera known to the system

  useFrame(() => ref.current.updateMatrixWorld()) // Update it every frame

  const fitCameraToObject = function (camera, object, offset, controls) {
    offset = offset || 1.25;

    const boundingBox = new Box3();
    boundingBox.setFromObject(object); // get bounding box of object

    const center = boundingBox.getCenter();
    const size = boundingBox.getSize();
    const maxDim = Math.max( size.x, size.y, size.z ); // get max side of bounding box (fits to width OR height)
    const fov = camera.fov * ( Math.PI / 180 );
    let cameraZ = Math.abs( maxDim / 4 * Math.tan( fov * 2 ) );
    cameraZ *= offset; // zoom out a little so that objects don't fill the screen
    camera.position.z = cameraZ;

    const minZ = boundingBox.min.z;
    const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;
    camera.far = cameraToFarEdge * 3;
    camera.updateProjectionMatrix();

    if (controls) {
      controls.target = center; // set camera to rotate around center of loaded object
      controls.maxDistance = cameraToFarEdge * 2; // prevent zooming out enough to create far plane cutoff
      controls.saveState();
    } else camera.lookAt(center);
  };

  useEffect(() => {
    fitCameraToObject(ref.current, target.current)
  }, []);

  return (
    <perspectiveCamera ref={ref} {...props} />
  );
};

export default Camera;
