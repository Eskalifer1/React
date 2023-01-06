import React from 'react';
import classes from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
        this.setState({
            editMode:true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode:false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <>
                {this.state.editMode ||
                    <div className={`${classes.inputDiv} ${classes.textDiv}`}>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div className={classes.inputDiv}>
                        <input type="text" autoFocus={true} onBlur={this.deactivateEditMode} onChange={this.onStatusChange} className={classes.inputStatus} value={this.state.status} />
                    </div>
                }
            </>
        )
    }
}


export default ProfileStatus;