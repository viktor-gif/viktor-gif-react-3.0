import React, { ChangeEvent, useEffect, useState } from "react";

type propsType = {
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileStatusWithHooks: React.FC<propsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };
  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);
  };

  return (
    <>
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "----------"}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </>
  );
};

export default ProfileStatusWithHooks;
