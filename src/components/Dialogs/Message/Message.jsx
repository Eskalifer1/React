import React from 'react';
import classes from './Message.module.css';

const Message = (props) => {
    return <div className={classes.messageItem}>{props.message}</div>
}

export default Message;