import usersReducer, { actions, initialStateType } from "./users-reducer";
import { userType } from "../Types";

let state: initialStateType;
beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: "Viktor",
        followed: false,
        photos: { small: null, large: null },
        status: "status",
      },
      {
        id: 1,
        name: "Viktor1",
        followed: false,
        photos: { small: null, large: null },
        status: "status1",
      },
      {
        id: 2,
        name: "Viktor2",
        followed: true,
        photos: { small: null, large: null },
        status: "status2",
      },
      {
        id: 3,
        name: "Viktor3",
        followed: true,
        photos: { small: null, large: null },
        status: "status3",
      },
    ],
    pageSize: 10,
    totalUsersCount: 0,
    selectedPage: 1,
    isFetching: false,
    followingInProgress: [],
  };
});

test("follow success", () => {
  const newState = usersReducer(state, actions.setFollow(1));

  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
  const newState = usersReducer(state, actions.setUnfollow(3));

  expect(newState.users[3].followed).toBeFalsy();
  expect(newState.users[2].followed).toBeTruthy();
});
