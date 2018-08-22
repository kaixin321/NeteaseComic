/**
 * @author : JessieK
 * @email : lyj1246505807@gmail.com
 * @description : 漫画详情展示
 */

import React, {Component} from 'react'
import {View,  ScrollView} from 'react-native'
import CommonStyle from '../common/CommonStyle'
import ServerApi from "../constant/ServerApi"
import NetUtil from "../util/NetUtil"
import DetailHeader from '../common/DetailHeader'
import DetailChapters from '../common/DetailChapters'
import DetailInfo from './DetailInfo'
class ComicDetail extends Component<Props>{
    constructor(props) {
        super(props)
        this.state = {
            follow: false,
            data: null,
            loadMore: false,
            refresh: false
        }
    }

    componentDidMount() {
        console.log(this.props.navigation.getParam('id', ''))
        this.getDetail()
    }

    /**
     * 获取详情
     */
    getDetail() {
        let params = {
            id: this.props.navigation.getParam('id', '')
        }
        NetUtil.post(ServerApi.tencent.getDetail, params, (result) => {
            this.setState({
                data: result,
                loadMore: result.loadMore
            })
        }, (error) => {
            console.log(error)
        })
    }

    /**
     * 获取更多详情
     */
    getDetailMore() {
        let params = {
            link: this.props.navigation.getParam('id', '')
        }
        this.setState({
            loadMore: false,
            refresh: true
        })
        NetUtil.post(ServerApi.netease.getDetailMore, params, (result) => {
            if (result.length !== 0) {
                Array.prototype.push.apply(this.state.data.data, result)
                this.setState({
                    ['data.data']: this.state.data.data,
                    refresh: false
                })
            } else {
                this.setState({
                    refresh: false
                })
            }
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                <View style={CommonStyle.styles.container}>
                    {/*渲染头部*/}
                    <DetailHeader follow={this.state.follow} onBack={() => {
                        this.props.navigation.goBack()
                    }} onFollow={() => {
                        this.setState({
                            follow: true
                        })
                    }}/>
                    {/*渲染漫画信息*/}
                    {this.state.data ? <DetailInfo data={this.state.data} /> : null}
                    {/*渲染可看漫画章节*/}
                    {this.state.data ?
                        <DetailChapters data={this.state.data}
                                        refresh={this.state.refresh}
                                        state={this.state}
                                        loadMore={this.state.loadMore} onClick={() => {
                            console.log('点击了item')
                        }} onMore={() => {
                            this.getDetailMore()
                        }}/> : null}
                </View>
            </ScrollView>
        )
    }

}

export default ComicDetail