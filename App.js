// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, TextInput, Text } from 'react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from './components/MenuScreen';
import LoginScreen from './components/LoginScreen';
import KategoriScreen from './components/KategoriScreen';
import KategoriAddScreen from './components/KategoriAddScreen';
import KategoriDetailScreen from './components/KategoriDetailScreen';
import KategoriEditScreen from './components/KategoriEditScreen';
import KataTidakBakuScreen from './components/KataTidakBakuScreen';
import KataTidakBakuDetailsScreen from './components/KataTidakBakuDetailsScreen';
import KataTidakBakuAddScreen from './components/KataTidakBakuAddScreen';
import KataTidakBakuEditScreen from './components/KataTidakBakuEditScreen';
import Database from './Database';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = new Database();

function HomeScreen({ route, navigation }) {
  let [kalimat, setKalimat] = useState('');
  let [kalimatHasil, setKalimatHasil] = useState([]);
  let [hasil, setHasil] = useState([]);
  let [hasilKataBaku, setHasilKataBaku] = useState([]);
  let [hasilKataTidakTerdaftar, setHasilKataTidakTerdaftar] = useState([]);

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="*"
        buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
        icon={
          <Icon
            name="sign-in"
            size={15}
          // color="white"
          />
        }
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
    )
  });

  let cekKataTidakBaku = () => {
    if (kalimat !== '') {
      setKalimat('');
      setKalimatHasil([]);
      setHasil([]);
      let kata = kalimat.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
      //clear data pada state
      let arrKalimat = [];
      let arrKataTidakTerdaftar = [];
      let arrHasil = [];
      let arrHasilKataBaku = [];
      let id = 0;
      let id2 = 0;
      let id3 = 0;
      let kataRemove = [];
      kata.forEach((v, i) => {
        db.findKataTidakBaku(v).then((data) => {
          if (data == '') {
            arrKalimat.push(v + " ")
            arrKataTidakTerdaftar.push(<Text>{id2 = id2 + 1}. <Text style={{ fontWeight: 'bold', color: 'blue' }}>{v} </Text></Text>)
          } else {
            //menampilkan style pada kalimat yang
            arrKalimat.push(<Text style={styles.highLight}>{v} </Text>)
            arrHasil.push(
              <View>
                <Text>{id = id + 1}. <Text style={{ fontWeight: 'bold', color: 'red' }}>{data.ktb}</Text> = {data.kb} [{data.Kategori}]</Text>
              </View>
            )
            arrHasilKataBaku.push(
              <View>
                <Text>{id3 = id3 + 1}. <Text style={{ fontWeight: 'bold', color: 'green' }}>{data.kb}</Text> [{data.Kategori}]</Text>
              </View>
            )
          }
        })
        db.findKataTidakBaku2(kata[i], kata[i + 1]).then((data) => {
          if (data !== '') {
            //menampilkan style pada kalimat yang
            arrKalimat.push(<Text style={styles.highLight}>{kata[i] + " " + kata[i + 1]} </Text>)
            arrHasil.push(
              <View>
                <Text>{id = id + 1}. <Text style={{ fontWeight: 'bold', color: 'red' }}>{data.ktb}</Text> = {data.kb} [{data.Kategori}]</Text>
              </View>
            )
            arrHasilKataBaku.push(
              <View>
                <Text>{id3 = id3 + 1}. <Text style={{ fontWeight: 'bold', color: 'green' }}>{data.kb}</Text> [{data.Kategori}]</Text>
              </View>
            )
            // kirim index kata yang akan di hapus
            kataRemove.push(i);
          }
        })
      })
      let time = kata.length / 5;
      (time <= 0) ? time = 1000 : time = time * 1000;
      setTimeout(() => {
        //hapus 2 kata dalam kalimat
        kataRemove.forEach(v => {
          arrKalimat.splice(v, 1);
          arrKalimat.splice(v + 1, 1);
        })
        setKalimatHasil(arrKalimat);
        setHasilKataTidakTerdaftar(arrKataTidakTerdaftar);
        setHasil(arrHasil);
        setHasilKataBaku(arrHasilKataBaku);
      }, time);
    } else {
      alert('Masukkan Kalimat terlebih dahulu');
    }
  };

  const isFocused = useIsFocused();
  if (isFocused) {
    if (route.params) {
      const { loginStatus } = route.params;
      if (loginStatus) {
        navigation.setOptions({
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
                navigation.navigate('Menu');
              }}
            />
          )
        });
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{marginBottom: 50,}}>
        <View style={styles.subContainer}>
          <TextInput
            multiline={true}
            numberOfLines={1}
            placeholder={'Masukkan kalimat disini'}
            onChangeText={(text) => setKalimat(text)}
            value={kalimat}
          />
        </View>
        <View>
          <Button
            title="Cek"
            buttonStyle={{ backgroundColor: 'green' }}
            onPress={() => cekKataTidakBaku()}
          />


          {
            (kalimatHasil == '') ? null :
              <Card containerStyle={{ marginTop: 15 }}>
                <Card.Title style={{ textAlign: 'left' }}>Kalimat</Card.Title>
                <Card.Divider />
                <Text style={styles.fonts}>
                  {kalimatHasil}
                </Text>
              </Card>
          }

          {
            (hasilKataBaku == '') ? null :
              <Card containerStyle={{ marginTop: 15 }}>
                <Card.Title style={{ textAlign: 'left' }}>Hasil Kata Baku</Card.Title>
                <Card.Divider />
                {hasilKataBaku}
              </Card>
          }
          {
            (hasil == '') ? null :
              <Card containerStyle={{ marginTop: 15 }}>
                <Card.Title style={{ textAlign: 'left' }}>Hasil Kata Tidak Baku</Card.Title>
                <Card.Divider />
                {hasil}
              </Card>
          }
          {
            (hasilKataTidakTerdaftar == '') ? null :
              <Card containerStyle={{ marginTop: 15 }}>
                <Card.Title style={{ textAlign: 'left' }}>Hasil Kata yang tidak ada dalam Database</Card.Title>
                <Card.Divider />
                {hasilKataTidakTerdaftar}
              </Card>
          }
        </View>
      </View>
    </ScrollView >
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
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
  },
  fonts: {
    marginBottom: 8,
  },
});

export default App;