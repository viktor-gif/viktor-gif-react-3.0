import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileInfo from "./profileInfo";
import { setProfile } from "../../../redux/profile-reducer";
import { profileAPI } from "../../../api/api";

class ProfileInfoContainer extends React.Component {
  componentDidMount() {
    profileAPI.setProfile().then((response) => {
      this.props.setProfile(response.data);
    });
  }
  render() {
    return (
      <>
        <ProfileInfo profileInfo={this.props.profileInfo} />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  profileInfo: state.profilePage.profileInfo,
});

// const WithRouterProfileInfo = withRouter(ProfileInfoContainer);

export default withRouter(
  connect(mapStateToProps, { setProfile })(ProfileInfoContainer)
);
