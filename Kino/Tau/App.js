/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import YouTube from 'react-native-youtube';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';
import FilmRow from './FilmRow';
import Profile from './Profile';
import Tabbar from 'react-native-tabbar-bottom';


export default class App extends Component {
  constructor() 
  {
    super();
	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(['row 1']), page: "HomeScreen"};
  }
  render() {
    return (
      
      <View style={styles.container}>
          {
              this.state.page === "HomeScreen" && (
              <ListView
                style={[styles.container, styles.primaryContainer]}
                dataSource={this.state.dataSource}
                renderRow={(data) => 
                  <FilmRow 
                    filmName='Властелин колец: Братство кольца' 
                    imageSource='./img/Posters/LOTR1.jpg' 
                    year='Год: 2002'
                    duration='Продолжительность: 3 ч 48 мин'
                    style={styles.filmRow}
                  />
                }
              />      
            )    
          }
          {this.state.page === "NotificationScreen" && 
          <YouTube
            apiKey="AIzaSyBnfKSaK1nHiY4MgTCUlTmPFKN0mZwEXJk"
            videoId="KVZ-P-ZI6W4"   // The YouTube video ID
            play={true}             // control playback of video with true/false
            fullscreen={true}       // control whether the video should play in fullscreen or inline
            loop={true}             // control whether the video should loop when ended
  
            onReady={e => this.setState({ isReady: true })}
            onChangeState={e => this.setState({ status: e.state })}
            onChangeQuality={e => this.setState({ quality: e.quality })}
            onError={e => this.setState({ error: e.error })}
  
            style={{ alignSelf: 'stretch', height: 300 }}
          />}

          {this.state.page === "ProfileScreen" && <Profile></Profile>}
  
          <Tabbar
            stateFunc={(tab) => {this.setState({page: tab.page})}}
            activePage={this.state.page}
            tabs={[
              {
                page: "HomeScreen",
                icon: "home",
                iconText: 'Афиша',
              },
              {
                page: "NotificationScreen",
                icon: "notifications",
                badgeNumber: 11,
                iconText: 'Уведомления',
              },
              {
                page: "ProfileScreen",
                icon: "person",
                iconText: 'Профиль',
              },
            ]}
          />
        </View>
      );
  }
}

var styles = {
  container: {
    flex: 1
  },
  filmRow: {
	  alignSelf: 'stretch',
  },
  primaryContainer: {
	  marginTop: 24,
	  marginBottom: 50,
  },

};

