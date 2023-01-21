import React from 'react';
import classes from './DialogItem.module.css';
import { NavLink } from "react-router-dom";

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = ({ id, name }) => {
    let path = `/dialogs/${id}`;

    return (
        <div className={classes.dialog}>
            <NavLink to={path} className={({ isActive }) => isActive ? classes.active : undefined}>{name}</NavLink>
        </div>
    )
}

export default DialogItem;