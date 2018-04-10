import {Platform,StyleSheet,Text,View,ListView, Alert,FlatList,Image} from 'react-native';
import Profile from './mainpages/Profile';
import React from 'react';
import MainPage from './mainpages/MainPage';
import Sessions from './mainpages/Sessions';
import FilmPage from './subpages/FilmPage';
import Films from './mainpages/Films';
import TabView from './mainpages/TabView';
import Button from 'react-native-button';
import SessionPage from './subpages/SessionPage';

import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst, Tabs} from 'react-native-router-flux';

class TabIcon extends React.Component {
  render(){
      return (
          <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
      );
  }
}

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
  return (state, action)=>{
      return defaultReducer(state, action);
  }
};

global.ip="192.168.0.103:51587"

export default class App extends React.Component {
  render() {
      return(
      <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#F7F7F7'}}>
          <Scene key="modal" component={Modal} >
              <Scene key="root" hideNavBar={true}>
                  <Scene key="tabbar" tabs={true} tabBarPosition='bottom' swipeEnabled={false}>
                      <Scene key="hot" component={MainPage} initial={true} title="Подборка" hideNavBar={true} />
                      <Scene key="tab2" title="Фильмы" backToInitial={true}>
                        <Scene key="films" component={Films} title="Фильмы" hideNavBar={true} lazy={true}/>
                        <Scene key="filmpage" component={FilmPage} title="Some" lazy={true}/>
                      </Scene>
                      <Scene key="tab3" title="Сеансы" backToInitial={true}>
                        <Scene key="sessions" component={Sessions} title="Сеансы" hideNavBar={true} lazy={true}/>
                        <Scene key="sessionpage" component={SessionPage} title="Сеансы" lazy={true}/>
                      </Scene>
                      <Scene key="profile" component={Profile} title="Профиль" icon={TabIcon} hideNavBar={true} lazy={true}/>
                  </Scene>
              </Scene>
              <Scene key="error" component={Error}/>
              
              <Scene key="sessionpage" component={SessionPage}/>
          </Scene>
      </Router>
      )
    }
  
}

var styles = {
  container: {
    flex: 1
  },
  filmRow: {
	  alignSelf: 'stretch',
  },
  primaryContainer: {
	  marginBottom: 50,
  },
};


