import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image,TouchableOpacity, ActivityIndicator} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class SessionRow extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          error:false
        }
      }
    componentDidMount(){
        return fetch('http://'+global.ip+'/api/film/'+this.props.filmLINK)
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSourceAPI: responseJson
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
    render(){
      const gotosessionpage = () => Actions.sessionpage({sessionLINK: this.props.link, filmLINK:this.props.filmLINK});
      if(!this.state.error){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator/>
              </View>
            )
        }
        return(
          <Button onPress={gotosessionpage} activeOpacity={1}>
            <View style={styles.filmRow}>
              <View style={{flexDirection:'row'}}>
                <Image style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/' + this.state.dataSourceAPI.poster}}/>
                <View style={{flexDirection:'column'}}>
                  <Text style={styles.filmName}>
                    {this.state.dataSourceAPI.name}
                  </Text>
                  <Text style={styles.extraFilmInfo}>
                    Продолжительность: {this.state.dataSourceAPI.duration} минут
                  </Text>
                  <Text style={styles.extraFilmInfo}>
                    Время сеанса: {this.props.sessionTime}
                  </Text>
                </View>
            </View>
          </View>
      </Button>
        );
      }
      else{
      return(
        <View style={{backgroundColor:'#f00',flex:1,justifyContent:'center',alignItems: 'center',}}>
          <Text style={{fontSize:30,fontWeight:'bold'}}>Пиздец</Text>
        </View>
      )
    }
    }
}

var styles = StyleSheet.create({
    filmName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
      },
      
    poster: {
        width: 100,
        height: 120,
          marginRight: 15,
      },
      
    filmRow: {
        backgroundColor: '#161a23',
        maxHeight: 160,
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    extraFilmInfo: {
          color: '#ccc'
    }
  });

AppRegistry.registerComponent('Best', () => SessionRow);