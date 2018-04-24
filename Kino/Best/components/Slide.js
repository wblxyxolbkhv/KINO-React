import React from 'react';
import {
  Text,View,ImageBackground,StyleSheet, ActivityIndicator, TouchableOpacity,Dimensions
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Error} from '../mainpages/Error'

export default class Slide extends React.Component{
    constructor() 
    {
        super();
        this.state={isLoading:true}
    }

    render(){
        const gotofilmpage = () => Actions.popAndPush('filmpage',{film:this.props.film,title:this.props.film.name});
            return(
            <TouchableOpacity style={styles.slide} onPress={gotofilmpage} activeOpacity={1}>
                <ImageBackground style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/'+this.props.film.poster}}>
                    <View style={styles.slidetext}>
                        <Text style={styles.text} adjustsFontSizeToFit>
                            {this.props.film.name}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            )
    }
    
}
var styles = {
    poster:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft:30,
      paddingRight:30
    },
    container: {
      flex: 1,
    },
    slidetext:{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      backgroundColor:'rgba(0, 0, 0, 0.6)',
      minHeight:120,
      width: Dimensions.get('screen').width-60,
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign:'center',
    }
  };