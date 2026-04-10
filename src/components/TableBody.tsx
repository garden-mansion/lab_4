import type { FC } from 'react';

import type { Building } from '../data.js';
import { getBuildingToRowMapper } from '../lib/getBuildingToRowMapper.js';

interface TableBodyProps {
	amountRows: number;
	numPage: number;
	isPaginationEnabled: boolean;
	body: Building[];
}

const TableBody: FC<TableBodyProps> = ({
	amountRows,
	numPage,
	isPaginationEnabled,
	body,
}) => {
	let begRange: number | undefined;
	let endRange: number | undefined;

	if (isPaginationEnabled) {
		begRange = (numPage - 1) * amountRows;
		endRange = begRange + amountRows;
	}

	const mapBuildingToRow = getBuildingToRowMapper({ begRange, endRange });
	const tbody = body.map(mapBuildingToRow);

	return <tbody>{tbody}</tbody>;
};

export default TableBody;
