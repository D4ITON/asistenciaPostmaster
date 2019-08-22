'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.numbers}>50</Text>
          <Text style={styles.textCenter}>Asistentes</Text>
        </View>
        <View style={styles.subcontainer}>
          <View>
            <Text style={styles.textCenter}>100</Text>
            <Text style={styles.textCenterDos}>inscritos</Text>
          </View>
          <View>
            <Text style={styles.textCenter}>200</Text>
            <Text style={styles.textCenterDos}>estudiantes</Text>
          </View>
        </View>
        <Text style={styles.textPorcentaje}>98%</Text>
      </View>
    );
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
    fontSize: 25,
  },
  numbers: {
    textAlign: 'center',
    fontSize: 60,
  },
});


export default HomeScreen;