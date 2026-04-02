import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import styles from '../css/Table.module.css'

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {
    return ( 
        <table className={styles['table']}>
            <TableHead head={Object.keys(props.data[0])} />
            <TableBody body={ props.data } />
        </table>
    )   
}

export default Table;
