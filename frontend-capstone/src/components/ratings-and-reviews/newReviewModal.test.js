import React from 'react';
import { shallow, configure } from 'enzyme';
import NewReview from './newReviewModal.js';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Should Render', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<NewReview />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
