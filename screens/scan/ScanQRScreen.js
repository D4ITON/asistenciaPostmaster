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
    
    const nuevasAsistencias = [...this.state.asistencias, data];
    this.guardarEnTelefono(nuevasAsistencias);
    this.setState({
      asistencias: nuevasAsistencias,
    });

    console.log(this.state.asistencias);
    alert(`Código: ${data}`);

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