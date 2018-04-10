import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight,ActivityIndicator,ListView, } from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import FilmRow from '../components/FilmRow';

class Films extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true
        }
      }

    componentWillMount() {
        return fetch('http:/'+global.ip+'/api/film')
        .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: ds.cloneWithRows(responseJson),
              dataSourceAPI: responseJson
            }, 
            function(){ 
            });
          })
          .catch((error) =>{
            console.error(error);
          });
    }

    ListViewItemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#FFF",
            }}
          />
        );
      }

    render(){
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                <ActivityIndicator/>
              </View>
            )
        }
        return(
        <View style={styles.container}>
            <ListView
            style={[styles.container, styles.primaryContainer]}
            dataSource={this.state.dataSource}
            renderSeparator= {this.ListViewItemSeparator}
            renderRow={(data) => 
               <FilmRow 
                    name={data.name}
                    poster={data.poster}
                    releaseYear={data.releaseYear}
                    duration={data.duration}
                    genre={data.genre}
                    director={data.director}
                    country={data.country}
                    description={data.description}
                    ageLimit={data.ageLimit}
                    link={data.link}
                    style={styles.filmRow}
                /> 
            }
            />   
        </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

module.exports = Films;