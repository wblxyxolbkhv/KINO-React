import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView} from 'react-native';

export default class SessionPage extends React.Component {
    render() {
      return (
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>
                  какой-то текст
              </Text>
            </View>
      )
    }
  }
  
  var styles = StyleSheet.create({
  });
  
  AppRegistry.registerComponent('Best', () => SessionPage);