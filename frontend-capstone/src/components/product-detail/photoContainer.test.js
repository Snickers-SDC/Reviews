import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import PhotoContainer from "./photoContainer";

configure({ adapter: new Adapter() });

describe("Photo container component should be defined", () => {
  it("Should be defined", () => {
    expect(PhotoContainer).toBeDefined();
  });
});

describe("Photo container component should render without crashing", () => {
  it("Should render without crashing", () => {
    expect(shallow(<PhotoContainer />).exists()).toBeTruthy();
  });
});
