import {
	createContext,
	useContext,
	type Dispatch,
	type SetStateAction,
} from 'react';

import type { Building } from '../data';

export interface BuildingsContextType {
	currentBuildings: Building[];
	setCurrentBuildings: Dispatch<SetStateAction<Building[]>>;

	allBuildings: Building[];
}

export const BuildingsContext = createContext<BuildingsContextType | null>(
	null,
);

export const useBuildingsContext = () => {
	const context = useContext(BuildingsContext);

	if (!context) {
		throw new Error('buildings context не определен');
	}

	const { setCurrentBuildings, allBuildings } = context;

	const resetBuildings = () => {
		setCurrentBuildings(allBuildings);
	};

	return {
		...context,
		resetBuildings,
	};
};
