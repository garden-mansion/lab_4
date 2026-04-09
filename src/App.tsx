import { Chart } from './components/Chart';
import Table from './components/Table';

import './css/App.css';
import buildings from './data';

function App() {
	return (
		<div className="app">
			<h3>Самые высокие здания и сооружения</h3>

			<Chart data={buildings} />

			<Table data={buildings} amountRows={10} isPaginationEnabled />
		</div>
	);
}

export default App;
