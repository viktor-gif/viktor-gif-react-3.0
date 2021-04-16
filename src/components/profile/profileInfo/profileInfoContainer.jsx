import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileInfo from "./profileInfo";
import {
  getProfile,
  getStatus,
  updateStatus,
} from "../../../redux/profile-reducer";
// import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { compose } from "redux";

class ProfileInfoContainer extends React.Component {
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
  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.requestInfoProfile();
    }
  }

  render() {
    return (
      <>
        <ProfileInfo
          profileInfo={this.props.profileInfo}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profileInfo: state.profilePage.profileInfo,
  status: state.profilePage.status,
  authUserId: state.auth.userId,
});

// const WithRouterProfileInfo = withRouter(ProfileInfoContainer);

export default compose(
  connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
  withRouter
  // withAuthRedirect
)(ProfileInfoContainer);
