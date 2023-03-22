import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Avatar from "../components/Avatar/Avatar";
import { AuthContext, AuthContextProvider } from "../context/AuthContext.js";

describe("Avatar", () => {
  it("renders the user avatar", () => {
    const user = { name: "John Doe" };
    const { getByAltText } = render(
      <AuthContextProvider value={{ user }}>
        <Avatar />
      </AuthContextProvider>
    );
    const avatarImage = getByAltText("avatar");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://a.wattpad.com/useravatar/N0tKay1.256.585229.jpg"
    );
  });
});
