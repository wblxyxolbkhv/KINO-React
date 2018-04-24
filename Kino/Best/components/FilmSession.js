import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image,TouchableOpacity,Dimensions,ActivityIndicator,Picker} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

export default class FilmSession extends React.Component {
  
    constructor() 
    {
      super();
      this.state={isLoading:true, error:false,refreshing: false,day:'Сегодня',idday:0}
    }

    componentWillMount() {
        return fetch('http://'+global.ip+'/api/session/?film='+this.props.link, {timeout: 500,follow:0})
        .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false,
              dataSourceAPI: responseJson,
              error:false,
              key:true
            }, 
            function(){ 
            });
          })
          .catch((error) =>{
            this.setState({
              error:true,
            })
          });
      }

  render() {
    var today = new Date();
    this.state.date=(today.getDate()+this.state.idday) + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
    if(!this.state.error){
        if(this.state.isLoading){
          return(
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
              <ActivityIndicator size="large" color='#f6a21c'/>
            </View>
          )
        }
        return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.column} >
                <Picker
                    mode='dropdown'
                    selectedValue={this.state.day}
                    style={{ height: 30, width: 170 ,color:'#f6a21c'}}
                    itemStyle={styles.date}
                    textStyle={{fontSize: 20}}
                    onValueChange={(itemValue, itemIndex) => this.setState({day: itemValue,idday:itemIndex})}>
                      <Picker.Item label="Сегодня" value="Сегодня" />
                      <Picker.Item label="Завтра" value="Завтра" />
                      <Picker.Item label="Послезавтра" value="Послезавтра" />
                  </Picker>
                </View>
                <View style={styles.column}>
                  
                </View>
                <View style={styles.column}>
                    <Text style={styles.date}>{this.state.date}</Text>
                </View>
            </View>
            <View style={styles.sessioncontainer}>
            {this.state.dataSourceAPI.map((item,key)=>{
                const gotosessionpage = () => {if(this.state.key){Actions.sessionpage({link:item.link});this.setState({key:false})} 
                else{Actions.push('sessionpage',{link:item.link})}}
                return ( 
                  <Button onPress={gotosessionpage} activeOpacity={1}>
                      <View style={styles.timecontainer}>
                        <Text style={styles.time}>{item.sessionTime.substring(11,16)}{this.state.key}</Text>
                    </View>
                  </Button>
                  )
                })}    
            </View>        
        </View>
        );
      }
      else{
        return(
          <View><Text>Упс</Text></View>
        )
      }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight:100,
    justifyContent:'center',
    alignItems:'center'
  },
  time:{
    color: '#f6a21c',
  },
  row:{
    flex:1,
    flexDirection:'row',
    width:global.width-40
  },
  column:{
    flex:1,
    flexDirection:'column',
    width:(global.width-40)/3,
    justifyContent:'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  timecontainer:{
      height:30,
      width:80,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:18,
      borderWidth: 1,
      borderColor: '#f6a21c',
  },
  sessioncontainer:{
    flexDirection:'row',
    flexWrap:'wrap'
  },
  date:{
    color:'#f6a21c',
    fontSize: 20,
  }
});
