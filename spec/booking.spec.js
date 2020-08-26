import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { expect } from 'chai';
import App from '../client/components/App.jsx';

describe('<Booking />', () => {
  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('calls componentDidMount', () => {
    spy(App.prototype, 'componentDidMount');
    wrapper = shallow(<App />);
    expect(App.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('calls fetchListingInfo on mount', () => {
    App.prototype.fetchListingInfo = jest.fn();
    spy(App.prototype, 'fetchListingInfo');
    wrapper = shallow(<App />);
    expect(App.prototype.fetchListingInfo).to.have.property('callCount', 1);
  });
});
