import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import createBottomTabNavigator from './navigation/MainTabNavigator';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Inicio de sesión',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Ingresar" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Bienvenido a la aplicación',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Salir :)" onPress={this._signOutAsync} />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// pantalla de tabs de navegacion

const RootStack = createStackNavigator(
  {
    // Login: LoginScreen,
    Home: createBottomTabNavigator 
  },
  {
    // initialRouteName: 'Login',
    defaultNavigationOptions: {
        header: null,
    }
  }
);

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
