'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
} from 'react-native';

class AsistenciaScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      asistencias: [],
    };
  }

  componentDidMount() {
    this.recuperarEnTelefono();
  }

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

  recuperarEnTelefono = () => {
    AsyncStorage.getItem('@AppAP:asistencia')
    .then((valor) => {
      console.log(valor);
      console.log(JSON.parse(valor));
      if(valor !== null){
        const nuevasAsistencias = JSON.parse(valor);
        this.setState({
          asistencias: nuevasAsistencias,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        cargando: false,
      });
    })
  }

  _logout = () =>{
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({

});


export default AsistenciaScreen;