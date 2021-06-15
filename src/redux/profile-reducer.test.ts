import profileReducer, { actions } from "./profile-reducer";

let state = {
  posts: [
    { id: 1, post: "Hello", likesCount: 5 },
    { id: 2, post: "I'm a cool developer", likesCount: 23 },
    { id: 3, post: "Hello world!!!!", likesCount: 0 },
  ],
  profileInfo: null,
  status: "",
};

test("state should be incremented", () => {
  let action = actions.addPost("text");

  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});

test("first post should contain 'Hello!' text", () => {
  let action = actions.addPost("Hello React!");

  let newState = profileReducer(state, action);
  expect(newState.posts[newState.posts.length - 1].post).toBe("Hello React!");
});

test("state should be decremented", () => {
  let action = actions.deletePost(2);

  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
});
