import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import classes from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

    let [editMode, ChangeEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        ChangeEditMode(true)
    }
    const deActivateEditMode = () => {
        ChangeEditMode(false);
        props.updateStatus(status)
    }
    const ChangeStatus = (e) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <>
            { editMode ||
                <div className={`${classes.inputDiv} ${classes.textDiv}`}>
                    <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
            }
            {editMode &&
                <div className={classes.inputDiv}>
                    <input type="text" autoFocus={true} onBlur={deActivateEditMode} onChange={ChangeStatus} className={classes.inputStatus} value={status} />
                </div>
            }
        </>
    )
}


export default ProfileStatusWithHooks;