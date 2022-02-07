// In App.js in a new project

import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './components/MenuScreen';
import KategoriScreen from './components/KategoriScreen';
import KategoriAddScreen from './components/KategoriAddScreen';
import KategoriDetailScreen from './components/KategoriDetailScreen';
import KategoriEditScreen from './components/KategoriEditScreen';
import KataTidakBakuScreen from './components/KataTidakBakuScreen';
import KataTidakBakuDetailsScreen from './components/KataTidakBakuDetailsScreen';
import KataTidakBakuAddScreen from './components/KataTidakBakuAddScreen';
import KataTidakBakuEditScreen from './components/KataTidakBakuEditScreen';
import Database from './Database';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = new Database();
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      kalimat: [],
      kalimatHasil: [],
      hasil: [],
    };
  }

  componentDidMount() {
    this.textInput = React.createRef();

    this.props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="*"
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={
            <Icon
              name="database"
              size={15}
            // color="white"
            />
          }
          onPress={() => {
            this.props.navigation.navigate('Menu');
          }}
        />
      )
    });
  }

  render() {
    let cekKataTidakBaku = () => {
      let kalimat = [];
      let kata = this.state.kalimat.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
      //clear data pada state
      this.state.kalimat = [];
      this.state.kalimatHasil = [];
      this.state.hasil = [];
      let id = 0;
      let kataRemove = [];
      kata.forEach((v, i) => {
        db.findKataTidakBaku(v).then((data) => {
          if (data == '') {
            kalimat.push(v + " ")
          } else {
            //menampilkan style pada kalimat yang
            kalimat.push(<Text style={styles.highLight}>{v} </Text>)
            this.state.hasil.push(
              <View>
                <Text>{id = id + 1}. <Text style={{ fontWeight: 'bold', color: 'red' }}>{data.ktb}</Text> = {data.kb} [{data.Kategori}]</Text>
              </View>
            )
          }
        })
        db.findKataTidakBaku2(kata[i], kata[i + 1]).then((data) => {
          if (data !== '') {
            //menampilkan style pada kalimat yang
            kalimat.push(<Text style={styles.highLight}>{kata[i] + " " + kata[i + 1]} </Text>)
            this.state.hasil.push(
              <View>
                <Text>{id = id + 1}. <Text style={{ fontWeight: 'bold', color: 'red' }}>{data.ktb}</Text> = {data.kb} [{data.Kategori}]</Text>
              </View>
            )
            // kirim index kata yang akan di hapus
            kataRemove.push(i);
          }
        })
      })
      this.textInput.clear();
      let time = kata.length/5;
      (time <= 0) ? time = 1000 : time = time * 1000;
      setTimeout(() => {
        //hapus 2 kata dalam kalimat
        kataRemove.forEach(v=>{
          kalimat.splice(v, 1);
          kalimat.splice(v+1, 1);
        })
        this.state.kalimatHasil = kalimat;
        this.forceUpdate();
      }, time);
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
            ref={input => { this.textInput = input }}
            multiline={true}
            numberOfLines={1}
            placeholder={'Masukkan kalimat disini'}
            onChangeText={(kalimat) => this.setState({
              kalimat: kalimat,
            })}
            value={this.state.kalimat.toString()}
          />
        </View>
        <Button
          title="Cek"
          onPress={() => cekKataTidakBaku()}
        />
        {
          (this.state.kalimatHasil == '') ? null :
            <View>
              <Text>Kalimat :</Text>
              <Text>{this.state.kalimatHasil}</Text>
            </View>
        }
        {
          (this.state.hasil == '') ? null :
            <View>
              <Text>Hasil :</Text>
              {this.state.hasil}
            </View>
        }
      </ScrollView >
    )
  }
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Kategori" component={KategoriScreen} />
        <Stack.Screen name="KategoriAdd" component={KategoriAddScreen} />
        <Stack.Screen name="KategoriDetail" component={KategoriDetailScreen} />
        <Stack.Screen name="KategoriEdit" component={KategoriEditScreen} />
        <Stack.Screen name="KataTidakBaku" component={KataTidakBakuScreen} />
        <Stack.Screen name="KataTidakBakuDetail" component={KataTidakBakuDetailsScreen} />
        <Stack.Screen name="KataTidakBakuAdd" component={KataTidakBakuAddScreen} />
        <Stack.Screen name="KataTidakBakuEdit" component={KataTidakBakuEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
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
  highLight: {
    fontWeight: 'bold',
    color: 'red',
  }
});

export default App;