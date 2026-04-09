import { useState, type FC, type MouseEventHandler } from 'react';

import type { Building } from '../data.js';
import { Filter } from './Filter.js';
import TableBody from './TableBody';
import TableHead from './TableHead.js';

import styles from '../css/Table.module.css';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

interface TableProps {
	amountRows: number;
	isPaginationEnabled: boolean;
	data: Building[];
}

const Table: FC<TableProps> = ({ amountRows, isPaginationEnabled, data }) => {
	//количество страниц разбиения таблицы
	const [dataTable, setDataTable] = useState<Building[]>(data);
	const n = Math.ceil(dataTable.length / amountRows);

	// массив с номерами страниц
	const arr = Array.from({ length: n }, (_, i) => i + 1);

	const [currentPage, setCurrentPage] = useState(1);
	const resetCurrentPage = () => setCurrentPage(1);

	const handlePageChange: MouseEventHandler<HTMLSpanElement> = (event) => {
		const value = +event.currentTarget.innerHTML;
		setCurrentPage(value);
	};

	// формируем совокупность span с номерами страниц
	const pages = arr.map((item) => {
		const className = [styles['pagination__item']];

		if (item === currentPage) {
			className.push(styles['pagination__item--highlighted']);
		}

		return (
			<span
				className={className.join(' ')}
				key={item}
				onClick={handlePageChange}
			>
				{item}
			</span>
		);
	});

	const paginationClassName = [styles['pagination']];

	if (!isPaginationEnabled) {
		paginationClassName.push(styles['pagination--hide']);
	}

	return (
		<>
			<h4>Фильтры</h4>
			<Filter
				resetCurrentPage={resetCurrentPage}
				setDataTable={setDataTable}
				fullData={data}
			/>

			<table className={styles['table']}>
				<TableHead head={Object.keys(data[0])} />
				<TableBody
					body={dataTable}
					amountRows={amountRows}
					numPage={currentPage}
					isPaginationEnabled={isPaginationEnabled}
				/>
			</table>

			<div className={paginationClassName.join(' ')}>{pages}</div>
		</>
	);
};

export default Table;
