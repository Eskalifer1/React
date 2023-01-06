import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/AuthReducer';
import Header from './Header';

class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
        login: state.Auth.login
    }
}

export default connect(mapStateToProps, { logout })(HeaderContainer);