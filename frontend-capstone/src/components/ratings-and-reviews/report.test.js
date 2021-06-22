import React from 'react';
import { shallow, configure } from 'enzyme';
import Report from './report.js';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Should Render', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Report />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
