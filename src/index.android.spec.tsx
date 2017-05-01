import 'react-native'
import Index from './index.ios'
import React from 'react'
import renderer from 'react-test-renderer'
it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
  expect(tree).toBeDefined()
});
