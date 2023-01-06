import * as Yup from "yup";

const DialogsScheme = Yup.object().shape({
    message: Yup.string()
        .min(1, 'Enter something')
        .max(300, 'Write a little bit less')
        .required("Required")
})

export default DialogsScheme;