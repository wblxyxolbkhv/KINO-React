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
    render(){
      const gotosessionpage = () => Actions.sessionpage({link:this.props.session.link});
        return(
          <Button onPress={gotosessionpage} activeOpacity={1}>
            <View style={styles.filmRow}>
              <View style={{flexDirection:'row'}}>
                <Image style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/' + this.props.session.poster}}/>
                <View style={{flexDirection:'column',width: global.width-115}}>
                  <Text style={styles.filmName} ellipsizeMode='tail' numberOfLines={3}>
                    {this.props.session.film}
                  </Text>
                  <Text style={styles.extraFilmInfo}>
                    Длительность: {this.props.session.duration} минут
                  </Text>
                  <Text style={styles.extraFilmInfo}>
                    Время сеанса: {this.props.session.sessionTime.substring(11,16)}
                  </Text>
                </View>
            </View>
          </View>
      </Button>
        );
      }
    
}

var styles = StyleSheet.create({
    filmName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
      },
      
    poster: {
        width: 90,
        height: 135,
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