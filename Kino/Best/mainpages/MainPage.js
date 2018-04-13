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
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide'
import Error from '../mainpages/Error'

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
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }
      return (
      <View style={styles.container}>
        <Swiper showsButtons={true} dotColor='#212529' activeDotColor='#f6a21c' autoplay>
        {this.state.dataSourceAPI.map((item,key)=>{
                     return (<Slide 
                      link={item.link}
                      name={item.name}
                    />)
                 })}
          
        </Swiper>
      </View>
      );
    }
    else{
      return(
        <Error/>
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