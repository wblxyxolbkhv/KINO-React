import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView,RefreshControl,WebView,Dimensions,TouchableOpacity} from 'react-native';
import Error from '../mainpages/Error'
import { Actions } from 'react-native-router-flux';
import ViewTransformer from 'react-native-view-transformer';

export default class SessionPage extends React.Component {
  constructor() 
    {
      super();
      this.state={isLoading:true, error:false,refreshing: false}
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.componentDidMount().then(() => {
      this.setState({refreshing: false});
      Actions.refresh
    });
}
componentDidMount() {
    return fetch('http://'+global.ip+'/api/session/'+this.props.link, {timeout: 500,follow:0})
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          error:false
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
      if(!this.state.error){
        if(this.state.isLoading){
          return(
            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center',backgroundColor:'#161a23'}}>
              <ActivityIndicator size="large" color='#f6a21c'/>
            </View>
          )
        }
      return (
        <ScrollView ref='_scrollView'refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <View style={styles.container} >
            <View>
              <View style={styles.textrow}>
                <View style={styles.leftcolumn}>
                  <Text style={styles.textleft}>Название</Text>
                </View>
                <View style={styles.rightcolumn}>
                  <Text style={styles.textright}>{this.state.dataSourceAPI.film}</Text>
                </View>
              </View>
              <View style={styles.textrow}>
                <View style={styles.leftcolumn}>
                  <Text style={styles.textleft}>Зал</Text>
                </View>
                <View style={styles.rightcolumn}>
                  <Text style={styles.textright}>{this.state.dataSourceAPI.hall}</Text>
                </View>
              </View>
              <View style={styles.textrow}>
                <View style={styles.leftcolumn}>
                  <Text style={styles.textleft}>Дата</Text>
                </View>
                <View style={styles.rightcolumn}>
                  <Text style={styles.textright}>{this.state.dataSourceAPI.sessionTime.substring(0,10)}</Text>
                </View>
              </View>
              <View style={styles.textrow}>
                <View style={styles.leftcolumn}>
                  <Text style={styles.textleft}>Время</Text>
                </View>
                <View style={styles.rightcolumn}>
                  <Text style={styles.textright}>{this.state.dataSourceAPI.sessionTime.substring(11,16)}</Text>
                </View>
              </View>
              <View style={styles.textrow}>
                <View style={styles.leftcolumn}>
                  <Text style={styles.textleft}>Цена билета</Text>
                </View>
                <View style={styles.rightcolumn}>
                  <Text style={styles.textright}>{this.state.dataSourceAPI.cost}</Text>
                </View>
              </View>
            </View>
            <View style={styles.separator}></View>
            <View style={{alignItems:'center',marginTop:10,flex:1,flexDirection:'column'}}>
              <View style={{flex:1,flexDirection:'row'}}><Text style={{color:'white',fontSize:20}}>Экран</Text></View>
              <ViewTransformer style={{flex:1,flexDirection:'row'}}>
                <View style={{width: 100,height:100,backgroundColor:'white'}}></View>
              </ViewTransformer>
                <View style={styles.blueborder}>
                  <View style={styles.legend}/>
                  <Text style={styles.legendtext}>- Занято</Text>
                </View>
            </View>
            <View>
              <Text>
                Билеты
              </Text>
            </View>
            <View style={{flex:1,flexDirection:'row',marginTop:15}}>
              <View style={{flex:1,flexDirection:'column'}}>
                <Text style={styles.buttontext}>Итоговая стоиомть: р.</Text>
              </View>
              <View style={{flex:1,flexDirection:'column'}}>
                <TouchableOpacity style={styles.button} onPress={()=>Actions.refresh} activeOpacity={1}>
                  <Text style={styles.buttontext}>
                    Заказать
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
			<ViewTransformer 
				style={{flex:1,flexDirection:'row',marginTop:15}}
				onTransformGestureReleased={(transformObj)=>{return true;}}>
				<View style={{
					backgroundColor: '#ffffff',
					width: 300,
					height: 300
				}}/>
			</ViewTransformer>
          </View>
        </ScrollView>
      )
    }
    else{
      return(
        <ScrollView style={{flex:1}} contentContainerStyle={{flex:1}} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Error/>
        </ScrollView>
      )
  }
    }
  }
  
  const win = Dimensions.get('window');
  var styles = StyleSheet.create({
    container:{
      margin:20,
      backgroundColor:'#161a23',
    },
    textrow:{
      flexDirection: 'row', flex: 1,justifyContent: 'flex-start', marginBottom:12
    },
    textleft:{
      color: '#17a2b8'
    },
    textright:{
      color: 'white',
    },
    rightcolumn:{},
    leftcolumn:{width:180},
    postercontainer:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    separator:{
      height: .5,
      width: "100%",
      backgroundColor: "#FFF",
      marginTop: 10,
    },
    blueborder:{
      borderColor: '#17a2b8',
      borderWidth: 1,
      flex:1,
      flexDirection: 'row',
      justifyContent:'center',
      alignContent: 'center',
      borderRadius: 4,
      width:100,
      padding: 10,
    },
    legend:{
      backgroundColor:'#b7b7b7',
      borderWidth:1,
      borderColor: '#fff',
      width:15,
      height:20,
      borderRadius: 4,
    },
    legendtext:{
      color:'white',
      marginLeft: 10,
    },
    button:{
      padding:10,
      marginLeft: 70,
      backgroundColor:'#161a23',
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: 4, 
      borderWidth: 1,
      borderColor:'#f6a21c'
    },
    buttontext:{
      color:'white'
    }
  })
  
  AppRegistry.registerComponent('Best', () => SessionPage);