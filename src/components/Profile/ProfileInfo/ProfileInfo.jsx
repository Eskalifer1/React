import React from 'react';
import Preloader from '../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../images/defaultLogo.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader/>
    }
    return (
        <div >
            <div className={classes.descriptionBlock}>
                <img src={props.profile.photos.large || userPhoto} alt="Avatar" className={classes.photo}/>
                <ProfileStatusWithHooks status ={props.status || 'hi'} updateStatus = {props.updateStatus}/>
                <h2 className={classes.title}>Information about job</h2>
                <div className={classes.jobInfo}>
                    <p className={classes.name}>{props.profile.fullName}</p>
                    {props.profile.lookinfForAJob? <p className={classes.status}>Looking for a Job</p>: <p className={classes.status}>Not Interested In a Job</p>}
                    <p className={classes.description}>{props.profile.lookingForAJobDescription}</p>
                </div>
                <div className={classes.contacts}>
                    <h2 className={classes.title}>My Contacts</h2>
                    <ul>
                        <li className={classes.item}><a className={classes.link} href={props.profile.contacts.facebook} target='_blank'>Facebook</a></li>
                        <li className={classes.item}><a className={classes.link} href={props.profile.contacts.website} target='_blank'>Website</a></li>
                        <li className={classes.item}><a className={classes.link} href={props.profile.contacts.vk} target='_blank'>VK</a></li>
                        <li className={classes.item}><a className={classes.link} href={props.profile.contacts.twitter} target='_blank'>Twitter</a></li>
                        <li className={classes.item}><a className={classes.link} href={props.profile.contacts.instagram} target='_blank'>Intsagram</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default ProfileInfo;