import {Platform,StyleSheet,Text,View,ListView, Alert,Image,AppRegistry} from 'react-native';
import React from 'react';

export default class Error extends React.Component{
    render(){
        return(
            <View style={{backgroundColor:'#0f0',flex:1,justifyContent:'center',alignItems: 'center',}}>
                <Text style={{fontSize:30,fontWeight:'bold'}}>Пиздец</Text>
            </View>
        )
    }
}
AppRegistry.registerComponent('Best', () => Error);