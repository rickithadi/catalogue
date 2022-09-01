import React from "react";
import  { create } from "react-test-renderer";

import App from "../../App";

describe("<App />", () => {
  it("snapshot", () => {
    const tree = create(<App />)
    expect(tree).toMatchSnapshot();
  });
});
