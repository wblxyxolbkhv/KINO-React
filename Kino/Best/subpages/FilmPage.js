import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import YouTube from 'react-native-youtube';
import {Actions} from 'react-native-router-flux';
import {Error} from '../mainpages/Error'

export default class Profile extends React.Component {
  constructor() 
  {
    super();
    this.state={isLoading:true,error:false}
    Actions.refresh
  }

  componentWillMount() {
    return fetch("http://"+ global.ip + "/api/film/"+this.props.link)
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          videoID:responseJson.trailerLink.substring(31,11)
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

  getvideoid()
  {
    return this.state.dataSourceAPI.trailerLink.substring(30,41)
  }

  render() {
    if(!this.state.error){
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
		  <ScrollView style={styles.container} ref='_scrollView'>
        <View style={{flex:1}}>
          <View style={styles.postercontainer}>
            <Image style={styles.poster} source={{uri:'http://'+ global.ip + '/images/Posters/' + this.state.dataSourceAPI.poster}}/>
          </View>
        </View>
        <View>
          <Text style={styles.h1}>
            {this.state.dataSourceAPI.name}
          </Text>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{marginRight:60}}>
              <Text style={styles.textleft}>Год выпуска</Text>
            </View>
            <View>
              <Text style={styles.textright}>{this.state.dataSourceAPI.releaseYear}</Text>
            </View>
          </View>
          <Text style={styles.text}>
            Длительность
          </Text>
          <Text style={styles.text}>
            Страна
          </Text>
          <Text style={styles.text}>
            Жанр
          </Text>
          <Text style={styles.text}>
            Режиссёр
          </Text>
          <Text style={styles.text}>
            Возврастное ограничение
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
                Список заказов
          </Text>
        </View>
        <View style={{flex:1}}>
          <Text style={styles.h2}>
            О фильме
          </Text>
        </View>
        <View>
          <YouTube
            apiKey="AIzaSyBnfKSaK1nHiY4MgTCUlTmPFKN0mZwEXJk"
            videoId={this.getvideoid()}  // The YouTube video ID
            play={false}             // control playback of video with true/false
            fullscreen={false}       // control whether the video should play in fullscreen or inline
            loop={false}             // control whether the video should loop when ended
            autoplay = {false}
            modestbranding = {true}
            onReady={e => this.setState({ isReady: false })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
            style={{ alignSelf: 'stretch', height: 200 }}
          />
        </View>
        <View style={{flex:1,height:100}}>
          <Text onPress={() => { this.refs._scrollView.scrollTo(0); }}>sdfgfdhgfh</Text>
        </View>		
		</ScrollView>
    );
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
var styles = StyleSheet.create({
  poster: {
    flex:1,
    width:330,
    height:400
  },
  h1:{},
  h2:{},
  h3:{},
  container:{
    padding:20,
    backgroundColor:'#161a23',
  },
  textleft:{
    fontWeight: 'bold',
	  color: 'white'
  },
  textright:{
    fontWeight: 'bold',
	  color: 'white'
  },
  postercontainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

AppRegistry.registerComponent('Best', () => FilmRow);