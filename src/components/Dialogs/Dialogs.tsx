import React from "react";
import DialogsScheme from "../FormValidation/DialogsFormScheme";
import { Formik, Form, ErrorMessage, Field } from "formik";
import DialogItem from "./DialogItem/DialogItem";
import classes from './Dialogs.module.css'
import Message from "./Message/Message";
import { DialogsDataType, MessageDataType } from "../../types/reducers";

type PropsType = {
    DialogsData: Array<DialogsDataType>
    MessageData: Array<MessageDataType>
    addMessage: (string: string) => void
}

const Dialogs: React.FC<PropsType> = ({ DialogsData, MessageData, addMessage }) => {
    let dialogsArray = DialogsData.map(item => <DialogItem name={item.name} key={item.id} id={item.id} />)
    let messageArray = MessageData.map(item => <Message message={item.message} key={item.id} />)

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
                    <FormDialogs addMessage={addMessage} />
                </div>
            </div>
        </div>
    )
}

type FormDialogsType = {
    addMessage: (string: string) => void
}
interface Values {
    message: string
  }
const FormDialogs: React.FC<FormDialogsType> = ({ addMessage }) => {
    return (
        <Formik
            initialValues={{ message: '' }}

            onSubmit={(values: Values, actions) => {
                addMessage(values.message)
                actions.resetForm();
            }}
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