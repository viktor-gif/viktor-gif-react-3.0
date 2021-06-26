import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileInfo from "./profileInfo";
import {
  getProfile,
  getStatus,
  updateStatus,
  setProfilePhoto,
  updateProfileInfo,
} from "../../../redux/profile-reducer";
// import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { compose } from "redux";
import { profileInfoType } from "../../../Types";
import { appStateType } from "../../../redux/redux-store";

type mapStatePropsType = {
  profileInfo: profileInfoType | null;
  status: string;
  authUserId: number;
};
type maDispatchPropsType = {
  getProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: () => void;
  updateProfileInfo: (profileInfo: profileInfoType) => void;
  setProfilePhoto: (photoFile: object) => void;
};
type ownPropsType = {
  match: any;
};
type propsType = mapStatePropsType & maDispatchPropsType & ownPropsType;

class ProfileInfoContainer extends React.Component<propsType> {
  requestInfoProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.requestInfoProfile();
  }
  componentDidUpdate(prevProps: propsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.requestInfoProfile();
    }
  }

  render() {
    return (
      <>
        <ProfileInfo
          isOwner={!this.props.match.params.userId}
          profileInfo={this.props.profileInfo}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          setProfilePhoto={this.props.setProfilePhoto}
          updateProfileInfo={this.props.updateProfileInfo}
        />
      </>
    );
  }
}
const mapStateToProps = (state: appStateType) => ({
  profileInfo: state.profilePage.profileInfo,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
});

// const WithRouterProfileInfo = withRouter(ProfileInfoContainer);

export default compose(
  connect<mapStatePropsType, maDispatchPropsType, propsType, appStateType>(
    //@ts-ignore
    mapStateToProps,
    {
      getProfile,
      getStatus,
      updateStatus,
      setProfilePhoto,
      updateProfileInfo,
    }
  ),
  withRouter
  // withAuthRedirect
)(ProfileInfoContainer) as React.ComponentType;
