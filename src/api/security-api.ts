import { instance } from "./api";

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
