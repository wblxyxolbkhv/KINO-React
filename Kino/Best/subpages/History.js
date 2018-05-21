import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, RefreshControl, ToastAndroid,Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Error } from '../mainpages/Error'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Item } from 'native-base';
import * as Animatable from 'react-native-animatable';

export default class History extends React.Component {
    constructor() {
        super();
        this.state = { isLoading: true, error: false, refreshing: false }
    }
    componentWillMount() {
        return fetch(global.ip + '/api/profile/history',
            {
                headers: {
                    Authorization: 'Bearer ' + global.token,
                },
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSourceAPI: responseJson,
                    error: false
                },
                    function () {
                    });
            })
            .catch((error) => {
                this.setState({
                    error: true,
                })
            });
    }
    _onRefresh() {
        this.setState({ refreshing: true });
        this.componentWillMount().then(() => {
            this.setState({ refreshing: false });
            Actions.refresh({ key: Math.random() })
        });
    }

    hidesection(data){
        return(
            <View>
            </View>
        )
    }
    render() {
        if (!this.state.error) {
            if (this.state.isLoading) {
                return (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
                        <ActivityIndicator size="large" color='#f6a21c' />
                    </View>
                )
            }
            return (
                <ScrollView refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    <View style={{margin: 20,backgroundColor: '#161a23',flex: 1}}>
                        
                    </View>
                </ScrollView>
            );
        }
        else {
            return (
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }>
                    <Error />
                </ScrollView>
            )
        }
    }
}
var styles = StyleSheet.create({
    profile: {
      flex: 1,
    },
    button: {
      marginTop: 10,
      height: 45,
      width: '100%',
      backgroundColor: '#d00',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttontext: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
    },
    container: {
      margin: 20,
      backgroundColor: '#161a23',
      flex: 1
    },
    poster: {
      height: 200,
      width:200,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 4,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    orange: {
      color: '#f6a21c',
      fontWeight: 'bold',
      fontSize: 20,
    },
    white: {
      color: 'white',
      margin: 5,
    },
    textrow: {
      flexDirection: 'row', flex: 1, marginBottom: 12,
    },
    textleft: {
      color: '#17a2b8',
    },
    textright: {
      color: 'white',
    },
    rightcolumn: {
      flex: 2,
      paddingRight: 10,
      width:'100%'
    },
    leftcolumn: {
      flex: 1,
      paddingLeft: 30,
      width:'100%'
    },
    h2:{
      fontSize: 30,
      color:'white',
      marginTop: 15,
      fontWeight:'bold'
    }
  });