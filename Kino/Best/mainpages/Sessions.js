import {View, Text, StyleSheet, TouchableHighlight,ActivityIndicator,ListView,RefreshControl,ScrollView} from 'react-native';
import React from 'react';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import YouTube from 'react-native-youtube';
import SessionRow from '../components/SessionRow'
import Error from '../mainpages/Error'

export default class Sessions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          error:false,
          refreshing: false,
        }
      }

      componentWillMount() {
        return fetch('http:/'+global.ip+'/api/session')
        .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
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

    ListViewItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#FFF",
            }}
          />
        );
    }
    _onRefresh() {
      this.setState({refreshing: true});
      this.componentWillMount().then(() => {
        this.setState({refreshing: false});
        Actions.refresh
      });
  }
    render(){
      if(!this.state.error){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
                <ActivityIndicator size="large" color='#f6a21c'/>
              </View>
            )
        }
        return (
        <View style={styles.container}>
          <ListView
            style={[styles.container, styles.primaryContainer]}
            dataSource={this.state.dataSource}
            renderSeparator= {this.ListViewItemSeparator}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            renderRow={(data) => 
             <SessionRow 
                  session={data}
                  style={styles.filmRow}
              /> 
          }
          />   
        </View>
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
    container: {
        flex: 1,
    }
});

module.exports = Sessions;