import styles from '../css/Table.module.css'

/*
   компонент, для вывода строки таблицы
   пропсы:
      row - данные для формирования ячеек строки таблицы в виде массива
*/
const TableRow = (props) => {
    if (!props.show) {
        return null;
    }

    const cells = (props.isHead) 
        ? props.row.map((item, index) => <th className={`${styles['table__td']} ${styles['table__th']}`} key={ index }>{item}</th>) 
        : props.row.map((item, index) => <td className={styles['table__td']} key={ index }>{item}</td>);
    return(
        <tr> 
           {cells} 
        </tr>
    )
}

export default TableRow;