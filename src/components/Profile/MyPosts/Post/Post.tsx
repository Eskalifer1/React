import React from 'react';
import classes from './Post.module.css';

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = ({ message, likesCount }) => {
    return (
        <div className={classes.item}>
            <div className={classes.flex}>
                <img className={classes.img} src="https://img.freepik.com/premium-vector/wolf-mascot-gaming-logo-design-vector-template_441059-290.jpg?w=2000" alt="user logo" />
                <p className={classes.message}>{`${message}`} </p>
            </div>
            <div className={classes.likes}>likes {likesCount}</div>
        </div>
    )
}


export default Post;