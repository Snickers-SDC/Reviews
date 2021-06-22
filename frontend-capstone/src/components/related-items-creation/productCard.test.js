import React from 'react';
import { shallow } from 'enzyme';
import ProductCard from './productCard';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Product Card Should Render', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ProductCard />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
