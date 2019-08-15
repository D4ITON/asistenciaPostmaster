import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AsistenciaScreen from '../screens/AsistenciaScreen';
import ScanQRScreen from '../screens/ScanQRScreen';

const tabNavigator = createBottomTabNavigator({
  HomeStack: { screen: HomeScreen,
    navigationOptions:{
      tabBarLabel: 'Inicio',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      ),
    }
  },
  AsistenciaStack: { screen: AsistenciaScreen,
    navigationOptions:{
      tabBarLabel: 'Asistencia',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      ),
    }
  },
  ScanStack: { screen: ScanQRScreen,
    navigationOptions:{
      tabBarLabel: 'Scan QR',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-checkmark-circle" size={32} color="green" />
      ),
    }
  }
},{
  navigationOptions: {
    title: 'PostMaster Asistencia'
  }
});

tabNavigator.path = '';

// export default tabNavigator;

export default createStackNavigator({tabNavigator});