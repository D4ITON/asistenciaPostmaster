'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const {width: WIDTH} = Dimensions.get('window');

class TomaAsistencia extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	codigo: '',
	  };
	}

	submitAndClear = () => {
		this.setState({
		  codigo: ''
		})
	}

  render() {
    return (
      <View style={styles.container}>
      	<View style={styles.alignCenter}>
	      	<Text style={styles.textCenter}>
	      	  Tomar asistencia
	      	</Text>
	      	<View style={styles.inputContainer}>
		      	<TextInput
		          style={styles.inputText}
		          onChangeText={(codigo) => this.setState({codigo})}
		          value={this.state.codigo}
		          keyboardType={'numeric'}
		          maxLength = {15}
		          clearButtonMode='always'
		        />
		        {this.state.codigo !== '' &&
		      		<TouchableOpacity style={styles.btnClear}
		            	onPress={this.submitAndClear} >
		            	<MaterialIcons name="clear" size={25} color="gray"/>
		          	</TouchableOpacity>
		        }

	      	</View>
	      	<TouchableOpacity style={styles.btnAgregar}
		          onPress={this.agregarRegistro}
		        >
		          <Text style={styles.text}>Agregar</Text>
		    </TouchableOpacity>
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
  	if (this.state.codigo === '') {
  		alert('Ingrese un código');
  		return false
  	}

  	fetch('https://asistenc1a.herokuapp.com/api/marcaasistencia', {
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
	inputContainer: {
		marginTop: 10
	},
	alignCenter: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputText:{
	    height: 50,
	    fontSize: 25,
	    width: WIDTH - 55,
	    borderWidth: 1,
	    borderColor: 'gray',
	    margin: 10,
	    borderRadius: 25,
	    paddingLeft: 30,
	 },
	textCenter: {
	   textAlign: 'center',
	   fontSize: 20,
	},
	btnClear:{
	   position: 'absolute',
	   top: 20,
	   right: 40
	},
	btnAgregar:{
	   width: WIDTH - 55,
	   height: 45,
	   borderRadius: 25,
	   backgroundColor: 'rgba(29,185,84,0.9)',
	   justifyContent: 'center',
	   marginTop: 20,
	},
	text: {
	    color: 'rgba(255,255,255,0.7)',
	    fontSize: 16,
	    textAlign: 'center'
	}
});


export default TomaAsistencia;