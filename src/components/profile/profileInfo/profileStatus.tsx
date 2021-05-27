import React, { ChangeEvent } from "react";

type propsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};
type stateType = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends React.Component<propsType, stateType> {
  constructor(props: propsType) {
    super(props);
    this.state = { editMode: false, status: this.props.status };
  }

  componentDidUpdate(prevProps: propsType) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.target.value,
    });
  };
  render() {
    return (
      <>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "----------"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </>
    );
  }
}

export default ProfileStatus;
