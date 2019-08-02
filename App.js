

import React, { Fragment } from 'react';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Navigations from './app/navigation/Navigation';
import AuthNavigation from './app/navigation/AuthNavigation';
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

export default App
