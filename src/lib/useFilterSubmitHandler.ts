import { useCallback, type SubmitEventHandler } from 'react';

import { useBuildingsContext } from '../context/BuildingsContext';
import type { Building } from '../data';

export const useFilterSubmitHandler = (resetCurrentPage: () => void) => {
	const { setCurrentBuildings, allBuildings } = useBuildingsContext();

	const handleFilterSubmit: SubmitEventHandler<HTMLFormElement> = useCallback(
		(event) => {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);

			// создаем словарь со значениями полей формы
			const filterField: Pick<
				Building,
				'title' | 'buildType' | 'country' | 'city'
			> & {
				yearFrom: number;
				yearTo: number;
				heightFrom: number;
				heightTo: number;
			} = {
				title: formData.get('title')!.toString().toLowerCase(),
				buildType: formData.get('buildType')!.toString().toLowerCase(),
				country: formData.get('country')!.toString().toLowerCase(),
				city: formData.get('city')!.toString().toLowerCase(),

				yearFrom: formData.get('year-from') ? +formData.get('year-from')! : 0,
				yearTo: formData.get('year-to') ? +formData.get('year-to')! : 0,
				heightFrom: formData.get('height-from')
					? +formData.get('height-from')!
					: 0,
				heightTo: formData.get('height-to') ? +formData.get('height-to')! : 0,
			};

			//фильтруем данные по значениям всех полей формы
			let arr: Building[] = [...allBuildings];
			for (const key in filterField) {
				if (
					key !== 'title' &&
					key !== 'buildType' &&
					key !== 'country' &&
					key !== 'city' &&
					key !== 'yearFrom' &&
					key !== 'yearTo' &&
					key !== 'heightFrom' &&
					key !== 'heightTo'
				)
					continue;

				arr = arr.filter((item) => {
					if (
						key === 'buildType' ||
						key === 'title' ||
						key === 'country' ||
						key === 'city'
					) {
						const stringCheckResult = item[key]
							.toLowerCase()
							.includes(filterField[key]);

						return stringCheckResult;
					}
					const year = item.year;
					const height = item.height;

					if (!filterField[key]) return true;

					if (key === 'yearFrom') return year >= filterField[key];
					if (key === 'yearTo') return year <= filterField[key];
					if (key === 'heightFrom') return height >= filterField[key];
					if (key === 'heightTo') return height <= filterField[key];
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
