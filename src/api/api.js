import axios from "axios";

let instance = axios.create({
  withCredentials: true, //запрашивает, правда ли ты этот пользователь
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646",
  },
});

export const authAPI = {
  getAuthData() {
    return instance.get("https://social-network.samuraijs.com/api/1.0/auth/me");
  },
};

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(
      `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`
    );
  },

  follow(userId) {
    return instance.post(
      `https://social-network.samuraijs.com/api/1.0/follow/${userId}`
    );
  },
  unfollow(userId) {
    return instance.delete(
      `https://social-network.samuraijs.com/api/1.0/follow/${userId}`
    );
  },
};

export const profileAPI = {
  setProfile() {
    return instance.get(
      `https://social-network.samuraijs.com/api/1.0/profile/11121`
    );
  },
};
