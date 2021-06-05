import React, { ChangeEvent, useState } from "react";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./profileStatus";
import s from "./profileInfo.module.css";
import avatar from "../../../img/ava.png";
import ProfileInfoForm from "./profileInfoForm";
import cn from "classnames";
import { profileInfoType } from "../../../Types";

type profileInfoPropsType = {
  profileInfo: profileInfoType | null;
  isOwner: boolean;
  status: string;

  setProfilePhoto: (photoFile: object) => void;
  updateProfileInfo: (value: profileInfoType) => void;
  updateStatus: () => void;
};

const ProfileInfo: React.FC<profileInfoPropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profileInfo) {
    return <Preloader />;
  }
  const info = props.profileInfo;

  const onPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.setProfilePhoto(e.target.files[0]);
    }
  };

  const edit = () => {
    setEditMode(true);
  };

  const submit = (value: profileInfoType) => {
    console.log(value);
    // @ts-ignore
    let promise: Promise = props.updateProfileInfo(value);
    // @s-ignore
    promise.then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div
        className={cn(s.mainImgProfile, {
          [s.mainImgOwnerProfile]: props.isOwner,
        })}
      >
        <img src={info.photos.large || avatar} alt="userPhoto" />
        {props.isOwner && <input onChange={onPhotoChange} type="file" />}
      </div>

      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />

      {editMode ? (
        // @ts-ignore
        <ProfileInfoForm initialValues={info} info={info} onSubmit={submit} />
      ) : (
        <Info info={info} edit={edit} isOwner={props.isOwner} />
      )}
    </div>
  );
};

type infoPropsType = {
  info: profileInfoType;
  isOwner: boolean;
  edit: () => void;
};

const Info: React.FC<infoPropsType> = ({ info, edit, isOwner }) => {
  let contacts = Object.keys(info.contacts).map((key) => {
    return (
      <div className={s.contactsItems} key={key}>
        {/* @ts-ignore */}
        <span>{key}</span>: {info.contacts[key]}
      </div>
    );
  });
  return (
    <div>
      {isOwner && <button onClick={edit}>edit</button>}
      <div className={s.fullName}>{info.fullName}</div>
      <div className={s.aboutInfo}>
        <span>About me</span>: {info.aboutMe}
      </div>
      <div className={s.aboutInfo}>
        <span>Looking for a job</span>: {info.lookingForAJob}
      </div>
      <div className={s.aboutInfo}>
        <span>Looking for a job description</span>:{" "}
        {info.lookingForAJobDescription}
      </div>
      <div className={s.contacts}>contacts: {contacts}</div>
    </div>
  );
};

export default ProfileInfo;
