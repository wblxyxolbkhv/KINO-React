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
import TabIcon from './components/TabIcon';

import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst, Tabs} from 'react-native-router-flux';


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
              <Scene key="root" hideNavBar={true} navigationBarStyle={{backgroundColor: '#161a23'}} titleStyle={{color:'#fff'}} navBarButtonColor='#fff'>
                  <Scene key="tabbar" lazy tabs={true} tabBarPosition='bottom' swipeEnabled={false} tabBarStyle={{backgroundColor: '#161a23'} } activeBackgroundColor='#363a43' activeTintColor='#fff'>
                      <Scene key="hot" component={MainPage} initial={true} title="Подборка" hideNavBar={true} />
                      <Scene key="tab2" title="Фильмы" backToInitial={true} tabBarLabel={null}>
                        <Scene key="films" component={Films} title="Фильмы" hideNavBar={true}/>
                        <Scene key="filmpage" component={FilmPage} onBack={Actions.films}/>
                      </Scene>
                      <Scene key="tab3" title="Сеансы" backToInitial={true}>
                        <Scene key="sessions" component={Sessions} title="Сеансы" hideNavBar={true}/>
                        <Scene key="sessionpage" component={SessionPage} title="Сеансы" rightTitle='asdf' onRight={Actions.pop}/>
                      </Scene>
                      <Scene key="profile" component={Profile} title="Профиль" icon={TabIcon} hideNavBar/>
                  </Scene>
              </Scene>
              <Scene key="error" component={Error}/>
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


