import * as d3 from 'd3';
import { useEffect, useRef, type FC } from 'react';

// interface ChartDrawProps {}

// export const ChartDraw: FC<ChartDrawProps> = () => {
export const ChartDraw: FC = () => {
	const chartRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = d3.select(chartRef.current);

		svg
			.append('circle')
			.attr('r', 100)
			.attr('cx', 200)
			.attr('cy', 200)
			.style('fill', 'red');
	}, []);

	return <svg ref={chartRef}></svg>;
};
