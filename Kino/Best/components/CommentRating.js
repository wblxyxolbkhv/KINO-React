import { Platform, StyleSheet, Text, View, ListView, Alert, Image, AppRegistry, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';

export default class CommentRating extends React.Component {
    constructor() {
        super();
        this.state = { rating: 0,userrating:0,minus:false,plus:false }
    }
    plus(link) {
        if (global.isAuthenticated) {
            ToastAndroid.showWithGravityAndOffset(
                'Комментарий оценён',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150
            );
            fetch(global.ip + '/api/comments/' + link + '/plus',
                {
                    headers: {
                        Authorization: 'Bearer ' + global.token,
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(this.state.userrating!=1){
                    this.setState({
                        userrating: this.state.userrating + 1
                    },
                        function () {
                        });}
                })
                .catch((error) => {
                    this.setState({
                    })
                });
        }
        else {
            ToastAndroid.showWithGravityAndOffset(
                'Требуется авторизация',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150
            );
        }
    }
    componentDidMount() {
        if (global.isAuthenticated) {
            if (this.props.data.yourRate != null) {
                this.setState({ rating: this.props.data.rating-this.props.data.yourRate, userrating: this.props.data.yourRate })
            }
            else
            {
                this.setState({ rating: this.props.data.rating, userrating: 0 })
            }
        }
        else {
            this.setState({ rating: this.props.data.rating, userrating: 0 })
        }
    }
    minus(link) {
        if (global.isAuthenticated) {
            ToastAndroid.showWithGravityAndOffset(
                'Комментарий оценён',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150
            );
            fetch(global.ip + '/api/comments/' + link + '/minus',
                {
                    headers: {
                        Authorization: 'Bearer ' + global.token,
                    },
                })
                .then((response) => response.json())
                .then((responseJson) => {
                    if(this.state.userrating!=-1){
                    this.setState({
                        userrating: this.state.userrating - 1
                    },
                        function () {
                        });
                    }
                })
                .catch((error) => {
                    this.setState({
                    })
                });
        }
        else {
            ToastAndroid.showWithGravityAndOffset(
                'Требуется авторизация',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                0,
                150
            );
        }
    }
    render() {

        return (
            <View style={{ flex: 3, flexDirection: 'row' }}>
                <View style={{ flex: 3, flexDirection: 'column' }}>
                    <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => this.plus(this.props.data.link)}>
                        <Text style={styles.buttontext}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.buttontext}>{this.state.rating+this.state.userrating}</Text>
                </View>
                <View style={{ flex: 3, flexDirection: 'column' }}>
                    <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => this.minus(this.props.data.link)}>
                        <Text style={styles.buttontext}>-</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    buttontext: {
        color: 'white',
        fontSize: 20,
    },
    button: {
        marginTop: 20,
        height: 35,
        width: '100%',
        backgroundColor: '#161a23',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f6a21c',
        borderWidth: 1,
        borderRadius: 5,
    },
})