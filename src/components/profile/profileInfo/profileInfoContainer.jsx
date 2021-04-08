import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProfileInfo from "./profileInfo";
import { getProfile } from "../../../redux/profile-reducer";

class ProfileInfoContainer extends React.Component {
  componentDidMount() {
    this.props.getProfile();
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
  connect(mapStateToProps, { getProfile })(ProfileInfoContainer)
);
