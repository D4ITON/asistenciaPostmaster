'use strict';

import React, { Component } from 'react';

import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
      	<Button
          title="Borrar datos"
          onPress={this.borrarDatos}
        />
        <Button
          title="desconectarse"
          onPress={this._logout}
        />
      </View>
    );
  }

  _logout = () =>{
    this.props.navigation.navigate('Auth');
  }

  borrarDatos = () => {
    // funcion para borrar datos
    // necesita comprobacion
    fetch('https://asistenc1a.herokuapp.com/api/asistencias', {
        method: 'DELETE',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res.message);
      alert('Asistencias borradas');
    }).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
  	
  };
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    paddingTop: 100,
	    paddingBottom: 100,
	    alignItems: 'center',
		justifyContent: 'space-between',
	},
});


export default HomeScreen;