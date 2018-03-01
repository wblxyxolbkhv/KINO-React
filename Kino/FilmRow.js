import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

export default class FilmRow extends React.Component {
  render() {
    return (
		<View style={styles.filmRow}>
			<Image source={require('./img/Posters/LOTR1.jpg' )} style={styles.poster}/>
			<View style={{alignSelf: 'stretch'}}>
				<View style={{flexDirection:'row'}}>
					<Text style={styles.filmName}>
						{this.props.filmName}
					</Text>
				</View>
				<Text style={styles.extraFilmInfo}>
					{this.props.year}
				</Text>
				<Text style={styles.extraFilmInfo}>
					{this.props.duration}
				</Text>
			</View>
		</View>
    );
  }
}

var styles = StyleSheet.create({
  filmName: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  color: 'white',
	  alignSelf: 'stretch',
	  flexWrap: 'wrap',
	  flex: 1,
  },
  poster: {
	  width: 100,
	  height: 140,
	  marginRight: 10
  },
  filmRow: {
	  backgroundColor: '#161a23',
	  maxHeight: 160,
	  flex: 1,
	  flexDirection: 'row',
	  paddingBottom: 10,
	  paddingTop: 10,
	  paddingLeft: 10,
	  paddingRight: 10,
	  alignSelf: 'stretch',
  },
  extraFilmInfo: {
	  color: '#ccc',
  }
});

AppRegistry.registerComponent('Kino', () => FilmRow);