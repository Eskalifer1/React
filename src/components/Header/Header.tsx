import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Store/reduxStore'
import { logout } from '../../redux/AuthReducer'
import { Avatar, Button, Layout } from 'antd'
import {
    UserOutlined
} from '@ant-design/icons';

type PropsType = {}

export const HeaderComponent: React.FC<PropsType> = ({ }) => {

    const { Header } = Layout;

    const isAuth = useSelector(((state: RootState) => state.Auth.isAuth))
    const login = useSelector((state: RootState) => state.Auth.login)

    const dispatch: AppDispatch = useDispatch();

    const logoutFunction = () => {
        dispatch(logout())
    }

    return (
        <Header className={classes.header}>
            <Avatar size={64} icon={<UserOutlined />} />
            <div className={classes.loginBlock}>
                {isAuth
                    ? <div className={classes.LoginDiv}>
                        <p className={classes.login}>{login}</p>
                        <Button danger onClick={logoutFunction}>Logout</Button>
                    </div>
                    : <Button type='primary' className={classes.button}>
                        <Link to={'/login'} className={classes.login}>Login</Link>
                    </Button>
                }
            </div>
        </Header >
    )
}