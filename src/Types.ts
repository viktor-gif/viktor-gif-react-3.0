export type profileInfoType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe: string;
  contacts: contactsType;
  photos: photosType;
};
export type contactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type photosType = {
  small: string | null;
  large: string | null;
};

export type userType = {
  id: number;
  name: string;
  status: string;
  photos: photosType;
  followed: boolean;
};
