import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import TextContainer from "./textContainer";

configure({ adapter: new Adapter() });

describe("Text container component should be defined", () => {
  it("Should be defined", () => {
    expect(TextContainer).toBeDefined();
  });
});

describe("Text container component should render without crashing", () => {
  it("Should render without crashing", () => {
    expect(shallow(<TextContainer />).exists()).toBeTruthy();
  });
});
