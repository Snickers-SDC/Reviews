import React from 'react';
import { shallow } from 'enzyme';
import RelatedItems from './relatedItems';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RelatedItems />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
