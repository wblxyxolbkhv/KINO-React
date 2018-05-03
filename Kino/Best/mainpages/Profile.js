import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity,RefreshControl,ActivityIndicator,ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Error from '../mainpages/Error'

export default class Profile extends React.Component {
  constructor() 
    {
      super();
      this.state={isLoading:true, error:false,refreshing: false}
  }
  componentWillMount() {
    return fetch('http://'+global.ip+'/api/profile/info',
  {
    headers: {
      Authorization: 'Bearer '+global.token,
    },
  })
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          error:false
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
_onRefresh() {
  this.setState({refreshing: true});
  this.componentWillMount().then(() => {
    this.setState({refreshing: false});
    Actions.refresh({key: Math.random()})
  });
}
  LogOff(){
    global.isAuthenticated=false;
    global.token='';
    Actions.push('login')
  }
  image(){
    if(this.state.dataSourceAPI.profileImage==null){
      return(<Image style={styles.poster} source={require('../images/default.png')}/>)
    }
      else
      return(<Image style={styles.poster} source={{uri:'http://'+ global.ip + '/images/Posters/' + this.state.dataSourceAPI.profileImage}}/>) 
    }
  render() {
    if(!this.state.error){
      if(this.state.isLoading){
        return(
          <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
            <ActivityIndicator size="large" color='#f6a21c'/>
          </View>
        )
      }
    return (
		  <ScrollView style={{flex:1}} contentContainerStyle={{flex:1}} refreshControl={
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
            <Text>
                  Список заказов
            </Text>
          </View>	
          <View style={styles.row}>
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
      </ScrollView>
    );
  }
  else{
    return(
      <ScrollView style={{flex:1}} contentContainerStyle={{flex:1}} refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
        />
      }>
        <Error/>
      </ScrollView>
    )
}
  }
}

var styles = StyleSheet.create({
  profile: {
	  flex: 1,
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
  },
  container:{
    margin:20,
    backgroundColor:'#161a23',
  },
  poster:{

  }
});

AppRegistry.registerComponent('Tau', () => FilmRow);