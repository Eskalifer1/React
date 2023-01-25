import { Pagination, PaginationProps } from "antd"
import React from "react"
import classes from './Paginator.module.css'

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChange: (pageNumber: number) => void
}

let Paginator: React.FC<PropsType> = React.memo(({
    totalItemsCount,
    currentPage,
    onPageChange }) => {
        console.log(currentPage)
    const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
        if (type === 'prev') {
            return <a>Previous</a>;
        }
        if (type === 'next') {
            return <a>Next</a>;
        }
        return originalElement;
    };
    return (
        <>
            <Pagination defaultCurrent={1} current={currentPage} total={totalItemsCount} itemRender={itemRender} onChange={onPageChange} />
        </>
    )
})

export default Paginator