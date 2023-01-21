import classes from "./Login.module.css"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store/reduxStore";
import { login } from "../../redux/AuthReducer";

type PropsType = {}

export const LoginPage: React.FC<PropsType> = ({ }) => { //Деструктирізація пропсів

    const isAuth = useSelector((state: RootState) => state.Auth.isAuth)
    const captchaUrl = useSelector((state: RootState) => state.Auth.captchaUrl)

    const dispatch: AppDispatch = useDispatch();

    const loginFunction = (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: Function, setSubmitting: Function) => {
        dispatch(login(email, password, rememberMe, captcha, setStatus, setSubmitting))
    }

    if (isAuth) return <Navigate to={'/profile'} /> //Перевірка чи ми авторизовані, якщо так, то переходимо в інший розділ

    return (
        <div>
            <h1 className={classes.title}>Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false,
                    captcha: null as string | null
                }}

                onSubmit={(values, actions) => {
                    loginFunction(values.email, values.password, values.rememberMe, values.captcha, actions.setStatus, actions.setSubmitting) //Викликаємо функцію login
                    //яка робить запит на сервер та з відповіді діспатчить setAuthentication, яка встановлює дані про користувача
                    actions.setSubmitting(true); //Встановлює true на початок запиту
                }}
                validationSchema={loginFormSchema}>
                {({ isSubmitting, status }) => (
                    <Form className={classes.form}>
                        <div>
                            <Field className={classes.input} type={'text'} name={'email'} placeholder={'Email'} />
                        </div>
                        <ErrorMessage name="email" component="div" className={classes.label} />

                        <div>
                            <Field className={classes.input} type={'password'} name={'password'} placeholder={'Password'} />
                        </div>
                        <ErrorMessage name="password" component="div" className={classes.label} />

                        <div className={classes.remember}>
                            <Field type={'checkbox'} name={'rememberMe'} />
                            <label htmlFor={'rememberMe'} className={classes.label}> remember me </label>
                        </div>

                        {captchaUrl && <img className={classes.captcha} src={captchaUrl} alt={'captcha'} />}
                        {captchaUrl && <Field className={classes.input} type={'text'} name={'captcha'} placeholder={'Captcha'} />}
                        {status && <div>{status}</div>}
                        <button type={'submit'} disabled={isSubmitting} className={classes.button}>Log in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}