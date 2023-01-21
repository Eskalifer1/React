import { connect } from "react-redux";
import Dialogs from "./Dialogs";
import { AuthRedirect } from "../../HOC/AuthRedirect";
import { compose } from "redux";
import { actions } from "../../redux/dialogReducer";
import { RootState } from "../../Store/reduxStore";
import { DialogsDataType, MessageDataType } from "../../types/reducers";

type MapStateToPropsType = {
    DialogsData: Array<DialogsDataType>
    MessageData: Array<MessageDataType>
}

type MapDispatchToPropsType = {
    addMessage: (string: string) => void
}
type OwnPropsType = {}

// type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

let mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        DialogsData: state.dialogsPage.DialogsData,
        MessageData: state.dialogsPage.MessageData
    }
}
// let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
//     return {
//         addMessage: (newMessage: string) => { dispatch(actions.addMessage(newMessage)) }
//     }
// }

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, RootState>(mapStateToProps, {addMessage: actions.addMessage}),
    AuthRedirect
)(Dialogs);