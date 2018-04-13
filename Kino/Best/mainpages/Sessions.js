import {View, Text, StyleSheet, TouchableHighlight,ActivityIndicator,ListView,RefreshControl} from 'react-native';
import React from 'react';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import YouTube from 'react-native-youtube';
import SessionRow from '../components/SessionRow'

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
      });
    }
    render(){
      if(!this.state.error){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <ActivityIndicator/>
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
                  link={data.link}
                  filmLINK={data.filmLINK}
                  sessionTime={data.sessionTime.substring(11,16)}
                  style={styles.filmRow}
              /> 
          }
          />   
        </View>
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
    container: {
        flex: 1,
    }
});

module.exports = Sessions;