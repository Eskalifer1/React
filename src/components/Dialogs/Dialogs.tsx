import React from "react";
import DialogsScheme from "../FormValidation/DialogsFormScheme";
import { Formik, Form, ErrorMessage, Field } from "formik";
import DialogItem from "./DialogItem/DialogItem";
import classes from './Dialogs.module.css'
import Message from "./Message/Message";
import { DialogsDataType, MessageDataType } from "../../types/reducers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/reduxStore";
import { actions } from "../../redux/dialogReducer";
import { Button } from "antd";

const Dialogs: React.FC = ({ }) => {

    const DialogsData = useSelector((state: RootState) => state.dialogsPage.DialogsData)
    const MessageData = useSelector((state: RootState) => state.dialogsPage.MessageData)

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
                    <FormDialogs />
                </div>
            </div>
        </div>
    )
}

const FormDialogs: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()

    const addMessageFunction = (message: string) => {
        dispatch(actions.addMessage(message))
    }
    return (
        <Formik
            initialValues={{ message: '' }}

            onSubmit={(values, actions) => {
                addMessageFunction(values.message)
                actions.resetForm();
            }}
            validationSchema={DialogsScheme} >

            {() => (
                <Form className={classes.form}>
                    <div>
                        <Field className={classes.input} name={'message'} placeholder={'Enter text'} type={'text'} />
                    </div>
                    <ErrorMessage className={classes.Error} name="message" component="div" />

                    <Button type={'primary'} htmlType='submit' className={classes.send}>Send message</Button>
                </Form>
            )}
        </Formik >
    )
}

export default Dialogs;