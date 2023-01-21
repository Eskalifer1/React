
import { defaultResponseType, instance, ResultCodes, ResultCodesForCaptcha } from "./api";

type getMeResponseType = {
    id: number;
    email: string;
    login: string;
    captcha: string;
};
type loginResponseType = {
    userId: number;
};
export const AuthAPI = {
    async getMe() {
        return instance
            .get<defaultResponseType<getMeResponseType>>(`auth/me`).then(response => response.data);
    },
    async login(email: string, password: string, rememberMe = false, captcha: string | null) {
        return instance
            .post<defaultResponseType<loginResponseType, ResultCodes | ResultCodesForCaptcha>>(`auth/login`, { email, password, rememberMe, captcha }).then(response => response.data);
    },
    async logout() {
        return instance
            .delete<defaultResponseType>(`auth/login`).then(response => response.data);
    }
};
