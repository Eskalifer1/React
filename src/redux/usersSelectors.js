export const getUsersData = (state) => {
    return state.UsersPage.usersData;
}
export const getPageSize = (state) => {
    return state.UsersPage.pageSize;
}
export const getTotalUserCount = (state) => {
    return state.UsersPage.totalUserCount;
}
export const getCurrentPage = (state) => {
    return state.UsersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.UsersPage.isFetching;
}
export const getIsFollowingInProgres = (state) => {
    return state.UsersPage.isFollowingInProgres;
}