import React, {
    View,
    Component,
    StyleSheet,
    ListView,
    ActivityIndicatorIOS
} from 'react-native';
import CONSTANTS from '../Global.js';
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
            refreshing: false,
        };
        this.renderListView = this.renderListView.bind(this);
        this.changeSource = this.changeSource.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateState = this.updateState.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    componentDidMount(){
        this.loadData(this.state.status);
        //this.updateData(this.state.status);
    }
    updateState(responseData) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData),
            loaded: true,
            sourceNumber: responseData.length,
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
        /*    CONSTANTS.storage.save({
                key: 'breedingSourceReport',  //注意:请不要在key中使用_下划线符号!
                id: status,
                rawData: responseData,

                //如果不指定过期时间，则会使用defaultExpires参数
                //如果设为null，则永不过期
                expires: 1000 * 3600 * 24
            });
*/
        }).catch(err => {
            //如果没有找到数据且没有同步方法，
            //或者有其他异常，则在catch中返回
            console.warn(err);
        });
    }
    updateData(status, changeStatus) {
        const {sync} = CONSTANTS.storage;
        sync.breedingSourceReport({id:status, resolve:this.updateState});
        sync.breedingSourceReport({id:changeStatus});

    }
    onRefresh(){
        this.setState({refreshing: true});
        const statusArr = ['已處理', '未處理', '通報處理'],
            {sync} = CONSTANTS.storage;
        statusArr.forEach((d) => {

            if(this.state.status === d){
                sync.breedingSourceReport({id:d,resolve:this.updateState});
            }
            else{
                sync.breedingSourceReport({id:d});
            }
        });
        this.setState({refreshing: false});
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
                <ActivityIndicatorIOS
                    animating={true}
                    style={{height: 80}}
                    size="large"
                    />
            </View>
        );
    }
    renderListView() {
        let {
            dataSource,
            status,
            sourceNumber,
            refreshing,
        } = this.state;
        return(
            <BreedingListView
                dataSource = {dataSource}
                sourceNumber = {sourceNumber}
                status = {status}
                changeSource = {this.changeSource}
                updateData = {this.updateData}
                refreshing = {refreshing}
                onRefresh = {this.onRefresh}
                />
        );
    }

}
const styles = StyleSheet.create({
    container:{
        backgroundColor: CONSTANTS.backgroundColor,
        flex:1,
        justifyContent:'center',
    }
});
