'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  FlatList,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import OfflineNotice from '../OfflineNotice';

const urlForUsers = APIDataUsers => `https://asistenc1a.herokuapp.com/api/obtieneasistentes`

class AsistenciaScreen extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
  
    this.state = {
      requestFailed: false,
      refreshing: false,
      usuarios: [],
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
    console.log(this.state.requestFailed);

    return (
      <View>
        <OfflineNotice />
        <FlatList
          data={this.state.usuarios}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ListItem
              leftElement = {this.renderLeftElement(index)}
              style = {{marginLeft : 15}, {marginRight : 5}}
              title={`${ item.apellidos }, ${ item.nombres }`}
              subtitle={item.codigo.toString()}
              badge={{ value: item.hora, textStyle: { color: 'white' }, containerStyle: { marginTop: -20 } }}
            />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  };

  fetchResult = () => {
    fetch(urlForUsers(this.props.APIDataUsers))
    .then(response =>{
        if(!response.ok){
            throw Error("Network request failed")
        }
        return response
    })
    .then(d => d.json())
    .then(d => {
      if (this._isMounted) {
        this.setState({
            usuarios: d.data,
            refreshing: false,
        });
      }
    },() => {
        this.setState({
            requestFailed: true
        })
    })
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, () => {
      this.fetchResult();
    })
  }

  // _getUsuarios = async (endpoint) => {
  //   const res = await fetch(endpoint);
  //   const data = await res.json();
  //   return data;
  // }

  renderLeftElement(index){
      index++
      return(
          <Text style={{color: 'black'}}>{index}</Text>
      )
  };  

}

const styles = StyleSheet.create({

});


export default AsistenciaScreen;