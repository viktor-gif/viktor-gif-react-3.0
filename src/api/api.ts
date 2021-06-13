import axios from "axios";
import { AxiosResponse } from "axios";
import { photosType, profileInfoType, userType } from "../Types";

export const instance = axios.create({
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

type updateStatusAndProfileInfoResType = {
  resultCode: ResultCodesEnum;
  messages: Array<string>;
  data: Object;
};
type setProfilePhotoResType = {
  data: { photos: photosType };

  resultCode: ResultCodesEnum;
  messages: Array<string>;
};

export const profileAPI = {
  setProfile(userId: number) {
    return instance
      .get<profileInfoType>(`profile/${userId}`)
      .then((res) => res.data);
  },
  getStatus(userId: number) {
    return instance
      .get<string>(`profile/status/${userId}`)
      .then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance
      .put<updateStatusAndProfileInfoResType>(`profile/status`, {
        status: status,
      })
      .then((res) => res.data);
  },
  setProfilePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance
      .put<setProfilePhotoResType>(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },
  updateProfileInfo(info: profileInfoType) {
    return instance
      .put<updateStatusAndProfileInfoResType>(`profile`, info)
      .then((res) => res.data);
  },
};
