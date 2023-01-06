import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className= {classes.nav}>
            <ul>
                <li className={classes.link}><NavLink to='/profile' className={({ isActive }) => isActive ? classes.active: undefined}>Profile</NavLink></li>
                <li className={classes.link}><NavLink to='/dialogs' className={({ isActive }) => isActive ? classes.active: undefined}>Dialogs</NavLink></li>
                <li className={classes.link}><NavLink to='/users' className={({ isActive }) => isActive ? classes.active: undefined}>Users</NavLink></li>
                <li className={classes.link}><NavLink to='/news' className={({ isActive }) => isActive ? classes.active: undefined}>News</NavLink></li>
                <li className={classes.link}><NavLink to='/music' className={({ isActive }) => isActive ? classes.active: undefined}>Music</NavLink></li>
                <li className={classes.link}><NavLink to='/settings' className={({ isActive }) => isActive ? classes.active: undefined}>Settings</NavLink></li>
            </ul>
        </nav>
    )
}


export default NavBar;