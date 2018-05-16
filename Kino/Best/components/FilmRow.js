import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image,TouchableOpacity,Dimensions} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class FilmRow extends React.Component {
  render() {
		const gotofilmpage = () => Actions.filmpage({film:this.props.film,title:this.props.film.name});
    return (
			<Button onPress={gotofilmpage} activeOpacity={1}>
						<View style={styles.filmRow}>
							<Image style={styles.poster} source={{uri:global.ip+'/images/Posters/' + this.props.film.poster}}/>
							<View style={{flexDirection:'column',width: global.width-115}}>
								<Text style={styles.filmName} ellipsizeMode='tail' numberOfLines={3}>
									{this.props.film.name}
								</Text>
								<Text style={styles.extraFilmInfo}>
									Год: {this.props.film.releaseYear}
								</Text>
								<Text style={styles.extraFilmInfo}>
									Длительность: {this.props.film.duration} минут
								</Text>
							</View>
				</View>
		</Button>
    );
  }
}

var styles = StyleSheet.create({
  filmName: {
	  fontSize: 24,
	  fontWeight: 'bold',
		color: 'white',
	},
	
  poster: {
	  width: 90,
	  height: 135,
		marginRight: 15,
	},
	
  filmRow: {
	  backgroundColor: '#161a23',
	  maxHeight: 160,
	  paddingBottom: 10,
	  paddingTop: 10,
	  paddingLeft: 10,
		paddingRight: 10,
		flexDirection:'row',
		
  },
  extraFilmInfo: {
		color: '#ccc',
  }
});

AppRegistry.registerComponent('Best', () => FilmRow);