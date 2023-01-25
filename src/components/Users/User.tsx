import React from "react";
import classes from './Users.module.css'
import userPhoto from '../../images/defaultLogo.png'
import { NavLink } from 'react-router-dom';
import { UserDataType } from "../../types/reducers";
import { Button } from "antd";

type PropsType = {
    user: UserDataType
    followingInProgres: Array<number>
    setFollowStatus: (id: number) => void
    setUnFollowStatus: (id: number) => void
}

let User: React.FC<PropsType> = ({ user, followingInProgres, setFollowStatus, setUnFollowStatus }) => {
    return (
        <div className={classes.item}>
            <div className={classes.profile}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt="User logo" className={classes.logo} />
                    </NavLink>
                </div>
                {user.followed
                    ? <Button type='primary' disabled={followingInProgres.some(i => i === user.id)} onClick={() => setFollowStatus(user.id)}
                        className={classes.profileButton}>UnFollow</Button>
                    : <Button type='primary' disabled={followingInProgres.some(i => i === user.id)} onClick={() => setUnFollowStatus(user.id)}
                        className={classes.profileButton}>Follow</Button>}
            </div>
            <div className={classes.info}>
                <div className={classes.name}>{user.name}</div>
                <div className={classes.status}>{user.status}</div>
            </div>
        </div>
    )
}

export default User