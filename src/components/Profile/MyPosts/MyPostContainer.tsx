import React from 'react';
import { connect } from 'react-redux/es/exports';
import { compose } from 'redux';
import { actions} from '../../../redux/profileReducer';
import { RootState } from '../../../Store/reduxStore';
import { postDataType } from '../../../types/reducers';
import MyPost from './MyPost';

type MapStateToPropsType = {
    postData: Array<postDataType>
}

type MapDispatchToPropsType = {
    addPost: (message: string) => void
}
type OwnPropsType = {}


let mapStateToPost = (state: RootState): MapStateToPropsType => {
    return {
        postData: state.profilePage.postData,
    }
}

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(mapStateToPost, {addPost: actions.addPost})
)(MyPost);