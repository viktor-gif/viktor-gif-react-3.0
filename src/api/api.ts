import axios from "axios";
import { AxiosResponse } from "axios";
import { profileInfoType, userType } from "../Types";

let instance = axios.create({
  withCredentials: true, //запрашивает, правда ли ты этот пользователь
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "8844171b-8f1f-4905-bc9a-c6a452eff646",
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
  CapthaIsRequired = 10,
}

type securityResType = {
  url: string;
};

export const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<securityResType>(`security/get-captcha-url`)
      .then((res) => res.data);
  },
};

type getAuthDataResType = {
  data: { id: number; email: string; login: string };
  resultCode: number;
  messages: Array<string>;
};

type loginResType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: { userId: number };
};

type logoutResType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: object;
};

export const authAPI = {
  getAuthData() {
    return instance.get<getAuthDataResType>("auth/me").then((res) => res.data);
  },
  login(
    email: string | null,
    password: string | null,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<loginResType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete<logoutResType>("auth/login").then((res) => res.data);
  },
};

// authAPI.getAuthData().then((res: AxiosResponse<any>) => res.data);
type getUsersResType = {
  items: Array<userType>;
  totalCount: number;
  error: string | null;
};
type followUnfollowResType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: Object;
};
export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<getUsersResType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },

  follow(userId: number) {
    return instance
      .post<followUnfollowResType>(`follow/${userId}`)
      .then((res) => res.data);
  },
  unfollow(userId: number) {
    return instance
      .delete<followUnfollowResType>(`follow/${userId}`)
      .then((res) => res.data);
  },
};

export const profileAPI = {
  setProfile(userId: number) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status });
  },
  setProfilePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateProfileInfo(info: profileInfoType) {
    return instance.put(`profile`, info);
  },
};
