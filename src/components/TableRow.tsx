import type { FC } from 'react';

import { mapCellToTd, mapCellToTh } from '../lib/cellMappers';

interface TableRowProps {
	row: string[];
	isHead?: boolean;
	show?: boolean;
}

const TableRow: FC<TableRowProps> = ({ row, isHead, show }) => {
	if (!show) {
		return null;
	}

	const cells = row.map(isHead ? mapCellToTh : mapCellToTd);
	return <tr>{cells}</tr>;
};

export default TableRow;
