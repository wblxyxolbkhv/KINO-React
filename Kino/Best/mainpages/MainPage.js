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
import Slide from '../components/Slide'

export default class MainPage extends React.Component {
  constructor() 
  {
    super();
    this.state={isLoading:true, error:false}
  }
  componentWillMount() {
    return fetch('http://'+global.ip+'/api/film')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson
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
  render() {
    const gotofilmpage = (link,name) => Actions.filmpage({link,name});
    if(!this.state.error){
      if(this.state.isLoading){
        return(
          <View style={{flex: 1, padding: 20}}>
            <ActivityIndicator/>
          </View>
        )
      }
      return (
      <View style={styles.container}>
        <Swiper showsButtons={true} dotColor='#212529' activeDotColor='#f6a21c'>
          <Slide 
            link={this.state.dataSourceAPI[0].link}
            name={this.state.dataSourceAPI[0].name}
          />
          <Slide 
            link={this.state.dataSourceAPI[1].link}
            name={this.state.dataSourceAPI[1].name}
          />
          <Slide 
            link={this.state.dataSourceAPI[2].link}
            name={this.state.dataSourceAPI[2].name}
          />
          <Slide 
            link={this.state.dataSourceAPI[3].link}
            name={this.state.dataSourceAPI[3].name}
          />
        </Swiper>
      </View>
      );
    }
    else{
    return(
      <View style={{backgroundColor:'#f00',flex:1,justifyContent:'center',alignItems: 'center',}}>
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
};

module.exports = MainPage;