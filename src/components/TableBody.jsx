import TableRow from './TableRow.jsx';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
      numPage - номер текущей страницы
      amountRows - количество строк таблицы на странице
*/
const TableBody = (props) => {
    // номера строк, отображаемых на странице
    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + (+props.amountRows);

    if (props.isPaginationEnabled) {
        const tbody = props.body.map((item, index) => (
            <TableRow key={index} row={Object.values(item)} show={index >= begRange && index < endRange} />
        ))
      
        return (
            <tbody>
                {tbody}
            </tbody>
        )
    }

    const tbody = props.body.map((item, index) => (
        <TableRow key={index} row={Object.values(item)} show />
    ))

    return (
        <tbody>
            {tbody}
        </tbody>
    )
}

export default TableBody;