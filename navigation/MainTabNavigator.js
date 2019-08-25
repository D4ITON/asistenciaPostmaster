import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import AsistenciaScreen from '../screens/AsistenciaScreen';
import TomaAsistencia from '../screens/scan';
import OpcionesScreen from '../screens/OpcionesScreen';

const tabNavigator = createBottomTabNavigator({
  HomeStack: { screen: HomeScreen,
    navigationOptions:{
      tabBarLabel: 'Inicio',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="home" color={tintColor} size={25} />
      ),
    }
  },
  AsistenciaStack: { screen: AsistenciaScreen,
    navigationOptions:{
      tabBarLabel: 'Asistencia',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="ios-list" color={tintColor} size={25} />
      ),
    }
  },
  ScanStack: { screen: TomaAsistencia,
    navigationOptions:{
      tabBarLabel: 'Escanear',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-qr-scanner" color={tintColor} size={25} />
      ),
    }
  },
  OpcionesStack: {screen: OpcionesScreen,
    navigationOptions:{
      tabBarLabel: 'Opciones',
      tabBarIcon: ({ tintColor }) => (
        <AntDesign name="setting" color={tintColor} size={25} />
      ),
    }
  }
},
  {
    navigationOptions: {
      title: 'PostMaster Asistencia'
    },
    tabBarOptions: {
      activeTintColor: '#1DB954',
      inactiveTintColor: '#000000',
      labelStyle: { fontSize: 10, fontWeight: '200' },
    },
});

tabNavigator.path = '';

// export default tabNavigator;

export default createStackNavigator({tabNavigator});
