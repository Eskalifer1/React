import React, { Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeAPP } from './redux/AppReducer';
import Preloader from './components/Common/Preloader/Preloader';

const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeAPP(); // thunk діспатчить seAuthentification, яка перевяряє чи залогінений юзер і після цього діспатчить initializedSuccess
    // яка встановлює initialized: true
  }
  render() {
    if (!this.props.initialized) return <Preloader /> // робимо перевірку чи проініціалізований вже користувач, якщо ні, то показуємо завантаження сторінки
    return (
      <div className='app__wrapper'>
        <HeaderContainer />
        <NavBar />
        <div className='app__wrapper__content'>
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/music' element={<Music />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized //Передаємо пропсами ініціалізацію, щоб можна було викликати у самій компоненті
  }
}

export default compose(
  connect(mapStateToProps, { initializeAPP }))(App) //Передаємо пропсами метод ініціалізації, щоб можна було викликати у самій компоненті, 
  //а також обератаємо компоненту Контейнером, який і перекине усі пропси
