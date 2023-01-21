import { PhotosType, ProfileType } from "../types/reducers";
import { instance, defaultResponseType } from "./api";

export const ProfileAPI = {
    async getProfileUser(userId: number | null) {
        return instance
            .get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },
    async getStatus(userId: number) {
        return instance
            .get<string>(`profile/status/${userId}`).then(response => response.data);
    },
    async updateStatus(status: string) {
        return instance
            .put<defaultResponseType>(`profile/status`, {
                status
            }).then(response => response.data);
    },
    async savePhoto(file: File) {
        const formData = new FormData();
        formData.append('image', file);
        return instance
            .put<defaultResponseType<{photos: PhotosType}>>(`profile/photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data);
    },
    async updateProfileInfo(profile: ProfileType) {
        return instance
            .put<defaultResponseType>(`profile`, profile).then(response => response.data);
    },
};
