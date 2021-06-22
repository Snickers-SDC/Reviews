import React from 'react';
import { shallow, configure } from 'enzyme';
import Stars from './stars.js';
import StarRatings from 'react-star-ratings';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Should Render', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<Stars />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('renders 5 stars', () => {
    const wrapper = shallow(<Stars />);
    expect(wrapper.find(StarRatings)).toBeTruthy();
  });
  
});
