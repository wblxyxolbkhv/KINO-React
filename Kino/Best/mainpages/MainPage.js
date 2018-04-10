import YouTube from 'react-native-youtube';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView, 
  Alert,
  FlatList,
  Image,
  ActivityIndicator,
  ImageBackground
} from 'react-native';
import FilmRow from '../components/FilmRow';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';

export default class MainPage extends React.Component {
  constructor() 
  {
    super();
    this.state={isLoading:true}
  }
  componentWillMount() {
    return fetch('http://'+global.ip+'/api/film')
    .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
          dataSourceAPI: responseJson
        }, 
        function(){ 
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }
  render() {
    const gotofilmpage = () => Actions.filmpage({link: this.props.link, title:this.props.name});
    if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
    return (
      <View style={styles.container}>
        <Swiper showsButtons={true}>
          <View style={styles.slide}>
            <ImageBackground style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/'+this.state.dataSourceAPI[0].poster}}>
              <View style={styles.slidetext}>
                <Text style={styles.text}>
                  {this.state.dataSourceAPI[0].name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.slide}>
            <ImageBackground style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/'+this.state.dataSourceAPI[1].poster}}>
              <View style={styles.slidetext}>
                <Text style={styles.text}>
                  {this.state.dataSourceAPI[1].name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.slide}>
            <ImageBackground style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/'+this.state.dataSourceAPI[2].poster}}>
              <View style={styles.slidetext}>
                <Text style={styles.text}>
                  {this.state.dataSourceAPI[2].name}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.slide}>
            <ImageBackground style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/'+this.state.dataSourceAPI[3].poster}}>
              <View style={styles.slidetext}>
                <Text style={styles.text}>
                  {this.state.dataSourceAPI[3].name}
                </Text>
              </View>
            </ImageBackground>
          </View>
        </Swiper>
      </View>
    );
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
    textShadowColor : '#0f0',
textShadowOffset : {width: 3, height: 3} ,
textShadowRadius :3
  }
};

module.exports = MainPage;