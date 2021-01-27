import {
	MeshStandardMaterial,
	Vector3,
	Geometry,
	Color,
	Face3,
	Mesh,
	DoubleSide
} from "three";
import { useThree } from "react-three-fiber";
import { useState, useEffect } from 'react';

import triangulate from "./utils";

const DelaunaySurface = (props) => {
	const { vertices } = props;

	const { scene } = useThree();

	const [faces, setFaces] = useState();

	const compute = () => {
		const projectedPoints = vertices.map(({ x, y, z }) => [x, y]);
		const triangulation = triangulate(projectedPoints);
		setFaces(triangulation);
	};

	useEffect(() => {
		compute();
	}, []);

	const drawSurface = () => {
		if (typeof faces === 'undefined') return;

		const material = new MeshStandardMaterial({ color: 0x00ff00 });
		material.side = DoubleSide;

		let i;
		for (i = 0; i < faces.length; i += 3) {
			//create a triangular geometry
			const geometry = new Geometry();
			let v0 = vertices[faces[i]];
			geometry.vertices.push(
				new Vector3(v0.x, v0.y, v0.z)
			);

			let v1 = vertices[faces[i+1]];
			geometry.vertices.push(
				new Vector3(v1.x, v1.y, v1.z)
			);

			let v2 = vertices[faces[i+2]];
			geometry.vertices.push(
				new Vector3(v2.x, v2.y, v2.z)
			);

			// console.log(v0, v1, v2);

			//create a new face using vertices 0, 1, 2
			// const color = new Color(0xffaa00); //optional
			const face = new Face3(0, 1, 2);

			//add the face to the geometry's faces array
			geometry.faces.push(face);

			//the face normals and vertex normals can be calculated automatically if not supplied above
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			scene.add(new Mesh(geometry, material));
		}
	};

	useEffect(() => {
		drawSurface();
	}, [faces]);

	return null;
};

export default DelaunaySurface;
