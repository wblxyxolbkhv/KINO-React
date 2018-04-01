import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

export default class Profile extends React.Component {
  render() {
    return (
		  <View>
        <View style={styles.profile}>
          <Text>
            <Image style={styles.poster} source={{uri:'http://192.168.0.103:4320/images/Posters/' + this.props.imageSource}}/>
          </Text>
        </View>
        <View style={styles.history}>
          <Text>
                Список заказов
          </Text>
        </View>
        	
        <View>
          <YouTube
            apiKey="AIzaSyBnfKSaK1nHiY4MgTCUlTmPFKN0mZwEXJk"
            videoId="KVZ-P-ZI6W4"   // The YouTube video ID
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
		</View>
    );
  }
}

var styles = StyleSheet.create({
  profile: {
	  backgroundColor: '#ffffff',
	  maxHeight: 360,
	  flex: 2,
	  flexDirection: 'row',
	  paddingBottom: 10,
	  paddingTop: 10,
	  paddingLeft: 10,
	  paddingRight: 10,
    alignSelf: 'stretch',
  },

  history: {
    backgroundColor: '#ff0000',
    maxHeight: 160,
    flex: 3,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'stretch',
}
});

AppRegistry.registerComponent('Tau', () => FilmRow);