import { Button } from "antd";
import React from "react"
import { ProfileType } from "../../../../types/reducers";
import Contacts from "../Contacts/Contacts";
import classes from './InfoBlockToggle.module.css'

type PropsType = {
    profile: any,
    isOwner: boolean,
    activateEditMode: () => void
}

const InfoBlock: React.FC<PropsType> = (props) => {
    return (
        <div>
            {props.isOwner && <Button onClick={props.activateEditMode} style={{marginBottom: 10}} type='primary'>Change Info</Button>}
            <div className={classes.jobInfo}>
                <p className={classes.name}>{props.profile.fullName}</p>
                {props.profile.lookingForAJob ? <p className={classes.status}>Looking for a Job</p> : <p className={classes.status}>Not Interested In a Job</p>}
                <p className={classes.description}>{props.profile.lookingForAJobDescription}</p>
            </div>
            <div className={classes.aboutMe}>
                <h2>About Me:</h2>
                <p>{props.profile.aboutMe}</p>
            </div>
            <h2 className={classes.title}>My Contacts</h2>
            <div className={classes.contacts}>
                {Object.keys(props.profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={props.profile.contacts[key]} />
                })}
            </div>
        </div>
    )
}
export default InfoBlock;