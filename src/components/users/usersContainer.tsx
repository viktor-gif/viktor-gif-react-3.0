import React from "react";
import { useSelector } from "react-redux";
import { Users } from "./users";
import Preloader from "../common/preloader/preloader";
import { getIsFetching } from "../../redux/selectors/user-selectors";

type propsType = {};

const UsersPage: React.FC<propsType> = (props) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      {isFetching && <Preloader />}
      <Users />
    </>
  );
};

export default UsersPage;
