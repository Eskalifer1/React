import React from "react"
import { Form, Formik, Field, ErrorMessage } from 'formik';
import classes from './InfoBlockToggle.module.css'
import ProfileFormScheme from "../../../FormValidation/ProfileUpdateValidation";
import { ProfileType } from "../../../../types/reducers";
import { Button } from "antd";

type PropsType = {
    profile: ProfileType
    saveInfo: () => void
    updateProfileInfo: (profileInfo: any, fu: any) => Promise<any>
}

const InfoBlockForm: React.FC<PropsType> = (props) => {
    return (
        <>
            <Formik
                initialValues={{
                    fullName: props.profile.fullName,
                    lookingForAJob: props.profile.lookingForAJob,
                    lookingForAJobDescription: props.profile.lookingForAJobDescription,
                    aboutMe: props.profile.aboutMe,
                    contacts: props.profile.contacts
                }}
                validationSchema={ProfileFormScheme}
                onSubmit={(values, { setStatus }) => {
                    props.updateProfileInfo(values, setStatus).then(() => {
                        props.saveInfo();
                    });
                }} >
                {({ status }) => {
                    return (
                        <Form>
                            <Button type='primary' htmlType='submit' style={{marginBottom: 10}}>Save Changes</Button>
                            {status && <div className={classes.label}>{status}</div>}
                            <div className={classes.jobInfo}>
                                <div className={classes.name}>
                                    <Field className={classes.input} type={'text'} name={'fullName'} placeholder={'Full Name'} />
                                    <ErrorMessage name="fullName" component="p" className={classes.label} />
                                </div>
                                <div className={classes.status}>
                                    <label htmlFor={'lookingForAJob'} className={`${classes.lookingForAJob}`}> Looking for a job ? </label>
                                    <Field className={`${classes.input}`} type={'checkbox'} name={'lookingForAJob'} />
                                    <ErrorMessage name="lookingForAJob" component="p" className={classes.label} />
                                </div>
                                <div className={classes.description}>
                                    <Field className={`${classes.input}`} type={'text'} name={'lookingForAJobDescription'} placeholder={'Description'} />
                                    <ErrorMessage name="lookingForAJobDescription" component="p" className={classes.label} />
                                </div>
                            </div>
                            <div className={classes.aboutMe}>
                                <label htmlFor={'aboutMe'} className={`${classes.label}`}> About Me: </label>
                                <Field className={`${classes.input}`} type={'text'} name={'aboutMe'} />
                                <ErrorMessage name="aboutMe" component="p" className={classes.label} />
                            </div>
                            <div className={classes.contacts}>
                                <h2 className={classes.title}>My Contacts</h2>
                                {Object.keys(props.profile.contacts).map(key => {
                                    return <div key={key} className={classes.contact}>
                                        <label htmlFor={`contacts.${key}`} className={`${classes.label}`}> {key}: </label>
                                        <Field className={`${classes.input}`} type={'text'} name={`contacts.${key}`} />
                                        <ErrorMessage name={`contacts.${key}`} component="p" className={classes.label} />
                                    </div>
                                })}
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </>
    )
}

export default InfoBlockForm;