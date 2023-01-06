import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import logo from '../../images/HeaderLogo.png'

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img src={logo} alt='logo'></img>
            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div className={classes.LoginDiv}>
                        <p className={classes.login}>{props.login}</p>
                        <p className={classes.logout} onClick={props.logout}>Logout</p>
                    </div>
                    : <NavLink to={'/login'} className={classes.login}>Login</NavLink>}
            </div>
        </header>
    )
}


export default Header;