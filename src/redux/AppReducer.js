import { setAuthentication } from "./AuthReducer";

const INITIALIZED_SUCCESS = 'APP/INITIALIZED_SUCCESS'

let initialState = {
    initialized: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}
export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}
export const initializeAPP = () => async (dispatch) => { // thunk яка виконує функцію перевірки чи є вже якась інформація про користувача
   let result = dispatch(setAuthentication()); 
   result.then(() => dispatch(initializedSuccess()))
}