import React from "react";
import { connect } from "react-redux";
import { setCurrentPage, setTotalUserCount, getUsers, setFollowStatus, setUnFollowStatus } from "../../redux/usersReducer";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";
import { getCurrentPage, getIsFetching, getIsFollowingInProgres, getPageSize, getTotalUserCount, getUsersData } from "../../redux/usersSelectors";

class UsersAPIConponent extends React.Component {
    render = () => {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUserCount={this.props.totalUserCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                usersData={this.props.usersData}
                onPageChange={this.onPageChange}
                isFollowingInProgres={this.props.isFollowingInProgres}
                setFollowStatus={this.props.setFollowStatus}
                setUnFollowStatus={this.props.setUnFollowStatus}
            />
        </>
    }
    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize)
    }
    onPageChange = (item) => {
        let {pageSize} = this.props
        this.props.getUsers(item, pageSize) //При кожному клацані на панігатор викликаємо запит на нових користувачів
    }
}
let mapStateToProps = (state) => {
    return {
        usersData: getUsersData(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgres: getIsFollowingInProgres(state)
    }
}
export default connect(mapStateToProps, {
    setCurrentPage,
    setTotalUserCount,
    getUsers,
    setFollowStatus,
    setUnFollowStatus
})(UsersAPIConponent);