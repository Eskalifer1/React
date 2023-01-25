import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from "redux";
import { ChatAPI, StatusType } from "../API/chat-API";
import { ChatMessageType } from "../pages/Chat/ChatMessages/ChatMessages";
import { BaseThunkType, InferActionTypes } from "../Store/reduxStore";

type initialStateType = typeof initialState;
type ActionType = InferActionTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;
type ImprovedChatMessageType = ChatMessageType & { id: string }
let initialState = {
    messages: [] as ImprovedChatMessageType[],
    status: 'pending' as StatusType
}
export const chatReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: uuidv4()}))].filter((m, index, array) => index >= (array.length - 40))
            }
        }
        case 'CHAT/SET_STATUS': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        case 'CHAT/CLEAR_MESSAGE': {
            return {
                ...state,
                messages: [...action.payload.messages]
            }
        }
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => {
        return {
            type: 'CHAT/MESSAGES_RECEIVED',
            payload: {messages}
        } as const
    },
    setStatus: (status: StatusType) => {
        return {
            type: 'CHAT/SET_STATUS',
            payload: { status }
        } as const
    },
    clearMessage: (messages: ImprovedChatMessageType[]) => {
        return {
            type: 'CHAT/CLEAR_MESSAGE',
            payload: { messages }
        } as const
    }
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
let _statusChangedHandler: ((status: StatusType) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.setStatus(status))
        }
    }
    return _statusChangedHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    ChatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
    ChatAPI.startMessaging()
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatAPI.unSubscribe('message-received', newMessageHandlerCreator(dispatch))
    ChatAPI.unSubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    ChatAPI.stopMessaging()
    dispatch(actions.clearMessage([]))
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    ChatAPI.sendMessage(message)
}