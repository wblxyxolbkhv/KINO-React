import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, RefreshControl, WebView, Dimensions, TouchableOpacity } from 'react-native';
import Error from '../mainpages/Error'
import { Actions } from 'react-native-router-flux';

export default class Purchase extends React.Component {
    render() {
        return (
            <WebView source={{ uri: this.props.url }}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)} />
        )
    }
    _onNavigationStateChange(webViewState) {
        let url = webViewState.url.substring(0, 53)
        if (url == 'https://kinov2-dev-as.azurewebsites.net/kassa/success') {
            Actions.popAndPush('success')
        }
        let url1 = webViewState.url.substring(0, 50)
        if (url1 == 'https://kinov2-dev-as.azurewebsites.net/kassa/fail') {
            Actions.popAndPush('fail')
        }
    }
}