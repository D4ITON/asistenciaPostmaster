import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const SignIn = (props) => {
  
  return (
  <View >
  	<Text>Componente SignIna</Text>
  	<Button title="ir a signup" onPress={navigate(SignUp)}/>
  </View>
  );
};
const SignUp = () => <Text>Componente SignUp</Text>;

const RutasNoAutenticadas = createStackNavigator({
  SignIn: {
    screen: SignIn,
  },
  SignUp: {
    screen: SignUp,
  },
});

export default createAppContainer(RutasNoAutenticadas);