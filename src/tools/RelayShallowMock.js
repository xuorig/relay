/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayShallowMock
 * @flow
 */

/**
 * @description
 * RelayShallowMock allows testing Relay components in isolation.
 * Every Relay container will only render the name of the component it contains.
 * Adds `unwrap` to the container that returns the component to test.
 *
 * @example
 * jest.mock('Relay', () => require('RelayShallowMock'));
 * const renderer = require('ReactTestRenderer');
 * const MyContainer = require('MyContainer');
 *
 * test('the wrapped component', () => {
 *   const MyComponent = MyContainer.unwrap();
 *   // Here I can test the component by passing the properties I want to test
 *   // any containers inside the component will render as:
 *   // <RelayContainer>Component Name</RelayContainer>
 *   expect(
 *     renderer.create(
 *       <MyComponent myProp={{}} myOtherProp={{}} />
 *     ).toMatchSnapshot()
 *   );
 * });
 *
 */

'use strict';

const React = require('React');
const Relay = require('Relay');

import type {RelayContainerSpec, RelayLazyContainer} from 'RelayContainer';

const RelayShallowMock = {
   createContainer: (
     component: ReactClass<any>,
     spec: RelayContainerSpec,
   ) : RelayLazyContainer => {
     const Container = class extends React.Component {
       render() {
         return React.createElement(
           'RelayContainer',
           null,
           component.displayName || component.name,
         );
       }

       static unwrap(): ReactClass<any> {
         return component;
       }
     };

     return Container;
   },
 };

module.exports = {
  ...Relay,
  ...RelayShallowMock,
};
