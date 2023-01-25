import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { profileReducer } from '../redux/profileReducer';
import { dialogReducer } from '../redux/dialogReducer';
import { usersReducer } from '../redux/usersReducer';
import { AuthReducer } from '../redux/AuthReducer';
import { appReducer } from '../redux/AppReducer';
import { chatReducer } from '../redux/ChatReducer';

const rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    UsersPage: usersReducer,
    Auth: AuthReducer,
    app: appReducer,
    chat: chatReducer
})

let store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>

export default store;
export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, RootState, unknown, A>
export type AppDispatch = typeof store.dispatch