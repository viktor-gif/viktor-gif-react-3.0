import { instance, ResultCodesEnum } from "./api";
import { userType } from "../Types";

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
