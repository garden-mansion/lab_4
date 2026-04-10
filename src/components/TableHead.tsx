import type { FC } from 'react';

import TableRow from './TableRow.js';

interface TableHeadProps {
	head: string[];
}

const TableHead: FC<TableHeadProps> = ({ head }) => {
	return (
		<thead>
			<TableRow row={head} isHead show />
		</thead>
	);
};

export default TableHead;
