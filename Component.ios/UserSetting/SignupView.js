import React, {
  Component,
  Image,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CONSTANTS from '../Global.js';
import {requestSignup, fetchLoginFailed} from '../../Actions.ios/index.js';
import {connect} from 'react-redux';
import Button from '../Common/Button.js';
import FBLink from '../Common/FBLink.js';
import WebLink from '../Common/WebLink.js';
class SignupView extends Component {
  constructor(props) {
    super(props);
    this.signup = this.signup.bind(this);
    this.scrollToInput = this.scrollToInput.bind(this);
  }
  scrollToInput(event, refName) {
    const node = React.findNodeHandle(this.refs[refName]);
    const extraHeight = 80; // height of your text input
    this.refs.scrollView.scrollToFocusedInput(event, node, extraHeight);
  }
  signup() {
    const {
      phone,
      password,
      name
    } = this;
    const {dispatch} = this.props;
    const {user_uuid, token} = this.props.info; // eslint-disable-line camelcase
    // TODO log redux
    // const { dispatch } = this.props;
    // dispatch(requestSignup(name, phone, password));
    if(phone === '' || password === '' || name === '')
    return alert('有未填資訊唷！');
    const data = {
      name,
      phone,
      password,
      user_uuid // eslint-disable-line camelcase
    };
    dispatch(requestSignup(data, token))
    .then(() => {
      Alert.alert('已成功註冊', '登入並回到首頁', [{
        text: 'OK', onPress: this.props.toTop
      }]);
    })
    .catch((error) => {
      dispatch(fetchLoginFailed());
      Alert.alert('不好意思！註冊出了問題', '請確認資料填寫確實，若有任何疑問也請回報給我們：）', [{
        text: 'OK', onPress: () => {}
      }]);
    });
  }
  render() {
    const {enter} = this.props;
    return(
      <KeyboardAwareScrollView style = {styles.container} ref = 'scrollView'>
        <Image
          source = {require('../../img/people.png')}
          style = {styles.image}
        />
        <View style = {styles.textInputView}>
          <Text style = {styles.label}>
            姓名
          </Text>
          <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => {
              this.name = text;
            }}
            keyboardType = 'default'
            selectTextOnFocus = {true}
            autoCorrect = {false}
            ref = 'textinput1'
            returnKeyType = "next"
            onSubmitEditing = {() => this.refs.textinput2.focus()}
            onFocus={(event) => {
              this.scrollToInput(event, 'textinput1');
            }}
          />
        </View>
        <View style = {styles.textInputView}>
          <Text style = {styles.label}>
            電話
          </Text>
          <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => {
              this.phone = text;
            }}
            keyboardType = 'numeric'
            selectTextOnFocus = {true}
            autoCorrect = {false}
            ref = 'textinput2'
            returnKeyType = "next"
            onSubmitEditing = {() => this.refs.textinput3.focus()}
            maxLength = {10}
            onFocus={(event) => {
              this.scrollToInput(event, 'textinput2');
            }}
          />
        </View>
        <View style = {styles.textInputView}>
          <Text style = {styles.label}>
            密碼
          </Text>
          <TextInput
            style = {styles.textInput}
            onChangeText = {(text) => {
              this.password = text;
            }}
            secureTextEntry = {true}
            autoCorrect = {false}
            ref = 'textinput3'
            returnKeyType = "send"
            onSubmitEditing = {this.signup}
            onFocus={(event) => {
              this.scrollToInput(event, 'textinput3');
            }}
          />
        </View>
        <Button onPress={this.signup} buttonText="註冊"
        />
        <Text style = {styles.psText}>
          ———  已經註冊了?  ———
        </Text>
        <TouchableHighlight
          style = {styles.login}
          onPress = {() => {
            enter('signinView', '個人資訊');
          }}
          underlayColor = {CONSTANTS.backgroundColor}>
          <Text style = {styles.loginText}>
            登入
          </Text>
        </TouchableHighlight>
        <FBLink />
        <WebLink />
        <View style={styles.footer}/>
      </KeyboardAwareScrollView>
    );
  }
}
function select(state) {
  return {
    info: state.login.info
  };
}
export default connect(select)(SignupView);
const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANTS.backgroundColor,
    paddingTop: 80,
  },
  image: {
    marginTop: 30,
    height: 100,
    width: 100,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  label: {
    color: CONSTANTS.mainLightColor,
    fontSize: 16,
  },
  textInputView: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: CONSTANTS.backgroundColor,
    height: 30,
    width: 200,
    alignSelf: 'center',
  },
  hundredWidth: {
    flexDirection: 'row'
  },
  signup: {
    // height: 40,
    width: 200,
    marginTop: 30,
    paddingVertical: 8,
    // paddingHorizontal: 25,
    backgroundColor: CONSTANTS.backgroundColor,
    borderRadius: 5,
    borderColor: CONSTANTS.mainColor,
    borderWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 20,
    color: '#444',
  },
  psText: {
    marginVertical: 10,
    color: '#777',
    alignSelf: 'center',
  },
  login: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#00ace6',
    fontSize: 20,
  },
  footer: {
    marginBottom: 50,
  }
});
