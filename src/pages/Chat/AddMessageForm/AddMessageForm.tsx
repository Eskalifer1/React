import { Button, Form, Input } from "antd"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AddMessageFormScheme } from "../../../components/FormValidation/AddMessageFormScheme"
import { sendMessage } from "../../../redux/ChatReducer"
import { AppDispatch, RootState } from "../../../Store/reduxStore"
import classes from './AddMessageForm.module.css'

export const AddMessageForm: React.FC = () => {

    type FormProps = {
        message: string
    }

    const status = useSelector((state: RootState) => state.chat.status)
    const [form] = Form.useForm()
    const dispatch: AppDispatch = useDispatch()

    const onSubmitFunction = (values: FormProps) => {
        dispatch(sendMessage(values.message))
        form.resetFields()
    }

    const formik = useFormik({
        initialValues: {
            message: ''
        },
        validationSchema: AddMessageFormScheme,
        onSubmit: onSubmitFunction
    })

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={formik.initialValues}
                onFinish={formik.handleSubmit}
                autoComplete="off"
            >
                <Form.Item name="message">
                    <Input placeholder="Enter Message"
                        onChange={(value) => {
                            formik.setFieldValue("message", value.target.value)
                            // console.log(formik.touched.message, formik.errors.message)
                        }}
                        value={formik.values.message} onBlur={formik.handleBlur} />
                </Form.Item>
                {formik.touched.message && formik.errors.message ? (
                    <span className={classes.error}>{formik.errors.message}</span>
                ) : null}

                <Form.Item >
                    <Button type="primary" htmlType="submit" disabled={status !== 'ready'}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}