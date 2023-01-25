import React, { useEffect } from "react";
import classes from './Users.module.css'
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import UserForm from "./UsersForm";
import { FilterType, getUsers, setUnFollowStatus, setFollowStatus } from "../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getIsFollowingInProgres, getPageSize, getTotalUserCount, getUsersData, getUsersFilter } from "../../redux/Selectors/usersSelectors";
import { AppDispatch } from "../../Store/reduxStore";
import {  useSearchParams } from "react-router-dom";

type PropsType = {
}


export const Users: React.FC<PropsType> = (props) => {

    const dispatch: AppDispatch = useDispatch();

    const followingInProgres = useSelector(getIsFollowingInProgres);
    const totalUserCount = useSelector(getTotalUserCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const usersData = useSelector(getUsersData)

    const onPageChange = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }
    const setFollowStatusFunction = (id: number) => {
        dispatch(setFollowStatus(id))
    }
    const setUnFollowStatusFunction = (id: number) => {
        dispatch(setUnFollowStatus(id))
    }
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {

        const result: any = {}
        // @ts-ignore
        for (const [key, value] of searchParams.entries()) {
            let value2: any = +value
            if (isNaN(value2)) {
                value2 = value
            }
            if (value === 'true') {
                value2 = true
            } else if (value === 'false') {
                value2 = false
            }
            result[key] = value2
        }

        let actualPage = result.page || currentPage
        let term = result.term || filter.term

        let friend = result.friend || filter.friend
        if (result.friend === false) {
            friend = result.friend
        }

        const actualFilter = { friend, term }

        dispatch(getUsers(actualPage, pageSize, actualFilter))

    }, [])

    useEffect(() => {

        const term = filter.term
        const friend = filter.friend

        let urlQuery =
            (term === '' ? '' : `&term=${term}`)
            + (friend === null ? '' : `&friend=${friend}`)
            + (currentPage === 1 ? '' : `&page=${currentPage}`)

        setSearchParams(urlQuery)

    }, [filter, currentPage])

    return (
        <div className={classes.usersList}>
            <UserForm onFilterChanged={onFilterChanged} />
            {usersData.map(item =>
                <div key={item.id} className={classes.item}>
                    <User user={item} followingInProgres={followingInProgres} setFollowStatus={setFollowStatusFunction} setUnFollowStatus={setUnFollowStatusFunction} />
                </div>
            )}
            <div className={classes.pagination}>
                <Paginator totalItemsCount={totalUserCount} pageSize={pageSize} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
        </div>
    )
}