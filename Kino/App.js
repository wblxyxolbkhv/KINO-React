/*jshint esversion: 6 */
import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, ViewPagerAndroid, ListView } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom';
import { Col, Row, Grid } from "react-native-easy-grid";
import YouTube from 'react-native-youtube';

import FilmRow from './FilmRow';

export default class App extends React.Component 
{
  constructor() 
  {
    super();
	  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {dataSource: ds.cloneWithRows(['row 1']), page: "HomeScreen"};
  }
  render() 
  {
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
        {this.state.page === "NotificationScreen" && <YouTube
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
        {this.state.page === "ProfileScreen" && <Text>Screen3</Text>}

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
