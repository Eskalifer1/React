import { Avatar, Divider } from "antd";
import React from "react";
import { ChatMessageType } from "../ChatMessages";
import {
    UserOutlined
} from '@ant-design/icons';



export const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return (
        <>
            {message.photo ? <img src={message.photo} alt="Avatar" style={{ borderRadius: '5%', width: 96, height: 96 }} /> : <Avatar shape="square" size={96} icon={<UserOutlined />} />}
            <p>{message.userName}</p>
            <p>{message.message}</p>
            <Divider />
        </>
    )
})
