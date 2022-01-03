import React, { Component } from 'react';
import { RefreshControl, StyleSheet, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Database from '../Database';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = new Database();
export default class KataTidakBakuScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      isFetching: false,
      KataTidakBaku: [],
      notFound: 'Database kosong.\nTekan tombol (+) untuk menambah data.'
    };
  }
  componentDidMount() {
    this.forceUpdate();
    this.getKataTidakBaku();

    this.props.navigation.setOptions({
      title: 'List Kata Tidak Baku',
      headerRight: () => (
        <Button
          buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
          icon={{ name: 'add', style: { marginRight: 0, fontSize: 28 } }}
          onPress={() => {
            this.props.navigation.navigate('KataTidakBakuAdd');
          }}
        />
      )
    });
  }
  onRefresh() {
    this.setState({ isFetching: true }, () => { this.getKataTidakBaku(); });
  }
  getKataTidakBaku() {
    let KataTidakBaku = [];
    db.listKataTidakBaku().then((data) => {
      KataTidakBaku = data;
      this.setState({
        KataTidakBaku,
        isLoading: false,
        isFetching: false
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false,
        isFetching: false
      }
    })
  }
  keyExtractor = (item, index) => index.toString()
  renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => {
      this.props.navigation.navigate('KataTidakBakuDetail', {
        kbId: `${item.kbId}`,
      });
    }}>
      {/* <Avatar title={item.kbId}/> */}
      <ListItem.Content>
        <ListItem.Title>{item.ktb}</ListItem.Title>
        <ListItem.Subtitle>{item.kb}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }
    if (this.state.KataTidakBaku.length === 0) {
      return (
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      )
    }
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.state.KataTidakBaku}
        renderItem={this.renderItem}
        refreshControl={<RefreshControl onRefresh={() => this.onRefresh()}
        refreshing={this.state.isFetching} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  message: {
    padding: 16,
    fontSize: 18,
    color: 'red'
  }
});