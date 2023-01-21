export type postDataType = {
    id: number,
    message: string,
    likesCount: number
}

export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}
export type UserDataType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}
export type DialogsDataType = {
    id: number,
    name: string
}
export type MessageDataType = {
    id: number,
    message: string
}