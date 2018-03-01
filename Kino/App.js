import React from 'react';
import { AppRegistry, StyleSheet, Text, View, ScrollView, ViewPagerAndroid, ListView } from 'react-native';
import Tabbar from 'react-native-tabbar-bottom'

import FilmRow from './FilmRow'

export default class App extends React.Component {
  constructor() {
    super()
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5']),
      page: "HomeScreen",
    };
  }
  render() {
    return (
	<View style={styles.container}>
        {
          // if you are using react-navigation just pass the navigation object in your components like this:
          // {this.state.page === "HomeScreen" && <MyComp navigation={this.props.navigation}>Screen1</MyComp>}
        }
        {
			this.state.page === "HomeScreen" && (
				<ListView
					style={[styles.container, styles.primaryContainer]}
					dataSource={this.state.dataSource}
					renderRow={(data) => 
						<FilmRow 
							filmName='Властелин колец: Братство кольца' 
							imageSource='./img/Posters/LOTR1.jpg' 
							year='Год: 2002'
							duration='Продолжительность: 3 ч 48 мин'
							style={styles.filmRow}
						/>
					}
				/>
			)
		}
        {this.state.page === "NotificationScreen" && <Text>Screen2</Text>}
        {this.state.page === "ProfileScreen" && <Text>Screen3</Text>}

        <Tabbar
          stateFunc={(tab) => {
            this.setState({page: tab.page})
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "HomeScreen",
              icon: "home",
			  iconText: 'Афиша',
            },
            {
              page: "NotificationScreen",
              icon: "notifications",
              badgeNumber: 11,
			  iconText: 'Уведомления',
            },
            {
              page: "ProfileScreen",
              icon: "person",
			  iconText: 'Профиль',
            },
          ]}
        />
      </View>
	/**/
    );
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
	  // отступ от статусбара
	  marginTop: 24,
	  // отступ, чтобы не провалиться под нижнюю таб панель
	  marginBottom: 50,
  },
};
