import React from "react";
import classes from './Users.module.css'
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {
    return (
        <div className={classes.usersList}>
            {props.usersData.map(item =>
                <div key={item.id} className={classes.item}>
                   <User user = {item} isFollowingInProgres = {props.isFollowingInProgres} setFollowStatus = {props.setFollowStatus} setUnFollowStatus = {props.setUnFollowStatus}/>
                </div>
            )}
            <div className={classes.pagination}>
                <Paginator totalItemsCount = {props.totalUserCount} pageSize = {props.pageSize} currentPage = {props.currentPage} onPageChange = {props.onPageChange}/>
            </div>
        </div>
    )
}

export default Users