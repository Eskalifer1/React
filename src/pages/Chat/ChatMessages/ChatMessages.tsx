import React, { useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../Store/reduxStore"
import { Message } from "./Messages/Message"

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

export const ChatMessages: React.FC = () => {
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const messages = useSelector((state: RootState) => state.chat.messages)
    const [isAutoScroll, setAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 50) {
            !isAutoScroll && setAutoScroll(true)
        } else {
            isAutoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
        }
        console.log(messages.length)
    }, [messages])

    return (
        <div style={{ maxHeight: 500, overflowY: 'auto', width: '100%', padding: 16 }} onScroll={scrollHandler}>
            {messages.map((item) => {
                return <Message key={item.id} message={item} />
            })}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}