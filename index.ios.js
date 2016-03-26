/**
* Dengueapp
*
*/

import React, {
    AppRegistry,
    Component,
    TextInput,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions,
} from 'react-native';

import Nav from './ios.component/nav.ios.js';
import CONSTANTS from './ios.component/constants.ios.js';
import StatusBar from './ios.component/status_bar.ios.js';

class proj1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account:"",
            password:"",
            logined:false,
        };
        this._login = this._login.bind(this);
        this._loginquickly = this._loginquickly.bind(this);
    }

    componentDidMount() {

        this.fetchData();
    }

    fetchData() {

    }

    render() {
        if(this.state.logined){
            return(
                <Nav identity={this.state.identity}></Nav>
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <StatusBar title="登革熱防疫平台" page='index'></StatusBar>
                    <Image style={styles.logo} source={{uri:""}}>

                    </Image>
                    <View style={styles.inputs}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({account:text})}
                            placeholder="   account"
                            >

                        </TextInput>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({password:text})}
                            placeholder="   password"
                            secureTextEntry={true}
                            >
                        </TextInput>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this._login}>
                            <View >
                                <Text style={styles.buttonText}>登入</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.blank}></View>
                        <TouchableHighlight style={styles.button} underlayColor="#eee" onPress={this._loginquickly}>
                            <View >
                                <Text style={styles.buttonText}>快速登入</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }

    }
    _login(){
        var state = this.state;
        fetch('http://localhost:1337/account/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: state.account,
                password: state.password,
            })
        })
        .then((response) => response.text())
        .then((responseText) => {
            var identity = JSON.parse(responseText).identity;
            this.setState({
                logined: true,
                identity: identity,
            })
        })
        .catch((error) => {
            console.warn(error);
        });

    }
    _loginquickly(){
        var account = this.guid(),
        password = this.guid(),
        state = this.state;
        fetch('http://localhost:1337/account/login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: state.account,
                password: state.password,
            })
        })
        .then((response) => response.text())
        .then((responseText) => {
            var identity = JSON.parse(responseText).identity;
            this.setState({
                logined: true,
                identity: identity,
            })
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
}



var styles = StyleSheet.create({
    logo:{
        width: CONSTANTS.screenWidth * 0.8,
        height: CONSTANTS.screenHeight * 0.6,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CONSTANTS.backgroundColor,
    },
    inputs: {
        width: CONSTANTS.screenWidth * 0.9,

    },
    buttons: {
        flexDirection: 'row',
        width: CONSTANTS.screenWidth * 0.9,

    },
    button: {
        flex:1,
        backgroundColor:CONSTANTS.mainColor,
        height: 40,
        padding: 5,
        borderRadius :1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color:'#fff',

    },
    blank: {
        width:10,
    },
    textInput: {
        height: 40,
        backgroundColor: "#ffffff",
        justifyContent:'center',
        marginBottom:20
    }

});

AppRegistry.registerComponent('proj1', () => proj1);
