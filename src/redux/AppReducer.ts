import { BaseThunkType, InferActionTypes, RootState } from "../Store/reduxStore";
import { setAuthentication } from "./AuthReducer";

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;

let initialState = {
    initialized: false
}
export const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => {
        return {
            type: 'APP/INITIALIZED_SUCCESS'
        } as const 
    }
}


export const initializeAPP = (): ThunkType => async (dispatch) => { // thunk яка виконує функцію перевірки чи є вже якась інформація про користувача
    let result = dispatch(setAuthentication());
    result.then(() => dispatch(actions.initializedSuccess()))
}