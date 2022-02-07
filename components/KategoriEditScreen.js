import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import Database from '../Database';

const db = new Database();
export default class KategoriEditScreen extends Component {
  constructor() {
    super();
    this.state = {
      idKat: '',
      Kategori: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Edit Kategori',
    });
    const navigation = this.props.route.params;
    console.warn(navigation.idKat);
    db.findKategoriById(navigation.idKat).then((data) => {
      // console.log(data);
      const setData = data;
      this.setState({
        idKat: setData.idKat,
        Kategori: setData.Kategori,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateProduct() {
    this.setState({
      isLoading: true,
    });

    let data = {
      idKat: this.state.idKat,
      Kategori: this.state.Kategori,
    }
    db.updateKategori(data.idKat, data).then((result) => {
      console.warn(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
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
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            editable={false}
            placeholder={'ID'}
            value={this.state.idKat.toString()}
            onChangeText={(text) => this.updateTextInput(text, 'idKat')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'Kategori'}
            value={this.state.Kategori}
            onChangeText={(text) => this.updateTextInput(text, 'Kategori')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{ name: 'save' }}
            title='Save'
            onPress={() => this.updateProduct()} />
        </View>
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
    marginBottom: 20,
    padding: 5,
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
  }
})