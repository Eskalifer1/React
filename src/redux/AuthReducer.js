import { AuthAPI } from "../API/api"

const SET_USER_DATA = 'AUTH/SET_USER_DATA'

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
}

export const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}
export const setAuthUserData = (userID, email, login, isAuth) => { // Action для Встановлення даних про користувача
    return {
        type: SET_USER_DATA,
        payload: { userID, email, login, isAuth }
    }
}
export const setAuthentication = () => async (dispatch) => { // thunk яка робить запит на сервер про нас, та встановлює ці дані
    let data = await AuthAPI.getMe();

    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email, password, rememberMe, setStatus, setSubmiting) => async (dispatch) => { // thunk яка виконує функцію для логіна користувача та викликає setAuthentication
    let data = await AuthAPI.login(email, password, rememberMe)

    if (data.resultCode === 0) {
        dispatch(setAuthentication())
    } else {
        setStatus(data.messages);
        setSubmiting(false);
    }
}
export const logout = () => async (dispatch) => { // thunk яка виконує функцію для логауту користувача та викликає setAuthentication з null
    let data = await AuthAPI.logout();

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}