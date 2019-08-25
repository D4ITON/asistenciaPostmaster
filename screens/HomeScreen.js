'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import OfflineNotice from '../OfflineNotice';

const urlForReportes = APIDataReportes => `https://asistenc1a.herokuapp.com/api/reporteasistencias`

class HomeScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
  
    this.state = {
      requestFailed: false,
      asistentes: '',
      inscritos: '',
      estudiantes: '',
      porcentaje: '',
    };
  }

  componentDidMount() {
    this._isMounted = true;

    this.fetchResult()
    setInterval(this.fetchResult, 2000)
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={styles.container}>
        <OfflineNotice />
        <View>
          <Text style={styles.numbers}>{this.state.asistentes}</Text>
          <Text style={styles.textCenter}>Asistentes</Text>
        </View>
        <View style={styles.subcontainer}>
          <View>
            <Text style={styles.textCenter}>{this.state.inscritos}</Text>
            <Text style={styles.textCenterDos}>Inscritos</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>{this.state.estudiantes}</Text>
            <Text style={styles.textCenterDos}>Estudiantes</Text>
          </View>
        </View>
        <Text style={styles.textPorcentaje}>{this.state.porcentaje} %</Text>
      </View>
    );
  }


  fetchResult = () => {
    fetch(urlForReportes(this.props.APIDataReportes))
    .then(response =>{
        if(!response.ok){
            throw Error("Network request failed")
        }
        return response
    })
    .then(res => res.json())
    .then(res => {
      if (this._isMounted) {

        console.log(res.data[0].listar_reporteasistencia)
        console.log(res.data[1].listar_reporteasistencia)
        console.log(res.data[2].listar_reporteasistencia)
        
        var asistentes = res.data[0].listar_reporteasistencia;
        var inscritos = res.data[1].listar_reporteasistencia;
        var estudiantes = res.data[2].listar_reporteasistencia;
        var porcentaje;
        if (inscritos) {
          porcentaje = asistentes * 100 / inscritos;
        }
        porcentaje = 0;

        this.setState({
            asistentes: asistentes,
            inscritos: inscritos,
            estudiantes: estudiantes,
            porcentaje: porcentaje,
        });

        console.log(this.state.porcentaje);
        
      }
    },() => {
        this.setState({
            requestFailed: true
        })
    })
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingBottom: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subcontainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around' ,
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 20,
  },
  textCenterDos: {
    textAlign: 'center',
    fontSize: 16,
  },
  textPorcentaje: {
    textAlign: 'center',
    fontSize: 25,
  },
  numbers: {
    textAlign: 'center',
    fontSize: 60,
  },
});


export default HomeScreen;