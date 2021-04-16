import React from "react";
import Preloader from "../../common/preloader/preloader";
import ProfileStatus from "./profileStatus";
import s from "./profileInfo.module.css";
import avatar from "../../../img/ava.png";

const ProfileInfo = (props) => {
  if (!props.profileInfo) {
    return <Preloader />;
  }
  const info = props.profileInfo;

  let contacts = Object.entries(info.contacts);
  let contactsItems = contacts.map((item) => (
    <div className={s.contactsItems} key={item[0]}>
      <span className={s.contactsNames}>{item[0]}</span>
      <span className={s.contactsValues}>{": " + item[1]}</span>
    </div>
  ));

  return (
    <div>
      <div>
        <img src={info.photos.large || avatar} alt="userPhoto" />
      </div>
      <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
      <div>{info.fullName}</div>
      <div>
        <span>About me</span>: {info.aboutMe}
      </div>
      <div>
        <span>Looking for a job</span>: {info.lookingForAJob}
      </div>
      <div>
        <span>Looking for a job description</span>:{" "}
        {info.lookingForAJobDescription}
      </div>
      <div className={s.contacts}>
        <span className={s.contactsSpan}>contacts</span>: {contactsItems}
      </div>
    </div>
  );
};
// `${key}: ${info.contacts[key]}`
export default ProfileInfo;
