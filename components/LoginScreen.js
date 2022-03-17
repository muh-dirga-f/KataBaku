import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
export default class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isLoading: true,
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Login',
        });
        this.setState({
            isLoading: false,
        });
        // const navigation = this.props.route.params;
        // console.warn(navigation.username);
    }

    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
    }

    login() {
        this.setState({
            isLoading: true,
        });
        let data = {
            username: this.state.username,
            password: this.state.password,
        }
        if (data.username == 'admin' && data.password == 'admin') {
            // console.warn(result);
            this.setState({
                isLoading: false,
            });
            this.props.navigation.navigate('Home', {
                loginStatus: true,
            });
        } else {
            alert('Username atau Password Salah');
            this.setState({
                isLoading: false,
            });
        }
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
                        placeholder={'Username'}
                        value={this.state.username.toString()}
                        onChangeText={(text) => this.updateTextInput(text, 'username')}
                    />
                </View>
                <View style={styles.subContainer}>
                    <TextInput
                        placeholder={'Password'}
                        value={this.state.password}
                        onChangeText={(text) => this.updateTextInput(text, 'password')}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        title='Login'
                        buttonStyle={{ width: '50%', alignSelf: 'center', marginTop: 15 }}
                        onPress={() => this.login()} />
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