import type { FC } from 'react';

import { useFilterClearHandler } from '../lib/useFilterClearHandler';
import { useFilterSubmitHandler } from '../lib/useFilterSubmitHandler';
import { LabeledInput } from './LabeledInput';

interface FilterProps {
	resetCurrentPage: () => void;
}

export const Filter: FC<FilterProps> = ({ resetCurrentPage }) => {
	const { handleFilterSubmit } = useFilterSubmitHandler(resetCurrentPage);
	const { handleFilterClear } = useFilterClearHandler(resetCurrentPage);

	return (
		<form onSubmit={handleFilterSubmit}>
			<LabeledInput name="title" label="Название" type="text" />
			<LabeledInput name="buildType" label="Тип" type="text" />
			<LabeledInput name="country" label="Страна" type="text" />
			<LabeledInput name="city" label="Город" type="text" />

			<LabeledInput
				name="year-from"
				label="Год от"
				type="number"
				rest={{ min: 1000 }}
			/>
			<LabeledInput
				name="year-to"
				label="Год до"
				type="number"
				rest={{ min: 1000 }}
			/>

			<LabeledInput
				name="height-from"
				label="Высота от"
				type="number"
				rest={{ min: 1 }}
			/>
			<LabeledInput
				name="height-to"
				label="Высота до"
				type="number"
				rest={{ min: 1 }}
			/>

			<p>
				<button type="submit">Фильтровать</button>
				<button type="reset" onClick={handleFilterClear}>
					Очистить фильтр
				</button>
			</p>
		</form>
	);
};
