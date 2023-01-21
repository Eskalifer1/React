import * as Yup from "yup";

const ProfileFormScheme = Yup.object().shape({
    fullName: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(40, "Nice try, nobody has a first name that long")
        .required("Required"),
    lookingForAJob: Yup.boolean()
        .required("Required"),
    lookingForAJobDescription: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(300, "Write a little bit less")
        .required("Required"),
    aboutMe: Yup.string()
        .min(2, "Must be longer than 2 characters")
        .max(300, "Write a little bit less")
        .required("Required")
});
export default ProfileFormScheme;