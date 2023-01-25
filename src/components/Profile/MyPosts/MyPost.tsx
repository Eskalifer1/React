import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';
import { Formik, Form, ErrorMessage, Field } from "formik";
import DialogsScheme from '../../FormValidation/DialogsFormScheme';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../Store/reduxStore';import { actions } from '../../../redux/profileReducer';
import { Button } from 'antd';
;

type PropsType = {}

const MyPost: React.FC<PropsType> = ({}) => {
    const postData = useSelector((state:RootState) => state.profilePage.postData)
    const dispatch: AppDispatch = useDispatch()

    const addPost = (message: string) => {
        dispatch(actions.addPost(message))
    }

    return (
        <div className={classes.textBlock}>
            <div className={classes.enterSection}>
                <h3 className={classes.title}>My Posts</h3>
                <FormMyPost addPost={addPost} />
            </div>
            <div className={classes.posts}>
                {postData.map(item => <Post message={item.message} key={item.id} likesCount={item.likesCount} />)}
            </div>
        </div>
    )
}

const MyPostMemorized = React.memo(MyPost)

type FormMyPostType = {
    addPost: (message: string) => void
}

const FormMyPost: React.FC<FormMyPostType> = (props) => {

    // let SendMessage = (values, actions) => {
    //     props.addPost(values.message);
    //     actions.resetForm();
    // }

    return (
        <Formik
            initialValues={{ message: '' }}

            onSubmit={(values, actions) => {
                props.addPost(values.message);
                actions.resetForm();
            }}
            validationSchema={DialogsScheme} >

            {() => (
                <Form className={classes.form}>
                    <div>
                        <Field className={classes.input} name={'message'} placeholder={'Enter text'} type={'text'} />
                    </div>
                    <ErrorMessage className={classes.Error} name="message" component="div" />

                    <Button type='primary' htmlType='submit' className={classes.send}>Add Post</Button>
                </Form>
            )}
        </Formik >
    )
}


export default MyPostMemorized;