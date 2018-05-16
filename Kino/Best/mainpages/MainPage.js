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
  ImageBackground,
  ScrollView,
  RefreshControl
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
    this.state={isLoading:true, error:false,refreshing: false}
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.componentWillMount().then(() => {
      this.setState({refreshing: false});
      Actions.refresh
    });
}
  componentWillMount() {
    return fetch(global.ip+'/api/film/featured', {timeout: 500,follow:0})
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          error:false
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
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
            <ActivityIndicator size="large" color='#f6a21c'/>
          </View>
        )
      }
      return (
      <View style={styles.container}>
        <Swiper showsButtons={true} dotColor='#212529' activeDotColor='#f6a21c' autoplayTimeout={4} prevButton={<Text style={styles.buttonText}>‹</Text>} nextButton={<Text style={styles.buttonText}>›</Text>}>
        {this.state.dataSourceAPI.map((item,key)=>{
                     return (<Slide 
                      film={item}
                    />)
                 })}
          
        </Swiper>
      </View>
      );
    }
    else{
      return(
        <ScrollView style={{flex:1}} contentContainerStyle={{flex:1}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Error/>
        </ScrollView>
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
  buttonText:{
    fontSize: 50,
    color: '#f6a21c',
    fontFamily: 'Arial'
  }
};

module.exports = MainPage;