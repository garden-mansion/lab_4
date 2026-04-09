import type { FC } from 'react';

import styles from '../css/Table.module.css';

/*
   компонент, для вывода строки таблицы
   пропсы:
      row - данные для формирования ячеек строки таблицы в виде массива
*/

interface TableRowProps {
	row: string[];
	isHead?: boolean;
	show?: boolean;
}

const TableRow: FC<TableRowProps> = ({ row, isHead, show }) => {
	if (!show) {
		return null;
	}

	const cells = isHead
		? row.map((item, index) => (
				<th
					className={`${styles['table__td']} ${styles['table__th']}`}
					key={index}
				>
					{item}
				</th>
			))
		: row.map((item, index) => (
				<td className={styles['table__td']} key={index}>
					{item}
				</td>
			));
	return <tr>{cells}</tr>;
};

export default TableRow;
