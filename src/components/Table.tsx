import TableHead from './TableHead.js';
import TableBody from './TableBody';
import styles from '../css/Table.module.css'
import { useState, type FC, type MouseEventHandler } from 'react';
import type { Building } from '../data.js';

/*
   компонент, выводящий на страницу таблицу 
   пропсы:
      data - данные для таблицы в виде массива объектов
*/

interface TableProps {
    amountRows: number;
    isPaginationEnabled: boolean;
    data: Building[]
}

const Table: FC<TableProps> = (props) => {

    //количество страниц разбиения таблицы
    const n = Math.ceil(props.data.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (_, i) => i + 1);

    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange: MouseEventHandler<HTMLSpanElement> = (event) => {
        const value = +event.currentTarget.innerHTML;
        setCurrentPage(value);
    }

    // формируем совокупность span с номерами страниц
    const pages = arr.map((item) => {
        const className = [styles['pagination__item']]

        if (item === currentPage) {
            className.push(styles['pagination__item--highlighted'])
        }

        return <span className={className.join(' ')} key={item} onClick={handlePageChange}>{item}</span>
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
