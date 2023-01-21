import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { RootState } from "../Store/reduxStore";


let mapStateToPropsRedirect = (state: RootState) => {
    return {
        isAuth: state.Auth.isAuth
    }
}
type mapStateToPropsRedirectType = {
    isAuth: boolean
}
export function AuthRedirect<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {

    function RedirectComponent(props: WCP & mapStateToPropsRedirectType) {
        let { isAuth, ...restProps } = props;
        if (!props.isAuth) return <Navigate to={'/login'} />
        return <WrappedComponent {...restProps as WCP} />
    }
    // let ConnectedAuthRedirectComponent = connect(mapStateToPropsRedirect, {})(RedirectComponent as React.ComponentType)
    let ConnectedAuthRedirectComponent = compose<React.Component>(
        connect(mapStateToPropsRedirect, {})
    )(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}