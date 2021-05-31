import axios from "axios";
import { AxiosResponse } from "axios";
import { profileInfoType } from "../Types";

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

type getAuthDataRespType = {
  data: { id: number; email: string; login: string };
  resultCode: number;
  messages: Array<string>;
};

type loginRespType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: { userId: number };
};

type logoutRespType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: object;
};

export const authAPI = {
  getAuthData() {
    return instance.get<getAuthDataRespType>("auth/me").then((res) => res.data);
  },
  login(
    email: string | null,
    password: string | null,
    rememberMe = false,
    captcha: string | null = null
  ) {
    return instance
      .post<loginRespType>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance
      .delete<logoutRespType>("auth/login")
      .then((res) => res.data);
  },
};

// authAPI.getAuthData().then((res: AxiosResponse<any>) => res.data);

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`);
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
