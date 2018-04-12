import React from 'react';
import {
  Text,View,ImageBackground,StyleSheet, ActivityIndicator, TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Slide extends React.Component{
    constructor() 
    {
        super();
        this.state={isLoading:true,error:false}
    }
    componentWillMount() {
        return fetch("http://"+ global.ip + "/api/film/"+this.props.link)
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSourceAPI: responseJson,
            }, 
            function(){
            });
        })
        .catch((error) =>{
            this.setState({
                error:true,
              })
        });
    }

    render(){
        const gotofilmpage = () => Actions.filmpage({link: this.props.link, title:this.props.name});
        if(!this.state.error){
            if(this.state.isLoading){
            return(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
              </View>
            )
            }
            return(
            <TouchableOpacity style={styles.slide} onPress={gotofilmpage} activeOpacity={1}>
                <ImageBackground style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/'+this.state.dataSourceAPI.poster}}>
                    <View style={styles.slidetext}>
                        <Text style={styles.text}>
                            {this.state.dataSourceAPI.name}
                        </Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            )
        }
        else{
        return(
            <View style={{backgroundColor:'#0f0',flex:1,justifyContent:'center',alignItems: 'center',}}>
                <Text style={{fontSize:30,fontWeight:'bold'}}>Пиздец</Text>
            </View>
        )
    }
    }
}
var styles = {
    poster:{
      flex:1,
    },
    container: {
      flex: 1
    },
    slidetext:{
      justifyContent: 'center',
      alignItems: 'center',
      flex:1
    },
    slide: {
      flex: 1,
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign:'center',
    }
  };