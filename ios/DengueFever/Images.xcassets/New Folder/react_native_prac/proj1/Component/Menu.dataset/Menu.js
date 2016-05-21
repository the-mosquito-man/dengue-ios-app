import React, {
    AppRegistry,
    Component,
    TextInput,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import CONSTANTS from './Global.js';
import EnterImage from './Menu/EnterImage.js';
import StatusBar from './StatusBar.js';
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.generalRender = this.generalRender.bind(this);
        this.specialRender = this.specialRender.bind(this);
    }

    render(){
        if(this.props.identity === '1'){
            return this.specialRender()
        }
        return this.generalRender()
    }
    generalRender() {
        return(
            <View style={styles.container}>
                <StatusBar page="menu" title="登革熱防疫平台"></StatusBar>
                <View style={styles.table}>
                    <View style={styles.space}>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.eachRow}>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="mosquitoBiteReport"></EnterImage>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="breedingSourceReport"></EnterImage>

                        </View>
                        <View style={styles.eachRow}>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="hotZoneInfo"></EnterImage>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="hospitalInfo"></EnterImage>

                        </View>
                    </View>

                    <View style={styles.space}>
                    </View>
                </View>
            </View>
        );
    }
    specialRender(){
        return(
            <View style={styles.container}>
                <StatusBar page="menu" title="登革熱防疫平台"></StatusBar>
                <View style={styles.table}>
                    <View style={styles.space}>
                    </View>
                    <View style={styles.center}>
                        <View style={styles.eachRow}>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="breedingSourceReportList"></EnterImage>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="mosquitoBiteReport"></EnterImage>

                        </View>
                        <View style={styles.eachRow}>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="breedingSourceReport"></EnterImage>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="hotZoneInfo"></EnterImage>

                        </View>
                        <View style={styles.eachRow}>
                            <EnterImage _enter={this.props._enter} _back={this.props._back} page="hospitalInfo"></EnterImage>
                        </View>

                    </View>


                    <View style={styles.space}>
                    </View>
                </View>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection:'column',
        flex:1,
    },

    table: {
        flexDirection:'row',
        flex:1,
        marginBottom:60,
    },
    eachRow: {
        flexDirection:'row',
    },
    space: {
        flex: 0,
    },
    center: {
        //justifyContent:'center',
        flex:1,
    },


})
