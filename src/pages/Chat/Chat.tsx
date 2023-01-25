import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startMessagesListening, stopMessagesListening } from "../../redux/ChatReducer"
import { AppDispatch, RootState } from "../../Store/reduxStore"
import { AddMessageForm } from "./AddMessageForm/AddMessageForm"
import { ChatMessages } from "./ChatMessages/ChatMessages"

export const Chat: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()
    const status = useSelector((state: RootState) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <>
            {status === 'error' && <div>Some Error Ocured. Please refresh a page</div> }
                <>
                    <ChatMessages />
                    <AddMessageForm />
                </>
            
        </>
    )
}