import { FilterType } from "../redux/usersReducer";
import { UserDataType } from "../types/reducers";
import { instance, defaultResponseType } from "./api";

type getUsersResponseType = {
    items: Array<UserDataType>;
    totalCount: number;
    error: string | null;
}

export const UserAPI = {
    async getUsers(currentPage: number = 1, pageSize: number = 10, term: string = '', friend: null | boolean = null) {
        return instance
            .get<getUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? '': `&friend=${friend}`)).then(response => response.data);
    },
    async unFollowAPI(id: number) {
        return instance
            .delete<defaultResponseType>(`follow/${id}`).then(response => response.data);
    },
    async FollowAPI(id: number) {
        return instance
            .post<defaultResponseType>(`follow/${id}`).then(response => response.data);
    }
}