import React, {
  Component,
  StyleSheet,
  View,
  Navigator

} from 'react-native';
import CONSTANTS from './Global.js';
import { connect } from 'react-redux';
import StatusBar from './StatusBar.js';
import ContextComponent from './Nav/ContextComponent.js';
import TabBar from './Nav/TabBar.js';
import PopImage from './Nav/PopImage.js';
import PopImageBackground from './Nav/PopImageBackground.js';
import { changeStatus } from '../Actions.ios/index.js';
import Spinner from 'react-native-loading-spinner-overlay';
class Nav extends Component {
  constructor(props) {
    super(props);
    this.enter = this.enter.bind(this);
    this.back = this.back.bind(this);
    this.toTop = this.toTop.bind(this);
  }
  render() {
    const { status, isFetching } = this.props;
    return (
      <View style = {styles.container}>
        <StatusBar
          title = {status.title}
          id = {status.id}
          back = {this.back}
          toTop = {this.toTop}
            />
          <Navigator
            ref="nav"
            initialRoute = {status}
            renderScene={
              route =>
              <ContextComponent
                id = {route.id}
                data = {route.data}
                title = {status.title}
                enter = {this.enter}
                back = {this.back}
                toTop = {this.toTop}
              />
            }
          />
        <TabBar
          title = {status.title}
          enter = {this.enter}
          back = {this.back}
            />
            <PopImage
              id = {status.id}
              back = {this.back}
            />
        <Spinner visible={isFetching} />
      </View>
    );
  }
  enter(id, title, data) {
    //TODO change nav to redux
    const routeList = this.refs.nav.getCurrentRoutes(),
      route = this.containRoute(id, data, routeList),
      {jumpTo, push} = this.refs.nav;
    if(route){
      jumpTo(route);
    }
    else{
      push({id:id, title:title, data:data});
    }
    this.props.dispatch(changeStatus(title, id));
  }
  back() {
    const routeList = this.refs.nav.getCurrentRoutes(),
      currentRoute = routeList[routeList.length - 2];
    this.refs.nav.pop();
    this.props.dispatch(changeStatus(currentRoute.title,currentRoute.id,));
  }
  toTop() {
    const firstRoute = this.refs.nav.getCurrentRoutes()[0];
    this.refs.nav.popToTop();
    this.props.dispatch(changeStatus(firstRoute.title, firstRoute.id));
  }
  containRoute(routeId, routeData, routeList) {
    for(let x in routeList){
      if(routeId === routeList[x].id && routeData === routeList[x].data){
        return routeList[x];
      }
    }
    return false;
  }

}
function select(state) {
  return {
    status: state.status,
    isFetching: state.login.isFetching,
  };
}
export default connect(select)(Nav);
var styles = StyleSheet.create({
  texts: {
    color: '#000',
  },

  sceneStyle: {
    flexDirection:'column',
    flex:1,
    height: CONSTANTS.screenHeight - 50,
  },
  container: {
    flexDirection: 'column',
    width: CONSTANTS.screenWidth,
    height: CONSTANTS.screenHeight,
  },
});
