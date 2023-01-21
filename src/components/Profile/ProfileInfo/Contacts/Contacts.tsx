import React from 'react';
import classes from './Contacts.module.css';

type PropsType = {
    contactTitle: string
    contactValue: string
}

const Contacts: React.FC<PropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={classes.contact}>
            <b className={classes.title}>{contactTitle}:</b>
            {contactValue && <a href={contactValue} className={classes.link}>{contactTitle}</a>}
        </div>
    )
}


export default Contacts;