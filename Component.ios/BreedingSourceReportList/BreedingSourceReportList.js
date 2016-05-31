import React, {
    View,
    Text,
    Component,
    TouchableHighlight,
    StyleSheet,
    ListView,
    AlertIOS,
    Image,
} from 'react-native';
import CONSTANTS from '../Global.js';
import StatusBar from '../StatusBar.js';
import BreedingListView from './BreedingListView.js';
export default class BreedingSourceReportList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            data: null,
            loaded: false,
            sourceNumber:0,
            status: '未處理',
        };
        this.renderListView = this.renderListView.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    componentDidMount(){
        console.log(123);
        this.loadData(this.state.status);
        //this.updateData(this.state.status);
    }
    fetchData(status) {
        status = status === '已處理' ? status + ',非孳生源': status;
        fetch(`http://140.116.247.113:11401/breeding_source/get/?database=tainan&status=${status}`)
        .then(response => {
            return response.json();
        })
        .then(responseData => {
            if(responseData){
                this.updateState(responseData);
                storage.save({
                    key: 'breedingSourceReport',
                    status:id,
                    rawData: responseData,
                    expires:  1000 * 3600 * 24
                });
                // 成功则调用resolve
            }
        })
    }
    updateState(responseData) {
        const sourceNumber = responseData.length;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true,
            sourceNumber: sourceNumber,
        });
    }
    loadData(status) {
        status = status === '已處理' ? status + ',非孳生源': status;
        CONSTANTS.storage.load({
            key: 'breedingSourceReport',
            id: status,
            autoSync: true,
            syncInBackground: true
        }).then(responseData => {
            //如果找到数据，则在then方法中返回
            this.updateState(responseData);
            CONSTANTS.storage.save({
                key: 'breedingSourceReport',  //注意:请不要在key中使用_下划线符号!
                id: status,
                rawData: responseData,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires:  1000 * 3600 * 24
            });

        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            console.warn(err);
        })
    }
    updateData(status, changeStatus) {
        CONSTANTS.storage.sync.breedingSourceReport({id:status, resolve:this.updateState});
        CONSTANTS.storage.sync.breedingSourceReport({id:changeStatus});

    }
    changeSource(status){
        if(status !== this.state.status){
            //console.log(321);
            this.loadData(status);
            this.setState({
                loaded: false,
                status: status,
            });
        }
    }

    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return this.renderListView();

    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading sources...
                </Text>
            </View>
        );
    }
    renderListView() {
        let {
            dataSource,
            status,
            sourceNumber
        } = this.state;
        return(
            <BreedingListView
                dataSource = {dataSource}
                sourceNumber = {sourceNumber}
                status = {status}
                changeSource = {this.changeSource}
                updateData = {this.updateData}
                />
        );
    }

}
const styles = StyleSheet.create({
    container:{
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
    }
});
