import { useBuildingsContext } from '../context/BuildingsContext';

export const useFilterClearHandler = (resetCurrentPage: () => void) => {
	const { resetBuildings } = useBuildingsContext();

	const handleFilterClear = () => {
		resetBuildings();
		resetCurrentPage();
	};

	return {
		handleFilterClear,
	};
};
