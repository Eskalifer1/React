import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
})

export const UserAPI = {
    async getUsers(currentPage, pageSize) {
        return instance
            .get(`users?page=${currentPage}&count${pageSize}`).then(response => response.data)
    },
    async unFollowAPI(id) {
        return instance
            .delete(`follow/${id}`).then(response => response.data);
    },
    async FollowAPI(id) {
        return instance
            .post(`follow/${id}`).then(response => response.data);
    }
}

export const ProfileAPI = {
    async getProfileUser(userId) {
        return instance
            .get(`profile/${userId}`).then(response => response.data);
    },
    async getStatus(userId){
        return instance
        .get(`profile/status/${userId}`).then(response => response.data);
    },
    async updateStatus(status){
        return instance
        .put(`profile/status`, {
            status
        }).then(response => response.data);
    }
}

export const AuthAPI = {
    async getMe() {
        return instance
            .get(`auth/me`).then(response => response.data)
    },
    async login(email, password, rememberMe = false){
        return instance
            .post(`auth/login`, {email, password, rememberMe}).then(response => response.data)
    },
    async logout(){
        return instance
            .delete(`auth/login`).then(response => response.data)
    }
}