import { instance, ResultCodesEnum } from "./api";

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
