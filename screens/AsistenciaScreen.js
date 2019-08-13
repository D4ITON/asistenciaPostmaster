'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

class AsistenciaScreen extends Component {
  render() {
    return (
      <View>
        <Text>HOLA DESDE ASISTENCIA</Text>
        <Button
          title="desconectarse"
          onPress={this._logout}
        />
      </View>
    );
  };

  _logout = () =>{
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({

});


export default AsistenciaScreen;