import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, setUser, updateStatus } from '../../redux/profileReducer';
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
import { compose } from 'redux';
import { AuthRedirect } from '../../HOC/AuthRedirect';
class ProfileContainer extends React.Component {
    render() {
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
    }
    componentDidMount = () => {
        let userId = this.props.router.params.userId || this.props.userID;
        if (!userId) {
            this.props.router.navigate('/login')
        } else {
            this.props.setUser(userId);
            this.props.getStatus(userId);
        }
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    userID: state.Auth.userID,
    isAuth: state.Auth.isAuth,
    status: state.profilePage.status
})

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
export default compose(
    connect(mapStateToProps, { setUser, getStatus, updateStatus }),
    withRouter,
    AuthRedirect
)(ProfileContainer)