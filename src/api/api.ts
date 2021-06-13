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

export type responseType<D = {}, RC = ResultCodesEnum> = {
  messages: Array<string>;
  resultCode: RC;
  data: D;
};
