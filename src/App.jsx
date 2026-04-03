import Table from './components/Table'
import './css/App.css'
import buildings from './data'

function App() {
  return (
    <div className="app">
      <h3>Самые высокие здания и сооружения</h3>

      <Table data={buildings} amountRows={10} isPaginationEnabled />
    </div>
  )
}

export default App
