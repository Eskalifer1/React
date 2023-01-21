import React from "react"
import { useSelector } from "react-redux"
import Preloader from "../Common/Preloader/Preloader"
import { getIsFetching } from "../../redux/Selectors/usersSelectors"
import { Users } from "./Users"

const UsersPage: React.FC = (props) => {

    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}
export default UsersPage