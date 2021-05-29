import React, { ChangeEvent, useState } from "react";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./profileStatus";
import s from "./profileInfo.module.css";
import avatar from "../../../img/ava.png";
import ProfileInfoForm from "./profileInfoForm";
import cn from "classnames";
// import { profileInfoType } from "../../../Types";

// type profileInfoPropsType = {
//   profileInfo: profileInfoType;
//   isOwner: boolean;
//   status: string;

//   setProfilePhoto: (photoFile: object) => void;
//   updateProfileInfo: () => void;
//   updateStatus: () => void;
// };

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profileInfo) {
    return <Preloader />;
  }
  const info = props.profileInfo;

  const onPhotoChange = (e) => {
    if (e.target.files?.length) {
      props.setProfilePhoto(e.target.files[0]);
    }
  };

  const edit = () => {
    setEditMode(true);
  };
{/* @ts-ignore */}
  const submit = (value) => {
    {/* @ts-ignore */}
    let promise = props.updateProfileInfo(value);
    {/* @ts-ignore */}
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
        <ProfileInfoForm 
          initialValues={info} 
          info={info} 
          onSubmit={submit} />
      ) : (
        <Info info={info} edit={edit} isOwner={props.isOwner} />
      )}
    </div>
  );
};

// type infoPropsType = {
//   info: profileInfoType;
//   isOwner: boolean;
//   edit: () => void;
// };

const Info = ({ info, edit, isOwner }) => {
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
