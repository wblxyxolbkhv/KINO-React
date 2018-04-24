import {Platform,StyleSheet,Text,View,ListView, Alert,Image,AppRegistry,ScrollView} from 'react-native';
import React from 'react';

export default class Error extends React.Component{
    render(){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#161a23'}}>
                 <Image resizeMode="contain" style={{width:300,height:400}} source={require('../images/error.png')}/>
            </View>
        )
    }
}
AppRegistry.registerComponent('Best', () => Error);