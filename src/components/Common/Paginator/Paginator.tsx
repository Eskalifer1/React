import React from "react"
import { useState, useEffect } from "react"
import classes from './Paginator.module.css'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}

let Paginator: React.FC<PropsType> = ({
    totalItemsCount,
    pageSize,
    currentPage,
    onPageChange }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    useEffect(() => setPortionNumber(Math.ceil(currentPage / pageSize)), [currentPage]);

    let portionCount = Math.ceil(pagesCount / pageSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionPageNumber = (portionNumber - 1) * pageSize + 1
    let rightPortionPageNumber = portionNumber * pageSize;
    return (
        <>
            {
                portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>Previos</button>
            }
            {
                pages
                    .filter(i => i >= leftPortionPageNumber && i <= rightPortionPageNumber)
                    .map(item => {
                        return <a className={currentPage === item ? (`${classes.paginationItem} ${classes.Selected}`) : classes.paginationItem} href="#"
                            onClick={() => onPageChange(item)} key={item}>{item}</a>
                    })
            }
            {
                portionCount > portionNumber && <button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>
            }
        </>
    )
}

export default Paginator