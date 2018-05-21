import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ActivityIndicator, ScrollView, RefreshControl, WebView, Dimensions, TouchableOpacity,ToastAndroid } from 'react-native';
import Error from '../mainpages/Error'
import { Actions } from 'react-native-router-flux';
import ViewTransformer from 'react-native-view-transformer';
import Seat from '../components/Seat'

export default class SessionPage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      error: false,
      refreshing: false,
      amount: 0,
      selected: false,
      seats: []
    }
  }
  _onRefresh() {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
      Actions.refresh({ key: Math.random() })
    });
  }
  componentDidMount() {
    return fetch(global.ip + '/api/session/' + this.props.link, { timeout: 500, follow: 0 })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSourceAPI: responseJson,
          error: false
        },
          function () {
          });
      })

      .catch((error) => {
        this.setState({
          error: true,
        })
      });
  }
  generate() {
    var array = []
    var seatarray = []
    for (let i = 1; i <= Math.sqrt(this.state.dataSourceAPI.seatsCount/4); i++) {
      var columns = []
      for (j = 1; j <= Math.sqrt(this.state.dataSourceAPI.seatsCount/4)*Math.sqrt(this.state.dataSourceAPI.seatsCount/4); j++) {
        var boolean = false
        this.state.dataSourceAPI.seats.map(item => {
          if ((item.row == i) && (item.number == j)) {
            boolean = true
          }
        })
        columns.push(
          <Seat i={i} j={j} onSeatChoosen={
            this.selectseat.bind(this)
          } isBooked={boolean} />
        )
      }


      array.push(
        <View style={{ flexDirection: 'row' }}>{columns}</View>
      )
    }
    return array
  }

  tickets() {
    var ticketrow = []
    var ticketsStrings = []
    var rows = this.state.seats.map(seat => seat.row)
    rows = rows.filter((value, index, array) => array.indexOf(value) == index)
    rows.forEach(row => {
      var ticketString = row + " ряд, места: "
      this.state.seats.filter(seat => seat.row == row).forEach(seat => {
        ticketString += seat.number + " ";
      })
      ticketrow.push(
        <View style={{ flex: 1, flexDirection: 'row' }}><Text style={{ color: 'white' }}>{ticketString}</Text></View>
      )
    })
    return ticketrow
  }

  selectseat(i, j, active) {
    if (!active) {
      this.setState({ amount: this.state.amount + 1 })
      this.state.seats.push({ row: i, number: j })
    }
    else {
      this.setState({ amount: this.state.amount - 1 })
      this.state.seats = this.state.seats.filter(seat => seat.row != i || seat.number != j)
    }
  }
  purchase() {
    if (global.isAuthenticated) {
      if (this.state.seats.length != 0) {
        let formdata = new FormData();
        this.state.seats.forEach(item => {
          formdata.append(
            'ticket-row' + item.row + '-number' + item.number,
            item.row * 1000 + item.number)
        })
        formdata.append("session-cost", this.state.dataSourceAPI.cost)
        formdata.append("session-link", this.state.dataSourceAPI.link)
        formdata.append("__RequestVerificationToken", global.token)
        fetch(global.ip + '/Home/CreateOrderMobile',
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + global.token,
              'Content-Type': 'multipart/form-data',
            },
            body: formdata,
          })
          .then((response) => response.text())
          .then((text) => {
            Actions.push('purchase', { url: text })
          })
          .catch((error) => {
            this.setState({
              error: true,
            })
            console.warn(error)
          });
      }
      else{
        ToastAndroid.showWithGravityAndOffset(
          'Выбeрите места',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          150
      );
      }
    }
    else {
      Actions.login()
    }
  }

  render() {
    if (!this.state.error) {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#161a23' }}>
            <ActivityIndicator size="large" color='#f6a21c' />
          </View>
        )
      }
      else {

        return (
          <ScrollView ref='_scrollView' refreshControl={
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
                    <Text style={styles.textright}>{this.state.dataSourceAPI.sessionTime.substring(0, 10)}</Text>
                  </View>
                </View>
                <View style={styles.textrow}>
                  <View style={styles.leftcolumn}>
                    <Text style={styles.textleft}>Время</Text>
                  </View>
                  <View style={styles.rightcolumn}>
                    <Text style={styles.textright}>{this.state.dataSourceAPI.sessionTime.substring(11, 16)}</Text>
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
              <View style={{ alignItems: 'center', marginTop: 10, flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}><Text style={{ color: 'white', fontSize: 20 }}>Экран</Text></View>
                <ViewTransformer
                  style={{ flex: 1, flexDirection: 'row', marginTop: 15, width: '100%', height: 200, justifyContent: 'center' }}
                  onTransformGestureReleased={(transformObj) => { return true; }} >
                  {this.generate()}
                </ViewTransformer>
                <View style={styles.blueborder}>
                  <View style={styles.legend} />
                  <Text style={styles.legendtext}>- Занято</Text>
                </View>
              </View>
              <View>
                {this.tickets()}
              </View>
              <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <Text style={styles.buttontext}>Итоговая стоиомть: {this.state.dataSourceAPI.cost * this.state.amount} р.</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <TouchableOpacity style={styles.button} onPress={() => this.purchase()} activeOpacity={1}>
                    <Text style={styles.buttontext}>
                      Заказать
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </ScrollView>
        )
      }
    }
    else {
      return (
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flex: 1 }} refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
          <Error />
        </ScrollView>
      )
    }
  }
}

const win = Dimensions.get('window');
var styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: '#161a23',
  },
  textrow: {
    flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginBottom: 12
  },
  textleft: {
    color: '#17a2b8'
  },
  textright: {
    color: 'white',
  },
  rightcolumn: {},
  leftcolumn: { width: 180 },
  postercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: .5,
    width: "100%",
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  blueborder: {
    borderColor: '#17a2b8',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 4,
    width: 100,
    padding: 10,
  },
  legend: {
    backgroundColor: '#b7b7b7',
    width: 15,
    height: 20,
    borderRadius: 4,
  },
  legendtext: {
    color: 'white',
    marginLeft: 10,
  },
  button: {
    padding: 10,
    marginLeft: 70,
    backgroundColor: '#161a23',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f6a21c'
  },
  buttontext: {
    color: 'white'
  },
  seat: {
    backgroundColor: '#006879',
    width: 15,
    height: 20,
    borderRadius: 4,
    margin: 2,
  },
  seatactive: {
    backgroundColor: '#f6a21c',
    width: 15,
    height: 20,
    borderRadius: 4,
    margin: 2,
  },
  seatrow: {
    flex: 1,
    width: '100%',
    height: 40
  }
})

AppRegistry.registerComponent('Best', () => SessionPage);