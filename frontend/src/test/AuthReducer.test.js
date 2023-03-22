import AuthReducer from "../context/AuthReducer.js";

describe("AuthReducer", () => {
  const initialState = {
    user: [],
    isLoggedIn: false,
    token: "",
  };

  it("should return initial state when action type is undefined", () => {
    const action = { type: undefined };
    const newState = AuthReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("should handle SIGNING action type", () => {
    const action = { type: "SIGNING" };
    const newState = AuthReducer(initialState, action);
    expect(newState.isLoggedIn).toBe(true);
  });

  it("should handle GET_TOKEN action type", () => {
    const token = "myToken123";
    const action = { type: "GET_TOKEN", payload: token };
    const newState = AuthReducer(initialState, action);
    expect(newState.token).toBe(token);
  });

  it("should handle GET_USER action type", () => {
    const user = { name: "John Doe" };
    const action = { type: "GET_USER", payload: user };
    const newState = AuthReducer(initialState, action);
    expect(newState.user).toEqual(user);
  });

  it("should handle SIGNOUT action type", () => {
    const action = { type: "SIGNOUT" };
    const newState = AuthReducer(initialState, action);
    expect(newState.isLoggedIn).toBe(false);
    expect(newState.token).toBe("");
    expect(newState.user).toEqual([]);
  });
});
