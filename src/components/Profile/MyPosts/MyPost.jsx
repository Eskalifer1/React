import React from 'react';
import classes from './MyPost.module.css';
import Post from './Post/Post';
import { Formik, Form, ErrorMessage, Field } from "formik";
import DialogsScheme from '../../FormValidation/DialogsFormScheme';

const MyPost = React.memo(props => {
    return (
        <div className={classes.textBlock}>
            <div className={classes.enterSection}>
                <h3 className={classes.title}>My Posts</h3>
                <FormMyPost addPost={props.addPost} />
            </div>
            <div className={classes.posts}>
                {props.postData.map(item => <Post message={item.message} key={item.id} likesCount={item.likesCount} />)}
            </div>
        </div>
    )
})

const FormMyPost = (props) => {

    let SendMessage = (values, actions) => {
        props.addPost(values.message);
        actions.resetForm();
    }

    return (
        <Formik
            initialValues={{ message: '' }}

            onSubmit={SendMessage}
            validationSchema={DialogsScheme} >

            {() => (
                <Form className={classes.form}>
                    <div>
                        <Field className={classes.input} name={'message'} placeholder={'Enter text'} type={'text'} />
                    </div>
                    <ErrorMessage className={classes.Error} name="message" component="div" />

                    <button type={'submit'} className={classes.send}>Add Post</button>
                </Form>
            )}
        </Formik >
    )
}


export default MyPost;