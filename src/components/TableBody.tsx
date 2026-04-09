import type { FC } from 'react';

import type { Building } from '../data.js';
import TableRow from './TableRow.js';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
      numPage - номер текущей страницы
      amountRows - количество строк таблицы на странице
*/

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
	// номера строк, отображаемых на странице
	const begRange = (numPage - 1) * amountRows;
	const endRange = begRange + amountRows;

	if (isPaginationEnabled) {
		const tbody = body.map((item, index) => (
			<TableRow
				key={index}
				row={Object.values(item)}
				show={index >= begRange && index < endRange}
			/>
		));

		return <tbody>{tbody}</tbody>;
	}

	const tbody = body.map((item, index) => (
		<TableRow key={index} row={Object.values(item)} show />
	));

	return <tbody>{tbody}</tbody>;
};

export default TableBody;
