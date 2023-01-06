import { connect } from 'react-redux/es/exports';
import { compose } from 'redux';
import { addPost} from '../../../redux/profileReducer';
import MyPost from './MyPost';

let mapStateToPost = (state) => {
    return {
        postData: state.profilePage.postData,
    }
}

export default compose(
    connect(mapStateToPost, {addPost})
)(MyPost);