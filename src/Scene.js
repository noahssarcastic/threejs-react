import { useThree } from "react-three-fiber";
import {LineBasicMaterial, Vector3, BufferGeometry, Line} from 'three';
import {useEffect} from 'react';

const Scene = () => {
	const { scene } = useThree();

	const drawGrid = () => {
		const material = new LineBasicMaterial({
			color: 0xffffff,
			linewidth: 10,
		});

		let i;
		for (i=-10; i<=10; i++) {
			const points = [];
			points.push(new Vector3(-10, i, 0));
			points.push(new Vector3(10, i, 0));
			const geometry = new BufferGeometry().setFromPoints(points);
			const line = new Line(geometry, material);
			scene.add(line);
		}
		for (i=-10; i<=10; i++) {
			const points = [];
			points.push(new Vector3(i, -10, 0));
			points.push(new Vector3(i, 10, 0));
			const geometry = new BufferGeometry().setFromPoints(points);
			const line = new Line(geometry, material);
			scene.add(line);
		}
	};

	const drawAxes = () => {
		const red = new LineBasicMaterial({
			color: 0xff0000,
			linewidth: 10,
		});
		const x = [];
		x.push(new Vector3(0, 0, 0));
		x.push(new Vector3(100, 0, 0));
		const xAxis = new BufferGeometry().setFromPoints(x);
		scene.add(new Line(xAxis, red));

		const green = new LineBasicMaterial({
			color: 0x00ff00,
			linewidth: 10,
		});
		const y = [];
		y.push(new Vector3(0, 0, 0));
		y.push(new Vector3(0, 100, 0));
		const yAxis = new BufferGeometry().setFromPoints(y);
		scene.add(new Line(yAxis, green));

		const blue = new LineBasicMaterial({
			color: 0x0000ff,
			linewidth: 10,
		});
		const z = [];
		z.push(new Vector3(0, 0, 0));
		z.push(new Vector3(0, 0, 100));
		const zAxis = new BufferGeometry().setFromPoints(z);
		scene.add(new Line(zAxis, blue));
	};

	useEffect(() => {
		drawGrid();
		drawAxes();
	}, []);

	return null;
};

export default Scene;
