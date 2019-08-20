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
          <Text style={styles.numbers}>123</Text>
          <Text style={styles.textCenter}>Asistentes</Text>
        </View>
        <Text style={styles.textCenter}>123/135</Text>
        <Text style={styles.textCenter}>98%</Text>
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
  textCenter: {
    textAlign: 'center',
    fontSize: 20,
  },
  numbers: {
    fontSize: 60,
  },
});


export default HomeScreen;