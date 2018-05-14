import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl, ActivityIndicator, ScrollView,Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-button';

export default class FavoriteTable extends React.Component {
  componentWillMount() {
    return fetch('http://' + global.ip + '/api/film/favorite ',
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
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  render() {
    const state = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
          <ActivityIndicator size="large" color='#f6a21c' />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <View style={styles.separator} />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.white}>Название</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.white}>Локальный рейтинг</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.white}>Рейтинг</Text>
            </View>
          </View>
          <View style={styles.body}>
            {this.state.dataSourceAPI.map(item => {
              const gotofilmpage = () => { Actions.push('filmpage', { film: item, title: item.name }) }
              return (
                <View>
                  <View style={styles.separator} />
                  <Button onPress={gotofilmpage} activeOpacity={1}>
                    <View style={styles.row}>
                      <View style={styles.column}>
                        <Text style={styles.white} ellipsizeMode='tail' numberOfLines={2}>{item.name}</Text>
                      </View>
                      <View style={styles.column}>
                        <Text style={styles.white}>{item.localRating}</Text>
                      </View>
                      <View style={styles.column}>
                        <Text style={styles.white}>{item.globalRating}</Text>
                      </View>
                    </View>
                  </Button>
                </View>
              )
            })}
          </View>
        </View>
      )
    }
  }
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
  column:{
    flex:1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent:'center',
  },
  row:{
    flex:1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    width:'100%',
    height:60
  },
  white:{
    color:'white',
    fontSize: 15,
    paddingLeft: 3,
    paddingRight: 3,
    textAlign: 'center'
  },
  body:{

  },
  container:{
    marginTop: 20,

  },
  separator:{
    height: .5,
    width: "100%",
    backgroundColor: "#FFF",
  },
});