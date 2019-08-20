'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';

class TomaAsistencia extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	codigo: '',
	  };
	}
  render() {
    return (
      <View style={styles.container}>
      	<View>
	      	<Text style={styles.textCenter}>
	      	  Tomar asistencia
	      	</Text>
	      	<TextInput
	          style={styles.inputText}
	          onChangeText={(codigo) => this.setState({codigo})}
	          value={this.state.codigo}
	          keyboardType={'numeric'}
	        />
	        <Button
	          title="agregar"
	          onPress={this.agregarRegistro}
	        />
      	</View>
        <View>
        	<Button
	          title="escanear codigo"
	          onPress={() => this.props.navigation.navigate("ScanScreen")}
	        />
        </View>
      </View>
    );
  }

  agregarRegistro = () => {
  	
  	alert(this.state.codigo);
  };

  // login function
  login = () => {
  	// Post data to our express point
  	// -- It must fetch data via clients IP; 'localhost' will never work.
  	fetch('https://asistenc1a.herokuapp.com/login', {
  		method: 'POST',
		  headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: this.state.codigo,
		})
  	})
  	.then( (response) => response.json() )
  	.then((res)=>{

  		if(res.success === true){
  			alert(res.message);
  		}else{
  			alert(res.message);
  		}

  	}).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    });

  }

  navegar = () => {};

}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    paddingTop: 100,
	    paddingBottom: 100,
	    alignItems: 'center',
	    justifyContent: 'space-between',
	  },
	inputText:{
	    height: 40, 
	    width: 300,
	    borderBottomColor: 'gray', 
	    borderBottomWidth: 1,
	    margin: 12
	 },
	textCenter: {
	   textAlign: 'center',
	   fontSize: 20,
	},
});


export default TomaAsistencia;