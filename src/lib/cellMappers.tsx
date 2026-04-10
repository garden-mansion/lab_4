import styles from '../css/Table.module.css';

export const mapCellToTd = (cell: string, index: number) => (
	<td className={styles.table__td} key={index}>
		{cell}
	</td>
);

export const mapCellToTh = (cell: string, index: number) => (
	<th className={`${styles.table__td} ${styles.table__th}`} key={index}>
		{cell}
	</th>
);
