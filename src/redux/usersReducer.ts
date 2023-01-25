import { Dispatch } from "react";
import { defaultResponseType } from "../API/api";
import { UserAPI } from "../API/Users-API";
import { BaseThunkType, InferActionTypes, RootState } from "../Store/reduxStore";
import { UserDataType } from "../types/reducers";

export type initialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionType>

let initialState = {
    usersData: [] as Array<UserDataType>,
    pageSize: 10,
    totalUserCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgres: [] as Array<number>, // array of users Id
    filter: {
        term: '',
        friend: null as null | boolean
    }
}
export const usersReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW-USER':
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
        case 'USERS/UNFOLLOW-USER':
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
        case 'USERS/SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'USERS/SET_TOTAL_USER_COUNT':
            return { ...state, totalUserCount: action.totalUserCount }
        case 'USERS/SET-USER':
            return { ...state, usersData: action.usersData }
        case 'USERS/SET_IS_FETCHING':
            return { ...state, isFetching: action.isFetching }
        case 'USERS/SET_IS_FOLLOWING':
            return {
                ...state,
                followingInProgres: action.isFetching
                    ? [...state.followingInProgres, action.userId]
                    : state.followingInProgres.filter(id => id !== action.userId)
            }
        case 'USERS/SET_FILTER':
            return {
                ...state,
                filter: { ...action.payload }
            }
        default:
            return state;
    }
}

export const actions = {
    follow: (userID: number) => {
        return {
            type: 'USERS/FOLLOW-USER',
            userID
        } as const
    },
    unFollow: (userID: number) => {
        return {
            type: 'USERS/UNFOLLOW-USER',
            userID
        } as const
    },
    setUsers: (usersData: Array<UserDataType>) => {
        return {
            type: 'USERS/SET-USER',
            usersData
        } as const
    },
    setCurrentPage: (currentPage: number) => {
        return {
            type: 'USERS/SET-CURRENT-PAGE',
            currentPage
        } as const
    },
    setTotalUserCount: (totalUserCount: number) => {
        return {
            type: 'USERS/SET_TOTAL_USER_COUNT',
            totalUserCount
        } as const
    },
    setIsFetching: (isFetching: boolean) => {
        return {
            type: 'USERS/SET_IS_FETCHING',
            isFetching
        } as const
    },
    setIsFollowing: (isFetching: boolean, userId: number) => {
        return {
            type: 'USERS/SET_IS_FOLLOWING',
            isFetching,
            userId
        } as const
    },
    setFilter: (filter: FilterType) => {
        return {
            type: 'USERS/SET_FILTER',
            payload: filter
        } as const
    }
}

export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {
    dispatch(actions.setIsFetching(true))
    dispatch(actions.setFilter(filter))
    dispatch(actions.setCurrentPage(currentPage))
    let data = await UserAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
    dispatch(actions.setIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUserCount(data.totalCount))
}

type ApiMethodType = (userId: number) => Promise<defaultResponseType>

const _followUnFollowFlow = async (dispatch: Dispatch<ActionType>,
    id: number, APIMethod: ApiMethodType,
    actionCreator: (id: number) => ActionType) => {
    dispatch(actions.setIsFollowing(true, id))
    let data = await APIMethod(id);

    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    } else {
        throw new Error('U cant follow yourself')
    }
    dispatch(actions.setIsFollowing(false, id))
}

export const setFollowStatus = (id: number): ThunkType => async (dispatch) => {
    let APIMethod = UserAPI.unFollowAPI.bind(UserAPI);
    _followUnFollowFlow(dispatch, id, APIMethod, actions.unFollow)
}

export const setUnFollowStatus = (id: number): ThunkType => async (dispatch) => {
    let APIMethod = UserAPI.FollowAPI.bind(UserAPI);

    _followUnFollowFlow(dispatch, id, APIMethod, actions.follow)
}
export type FilterType = typeof initialState.filter