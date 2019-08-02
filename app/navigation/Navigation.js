import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Drawer from './DrawerNavigation';
const NavigationStack = createStackNavigator({
    DrawerNavigation: { screen: Drawer }
},
    {
        initialRouteName: 'DrawerNavigation',
        headerMode: 'none'
    });
const Navigations = createAppContainer(NavigationStack)
export default Navigations;