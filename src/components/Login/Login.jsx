import classes from "./Login.module.css"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from 'react-redux/es/exports';
import loginFormSchema from "../FormValidation/LoginFormSchema";
import { login } from "../../redux/AuthReducer";
import { Navigate } from "react-router-dom";

const Login = ({isAuth, login}) => { //Деструктирізація пропсів
    if (isAuth) return <Navigate to={'/profile'} /> //Перевірка чи ми авторизовані, якщо так, то переходимо в інший розділ

    return (
        <div>
            <h1 className={classes.title}>Login</h1>
            <Formik
                initialValues={{ email: "", password: "", rememberMe: false }}

                onSubmit={(values, actions) => {
                    login(values.email, values.password, values.rememberMe, actions.setStatus, actions.setSubmitting) //Викликаємо функцію login
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

                        {status && <div>{status}</div>}
                        <button type={'submit'} disabled={isSubmitting} className={classes.button}>Log in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth
    }
}

export default connect(mapStateToProps, { login })(Login) //Оюгортка контерною компонентою та передача пропсів