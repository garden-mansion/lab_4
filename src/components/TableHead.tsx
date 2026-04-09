import type { FC } from 'react';

import TableRow from './TableRow.js';

/*
   компонент, для вывода thead таблицы
   пропсы:
      head - данные для шапки таблицы в виде массива
*/

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
