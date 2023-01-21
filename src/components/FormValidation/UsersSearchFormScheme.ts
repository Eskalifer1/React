import * as Yup from "yup";

const UsersSearchFormScheme = Yup.object().shape({
    term: Yup.string()
        .min(1, 'Enter something')
        .max(30, 'Write a little bit less')
})

export default UsersSearchFormScheme;