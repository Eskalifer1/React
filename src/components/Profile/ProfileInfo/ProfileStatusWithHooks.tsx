import React, { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import classes from './ProfileInfo.module.css';

type PropsType = {
    status: string
    isOwner: boolean

    updateStatus: (string: string, fu: Function) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, ChangeEditMode] = useState(false)
    let [status, setStatus] = useState(props.status);
    let [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        ChangeEditMode(true)
    }
    const deActivateEditMode = () => {
        ChangeEditMode(false);
        props.updateStatus(status, setErrorMessage)
    }
    const ChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    return (
        <>
            {editMode ||
                <div className={`${classes.inputDiv} ${classes.textDiv}`}>
                    <span onDoubleClick={() => {
                        props.isOwner && activateEditMode()
                    }}>{props.status}</span>
                </div>
            }
            {props.isOwner && editMode &&
                <div className={classes.inputDiv}>
                    <input type="text" autoFocus={true} onBlur={deActivateEditMode} onChange={ChangeStatus} className={classes.inputStatus} value={status} />
                </div>
            }
            {errorMessage &&
                <div>Error: {errorMessage}</div>
            }
        </>
    )
}


export default ProfileStatusWithHooks;