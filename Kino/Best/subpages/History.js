import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,Dimensions,TouchableOpacity,RefreshControl,ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Error} from '../mainpages/Error'
import Toast, {DURATION} from 'react-native-easy-toast'

export default class History extends React.Component{
    render(){
        return(
            
            <View>
                <Text>{formated_date}</Text>
            </View>
        )
    }
}