import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export type defaultResponseType<D = {}, RC = ResultCodes> = {
    data: D
    resultCode: RC
    messages: Array<string>
}


export enum ResultCodes {
    Succes = 0,
    Error = 1
}
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}