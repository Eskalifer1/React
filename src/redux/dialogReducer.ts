import { InferActionTypes } from "../Store/reduxStore";
import { DialogsDataType, MessageDataType } from "../types/reducers";

const ADD_MESSAGE = 'DIALOGS/ADD-MESSAGE';


// type initialStateType = {
//     MessageData: Array<{id: number, message: string}>
//     DialogsData: Array<{id: number, name: string}>
// }

let initialState = {
    MessageData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'What`s Up' }
    ] as Array<MessageDataType>,
    DialogsData: [
        { id: 1, name: 'Dymich' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Maks' },
        { id: 4, name: 'Ira' },
        { id: 5, name: 'Nika' },
        { id: 6, name: 'Vlad' }
    ] as Array<DialogsDataType>
}

type initialStateType = typeof initialState
type ActionType = InferActionTypes<typeof actions>;

export const dialogReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                MessageData: [...state.MessageData, { id: state.MessageData[state.MessageData.length - 1].id + 1, message: action.message }],
            }
        default:
            return state;
    }
}
export const actions = {
    addMessage: (message: string) => {
        return { 
            type: ADD_MESSAGE,
            message
        }
    }
}
