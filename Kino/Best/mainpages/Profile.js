import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Profile extends React.Component { 
  LogOff(){
    global.isAuthenticated=false;
    global.token='';
  }
  render() {
    return (
		  <View>
        <View style={styles.profile}>
          <Text>
                Фотка плюс инфа
          </Text>
        </View>
        <View style={styles.history}>
          <Text >
                Список заказов
          </Text>
        </View>	
        <View>
          <Text>
                Что-то ещё
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.button} onPress={()=>this.LogOff()}>
            <Text style={styles.buttontext}>
              Выйти
            </Text>
          </TouchableOpacity>
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
},
button:{
  marginTop: 10,
  height:35,
  width:60,
  backgroundColor:'#DDDDDD',
  justifyContent:'center',
  alignItems: 'center',
  borderRadius: 4, 
  borderWidth: 1,
},
buttontext:{
  color:'black'
}
});

AppRegistry.registerComponent('Tau', () => FilmRow);