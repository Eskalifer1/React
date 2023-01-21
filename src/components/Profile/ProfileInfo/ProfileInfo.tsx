import React, { ChangeEvent } from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../images/defaultLogo.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import InfoBlock from './InfoBlockToggle/InfoBlock';
import InfoBlockForm from './InfoBlockToggle/InfoBlockForm';
import { ProfilePropsType } from '../Profile';



const ProfileInfo: React.FC<ProfilePropsType> = (props) => {

    let [editMode, changeEditMode] = useState(false);
    // let [photoError, changePhotoError] = useState(null);

    if (!props.profile) {
        return <Preloader />
    }
    const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    return (
        <div >
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} alt="Avatar" className={classes.photo} />
                {props.isOwner && <input type={'file'} className={classes.file} onChange={onPhotoChange} />}
                <div className={classes.statusInfo}>
                    <h3>Status:</h3>
                    <ProfileStatusWithHooks status={props.status || 'hi'} updateStatus={props.updateStatus} isOwner = {props.isOwner}/>
                </div>
                <h2 className={classes.title}>Information about job</h2>
                {editMode
                    ? <InfoBlockForm
                        profile={props.profile}
                        saveInfo={() => { changeEditMode(false) }}
                        updateProfileInfo = {props.updateProfileInfo}
                    />
                    : <InfoBlock
                        profile={props.profile}
                        isOwner={props.isOwner}
                        activateEditMode={() => { changeEditMode(true) }}
                    />}

            </div>
        </div>
    )
}

export default ProfileInfo;