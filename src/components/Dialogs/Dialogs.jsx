import React from "react";
import DialogsScheme from "../FormValidation/DialogsFormScheme";
import { Formik, Form, ErrorMessage, Field } from "formik";
import DialogItem from "./DialogItem/DialogItem";
import classes from './Dialogs.module.css'
import Message from "./Message/Message";

const Dialogs = (props) => {
    let dialogsArray = props.DialogsData.map(item => <DialogItem name={item.name} key={item.id} id={item.id} />)
    let messageArray = props.MessageData.map(item => <Message message={item.message} key={item.id} />)

    return (
        <div className={classes.dialogs}>
            <div className="dialogsItem">
                {dialogsArray}
            </div>
            <div className={classes.messages}>
                <div>
                    {messageArray}
                </div>
                <div className={classes.sendBlock}>
                    <FormDialogs addMessage={props.addMessage} />
                </div>
            </div>
        </div>
    )
}

const FormDialogs = (props) => {
    return (
        <Formik
            initialValues={{ message: '' }}

            onSubmit={ (values) => {props.addMessage(values.message)}}
            validationSchema={DialogsScheme} >

            {() => (
                <Form className={classes.form}>
                    <div>
                        <Field className={classes.input} name={'message'} placeholder={'Enter text'} type={'text'} />
                    </div>
                    <ErrorMessage className={classes.Error} name="message" component="div" />

                    <button type={'submit'} className={classes.send}>Send message</button>
                </Form>
            )}
        </Formik >
    )
}

export default Dialogs;