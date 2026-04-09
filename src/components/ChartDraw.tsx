import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState, type FC } from 'react';

interface ChartDrawProps {
	data: {
		labelX: string | number;
		values: [number, number];
	}[];
}

export const ChartDraw: FC<ChartDrawProps> = ({ data }) => {
	const chartRef = useRef<SVGSVGElement>(null);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
		const svg = d3.select(chartRef.current);

		setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
	}, [setWidth, setHeight]);

	// задаем отступы в svg-элементе
	const margin = {
		top: 10,
		bottom: 60,
		left: 40,
		right: 10,
	};

	// вычисляем ширину и высоту области для вывода графиков
	const boundsWidth = width - margin.left - margin.right;
	const boundsHeight = height - margin.top - margin.bottom;

	useEffect(() => {
		const svg = d3.select(chartRef.current);

		svg
			.append('circle')
			.attr('r', 100)
			.attr('cx', 200)
			.attr('cy', 200)
			.style('fill', 'red');
	}, []);

	const indexOY = 1; // диаграмма для максимальных значений
	let [min, max] = d3.extent(data.map((d) => d.values[1])) as [number, number];

	// формируем шкалы для осей
	const scaleX = useMemo(() => {
		return d3
			.scaleBand()
			.domain(data.map((d) => d.labelX.toString()))
			.range([0, boundsWidth]);
	}, [data, boundsWidth]);

	const scaleY = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([min * 0.85, max * 1.1])
			.range([boundsHeight, 0]);
	}, [boundsHeight, min, max]);

	useEffect(() => {
		const svg = d3.select(chartRef.current);
		svg.selectAll('*').remove();

		// рисуем оси
		const xAxis = d3.axisBottom(scaleX);
		svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
			.call(xAxis)
			.selectAll('text')
			.style('text-anchor', 'end')
			.attr('dx', '-.8em')
			.attr('dy', '.15em')
			.attr('transform', () => 'rotate(-30)');

		const yAxis = d3.axisLeft(scaleY);
		svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)
			.call(yAxis);

		//рисуем график
		svg
			.selectAll('.dot')
			.data(data)
			.enter()
			.append('circle')
			.attr('r', 5)
			.attr('cx', (d) => scaleX(d.labelX.toString())! + scaleX.bandwidth() / 2)
			.attr('cy', (d) => scaleY(d.values[indexOY]))
			.attr('transform', `translate(${margin.left}, ${margin.top})`)
			.style('fill', 'red');
	}, [scaleX, scaleY, data, height, margin.bottom, margin.left, margin.top]);

	return <svg ref={chartRef}></svg>;
};
