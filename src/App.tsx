import './App.css';
import 'antd/dist/reset.css';

import React, { Suspense, useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect, Provider, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { initializeAPP } from './redux/AppReducer';
import Preloader from './components/Common/Preloader/Preloader';
import store, { AppDispatch, RootState } from './Store/reduxStore';
import { LoginPage } from './components/Login/Login';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SubMenu from 'antd/es/menu/SubMenu';

const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersContainer'));
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const AppComponent: React.FC = () => {
  const handleRejections = (promiseRejectionEvent: PromiseRejectionEvent) => {
    alert("Some Error Oncured");
    console.error(promiseRejectionEvent);
  }

  const initialized = useSelector((state: RootState) => state.app.initialized)
  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAPP());
    window.addEventListener('unhandledrejection', handleRejections)
  }, [])

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Profile', '1', <PieChartOutlined />),
    getItem('Developers', 'sub1', <UserOutlined />, [
      getItem('Dev List', '2'),
      getItem('Dev Chat', '3'),
    ]),
    getItem('Settings', '9', <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  if (!initialized) return <Preloader />
  return (
    // <div className='app__wrapper'>
    //   <HeaderContainer />
    //   <NavBar />
    //   <div className='app__wrapper__content'>
    //     <Suspense fallback={<div><Preloader /></div>}>
    //       <Routes>
    //         <Route path="/profile" element={<ProfileContainer />}>
    //           <Route path=":userId" element={<ProfileContainer />} />
    //         </Route>
    //         <Route path='/dialogs' element={<DialogsContainer />} />
    //         <Route path='/users' element={<UsersPage />} />
    //         <Route path='/news' element={<News />} />
    //         <Route path='/settings' element={<Settings />} />
    //         <Route path='/music' element={<Music />} />
    //         <Route path='/login' element={<LoginPage />} />
    //         <Route path="/" element={<Navigate to="/profile" />} />
    //         <Route path="*" element={<div>404 Not Found</div>} />
    //       </Routes>
    //     </Suspense>
    //   </div>
    // </div>
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="vertical">
          <NavLink to='/profile' >Profile</NavLink>
          <NavLink to='/dialogs' >Dialogs</NavLink>
          <NavLink to='/users' >Users</NavLink>
        </Menu> */}
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs' element={<DialogsContainer />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/news' element={<News />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/music' element={<Music />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </Suspense>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

// class App extends React.Component<MapPropsType & MapDispatchType> {

//   handleRejections = (promiseRejectionEvent: PromiseRejectionEvent) => {
//     alert("Some Error Oncured");
//     console.error(promiseRejectionEvent);
//   }

//   componentDidMount() {
//     this.props.initializeAPP(); // thunk діспатчить seAuthentification, яка перевяряє чи залогінений юзер і після цього діспатчить initializedSuccess
//     // яка встановлює initialized: true
//     window.addEventListener('unhandledrejection', this.handleRejections)
//   }
//   componentWillUnmount() {
//     window.removeEventListener('unhandledrejection', this.handleRejections)
//   }

//   render() {
//     if (!this.props.initialized) return <Preloader /> // робимо перевірку чи проініціалізований вже користувач, якщо ні, то показуємо завантаження сторінки
//     return (
//     // <div className='app__wrapper'>
//     //   <HeaderContainer />
//     //   <NavBar />
//     //   <div className='app__wrapper__content'>
//     //     <Suspense fallback={<div><Preloader /></div>}>
//     //       <Routes>
//     //         <Route path="/profile" element={<ProfileContainer />}>
//     //           <Route path=":userId" element={<ProfileContainer />} />
//     //         </Route>
//     //         <Route path='/dialogs' element={<DialogsContainer />} />
//     //         <Route path='/users' element={<UsersPage />} />
//     //         <Route path='/news' element={<News />} />
//     //         <Route path='/settings' element={<Settings />} />
//     //         <Route path='/music' element={<Music />} />
//     //         <Route path='/login' element={<LoginPage />} />
//     //         <Route path="/" element={<Navigate to="/profile" />} />
//     //         <Route path="*" element={<div>404 Not Found</div>} />
//     //       </Routes>
//     //     </Suspense>
//     //   </div>
//     // </div>
//   )
//   }
// }

// const mapStateToProps = (state: RootState) => {
//   return {
//     initialized: state.app.initialized //Передаємо пропсами ініціалізацію, щоб можна було викликати у самій компоненті
//   }
// }

export const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </BrowserRouter>
  )
}