import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,Dimensions,TouchableOpacity,RefreshControl,ToastAndroid} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Slider from "react-native-slider";

export default class Rating extends React.Component {
    constructor() {
        super();
        this.state = { idLoading: true }
    }
    componentWillMount() {
        this.setState({ isLoading: false,value: this.props.localRating})
        if(this.props.localRating==0){
            this.setState({value:5})
        }
    }

    Rate(){
        ToastAndroid.showWithGravityAndOffset(
            'Фильм оценён!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            0,
            150
          );
          fetch(global.ip + '/api/film/'+this.props.link+'/',
          {
            headers: {
              Authorization: 'Bearer ' + global.token,
            },
          });
    }
    rightcolumn() {
        if (this.props.disabled) {
            return (
                <View style={[styles.column,]}>
                    <Text style={[styles.text, { textAlign: 'right' }]}></Text>
                </View>
            )
        }
        else {
            return (
                <View style={[styles.column,]}>
                    <Text style={[styles.text, { textAlign: 'right' }]}>Ваша оценка: {this.state.value}</Text>
                </View>
            )
        }
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
                    <Text style={styles.h2}>
                        Рейтинг
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Slider
                            value={this.state.value}
                            onValueChange={value => this.setState({ value })}
                            minimumValue={1}
                            maximumValue={10}
                            step={1}
                            thumbTintColor='#f6a21c'
                            style={{ flex: 1 }}
                            minimumTrackTintColor='#f6a21c'
                            disabled={this.props.disabled}
                        />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={styles.column}>
                            <Text style={styles.text}>Средняя оценка: {this.props.localRating}</Text>
                        </View>
                        {this.rightcolumn()}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => this.Rate()} disabled={this.props.disabled}>
                            <Text style={styles.buttontext}>Оценить</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            )
        }
    }
}
const styles=StyleSheet.create({
    button:{
		marginTop: 20,
		height:42,
		width:'100%',
		backgroundColor:'#161a23',
		justifyContent:'center',
		alignItems: 'center',
		borderColor:'#f6a21c',
		borderWidth: 1,
		borderRadius: 5,
    },
    buttontext:{
		color:'white',
		fontSize:25,
		fontWeight: 'bold',
    },
    column:{
        flex:1,
        flexDirection: 'column',
    },
    text:{
        color:'white',
        fontSize: 15,
    },
    h2:{
        color:'white',
        fontSize:30,
        fontWeight:'bold',
        marginBottom:5,
    },
    separator:{
        height: .5,
        width: "100%",
        backgroundColor: "#FFF",
        marginTop: 10,
      },
})