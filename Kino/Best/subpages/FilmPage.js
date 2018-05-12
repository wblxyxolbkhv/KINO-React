import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,Dimensions,TouchableOpacity,RefreshControl,} from 'react-native';
import YouTube from 'react-native-youtube';
import {Actions} from 'react-native-router-flux';
import {Error} from '../mainpages/Error'
import FilmSession from '../components/FilmSession'
import Toast, {DURATION} from 'react-native-easy-toast'
import Rating from '../components/Rating'

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, favorite: true, refreshing: false, }
  }

  getvideoid() {
    return this.props.film.trailerLink.substring(30, 41)
  }

  favorite() {
    var style = {
      favorite: {
        height: 35,
        width: 35,
        tintColor: '#f6a21c',
      },
    }
    if (global.isAuthenticated)
      switch (this.state.favorite) {
        case true: {
          return (<Image style={style.favorite} source={require('../images/bookmark.png')} />)
        }
        case false: {
          return (<Image style={style.favorite} source={require('../images/bookmarkfilled.png')} />)
        }
      }
  }
  _onRefresh() {
    Actions.refresh({ key: Math.random() })
  }

  rating() {
    if (this.props.film.localRating != null)
      return (
        <Rating localRating={this.props.film.localRating} />
      )
    else
      return (<Rating localRating={5} />)
  }

  addFavorite() {
    this.setState({ favorite: (!this.state.favorite) })
    if (this.state.favorite)
      this.refs.toast.show('Фильм добавлен в избранное');
    else
      this.refs.toast.show('Фильм удалён из избранного');
  }
  render() {
    const gotocomments = () => Actions.comments({ link: this.props.film.link, title: 'Комментарии' });
    return (
      <ScrollView ref='_scrollView'
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <View style={styles.container} >
          <View style={{ flex: 1 }}>
            <View style={styles.postercontainer}>
              <Image style={styles.poster} source={{ uri: 'http://' + global.ip + '/images/Posters/' + this.props.film.poster }} />
            </View>
          </View>
          <View>
            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5, marginTop: 5 }}>
              <View style={{ width: '80%' }}>
                <Text style={styles.h1}>
                  {this.props.film.name}
                </Text>
              </View>
              <TouchableOpacity activeOpacity={1} onPress={() => this.addFavorite()}>
                <View style={{ width: '20%', paddingTop: 5 }}>
                  {this.favorite()}
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.textrow}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Год выпуска</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.props.film.releaseYear}</Text>
              </View>
            </View>
            <View style={styles.textrow}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Длительность</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.props.film.duration}</Text>
              </View>
            </View>
            <View style={styles.textrow}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Страна</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.props.film.country}</Text>
              </View>
            </View>
            <View style={styles.textrow}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Жанр</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.props.film.genre}</Text>
              </View>
            </View>
            <View style={styles.textrow}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Режиссёр</Text>
              </View>
              <View style={styles.rightcolumn}>
                <Text style={styles.textright}>{this.props.film.director}</Text>
              </View>
            </View>
            <View style={styles.textrow}>
              <View style={styles.leftcolumn}>
                <Text style={styles.textleft}>Возрастное ограничение</Text>
              </View>
              <View style={styles.rightcolumn}>
                <View style={styles.agelabel}><Text style={styles.agelimit}>{this.props.film.ageLimit}</Text></View>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.h2}>
              О фильме
          </Text>
            <Text style={styles.description}>
              {this.props.film.description}
            </Text>
          </View>
          <View>
            <Text style={styles.h2}>
              Сеансы
          </Text>
            <View style={styles.separator}></View>
            <FilmSession link={this.props.film.link} />
          </View>
          <View>
            <Text style={styles.h2}>
              Трейлер
          </Text>
            <View style={styles.separator}></View>
            <YouTube
              apiKey="AIzaSyBnfKSaK1nHiY4MgTCUlTmPFKN0mZwEXJk"
              videoId={this.getvideoid()}  // The YouTube video ID
              play={false}             // control playback of video with true/false
              fullscreen={false}       // control whether the video should play in fullscreen or inline
              loop={false}             // control whether the video should loop when ended
              autoplay={false}
              modestbranding={true}
              onReady={e => this.setState({ isReady: false })}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}
              style={{ alignSelf: 'stretch', height: 200, marginTop: 10, }}
            />
          </View>
          <View style={styles.comments}>
            <TouchableOpacity onPress={gotocomments} activeOpacity={1}>
              <Text style={styles.h2}>Комментарии <Text style={{ marginLeft: 20, color: '#17a2b8' }}>{this.props.film.amountComment}</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
        {this.rating()}
        
        <Toast ref="toast" positionValue={10} fadeInDuration={300} fadeOutDuration={300} style={{ backgroundColor: '#f6a21c' }} textStyle={{ color: 'white' }} />
      </ScrollView>
    );
  }
}
const win = Dimensions.get('window');
var styles = StyleSheet.create({
  poster: {
    flex:1,
    width: win.width-40,
    height: (win.width-40)*1.5,
  },
  h1:{
    color:'white',
    fontSize:35,
    fontWeight:'bold',
  },
  h2:{
    color:'white',
    fontSize:30,
    fontWeight:'bold',
    marginBottom:5,
  },
  h3:{},
  container:{
    padding:20,
    backgroundColor:'#161a23',
  },
  textrow:{
    flexDirection: 'row', flex: 1,justifyContent: 'flex-start', marginBottom:12
  },
  textleft:{
	  color: '#17a2b8'
  },
  textright:{
    color: 'white',
  },
  agelabel:{
    width: 36,
    height: 36,
    borderRadius:18,
    borderWidth: 1,
    borderColor: '#f6a21c',
    justifyContent: 'center',
    marginLeft:20,
  },
  agelimit:{
    textAlign:'center',
    color:'white'
  },
  description:{
    color:'white',
    fontSize:15,
  },
  rightcolumn:{},
  leftcolumn:{width:180},
  postercontainer:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator:{
    height: .5,
    width: "100%",
    backgroundColor: "#FFF",
  },
  comments:{
  },
  favorite:{
    height:45,
    width:45,
    tintColor:'#f6a21c',
  },
  rating:{
    flex:1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  }
})

AppRegistry.registerComponent('Best', () => FilmRow);