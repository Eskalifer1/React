import { RootState } from "../../Store/reduxStore";

export const getUsersData = (state: RootState) => {
    return state.UsersPage.usersData;
}
export const getPageSize = (state: RootState) => {
    return state.UsersPage.pageSize;
}
export const getTotalUserCount = (state: RootState) => {
    return state.UsersPage.totalUserCount;
}
export const getCurrentPage = (state: RootState) => {
    return state.UsersPage.currentPage;
}
export const getIsFetching = (state: RootState) => {
    return state.UsersPage.isFetching;
}
export const getIsFollowingInProgres = (state: RootState) => {
    return state.UsersPage.followingInProgres;
}
export const getUsersFilter = (state: RootState) => {
    return state.UsersPage.filter
 }