const ADD_MESSAGE = 'DIALOGS/ADD-MESSAGE';

let initialState = {
    MessageData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'What`s Up' }
    ],
    DialogsData: [
        { id: 1, name: 'Dymich' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Maks' },
        { id: 4, name: 'Ira' },
        { id: 5, name: 'Nika' },
        { id: 6, name: 'Vlad' }
    ]
}

export const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                MessageData: [...state.MessageData, { id: state.MessageData[state.MessageData.length-1].id + 1, message: action.message }],
            }
        default:
            return state;
    }
}
export const addMessage = (message) => {
    return {
        type: ADD_MESSAGE,
        message
    }
}