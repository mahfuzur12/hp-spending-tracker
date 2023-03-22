import React from "react";
import { render } from "@testing-library/react";
import { AuthContext, AuthContextProvider } from "../context/AuthContext.js";

describe("AuthContextProvider", () => {
  it("renders without crashing", () => {
    render(
      <AuthContextProvider>
        <div>Test</div>
      </AuthContextProvider>
    );
  });

  it("provides the initial state values to its children", () => {
    const { container } = render(
      <AuthContextProvider>
        <div>{({ user, isLoggedIn, token }) => `${user} ${isLoggedIn} ${token}`}</div>
      </AuthContextProvider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});