import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import styles from '../css/Table.module.css'
import { useState } from 'react';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = (props) => {

    //количество страниц разбиения таблицы
    const n = Math.ceil(props.data.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (_, i) => i + 1);

    const [currentPage, setCurrentPage] = useState(1);

    // формируем совокупность span с номерами страниц
    const pages = arr.map((item) => {
        const className = [styles['pagination__item']]

        if (item === currentPage) {
            className.push(styles['pagination__item--highlighted'])
        }

        return <span className={className.join(' ')} key={item}>{item}</span>
    }
    );

    const paginationClassName = [styles['pagination']];

    if (!props.isPaginationEnabled) {
        paginationClassName.push(styles['pagination--hide'])
    } 


    return (
        <>
            <table className={styles['table']}>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody body={props.data} amountRows={props.amountRows} numPage={currentPage} isPaginationEnabled={props.isPaginationEnabled} />
            </table>

            <div className={paginationClassName.join(' ')}>
                {pages}
            </div>
        </>
    )
}

export default Table;
