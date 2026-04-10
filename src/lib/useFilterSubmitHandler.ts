import { useCallback, type SubmitEventHandler } from 'react';

import { useBuildingsContext } from '../context/BuildingsContext';
import type { Building } from '../data';

export const useFilterSubmitHandler = (resetCurrentPage: () => void) => {
	const { setCurrentBuildings, allBuildings } = useBuildingsContext();

	const handleFilterSubmit: SubmitEventHandler<HTMLFormElement> = useCallback(
		(event) => {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);

			//фильтруем данные по значениям всех полей формы
			let arr: Building[] = [...allBuildings];

			for (const [key, value] of formData.entries()) {
				arr = arr.filter((item) => {
					if (!key.endsWith('-to') && !key.endsWith('-from')) {
						const stringCheckResult = (item[key as keyof Building] as string)
							.toLowerCase()
							.includes(value.toString().toLowerCase());

						return stringCheckResult;
					}
					const year = item.year;
					const height = item.height;

					if (!value) {
						return true;
					}

					const numberValue = +value.toString();

					if (key === 'year-from') return year >= numberValue;
					if (key === 'year-to') return year <= numberValue;
					if (key === 'height-from') return height >= numberValue;
					if (key === 'height-to') return height <= numberValue;
				});
			}

			setCurrentBuildings(arr);
			resetCurrentPage();
		},
		[setCurrentBuildings, resetCurrentPage, allBuildings],
	);

	return {
		handleFilterSubmit,
	};
};
