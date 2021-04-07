import React from "react";
import Preloader from "../../common/preloader/preloader";

const ProfileInfo = (props) => {
  if (!props.profileInfo) {
    return <Preloader />;
  }
  const info = props.profileInfo;
  let contacts = [];
  for (let key in info.contacts) {
    contacts.push(key + ": " + info.contacts[key]);
  }
  let contactsItems = contacts.map((c) => <div key={c}>{c}</div>);
  return (
    <div>
      <div>
        <img src={info.photos.large} alt="userPhoto" />
      </div>
      <div>{info.fullName}</div>
      <div>{info.aboutMe}</div>
      <div>{info.lookingForAJob}</div>
      <div>{info.lookingForAJobDescription}</div>
      <div>contacts: {contactsItems}</div>
    </div>
  );
};
// `${key}: ${info.contacts[key]}`
export default ProfileInfo;
