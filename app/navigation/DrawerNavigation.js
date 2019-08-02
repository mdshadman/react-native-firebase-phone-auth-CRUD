import React, { Component } from 'react'
import { createDrawerNavigator, createAppContainer } from 'react-navigation';
import MainContainer from '../src/screens/Main/MainContainer';
import SideBar from '../src/screens/SideBar/SideBar';
const DrawerStack = createDrawerNavigator(
    {
        Main: { screen: MainContainer }

    },
    {
        contentComponent: (props) => <SideBar {...props} />,
        initialRouteName: 'Main',
        hideStatusBar: false,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
        overlayColor: '#6b52ae',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#6b52ae',
        },
    }
)
const Drawer = createAppContainer(DrawerStack)
export default Drawer;