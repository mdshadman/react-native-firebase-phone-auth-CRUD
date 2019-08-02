import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginContainer from '../src/screens/Login/LoginContainer';
import Navigations from './Navigation';

const AuthStack = createStackNavigator(
    {
        Login: { screen: LoginContainer },
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    });
const AuthNavigation = createAppContainer(AuthStack);

export default AuthNavigation;