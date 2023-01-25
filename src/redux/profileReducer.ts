import { Action } from "redux";
import { ProfileAPI } from "../API/Profie-API";
import { BaseThunkType, InferActionTypes } from "../Store/reduxStore";
import { PhotosType, postDataType, ProfileType } from "../types/reducers";

export type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType>

let initialState = {
    postData: [
        { id: 1, message: 'Hi', likesCount: 5 },
        { id: 2, message: 'How are you?', likesCount: 12 }
    ] as Array<postDataType>,
    profile: null as ProfileType | null,
    status: ''
}



export const profileReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD-POST': {
            return {
                ...state,
                postData: [...state.postData, {
                    id: state.postData[state.postData.length - 1].id + 1,
                    message: action.message,
                    likesCount: 10
                }]
            }
        }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'PROFILE/SAVE_PHOTO':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos, yo: " bithc" } as ProfileType
            }
        default:
            return state;
    }
}

export const actions = {
    addPost: (message: string) => {
        return {
            type: 'PROFILE/ADD-POST',
            message
        } as const
    },
    setUserProfile: (profile: ProfileType) => {
        return {
            type: 'PROFILE/SET_USER_PROFILE',
            profile
        } as const
    },
    setProfileStatus: (status: string) => {
        return {
            type: 'PROFILE/SET_STATUS',
            status
        } as const
    },
    SetProfilePhoto: (photos: PhotosType) => {
        return {
            type: 'PROFILE/SAVE_PHOTO',
            photos
        } as const
    }
}

export const setUser = (id: number | null): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getProfileUser(id)

    // setTimeout(() => {
    //     dispatch(actions.setUserProfile(data))
    // }, 3000)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (id: number): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.getStatus(id)

    dispatch(actions.setProfileStatus(data))
}
export const updateStatus = (status: string, setStatus: any): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.updateStatus(status)

    if (data.resultCode === 0) {
        dispatch(actions.setProfileStatus(status))
        setStatus(null)
    } else {
        setStatus(data.messages)
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await ProfileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.SetProfilePhoto(data.data.photos));
    }
}
export const updateProfileInfo = (profileInfo: ProfileType, setStatus: any): ThunkType => async (dispatch, getState) => {

    const userId = getState().Auth.userID;

    let data = await ProfileAPI.updateProfileInfo(profileInfo)

    if (data.resultCode === 0) {
        dispatch(setUser(userId));
    } else {
        setStatus(data.messages);
        return Promise.reject(data.messages)
    }
}