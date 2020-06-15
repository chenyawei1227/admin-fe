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
import Notice      from 'service/notice.jsx';

const _mm = new MMUtile();
const _notice = new Notice();

import './index.scss';

const NoticeList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'noticeId', // productId / productName
            searchKeyword   : '',
            pageNum         : 1
        };
    },
    componentDidMount(){
       this.loadNoticeList();
    },
    // 加载产品列表
    loadNoticeList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;
            
        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // 按公告id搜索
        if(listType == 'search' && searchType == "noticeId"){
            listParam.noticeId = this.state.searchKeyword;
        }
        // 按发布者搜索
        if(listType == 'search' && searchType == "userName"){
            listParam.userName = this.state.searchKeyword;
        }
        // 按公告标题搜索
        if(listType == 'search' && searchType == "name"){
            listParam.name = this.state.searchKeyword;
        }
        // 按公告内容搜索
        if(listType == 'search' && searchType == "content"){
            listParam.content = this.state.searchKeyword;
        }
        
        // 查询
        _notice.getNoticeList(listParam).then(res => {
            console.log(res)
            this.setState(res);
            $("td,th").addClass("text-center");
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
            this.loadNoticeList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadNoticeList(pageNum);
    },
    setNoticeStatus(noticeId, status){
        let currentStatus   = status,
            newStatus       = currentStatus == 1 ? 2 : 1,
            statusChangeTips= currentStatus == 1 ? '确认要下架该公告？' : '确认要上架该公告？';
        if(window.confirm(statusChangeTips)){
            _notice.setNoticeStatus(productId, newStatus).then(res => {
                // 操作成功提示
                _mm.successTips(res);
                this.loadNoticeList();
            }, err => {
                _mm.errorTips(err.msg);
            });
        }
    },
    delNotice(noticeId){
        if(window.confirm("确认要删除该公告？")){
            _notice.delNotice(noticeId).then(res => {
                this.loadNoticeList();
                alert(res);
            }, err => {
                _mm.errorTips(err.msg);
            });
        }   
    },
    render() {
        
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="公告管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/notice/save"><i className="fa fa-plus fa-fw"></i>新建公告</Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="noticeId">按公告ID查询</option>
                                    <option value="userName">按发布者查询</option>
                                    <option value="name">按标题查询</option>
                                    <option value="content">按内容查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="关键词" onChange={this.onKeywordChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover text-center">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>发布者</th>
                                    <th>标题-内容</th>
                                    <th>更新日期</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((notice, index) => {
                                        return (
                                            <tr key={index}>
                                                <td width="2%">{notice.id}</td>
                                                <td width="8%">{notice.username}</td>
                                                <td width="45%">
                                                    <p>{notice.name}</p>
                                                    <p>{notice.content}</p>
                                                </td>
                                                <td width="20%">{notice.update_time}</td>
                                                <td width="25%">
                                                    <Link className="opear btn btn-xl btn-primary" to={ '/notice/detail/' + notice.id}>查看</Link>
                                                    <Link className="opear btn btn-xl btn-primary" to={ '/notice/save/' + notice.id}>编辑</Link>
                                                    <button type="btn" className="btn btn-xl btn-primary btn-del" onClick={this.delNotice.bind(this,notice.id)}>删除</button>
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

export default NoticeList;
