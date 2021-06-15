import { instance, responseType, ResultCodesEnum } from "./api";

type getAuthDataResType = {
  data: { id: number; email: string; login: string };
  messages: Array<string>;
  resultCode: ResultCodesEnum;
};

type loginResType = {
  data: { userId: number };
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
      .post<responseType<loginResType>>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data);
  },
  logout() {
    return instance.delete<responseType>("auth/login").then((res) => res.data);
  },
};
