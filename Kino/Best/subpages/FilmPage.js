import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';
import YouTube from 'react-native-youtube';

export default class Profile extends React.Component {
  constructor() 
  {
    super();
    this.state={isLoading:true}
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
        console.error(error);
      });
  }

  getvideoid()
  {
    return this.state.dataSourceAPI.trailerLink.substring(30,41)
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
		  <ScrollView style={styles.container}>
        <View style={{flex:1}}>
          <View style={styles.postercontainer}>
            <Image style={styles.poster} source={{uri:'http://'+ global.ip + '/images/Posters/' + this.state.dataSourceAPI.poster}}/>
          </View>
          <Text style={styles.text}>
            Название: {this.state.dataSourceAPI.name}
          </Text>
          <Text style={styles.text}>
            Год:
          </Text>
          <Text style={styles.text}>
            Режиссёр: {this.state.dataSourceAPI.directorLINK}
          </Text>
          <Text style={styles.text}>
            Жанр:
          </Text>
          <Text style={styles.text}>
            Актёры: 
          </Text>
          <Text style={styles.text}>
            О фильме: {this.state.dataSourceAPI.description}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
                Список заказов
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
  
            style={{ alignSelf: 'stretch', height: 300 }}
          />
        </View>		
		</ScrollView>
    );
  }
}
var styles = StyleSheet.create({
  poster: {
    flex:1,
    width:330,
    height:400
  },
  container:{
    padding:20,
    backgroundColor:'#161a23',
  },
  text:{
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