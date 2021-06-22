import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import ProductDetail from "./productDetail";

configure({ adapter: new Adapter() });

const wrapper = mount(<ProductDetail />);

describe("Product detail widget should be defined", () => {
  it("Should be defined", () => {
    expect(ProductDetail).toBeDefined();
  });
});

describe("Product detail widget should render", () => {
  it("Should render", () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});

describe("Product description should render", () => {
  it("Should render", () => {
    wrapper.find({ "data-testid": "productDescription" });
  });
});

describe("Product slogan should render", () => {
  it("Should render", () => {
    wrapper.find({ "data-testid": "productSlogan" });
  });
});

describe("Product features should render", () => {
  it("Should render", () => {
    wrapper.find({ "data-testid": "productFeatures" });
  });
});
