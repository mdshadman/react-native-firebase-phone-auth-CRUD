

import React, { Fragment } from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Navigations from './app/navigation/Navigation';
import AuthNavigation from './app/navigation/AuthNavigation';
import { Root } from 'native-base';
const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    PageNavigation: Navigations

  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none'
  }
)


const App = createAppContainer(SwitchNavigator);

const APPView = () => {
  return (
    <Root>
      <App />
    </Root>
  )
}
export default APPView;
