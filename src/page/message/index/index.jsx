/*
* @Author: luoyi
* @Date:   2017-02-11 18:46:37
* @Last Modified by:   luoyi
* @Last Modified time: 2017-04-09 23:36:03
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Message      from 'service/message.jsx';

const _mm = new MMUtile();
const _message = new Message();

import './index.scss';


const MessageList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'messageId', // productId / productName
            searchKeyword   : '',
            pageNum         : 1
        };
    },
    componentDidMount(){
       this.loadMessageList();
       // $(document).on('click', '.msg-delete', function(){
       //      alert("test");
       //      if(window.confirm('确认要删除该商品？')){
       //          this.delMessage(messageId);
       //      }
       //  });
    },
     
    // 加载列表
    loadMessageList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;
            
        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // 按用户名名搜索
        if(listType == 'search' && searchType == "userName"){
            listParam.userName = this.state.searchKeyword;
        }
        // 按留言id搜索
        if(listType == 'search' && searchType == "messageId"){
            listParam.messageId = this.state.searchKeyword;
        }
        // 查询
        _message.getMessageList(listParam).then(res => {
            console.log(res)
            this.setState(res);
            $("th").addClass("text-center");
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    // 搜索类型变化
    onSearchTypeChange(e){
        let searchType = e.target.value;
        this.setState({
            searchType : searchType
        });
    },
    // 关键词变化
    onKeywordChange(e){
        let keyword = e.target.value;
        this.setState({
            searchKeyword : keyword
        });
    },
    // 搜索
    onSearch(){
        this.setState({
            listType    : 'search'
        }, () => {
            this.loadMessageList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadMessageList(pageNum);
    },
    delMessage(messageId){
        if(window.confirm("确认要删除该留言？")){
            _message.delMessage(messageId).then(res => {
                this.loadMessageList();
            }, err => {
                _mm.errorTips(err.msg);
            });
        }   
            // _message.delMessage(messageId).then(res => {
            //     // 操作成功提示
            //     _mm.successTips(res);
            //     this.loadMessageList();
            // }, err => {
            //     _mm.errorTips(err.msg);
            // });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="留言管理">
                    <div className="page-header-right">
                        
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="messageId">按留言id查询</option>
                                    <option value="userName">按用户名称查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="关键词" onChange={this.onKeywordChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>用户名</th>
                                    <th>留言内容</th>
                                    <th>留言日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((message, index) => {
                                        return (
                                            <tr key={index}>
                                                <td width="5%">{message.id}</td>
                                                <td width="10%">{message.username}</td>
                                                <td width="50%">{message.content}</td>
                                                <td width="20%">{message.createTime}</td>
                                                <td width="15%">
                                                    <Link className="opear btn btn-xl btn-primary" to={ '/message/detail/' + message.id}>查看</Link>
                                                    <button type="btn" className="btn btn-xl btn-primary btn-del" onClick={this.delMessage.bind(this,message.id)}>删除</button>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="4" className="text-center">暂无结果~</td>
                                        </tr>
                                    )
                                }
                                            
                            </tbody>
                        </table>
                    </div>
                    {
                    this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange} 
                        current={this.state.pageNum} 
                        total={this.state.total} 
                        showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
});

export default MessageList;
