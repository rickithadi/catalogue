import React from "react";
import  {  create } from "react-test-renderer";

import CreateCat from "../CreateCat";

describe("CrateCat form", () => {
  const page = create(<CreateCat />);
  it("button press", () => {
    const button = page.root.findByProps({
      testID: "CreateCatButton",
    }).props;
    expect(button).toBeDefined
  });
  it("snapshot", () => {
    expect(page).toMatchSnapshot();
  });
});
