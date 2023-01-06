import React from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


let mapStateToPropsRedirect = (state) => {
    return {
        isAuth: state.Auth.isAuth
    }
}
export const AuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            return (
                <Component {...this.props} />
            )
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}