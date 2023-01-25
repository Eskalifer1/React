import * as Yup from "yup";

export const AddMessageFormScheme = Yup.object().shape({
    message: Yup.string()
        .min(5, 'Too short!!')
        .max(60, 'Write a little bit less')
        .required('Required')
})