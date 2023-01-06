import { connect } from "react-redux";
import Dialogs from "./Dialogs";
import { AuthRedirect } from "../../HOC/AuthRedirect";
import { compose } from "redux";
import { addMessage } from "../../redux/dialogReducer";

let mapStateToProps = (state) => {
    return {
        DialogsData: state.dialogsPage.DialogsData,
        MessageData: state.dialogsPage.MessageData
    }
}
// let mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: () => { dispatch(addMessage()) }
//     }
// }
export default compose(
    connect(mapStateToProps, {addMessage}),
    AuthRedirect
)(Dialogs);