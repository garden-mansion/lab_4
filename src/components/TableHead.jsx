import TableRow from './TableRow.jsx';

/*
   компонент, для вывода thead таблицы
   пропсы:
      head - данные для шапки таблицы в виде массива
*/
const TableHead = (props) => {
    return (
        <thead>
            <TableRow row={props.head} isHead show />
        </thead>
    )
}

export default TableHead;
