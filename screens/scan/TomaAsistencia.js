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


  // agregar registro function
  agregarRegistro = () => {

  	console.log(this.state.codigo);

  	fetch('http://192.168.3.4:3000/api/marcaasistencia', {
  		method: 'POST',
		  headers:{
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			codigo: parseInt(this.state.codigo),
		})
  	})
  	.then( (response) => response.json() )
  	.then((res)=>{
  		console.log(res);
  		if(res.status === 'success'){
	        alert(res.data.marcaasistencia);
	    }else{
	        alert('Sin conexión con el servidor');
	    }
  	}).catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
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