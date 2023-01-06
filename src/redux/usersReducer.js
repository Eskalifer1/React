import { UserAPI } from "../API/api";

const FOLLOW_USER = 'USERS/FOLLOW-USER';
const UNFOLLOW_USER = 'USERS/UNFOLLOW-USER';
const SET_USER = 'USERS/SET-USER';
const SET_CURRENT_PAGE = 'USERS/SET-CURRENT-PAGE';
const SET_TOTAL_USER_COOUNT = 'USERS/SET_TOTAL_USER_COOUNT';
const SET_IS_FETCHING = 'USERS/SET_IS_FETCHING';
const SET_IS_FOLLOWING = 'USERS/SET_IS_FOLLOWING';

let initialState = {
    usersData: [],
    pageSize: 5,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgres: []
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW_USER:
            return {
                ...state,
                usersData: state.usersData.map(i => {
                    if (i['id'] === action.userID) {
                        return {
                            ...i,
                            followed: true
                        }
                    }
                    return i
                })
            }
        case UNFOLLOW_USER:
            return {
                ...state,
                usersData: state.usersData.map(i => {
                    if (i.id === action.userID) {
                        return {
                            ...i,
                            followed: false
                        }
                    }
                    return i
                })
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USER_COOUNT:
            return { ...state, totalUserCount: action.totalUserCount }
        case SET_USER:
            return { ...state, usersData: action.usersData }
        case SET_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case SET_IS_FOLLOWING:
            return {
                ...state, isFollowingInProgres: action.isFetching
                    ? [state.isFollowingInProgres, action.userId]
                    : state.isFollowingInProgres.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

export const follow = (userID) => {
    return {
        type: FOLLOW_USER,
        userID
    }
}
export const unFollow = (userID) => {
    return {
        type: UNFOLLOW_USER,
        userID
    }
}
export const setUsers = (usersData) => {
    return {
        type: SET_USER,
        usersData
    }
}
export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}
export const setTotalUserCount = (totalUserCount) => {
    return {
        type: SET_TOTAL_USER_COOUNT,
        totalUserCount
    }
}
export const setIsFetching = (isFetching) => {
    return {
        type: SET_IS_FETCHING,
        isFetching
    }
}
export const setIsFollowing = (isFetching, userId) => {
    return {
        type: SET_IS_FOLLOWING,
        isFetching,
        userId
    }
}

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    let data = await UserAPI.getUsers(currentPage, pageSize)
    dispatch(setCurrentPage(currentPage))
    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUserCount(data.totalCount));
}

const followUnFollowFlow = async (dispatch, id, APIMethod, actionCreator) => {
    dispatch(setIsFollowing(true, id))
    let data = await APIMethod(id);

    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(setIsFollowing(false, id))
}

export const setFollowStatus = (id) => async (dispatch) => {
    let APIMethod = UserAPI.unFollowAPI.bind(UserAPI);

    followUnFollowFlow(dispatch, id, APIMethod, unFollow)
}

export const setUnFollowStatus = (id) => async (dispatch) => {
    let APIMethod = UserAPI.FollowAPI.bind(UserAPI);

    followUnFollowFlow(dispatch, id, APIMethod, follow)
}