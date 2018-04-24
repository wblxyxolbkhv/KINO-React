import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,RefreshControl} from 'react-native';
import Error from '../mainpages/Error'
import { Actions } from 'react-native-router-flux';

export default class SessionPage extends React.Component {
  constructor() 
    {
      super();
      this.state={isLoading:true, error:false,refreshing: false}
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.componentWillMount().then(() => {
      this.setState({refreshing: false});
      Actions.refresh
    });
}
componentWillMount() {
    return fetch('http://'+global.ip+'/api/session/'+this.props.link, {timeout: 500,follow:0})
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
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>
                  какой-то текст
              </Text>
            </View>
      )
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
  });
  
  AppRegistry.registerComponent('Best', () => SessionPage);