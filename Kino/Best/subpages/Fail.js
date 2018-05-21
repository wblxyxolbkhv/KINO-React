import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, Dimensions, TouchableOpacity, RefreshControl, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Error } from '../mainpages/Error'

export default class History extends React.Component {
    constructor() {
        super();
        this.state = { isLoading: true, error: false, refreshing: false }
    }
    componentWillMount() {
        this.setState({isLoading:false})
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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
                    <Image resizeMode="contain" style={{ width: 300, height: 400}} source={{uri:'https://avatanplus.com/files/resources/mid/580357b73c412157cd0ea3cf.png'}} />
                    <Text style={{color:'white',fontSize:35,fontWeight:'bold'}}>ПОТРАЧЕНО</Text>
                </View>
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