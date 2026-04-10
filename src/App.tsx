import { useMemo, useState } from 'react';

import { Chart } from './components/Chart';
import Table from './components/Table';

import './css/App.css';
import {
	BuildingsContext,
	type BuildingsContextType,
} from './context/BuildingsContext';
import buildings, { type Building } from './data';

function App() {
	const [currentBuildings, setCurrentBuildings] =
		useState<Building[]>(buildings);

	const buildingsContextValue = useMemo<BuildingsContextType>(
		() => ({
			currentBuildings,
			setCurrentBuildings,
			allBuildings: buildings,
		}),
		[currentBuildings, setCurrentBuildings],
	);

	return (
		<BuildingsContext.Provider value={buildingsContextValue}>
			<div className="app">
				<h3>Самые высокие здания и сооружения</h3>

				<Chart />

				<Table amountRows={10} isPaginationEnabled />
			</div>
		</BuildingsContext.Provider>
	);
}

export default App;
