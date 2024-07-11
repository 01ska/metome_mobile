import React, { useState, useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

import Auth from './screens/Auth';
import Cabinet from './screens/Cabinet';
import Help from './screens/Help';
import Registration from './screens/Registration';
import HomeScreen from './screens/HomeScreen';
import TransfersScreen from './screens/TransfersScreen';
import * as SplashScreen from 'expo-splash-screen';
import { UserProvider } from '../contexts/UserContext'
SplashScreen.preventAutoHideAsync();

import * as Font from 'expo-font';

const loadFonts = async () => {
  await Font.loadAsync({
    'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });
};

// Auth stack
const AuthStack = createStackNavigator(
  {
    Auth: Auth,
    Registration: Registration,
    Help: Help
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
  }
);

// Main stack with bottom tab navigation
const MainStack = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Главная',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="home" size={20} color={tintColor} />
        )
      }
    },
    Transfers: {
      screen: TransfersScreen,
      navigationOptions: {
        tabBarLabel: 'Переводы',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="swap-horiz" size={20} color={tintColor} />
        )
      }
    },
    Cabinet: {
      screen: Cabinet,
      navigationOptions: {
        tabBarLabel: 'Аккаунт',
        tabBarIcon: ({ tintColor }) => (
          <AntDesign name="user" size={20} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: '#000000',
    inactiveColor: 'rgba(0, 0, 0, 0.6)',
    barStyle: { backgroundColor: '#ffffff' },
    labeled: true,
    shifting: false
  }
);

// Root navigator to switch between Auth and Main stacks
const RootNavigator = createSwitchNavigator(
  {
    AuthStack: AuthStack,
    MainStack: MainStack
  },
  {
    initialRouteName: 'AuthStack'
  }
);

const AppContainer = createAppContainer(RootNavigator);

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const fetchFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    };

    fetchFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <UserProvider>
      <AppContainer />
    </UserProvider>
  );
};


export default App;
