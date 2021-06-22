import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import RatingsBreakdown from './ratingsBreakdown.js';
import Stars from './stars.js';
import PropTypes from "prop-types";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Should Render', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<RatingsBreakdown />);
    expect(wrapper.exists()).toBeTruthy();
  });
});


// Searches a wrapper for elements with a `data-test` attribute that we set. Utilizes Enzyme's native `.find` method.
// This allows for more accurate searching of elements within components.
// export const findByTestAttr = (wrapper, val) => {
//   return wrapper.find(`[data-test="${val}"]`);
// };

// // Checks component proptypes using checkPropTypes utility. Expected return value of propError is undefined if there is no error.
// export const checkProps = (component, expectedProps) => {
//   const propError = checkPropTypes(
//     component.propTypes,
//     expectedProps,
//     "prop",
//     component.name
//   );
//   expect(propError).toBeUndefined();
// };
