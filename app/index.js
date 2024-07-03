import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import Auth from './screens/Auth';
import Cabinet from './screens/Cabinet';
import Help from './screens/Help';
import Registration from './screens/Registration';
import HomeScreen from './screens/HomeScreen';
import TransfersScreen from './screens/TransfersScreen';

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
  return (
    <AppContainer />
  );
};

export default App;
