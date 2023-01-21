import React from 'react';
import { ProfileType } from '../../types/reducers';
import MyPostContainer from './MyPosts/MyPostContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo'

export type ProfilePropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string | null

    updateStatus: (string: string, fu: any) => void
    savePhoto: (file: File) => void
    updateProfileInfo: (profileInfo: ProfileType) => Promise<any>
}

const Profile: React.FC<ProfilePropsType> = ({ isOwner, profile, status, updateStatus, savePhoto, updateProfileInfo }) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo
                isOwner={isOwner}
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                savePhoto={savePhoto}
                updateProfileInfo={updateProfileInfo} />
            <MyPostContainer />
        </div>
    )
}


export default Profile;