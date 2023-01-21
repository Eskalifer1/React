import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/Selectors/usersSelectors";
import { FilterType } from "../../redux/usersReducer";
import UsersSearchFormScheme from "../FormValidation/UsersSearchFormScheme";
import classes from './UsersForm.module.css'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}
type ValuesType = {
    term: string
    friend: string
}
const UserForm: React.FC<PropsType> = React.memo(({ onFilterChanged }) => { //Деструктирізація пропсів
    const filter = useSelector(getUsersFilter);
    
    const submit = (values: ValuesType, actions: FormikHelpers<ValuesType>) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'true'
                ? true
                : values.friend === 'false'
                    ? false
                    : null
        }
        console.log(filter);
        onFilterChanged(filter)
        actions.resetForm()
        // actions.setSubmitting(true)
    }
    return (
        <div>
            <h1 className={classes.title}>Search Users</h1>
            <Formik
                initialValues={{
                    term: '',
                    friend: ''
                }}
                onSubmit = {submit}
                validationSchema={UsersSearchFormScheme}>
                {({ isSubmitting, status, values }) => (
                    <Form className={classes.form}>
                        <div>
                            <Field className={classes.input} type={'text'} name={'term'} value = {values.term} placeholder={'Enter name'} />
                            <ErrorMessage name="term" component="div" className={classes.label} />
                        </div>
                        <Field className={classes.select} as="select"  value={values.friend} name="friend">
                            <option value="null">All</option>
                            <option value="true">Followed</option>
                            <option value="false">Unfollowed</option>
                        </Field>

                        {/* <div className={classes.remember}>
                            <Field type={'checkbox'} name={'rememberMe'} />
                            <label htmlFor={'rememberMe'} className={classes.label}> remember me </label>
                        </div> */}

                        <button type={'submit'} disabled={isSubmitting} className={classes.button}>Search</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})
export default UserForm;