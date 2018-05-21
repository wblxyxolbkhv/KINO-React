import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, RefreshControl, WebView, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Seat extends React.Component {
    constructor() {
        super();
        this.state = { active: false };
    }
    seatpress(i, j) {
        this.setState({ active: !this.state.active })
        this.props.onSeatChoosen(i, j, this.state.active);
    }
    render() {
        if (this.props.isBooked) {
            return(
            <TouchableOpacity style={styles.seatbooked} activeOpacity={1}>

            </TouchableOpacity>
            )
        }
        else {
            if (!this.state.active)
                return (
                    <TouchableOpacity style={styles.seat} activeOpacity={1} onPress={() => this.seatpress(this.props.i, this.props.j)}>

                    </TouchableOpacity>
                )
            else
                return (
                    <TouchableOpacity style={styles.seatactive} activeOpacity={1} onPress={() => this.seatpress(this.props.i, this.props.j)}>

                    </TouchableOpacity>
                )
        }
    }
}
var styles = StyleSheet.create({
    seat: {
        backgroundColor: '#006879',
        width: 15,
        height: 20,
        borderRadius: 4,
        margin: 2,
    },
    seatactive: {
        backgroundColor: '#f6a21c',
        width: 15,
        height: 20,
        borderRadius: 4,
        margin: 2,
    },
    seatbooked: {
        backgroundColor: '#b7b7b7',
        width: 15,
        height: 20,
        borderRadius: 4,
        margin: 2,
    },
})