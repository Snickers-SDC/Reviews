import React from 'react';
import { shallow, configure } from 'enzyme';
import RatingFilters from './ratingFilters.js';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Should Render', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RatingFilters />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
