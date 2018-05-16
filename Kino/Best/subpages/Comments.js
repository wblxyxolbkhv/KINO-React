import {Platform,StyleSheet,Text,View,ListView, Alert,Image,AppRegistry,ScrollView,ActivityIndicator,RefreshControl,TouchableOpacity} from 'react-native';
import React from 'react';
import Error from '../mainpages/Error'
import HTML from 'react-native-render-html'; 
import {Actions} from 'react-native-router-flux';
import { Hoshi } from 'react-native-textinput-effects';

export default class Comments extends React.Component {
  constructor() {
    super();
    this.state = { isLoading: true, error: false, refreshing: false ,visible:true,comment:''}
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      />
    );
  }
  sendcomment(){
    fetch(global.ip + '/api/film/'+this.props.link+'/comment/?comment='+encodeURI(this.state.comment),
      {
        headers: {
          Authorization: 'Bearer ' + global.token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
        },
          function () {
          });
      })
      .catch((error) => {
        this.setState({
        })
      });
  }

  newcomment(){
    if (global.isAuthenticated) {
      return(
      <View style={{ flex: 1 ,marginLeft:10,marginTop:10,marginBottom:10,marginRight:10}}>
        <Hoshi
          value={this.state.comment}
          onChangeText={(text) => this.setState({ comment: text})}
          onFocus={(text) => this.setState({visible:false })}
          autoCorrect={false}
          style={styles.input}
          label={'Написать комментарий'}
          labelStyle={{ color: 'white' }}
          borderColor={'#f6a21c'}
          autoCorrect={false}
          ref={(input) => { this.input = input; }}
        />
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=> this.sendcomment()}>
          <Text style={styles.buttontext}>Отправить</Text>
        </TouchableOpacity>
      </View>
      )
    }
    else
    {
      const gotologin = () => Actions.login();
      return(
      <View style={{ flex: 1 ,marginLeft:10,marginTop:10,marginBottom:10,marginRight:10}}>
        <Text style={styles.text}>
          Для написания комментария
        </Text>
        
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=>gotologin()}>
          <Text style={styles.text}>АВТОРИЗУЙТЕСЬ</Text>
        </TouchableOpacity>
      </View>
      )
    }
  }
  _onRefresh() {
    this.setState({ refreshing: true,visible:false});
    this.componentWillMount().then(() => {
      this.setState({ refreshing: false,visible:true });
      Actions.refresh({key: Math.random()})
    });
  }
  hotkey(){
    if(this.state.visible && global.isAuthenticated)
    {
      return(
      <TouchableOpacity onPress={()=>{this.input.focus();this.scroll.scrollToEnd()}} activeOpacity={1} style={[styles.comment, { position: 'absolute', bottom: 20, right: 20 }]} activeOpacity={1}>
        <Image style={styles.hoticon} source={require('../images/chat.png')} />
      </TouchableOpacity>
      )
    }
  }

  plus(link){
    fetch(global.ip + '/api/comments/'+link+'/plus',
      {
        headers: {
          Authorization: 'Bearer ' + global.token,
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
        },
          function () {
          });
      })
      .catch((error) => {
        this.setState({
        })
      });
  }

  minus(link){
    fetch(global.ip + '/api/comments/'+link+'/plus',
    {
      headers: {
        Authorization: 'Bearer ' + global.token,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      },
        function () {
        });
    })
    .catch((error) => {
      this.setState({
      })
    });
  }

  componentWillMount() {
    return fetch(global.ip + '/api/comments/?film=' + this.props.link, { timeout: 500, follow: 0 })
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson),
          dataSourceAPI: responseJson,
          error: false
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
  answer(data) {
    if (global.isAuthenticated) {
      return (
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => { this.input.focus(); this.scroll.scrollToEnd(); this.setState({ comment: data.user.userName + ',' }) }}>
          <Text style={styles.buttontext}>Ответ</Text>
        </TouchableOpacity>
      )
    }
    else {
      const gotologin = () => Actions.login();
      return (
        <TouchableOpacity style={styles.button} activeOpacity={1} >
          <Text style={styles.buttontext}>Ответ</Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    if (!this.state.error) {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
            <ActivityIndicator size="large" color='#f6a21c' />
          </View>
        )
      }
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={styles.container}
          ref={(scroll) => { this.scroll = scroll; }}
          onScrollBeginDrag={()=>this.setState({visible:false })}
          onScrollEndDrag={()=>this.setState({visible:true })}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }>
            <ListView
              style={[styles.container, styles.primaryContainer]}
              dataSource={this.state.dataSource}
              renderSeparator={this.ListViewItemSeparator}
              renderRow={(data) =>
                <View style={styles.commentcontainer}>
                  <View style={styles.row}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                      <Text style={[styles.text, { fontSize: 15, textAlign: 'center', marginRight: 10 }]}>{data.user.userName}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 2 }}>
                      <Text style={styles.text}>{data.date}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { marginTop: 10, }]}>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                      <Image style={styles.poster} source={{ uri: global.ip + '/images/Profiles/' + data.user.profileImage }} />
                    </View>
                    <View style={{ flexDirection: 'column', flex: 2, padding: 5 }}>
                      <HTML html={data.text} baseFontStyle={{ color: 'white' }}
                        listsPrefixesRenderers={{
                          ol: (htmlAttribs, children, convertedCSSStyles, passProps) => {
                            return (
                              <Text style={{ color: 'white', marginRight: 5 }}>-</Text>
                            );
                          }
                        }} />
                    </View>
                  </View>
                  <View style={styles.row}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=>this.plus(data.link)}>
                        <Text style={styles.buttontext}>+</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' ,justifyContent:'center',alignItems:'center',marginTop:20}}>
                      <Text style={styles.buttontext}>{data.rating}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <TouchableOpacity style={styles.button} activeOpacity={1} onPress={()=>this.minus(data.link)}>
                        <Text style={styles.buttontext}>-</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flex: 4, flexDirection: 'column' }}>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                      {this.answer(data)}
                    </View>
                  </View>
                </View>
              }
            />
            {this.newcomment()}
          </ScrollView>
          {this.hotkey()}
        </View>
      );
    }
    else {
      return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Error />
        </ScrollView>
      )
    }
  }
}

var styles = {
    container: {
      flex: 1,
    },
    row:{
        flex:1,
        flexDirection:'row',
        
    },
    column:{
        flex:1,
        flexDirection:'column'
    },
    poster: {
      flex:1,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 4,
      minHeight: 80,
      marginRight: 10,
      maxHeight: 80,
    },
    hoticon:{
      width:20,
      height:20
    },
    text:{
      color:'white'
    },
    commentcontainer:{
      padding: 10,
    },
    button:{
      marginTop: 20,
      height:35,
      width:'100%',
      backgroundColor:'#161a23',
      justifyContent:'center',
      alignItems: 'center',
      borderColor:'#f6a21c',
      borderWidth: 1,
      borderRadius: 5,
    },
    comment:{
      height:45,
      width:45,
      backgroundColor:'white',
      borderRadius: 22.5,
      marginTop: 10,
      alignItems: 'center',
      justifyContent:'center'
    },
      buttontext:{
        color:'white',
        fontSize:20,
      },
      input: {
        marginTop: 4,
        width:'100%',
      },
  };

AppRegistry.registerComponent('Comments', () => Error);