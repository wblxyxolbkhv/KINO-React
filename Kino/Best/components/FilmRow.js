import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image,TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class FilmRow extends React.Component {
  render() {
		const gotofilmpage = () => Actions.filmpage({link: this.props.link, title:this.props.name});
    return (
			<Button onPress={gotofilmpage} activeOpacity={1}>
				<View style={styles.filmRow}>
						<View style={{flexDirection:'row'}}>
							<Image style={styles.poster} source={{uri:'http://'+global.ip+'/images/Posters/' + this.props.poster}}/>
							<View style={{flexDirection:'column'}}>
								<Text style={styles.filmName}>
									{this.props.name}
								</Text>
								<Text style={styles.extraFilmInfo}>
									Год: {this.props.releaseYear}
								</Text>
								<Text style={styles.extraFilmInfo}>
									Продолжительность: {this.props.duration} минут
								</Text>
							</View>
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
	  color: 'white'
	},
	
  poster: {
	  width: 100,
	  height: 120,
		marginRight: 15,
	},
	
  filmRow: {
	  backgroundColor: '#161a23',
	  maxHeight: 160,
	  paddingBottom: 10,
	  paddingTop: 10,
	  paddingLeft: 10,
	  paddingRight: 10,
  },
  extraFilmInfo: {
		color: '#ccc'
  }
});

AppRegistry.registerComponent('Best', () => FilmRow);