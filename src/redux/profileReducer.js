import { ProfileAPI } from "../API/api";

const ADD_POST = 'PROFILE/ADD-POST';
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
const SET_STATUS = 'PROFILE/SET_STATUS'

let initialState = {
    postData: [
        { id: 1, message: 'Hi', likesCount: 5 },
        { id: 2, message: 'How are you?', likesCount: 12 }
    ],
    profile: null,
    status: ''
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            return {
                ...state,
                postData: [...state.postData, {
                    id: state.postData[state.postData.length - 1].id + 1,
                    message: action.message,
                    likesCount: 10
                }]
            }
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state;
    }
}
export const addPost = (message) => {
    return {
        type: ADD_POST,
        message
    }
}
const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
const setProfileStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}

export const setUser = (id) => async (dispatch) => {
    let data = await ProfileAPI.getProfileUser(id);

    dispatch(setUserProfile(data));
}
export const getStatus = (id) => async (dispatch) => {
    let data = await ProfileAPI.getStatus(id)

    dispatch(setProfileStatus(data));
}
export const updateStatus = (status) => async (dispatch) => {
    let data = await ProfileAPI.updateStatus(status)

    if (data.resultCode === 0) dispatch(setProfileStatus(status));
}