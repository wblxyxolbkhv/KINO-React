import {Platform,StyleSheet,Text,View,ListView, Alert,Image,AppRegistry,ScrollView,ActivityIndicator,RefreshControl} from 'react-native';
import React from 'react';
import Error from '../mainpages/Error'
import HTML from 'react-native-render-html'; 

export default class Comments extends React.Component{
    constructor() 
    {
        super();
        this.state={isLoading:true, error:false,refreshing: false}
    }
    ListViewItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#f6a21c",
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
    componentWillMount() {
        return fetch('http://'+global.ip+'/api/comments/?film='+this.props.link, {timeout: 500,follow:0})
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
    render(){
        if(!this.state.error){
            if(this.state.isLoading){
              return(
                <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
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
                    <View>
                        <View style={styles.row}>
                            <View style={styles.column}>

                            </View>
                            <View style={styles.column}>

                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>

                            </View>
                            <View style={styles.column}>

                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.column}>

                            </View>
                            <View style={styles.column}>
                                <HTML html={data.text} baseFontStyle={{color:'white'}} ignoredStyles={['li','ol']}/>
                            </View>
                        </View>
                        
                    </View>
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

var styles = {
    poster:{
      flex:1,
    },
    container: {
      flex: 1,
    },
    row:{
        flex:1,
        flexDirection:'row'
    },
    column:{
        flex:1,
        flexDirection:'column'
    },
  };

AppRegistry.registerComponent('Comments', () => Error);