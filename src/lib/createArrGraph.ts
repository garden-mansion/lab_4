import * as d3 from 'd3';

import type { Building } from '../data';

export const createArrGraph = (data: Building[], key: 'country' | 'year') => {
	const groupObj = d3.group(data, (d) => d[key]);
	let arrGraph = [];

	for (let entry of groupObj) {
		let minMax = d3.extent(entry[1].map((d) => d['height']));
		if (minMax[0] === undefined || minMax[1] === undefined) {
			continue;
		}

		arrGraph.push({ labelX: entry[0], values: minMax });
	}

	return arrGraph;
};
