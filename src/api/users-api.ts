import { instance, responseType, ResultCodesEnum } from "./api";
import { userType } from "../Types";
import { AxiosPromise } from "axios";

// authAPI.getAuthData().then((res: AxiosResponse<any>) => res.data);
type getUsersResType = {
  items: Array<userType>;
  totalCount: number;
  error: string | null;
};
export const usersAPI = {
  getUsers(
    currentPage = 1,
    pageSize = 10,
    term: string = "",
    friend: null | boolean = null
  ) {
    return instance
      .get<getUsersResType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` +
          (friend === null ? "" : `&friend=${friend}`)
      )
      .then((res) => res.data);
  },

  follow(userId: number) {
    return instance
      .post<responseType>(`follow/${userId}`)
      .then((res) => res.data);
  },
  unfollow(userId: number) {
    return instance
      .delete(`follow/${userId}`)
      .then((res) => res.data) as Promise<responseType>;
  },
};
