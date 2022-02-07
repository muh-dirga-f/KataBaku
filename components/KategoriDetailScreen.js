import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ActivityIndicator, View, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Database from '../Database';

const db = new Database();

export default class KategoriDetailsScreen extends Component {
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
      title: 'Detail Kategori',
    });
    const params = this.props.route.params;
    db.findKategoriById(params.idKat).then((data) => {
      data = data;
      this.setState({
        data: data,
        isLoading: false,
        id: data.idKat
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  deleteKategori(id) {
    this.setState({
      isLoading: true
    });
    db.deleteKategori(id).then((result) => {
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
              <Text style={{ fontSize: 16 }}>ID: {this.state.data.idKat}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>Kategori: {this.state.data.Kategori}</Text>
            </View>
          </View>
          <View style={styles.detailButton}>
            <Button
              large
              backgroundColor={'#CCCCCC'}
              leftIcon={{ name: 'edit' }}
              title='Edit'
              onPress={() => {
                this.props.navigation.navigate('KategoriEdit', {
                  idKat: `${this.state.id}`,
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
              onPress={() => this.deleteKategori(this.state.id)} />
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