import React from 'react';
import classes from './Message.module.css';

type PropsType = {
    message: string
}

const Message: React.FC<PropsType> = ({ message }) => {
    return <div className={classes.messageItem}>{message}</div>
}

export default Message;