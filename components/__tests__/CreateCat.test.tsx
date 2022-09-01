import React from "react";
import { TextInput } from "react-native";
import { create } from "react-test-renderer";

import CreateCat from "../CreateCat";

describe("CrateCat form", () => {
  const page = create(<CreateCat />);
  it("button renders", () => {
    const button = page.root.findByProps({
      testID: "CreateCatButton",
    }).props;
    expect(button).toBeDefined;
  });
  it("inputs render", () => {
    const inputs = page.root.findAllByType(TextInput,{deep:true})
        expect(inputs).toHaveLength(3)
  });

  it("snapshot", () => {
    expect(page).toMatchSnapshot();
  });
});
