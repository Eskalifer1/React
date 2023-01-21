import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getStatus, setUser, updateStatus, savePhoto, updateProfileInfo } from '../../redux/profileReducer';
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom"
import { compose } from 'redux';
import { AuthRedirect } from '../../HOC/AuthRedirect';
import { ProfileType } from '../../types/reducers';
import { RootState } from '../../Store/reduxStore';


type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    setUser: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (string: string, fu: Function) => void
    savePhoto: (file: File) => void
    updateProfileInfo: (profileInfo: ProfileType) => Promise<any>
}
type OwnPropsType = {
    router: {
        location: ReturnType<typeof useLocation>
        navigate: ReturnType<typeof useNavigate>
        params: ReturnType<typeof useParams<{ userId: string }>>
    }
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

class ProfileContainer extends React.Component<PropsType> {
    render() {
        return <Profile
            {...this.props}
            isOwner={!this.props.router.params.userId}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateStatus}
            savePhoto={this.props.savePhoto}
            updateProfileInfo={this.props.updateProfileInfo} />
    }
    refreshProfile() {
        let userId: number | null = Number(this.props.router.params.userId) || this.props.userID;
        if (!userId) {
            this.props.router.navigate('/login')
        } else {
            this.props.setUser(userId);
            this.props.getStatus(userId);
        }
    }
    componentDidMount = () => {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) this.refreshProfile();
    }
}

let mapStateToProps = (state: RootState) => ({
    profile: state.profilePage.profile,
    userID: state.Auth.userID,
    isAuth: state.Auth.isAuth,
    status: state.profilePage.status 
})

function withRouter<WCP>(WrappedComponent: React.FC<WCP>) {
    function ComponentWithRouterProp(props: RootState) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <WrappedComponent
                {...props as WCP}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
export default compose<React.ComponentType>(
    connect(mapStateToProps, { setUser, getStatus, updateStatus, savePhoto, updateProfileInfo }),
    withRouter,
    AuthRedirect
)(ProfileContainer)