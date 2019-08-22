import * as React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  Button, 
  Dimensions,
  AsyncStorage,
} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

const { width } = Dimensions.get('window')
const qrSize = width * 0.7


class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    asistencias: [],
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No se tiene acceso a la cámara</Text>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          style={StyleSheet.absoluteFill}
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
        />
        <Text
          onPress={() => this.props.navigation.pop()}
          style={styles.cancel}>
          Cancelar
        </Text>

        {scanned && (
          <Button title={'Escanear nuevo'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  guardarEnTelefono = (asistencias) => {
    AsyncStorage.setItem('@AppAP:asistencia', JSON.stringify(asistencias))
    .then((valor) => {
      console.log(valor);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    
    console.log(this.state.codigo);

    fetch('http://192.168.3.4:3000/api/marcaasistencia', {
      method: 'POST',
      headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      codigo: parseInt(data),
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

  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    color: 'white',
  },
});

export default BarcodeScannerExample;