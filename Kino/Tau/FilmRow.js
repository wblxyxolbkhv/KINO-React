import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image} from 'react-native';
import Button from 'react-native-button';

export default class FilmRow extends React.Component {
	 
  render() {
    return (
			<Button onPress={this._onPress}>
				<View style={styles.filmRow}>
						<View style={{flexDirection:'row'}}>
							<Image style={styles.poster} source={{uri:'http://192.168.0.103:4320/images/Posters/' + this.props.imageSource}}/>
							<View style={{flexDirection:'column'}}>
								<Text style={styles.filmName}>
									{this.props.filmName}
								</Text>
								<Text style={styles.extraFilmInfo}>
									{this.props.year}
								</Text>
								<Text style={styles.extraFilmInfo}>
									{this.props.duration}
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

AppRegistry.registerComponent('Tau', () => FilmRow);