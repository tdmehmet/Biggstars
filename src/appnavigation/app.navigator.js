import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import SplashScreen from '../splash/splash.screen'
import LoginScreen from '../login/login.screen';
import HomeScreen from '../home/home.screen'
import SideBar from "../sidebar/sidebar";


const Splash = {
    screen: SplashScreen,
    navigationOptions: {
        header: null,
    }
}

const Login = {
    screen: LoginScreen,
    navigationOptions: {
        header: null,
    }
}

const Home = {
    screen: HomeScreen,
    navigationOptions: {
        header: null,
    }
}

const RouteConfig = {
    initialRoute: 'Splash'
}
const AppNavigator = createDrawerNavigator(
    {
        Splash: Splash,
        Login: Login,
        Home: Home,
    },
    {
    contentComponent: props => <SideBar {...props} />
    },
    RouteConfig)

export default AppNavigator;