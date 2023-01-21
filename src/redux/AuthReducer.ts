import { SecurityAPI } from "../API/Security-API";
import { AuthAPI } from "../API/Auth-API";
import { BaseThunkType, InferActionTypes, RootState } from "../Store/reduxStore";
import { ResultCodes } from "../API/api";

export type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType>

let initialState = {
    userID: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null,
    captchaUrl: null as string | null
}


export const AuthReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA': 
        case 'AUTH/SET_CAPTCHA_URL_SUCCESS': {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}
const actions = {
    setAuthUserData: (userID: number | null, email: string | null, login: string | null, isAuth: boolean, captcha: string | null) => { // Action для Встановлення даних про користувача
        return {
            type: 'AUTH/SET_USER_DATA',
            payload: { userID, email, login, captcha, isAuth }
        } as const
    },
    getCaptchaUrlSuccess: (captchaUrl: string | null) => {
        return {
            type: 'AUTH/SET_CAPTCHA_URL_SUCCESS',
            payload: { captchaUrl }
        } as const
    }
}

export const setAuthentication = (): ThunkType => async (dispatch) => { // thunk яка робить запит на сервер про нас, та встановлює ці дані
    const data = await AuthAPI.getMe();

    if (data.resultCode === ResultCodes.Succes) {
        const { id, email, login, captcha } = data.data;
        dispatch(actions.setAuthUserData(id, email, login, true, captcha))
    }
}

export const login = (email: string, password: string,
    rememberMe: boolean, captcha: string | null,
    setStatus: Function, setSubmiting: Function): ThunkType => async (dispatch) => { // thunk яка виконує функцію для логіна користувача та викликає setAuthentication
        const data = await AuthAPI.login(email, password, rememberMe, captcha)

        if (data.resultCode === 0) {
            dispatch(setAuthentication())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptcha())
            }
            setStatus(data.messages);
            setSubmiting(false);
        }
    }
export const logout = (): ThunkType => async (dispatch) => { // thunk яка виконує функцію для логауту користувача та викликає setAuthentication з null
    const data = await AuthAPI.logout();

    if (data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false, null));
        dispatch(actions.getCaptchaUrlSuccess(null));
    }
}

export const getCaptcha = (): ThunkType => async (dispatch) => { // thunk яка виконує функцію для логауту користувача та викликає setAuthentication з null
    const data = await SecurityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}