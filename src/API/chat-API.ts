import { ChatMessageType } from "../types/api"

type MessagesReceivedSubcriberType = (messages: ChatMessageType[]) => void
type StatusChangedSubcriberType = (status: StatusType) => void
export type StatusType = 'pending' | 'ready' | 'error'
type EventName = 'message-received' | 'status-changed'
let subscribers = {
    'message-received': [] as MessagesReceivedSubcriberType[],
    'status-changed': [] as StatusChangedSubcriberType[]
}

let ws: WebSocket | null = null

const closeHandler = () => {
    console.error('Status Closed')
    notifySubscribersAboutStatusChanging('pending')
    setTimeout(createChannel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(func => func(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatusChanging('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatusChanging('error')
}
const notifySubscribersAboutStatusChanging = (status: StatusType) => {
    subscribers['status-changed'].forEach(func => func(status))
}
function cleanUp() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}


function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatusChanging('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}



export const ChatAPI = {
    async startMessaging() {
        createChannel()
    },
    async stopMessaging() {
        subscribers['message-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    async subscribe(eventName: EventName, callback: MessagesReceivedSubcriberType | StatusChangedSubcriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
    },
    async unSubscribe(eventName: EventName, callback: MessagesReceivedSubcriberType | StatusChangedSubcriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    async sendMessage(message: string) {
        ws?.send(message)
    }
}
