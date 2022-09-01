import React from 'react';
import renderer, { ReactTestRendererJSON, ReactTestRendererTree } from 'react-test-renderer';

import App from '../../App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree= renderer.create(<App />).toJSON();
    expect(tree).toBe(true);
  });
});
