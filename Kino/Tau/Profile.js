import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

export default class Profile extends React.Component {
  render() {
    return (
		  <View>
        <View style={styles.profile}>
          <Text>
                Фотка плюс инфа
          </Text>
        </View>
        <View style={styles.history}>
          <Text >
                Список заказов
          </Text>
        </View>	
        <View>
          <Text>
                Что-то ещё
          </Text>
        </View>		
		</View>
    );
  }
}

var styles = StyleSheet.create({
  profile: {
	  backgroundColor: '#ffffff',
	  maxHeight: 360,
	  flex: 2,
	  flexDirection: 'row',
	  paddingBottom: 10,
	  paddingTop: 10,
	  paddingLeft: 10,
	  paddingRight: 10,
    alignSelf: 'stretch',
  },
  history: {
    backgroundColor: '#ff0000',
    maxHeight: 160,
    flex: 3,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'stretch',
}
});

AppRegistry.registerComponent('Tau', () => FilmRow);