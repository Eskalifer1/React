import React from "react"
import DialogsScheme from "../FormValidation/DialogsFormScheme";
import { Formik, Form, ErrorMessage, Field } from "formik";
import classes from './Forms.module.css'

export const OneInputForm = (props) => {
    return (
        <>
            <h3 className={classes.title}>{props.title}</h3>
            <Formik
                initialValues={{ message: '' }}

                onSubmit={(values) => {
                    console.log(values)
                }}
                validationSchema={DialogsScheme} >

                {({ isSubmitting }) => (
                    <Form className={classes.form}>
                        <div>
                            <Field className={classes.input} name={'message'} placeholder={'Enter text'} type={'text'} />
                        </div>
                        <ErrorMessage className={classes.Error} name="message" component="div" />

                        <button type={'submit'} className={classes.send} disabled={isSubmitting}>{props.button}</button>
                    </Form>
                )}
            </Formik >
        </>
    )
}