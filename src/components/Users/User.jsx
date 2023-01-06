import React from "react";
import classes from './Users.module.css'
import userPhoto from '../../images/defaultLogo.png'
import { NavLink } from 'react-router-dom';

let User = ({ user, isFollowingInProgres, setFollowStatus, setUnFollowStatus }) => {
    return (
        <div className={classes.item}>
            <div className={classes.profile}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} alt="User logo" className={classes.logo} />
                    </NavLink>
                </div>
                {user.followed
                    ? <button disabled={isFollowingInProgres.some(i => i === user.id)} onClick={() => setFollowStatus(user.id)}
                        className={classes.profileButton}>UnFollow</button>
                    : <button disabled={isFollowingInProgres.some(i => i === user.id)} onClick={() => setUnFollowStatus(user.id)}
                        className={classes.profileButton}>Follow</button>}
            </div>
            <div className={classes.info}>
                <div className={classes.name}>{user.name}</div>
                <div className={classes.status}>{user.status}</div>
            </div>
        </div>
    )
}

export default User