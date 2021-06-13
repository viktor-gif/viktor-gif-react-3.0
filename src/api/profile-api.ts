import { instance, ResultCodesEnum } from "./api";
import { photosType, profileInfoType } from "../Types";

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
