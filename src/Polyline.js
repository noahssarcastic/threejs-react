import { BufferGeometry, Vector3, LineBasicMaterial } from "three";
import { useEffect, useState } from "react";

const Polyline = (props) => {
	const { points, colors } = props;

	const [materials, setMaterials] = useState();
	const [geometry, setGeometry] = useState();

	const drawSegments = () => {
		const vectors = [];
		let i;
		for (i = 0; i < points.length; i++) {
			let point = points[i];
			vectors.push(new Vector3(point[0], point[1], point[2]));
		}
		const materials = [];
		for (i = 0; i < colors.length; i++) {
			let color = colors[i];
			let material = new LineBasicMaterial({
				color: color,
			});
			materials.push(material);
		}

		const lineGeometry = new BufferGeometry().setFromPoints(vectors);
		for (i = 0; i < points.length - 1; i++) {
			lineGeometry.addGroup(i, 2, i);
		}

		setGeometry(lineGeometry);
		setMaterials(materials);
	};

	useEffect(() => {
		drawSegments();
	}, [points, colors]);

	return (
		<line
			position={[0, -2.5, -10]}
			geometry={geometry}
			material={materials}
		/>
	);
};

export default Polyline;
