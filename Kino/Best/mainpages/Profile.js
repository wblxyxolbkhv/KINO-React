import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl, ActivityIndicator, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Error from '../mainpages/Error'
import Button from 'react-native-button';
import FavoriteTable from '../components/FavoriteTable'

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, error: false, refreshing: false }
  }
  componentWillMount() {
    return fetch('http://' + global.ip + '/api/profile/info',
      {
        headers: {
          Authorization: 'Bearer ' + global.token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          error: false
        },
          function () {
          });
      })
      .catch((error) => {
        this.setState({
          error: true,
        })
      });
  }
  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentWillMount().then(() => {
      this.setState({ refreshing: false });
      Actions.refresh({ key: Math.random() })
    });
  }
  LogOff() {
    global.isAuthenticated = false;
    global.token = '';
    Actions.push('login')
  }
  image() {
    if (this.state.dataSourceAPI.profileImage == null) {
      return (<Image style={styles.poster} source={require('../images/default.png')} />)
    }
    else
      return (<Image style={styles.poster} source={{ uri: 'http://' + global.ip + '/images/Posters/' + this.state.dataSourceAPI.profileImage }} />)
  }
  render() {
    if (!this.state.error) {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
            <ActivityIndicator size="large" color='#f6a21c' />
          </View>
        )
      }
      return (
        <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <View style={styles.container}>
            <View style={styles.row}>
              {this.image()}
            </View>
            <View style={styles.row}>
              <Text style={styles.orange}>
                {this.state.dataSourceAPI.username}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.white}>
                {this.state.dataSourceAPI.name + ' ' + this.state.dataSourceAPI.surName + ', ' + this.state.dataSourceAPI.age}
              </Text>
            </View>
            <View style={styles.row}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Email</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.state.dataSourceAPI.email}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Город</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.state.dataSourceAPI.city}</Text>
              </View>
            </View>
            <Text style={styles.h2}>Избранные фильмы</Text>
            <FavoriteTable/>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={() => this.LogOff()} activeOpacity={1}>
              <Text style={styles.buttontext}>
                Выйти
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Error />
        </ScrollView>
      )
    }
  }
}

var styles = StyleSheet.create({
  profile: {
    flex: 1,
  },
  button: {
    marginTop: 10,
    height: 45,
    width: '100%',
    backgroundColor: '#d00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttontext: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
  container: {
    margin: 20,
    backgroundColor: '#161a23',
    flex: 1
  },
  poster: {
    height: 200,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  orange: {
    color: '#f6a21c',
    fontWeight: 'bold',
    fontSize: 20,
  },
  white: {
    color: 'white',
    margin: 5,
  },
  textrow: {
    flexDirection: 'column', flex: 1, marginBottom: 12,
  },
  textleft: {
    color: '#17a2b8',
    alignItems: 'flex-start',
  },
  textright: {
    color: 'white',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  rightcolumn: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 40,
  },
  leftcolumn: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 40,
  },
  h2:{
    fontSize: 30,
    color:'white',
    marginTop: 15,
    fontWeight:'bold'
  }
});

AppRegistry.registerComponent('Tau', () => FilmRow);