import YouTube from 'react-native-youtube';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView, 
  Alert,
  FlatList,
  Image
} from 'react-native';
import FilmRow from './FilmRow';
import Profile from './Profile';
import Tabbar from 'react-native-tabbar-bottom';
import Button from 'react-native-button';
import {StackNavigator} from 'react-navigation';

export default class App extends Component {

  _onPress() {
    
   }

  constructor() 
  {
    super();
    this.state = {isLoading: true};
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={dataSource: ds.cloneWithRows(['row 1'])}
  }

  componentWillMount() {
    return fetch('http://192.168.43.107:4320/api/film')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          page:"HomeScreen",
        }, 
        function(){
          
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  getfilms(){
    return this.state.dataSourceAPI.length;
  }

  render() {
    return (
      <View style={styles.container}>
          {this.state.page === "HomeScreen" && (
              <ListView
                style={[styles.container, styles.primaryContainer]}
                dataSource={this.state.dataSource}
                renderRow={(data) => 
                    <FilmRow 
                      filmName = {this.state.dataSourceAPI[0].name}
                      imageSource={this.state.dataSourceAPI[0].poster}
                      year={'Год: ' + this.state.dataSourceAPI[0].releaseYear}
                      duration={'Продолжительность: ' + this.state.dataSourceAPI[0].duration + ' минут'}
                      genre={this.state.dataSourceAPI[0].genre}
                      director={this.state.dataSourceAPI[0].director}
                      country={this.state.dataSourceAPI[0].country}
                      description={this.state.dataSourceAPI[0].description}
                      ageLimit={this.state.dataSourceAPI[0].ageLimit}
                      link={this.state.dataSourceAPI[0].link}
                      style={styles.filmRow}
                    /> 
                }
              />   
            )    
          }
          {this.state.page === "FilmsScreen" &&
          <Button onPress={this._onPress} title="Hello" color="#FFFFFF">
            <View>
              <Text>
                {this.state.dataSourceAPI[0].name}
                {this.getfilms()}
              </Text>
            </View>
          </Button>}

          {this.state.page === "ProfileScreen" && <Profile></Profile>}
  
          <Tabbar
            stateFunc={(tab) => {this.setState({page: tab.page})}}
            activePage={this.state.page}
            tabs={[
              {
                page: "HomeScreen",
                icon: "home",
                iconText: 'Подборка',
              },
              {
                page: "FilmsScreen",
                icon: "notifications",
                badgeNumber: 11,
                iconText: 'Фильмы',
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
	  
	  marginBottom: 50,
  },

};

