import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState, type FC } from 'react';

interface ChartDrawProps {
	data: {
		labelX: string | number;
		values: [number, number];
	}[];
	isMaxValuesDrawEnabled: boolean;
	isMinValuesDrawEnabled: boolean;
	chartType: 'dot' | 'bar';
}

export const ChartDraw: FC<ChartDrawProps> = ({
	data,
	isMaxValuesDrawEnabled,
	isMinValuesDrawEnabled,
	chartType,
}) => {
	const chartRef = useRef<SVGSVGElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	// чтобы замерить контейнер сразу после вставки в DOM
	useEffect(() => {
		if (chartRef.current) {
			const { width, height } = chartRef.current.getBoundingClientRect();
			setDimensions({ width, height });
		}
	}, []);

	const { width, height } = dimensions;

	const margin = useMemo(
		() => ({
			top: 20,
			bottom: 60,
			left: 50,
			right: 20,
		}),
		[],
	);

	const boundsWidth = width - margin.left - margin.right;
	const boundsHeight = height - margin.top - margin.bottom;

	// расчет лимитов оси Y
	const [min, max] = useMemo(() => {
		const allValues: number[] = [];
		if (isMinValuesDrawEnabled) allValues.push(...data.map((d) => d.values[0]));
		if (isMaxValuesDrawEnabled) allValues.push(...data.map((d) => d.values[1]));

		if (allValues.length === 0) return [0, 100];
		return d3.extent(allValues) as [number, number];
	}, [data, isMinValuesDrawEnabled, isMaxValuesDrawEnabled]);

	const scaleX = useMemo(() => {
		return d3
			.scaleBand()
			.domain(data.map((d) => d.labelX.toString()))
			.range([0, Math.max(0, boundsWidth)])
			.padding(0.1);
	}, [data, boundsWidth]);

	const scaleY = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([min * 0.9, max * 1.1])
			.range([Math.max(0, boundsHeight), 0]);
	}, [min, max, boundsHeight]);

	useEffect(() => {
		if (width === 0 || height === 0) return;

		const svg = d3.select(chartRef.current);
		svg.selectAll('*').remove();

		if (!isMinValuesDrawEnabled && !isMaxValuesDrawEnabled) return;

		// Рисуем оси
		const xAxis = d3.axisBottom(scaleX);
		const yAxis = d3.axisLeft(scaleY);

		svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
			.call(xAxis)
			.selectAll('text')
			.attr('transform', 'rotate(-45)')
			.style('text-anchor', 'end');

		svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)
			.call(yAxis);

		const chartGroup = svg
			.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		// Общая логика для колонок (как в твоем chart.js)
		const activeSeries = [];
		if (isMinValuesDrawEnabled)
			activeSeries.push({ key: 0, color: 'blue', class: 'min' });
		if (isMaxValuesDrawEnabled)
			activeSeries.push({
				key: 1,
				color: 'rgba(255, 0, 0, 0.75)',
				class: 'max',
			});

		if (chartType === 'dot') {
			activeSeries.forEach((series) => {
				chartGroup
					.selectAll(`.dot-${series.class}`)
					.data(data)
					.enter()
					.append('circle')
					.attr('r', 5)
					.attr(
						'cx',
						(d) => scaleX(d.labelX.toString())! + scaleX.bandwidth() / 2,
					)
					.attr('cy', (d) => scaleY(d.values[series.key]))
					.style('fill', series.color);
			});
		} else {
			const groupPadding = 0.2;
			const barGap = 2;
			const groupWidth = scaleX.bandwidth() * (1 - groupPadding);
			const groupOffset = (scaleX.bandwidth() - groupWidth) / 2;
			const barWidth =
				(groupWidth - barGap * (activeSeries.length - 1)) / activeSeries.length;

			activeSeries.forEach((series, index) => {
				chartGroup
					.selectAll(`.bar-${series.class}`)
					.data(data)
					.enter()
					.append('rect')
					.attr(
						'x',
						(d) =>
							scaleX(d.labelX.toString())! +
							groupOffset +
							index * (barWidth + barGap),
					)
					.attr('y', (d) => scaleY(d.values[series.key]))
					.attr('width', Math.max(0, barWidth))
					.attr('height', (d) =>
						Math.max(0, boundsHeight - scaleY(d.values[series.key])),
					)
					.style('fill', series.color);
			});
		}
	}, [
		data,
		width,
		height,
		chartType,
		isMinValuesDrawEnabled,
		isMaxValuesDrawEnabled,
		scaleX,
		scaleY,
		margin,
		boundsHeight,
	]);

	return (
		<svg
			ref={chartRef}
			style={{ width: '100%', height: '400px', display: 'block' }}
		/>
	);
};
