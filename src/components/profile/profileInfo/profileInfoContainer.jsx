import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileInfo from "./profileInfo";
import {
  getProfile,
  getStatus,
  updateStatus,
} from "../../../redux/profile-reducer";
import withAuthRedirect from "../../common/withAuthRedirect/withAuthRedirect";
import { compose } from "redux";

class ProfileInfoContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 11121;
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }
  render() {
    console.log(this.props);
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
});

// const WithRouterProfileInfo = withRouter(ProfileInfoContainer);

export default compose(
  connect(mapStateToProps, { getProfile, getStatus, updateStatus }),
  withRouter
  // withAuthRedirect
)(ProfileInfoContainer);
