import { applyMiddleware, combineReducers, createStore } from 'redux'
import { profileReducer } from './profileReducer';
import { dialogReducer } from './dialogReducer';
import { usersReducer } from './usersReducer';
import { AuthReducer } from './AuthReducer';
import thunk from 'redux-thunk';
import { appReducer } from './AppReducer';

let reducersPatch = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    UsersPage: usersReducer,
    Auth: AuthReducer,
    app: appReducer
});

let store = createStore(reducersPatch, applyMiddleware(thunk));

window.store = store
export default store;