import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class KataTidakBakuDetailsScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: {},
      id: '',
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Detail Kata Tidak Baku',
    });
    const params = this.props.route.params;
    db.findKataTidakBakuById(params.kbId).then((data) => {
      data = data;
      this.setState({
        data: data,
        isLoading: false,
        id: data.kbId
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  deleteKataTidakBaku(id) {
    this.setState({
      isLoading: true
    });
    db.deleteKataTidakBaku(id).then((result) => {
      console.log(result);
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    return (
      <ScrollView>
        <Card style={styles.container}>
          <View style={styles.subContainer}>
            <View>
              <Text style={{ fontSize: 16 }}>ID: {this.state.data.kbId}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Kata Tidak Baku: {this.state.data.ktb}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Kata Baku: {this.state.data.kb}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{ name: 'edit' }}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('KataTidakBakuEdit', {
                  kbId: `${this.state.id}`,
                });
              }} />
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#999999'}
              color={'#FFFFFF'}
              leftIcon={{ name: 'delete' }}
              title='Delete'
              onPress={() => this.deleteKataTidakBaku(this.state.id)} />
          </View>
        </Card>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailButton: {
    marginTop: 10
  }
})