import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
    return (
        <div className={classes.item}>
            <div className={classes.flex}>
            <img className={classes.img} src="https://img.freepik.com/premium-vector/wolf-mascot-gaming-logo-design-vector-template_441059-290.jpg?w=2000" alt="user logo" />
                <p className={classes.message}>{`${props.message}`} </p>
            </div>
                <div className={classes.likes}>likes {props.likesCount}</div>
        </div>
    )
}


export default Post;