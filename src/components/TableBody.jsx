import TableRow from './TableRow.jsx';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
*/
const TableBody = (props) => {

   //формируем строки на основе переданных данных
    const tbody = props.body.map((item, index) =>
        <TableRow key={index} row={Object.values(item)} />
    );
  
    return (
        <tbody>
            {tbody}
        </tbody>
    )
}

export default TableBody;