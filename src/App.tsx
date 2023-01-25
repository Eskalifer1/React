import './App.css'
import 'antd/dist/reset.css'

import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { initializeAPP } from './redux/AppReducer'
import Preloader from './components/Common/Preloader/Preloader'
import store, { AppDispatch, RootState } from './Store/reduxStore'
import { LoginPage } from './components/Login/Login'
import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { MenuProps } from 'antd'
import { Layout, Menu, theme } from 'antd'
import { HeaderComponent } from './components/Header/Header'

const Settings = React.lazy(() => import('./components/Settings/Settings'));
const Music = React.lazy(() => import('./components/Music/Music'));
const News = React.lazy(() => import('./components/News/News'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersPage = React.lazy(() => import('./components/Users/UsersContainer'));
const { Content, Footer, Sider } = Layout;

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
    getItem(<NavLink to='/profile' >Profile</NavLink>, '1', <PieChartOutlined />),
    getItem('Developers', 'sub1', <UserOutlined />, [
      getItem(<NavLink to='/users'>Dev List</NavLink>, '2'),
      getItem(<NavLink to='/chat'>Dev Chat</NavLink>, '3'),
    ]),
    getItem(<NavLink to='*'>Settings</NavLink>, '4', <FileOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  if (!initialized) return <Preloader />
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <HeaderComponent />
        <Content style={{ margin: '0 16px' }}>
          <Suspense fallback={<div><Preloader /></div>}>
            <Routes>
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route path='/chat' element={<ChatPage />} />
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
      </Layout>
    </Layout>
  )
}
export const Application: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </BrowserRouter>
  )
}