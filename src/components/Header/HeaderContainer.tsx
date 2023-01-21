import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/AuthReducer';
import { RootState } from '../../Store/reduxStore';
import Header from './Header';

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchToPropsType = {
    logout: () => void
}
type OwnPropsType = {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login
    }
}

export default connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(mapStateToProps, { logout })(HeaderContainer);