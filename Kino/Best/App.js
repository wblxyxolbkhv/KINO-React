import { Platform, StyleSheet, Text, View, ListView, Alert, FlatList, Image, Dimensions } from 'react-native';
import Profile from './mainpages/Profile';
import React from 'react';
import MainPage from './mainpages/MainPage';
import Sessions from './mainpages/Sessions';
import FilmPage from './subpages/FilmPage';
import Films from './mainpages/Films';
import TabView from './mainpages/TabView';
import Button from 'react-native-button';
import Comments from './subpages/Comments';
import SessionPage from './subpages/SessionPage';
import TabIcon from './components/TabIcon';
import Login from './mainpages/Login'
import Settings from './subpages/Settings'
import History from './subpages/History'
import Purchase from './mainpages/Purchase'
import Success from './subpages/Success'
import Fail from './subpages/Fail'

import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst, Tabs } from 'react-native-router-flux';

const reducerCreate = params => {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    return defaultReducer(state, action);
  }
};

global.ip = "https://kinov2-dev-as.azurewebsites.net"
//global.ip="http://192.168.1.43:51657"
global.width = Dimensions.get('screen').width - 40
global.isAuthenticated = false
global.token = ''
global.initial = true

export default class App extends React.Component {
  myOnEnter(title) {
    if (global.isAuthenticated) {
      Actions.refresh({ key: Math.random() })
    }
    else {
      Actions.push('login', { mytitle: title })
    }
  }

  render() {
    return (
      <Router createReducer={reducerCreate} sceneStyle={{ backgroundColor: '#161a23' }}>
        <Scene key="modal" component={Modal}>
          <Scene key="root" hideNavBar navigationBarStyle={{ backgroundColor: '#161a23' }} titleStyle={{ color: '#fff' }} navBarButtonColor='#fff'>
            <Scene key="tabbar" lazy tabs tabBarPosition='bottom' swipeEnabled={false} tabBarStyle={{ backgroundColor: '#161a23' }}
             activeBackgroundColor='#363a43' activeTintColor='#fff'>
              <Scene key="hot" component={MainPage} initial title="Подборка" hideNavBar icon={TabIcon} />
              <Scene key="film" title="Фильмы" icon={TabIcon} backToInitial>
                <Scene key="films" component={Films} title="Фильмы" hideNavBar />
                <Scene key="filmpage" component={FilmPage} />
                <Scene key="comments" component={Comments} />
              </Scene>
              <Scene key="session" title="Сеансы" icon={TabIcon} backToInitial>
                <Scene key="sessionpage" component={SessionPage} title="Заказ билета" onEnter={() => Actions.refresh} />
                <Scene key="sessions" component={Sessions} title="Сеансы" hideNavBar initial />
                <Scene key="success" component={Success} title="Успех" onLeft={() => Actions.sessions()} />
                <Scene key="fail" component={Fail} title="Провал" onLeft={() => Actions.sessions()} />
              </Scene>
              <Scene key="profilecontainer" tabs title="Профиль" icon={TabIcon} hideNavBar tabBarPosition='top' lazy 
              tabStyle={{ backgroundColor: '#161a23', borderBottomWidth: 0 }}>
                <Scene key="profile" initial component={Profile} title="Профиль" hideNavBar onEnter={() => this.myOnEnter('profile')} />
                <Scene key="history" component={History} title="История" hideNavBar />
                <Scene key="settings" component={Settings} title="Настройки" hideNavBar />
              </Scene>
            </Scene>
          </Scene>
          <Scene key="login" component={Login} onBack={() => Actions.popTo('hot')} title='Авторизация' titleStyle={{ color: '#fff' }}
           navBarButtonColor='#fff' navigationBarStyle={{ backgroundColor: '#161a23' }} />
          <Scene key="purchase" component={Purchase} title='Покупка' navBarButtonColor='#fff' navigationBarStyle={{ backgroundColor: '#161a23' }} />
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


