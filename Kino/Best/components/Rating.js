import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,Dimensions,TouchableOpacity,RefreshControl,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Slider from "react-native-slider";

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = { idLoading: true }
    }
    componentWillMount() {
        this.setState({ isLoading: false })
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
                    <ActivityIndicator size="large" color='#f6a21c' />
                </View>
            )
        }
        else {
            return (
                <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Slider
                            value={this.props.localRating}
                            onValueChange={value => this.setState({ value })}
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View>
                        <View>
                            <Text>Средняя оценка: </Text>
                        </View>
                        <View>
                            <Text>Ваша оценка: </Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity>
                            <Text>Оценить</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}