import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import { Picker } from '@react-native-picker/picker';

const db = new Database();

export default class KataTidakBakuAddScreen extends Component {
  constructor() {
    super();
    this.state = {
      // kbId: '',
      kb: '',
      ktb: '',
      kb_kategori: '',
      isLoading: false,
    };
  }
  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Tambah Kata Tidak Baku',
    });
    // this.kategoriList()
  }
  kategoriList = () => {
    // const params = this.props.route.params;
    return (this.props.route.params.arrKat.map((x, i) => {
      console.warn(x[1]);
      return (<Picker.Item label={x[1]} key={i} value={x[0].toString()} />)
    }));
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }
  saveProduct() {
    this.setState({
      isLoading: true,
    });
    let data = {
      // kbId: this.state.kbId,
      ktb: this.state.ktb,
      kb: this.state.kb,
      kb_kategori: this.state.kb_kategori,
    }
    db.addKataTidakBaku(data).then((result) => {
      console.log(result);
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
    // this.tes()
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            placeholder={'Kata Tidak Baku'}
            value={this.state.ktb}
            onChangeText={(text) => this.updateTextInput(text, 'ktb')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
            // multiline={true}
            // numberOfLines={4}
            placeholder={'Kata Baku'}
            value={this.state.kb}
            onChangeText={(text) => this.updateTextInput(text, 'kb')}
          />
        </View>
        <View>
          {/* <TextInput
            // multiline={true}
            // numberOfLines={4}
            placeholder={'Kategori'}
            value={this.state.kb_kategori}
            onChangeText={(text) => this.updateTextInput(text, 'kb_kategori')}
          /> */}
          <Picker
            selectedValue={this.state.kb_kategori}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => this.updateTextInput(itemValue, 'kb_kategori')}
          // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            { this.kategoriList() }
          </Picker>
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{ name: 'save' }}
            title='Save'
            onPress={() => this.saveProduct()} />
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