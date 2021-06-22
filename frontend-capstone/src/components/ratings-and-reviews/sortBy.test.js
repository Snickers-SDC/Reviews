import React from 'react';
import { shallow, configure } from 'enzyme';
import SortBy from './sortBy.js';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Should Render', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SortBy />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
