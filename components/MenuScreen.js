import React, { Component } from 'react';
import { RefreshControl, StyleSheet, FlatList, ActivityIndicator, View, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Database from '../Database';
import Icon from 'react-native-vector-icons/FontAwesome';

const db = new Database();
export default class MenuScreen extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            isFetching: false,
        };
    }
    componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Database'
        })
    }
    onRefresh() {
    }
    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => {
            this.props.navigation.navigate(item.Link, {idKat: `${item.idKat}`});
        }}>
            <ListItem.Content>
                <ListItem.Title>{item.Judul}</ListItem.Title>
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
        return (
            <FlatList
                keyExtractor={this.keyExtractor}
                data={[{ "Id": 1, "Judul": "Data Kategori", "Link": "Kategori" }, { "Id": 2, "Judul": "Data Kata Baku", "Link": "KataTidakBaku" }]}
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