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
  	alert('borrar datos');
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