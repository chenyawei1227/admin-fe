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
import User      from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();

import './index.scss';

const UserList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'userId', // productId / productName
            searchKeyword   : '',
            pageNum         : 1
        };
    },
    componentDidMount(){
       this.loadUserList();
    },
    // 加载产品列表
    loadUserList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;
            
        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // 按搜索
        if(listType == 'search' && searchType == "userName"){
            listParam.userName = this.state.searchKeyword;
        }
        // 按搜索
        if(listType == 'search' && searchType == "email"){
            listParam.email = this.state.searchKeyword;
        }
        // 按搜索
        if(listType == 'search' && searchType == "phone"){
            listParam.phone = this.state.searchKeyword;
        }
        // 按搜索
        if(listType == 'search' && searchType == "userId"){
            listParam.userId = this.state.searchKeyword;
        }
        // 查询
        _user.getUserList(listParam).then(res => {
            console.log(res)
            this.setState(res);
            $("td,th").addClass("text-center");
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    delUser(userId){
        if(window.confirm("确认要删除该用户？")){
            _user.delUser(userId).then(res => {
                this.loadUserList();
                alert(res);
            }, err => {
                _mm.errorTips(err.msg);
            });
        }   
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
            this.loadUserList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadUserList(pageNum);
    },
    setUserRole(userId, role){
        let currentRole   = role,
            newRole       = currentRole == 1 ? 0 : 1,
            RoleChangeTips= currentRole == 1 ? '确认改为普通用户？' : '确认改为管理员？';
        if(window.confirm(RoleChangeTips)){
            _user.setUserRole(userId, newRole).then(res => {
                // 操作成功提示
                _mm.successTips(res);
                this.loadUserList();
            }, err => {
                _mm.errorTips(err.msg);
            });
        }
    },
    render() {
        
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="用户管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/user/save"><i className="fa fa-plus fa-fw"></i>添加用户</Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="userId">按用户id查询</option>
                                    <option value="userName">按用户名称查询</option>
                                    <option value="email">按邮箱查询</option>
                                    <option value="phone">按手机号查询</option>
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
                                    <th>手机</th>
                                    <th>邮箱</th>
                                    <th>用户权限</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <span>{user.role == 1 ? '当前为管理员' : '当前为普通用户'}</span>
                                                    <a className="btn btn-xs btn-warning opear" 
                                                        data-status={user.role} 
                                                        onClick={this.setUserRole.bind(this, user.id, user.role)}>{user.role == 1 ? '设为普通用户' : '设为管理员'}</a>
                                                </td>
                                                <td>
                                                    <Link className="opear btn btn-xl btn-primary" to={ '/user/detail/' + user.id}>查看</Link>
                                                    <Link className="opear btn btn-xl btn-primary"  to={ '/user/save/' + user.id}>编辑</Link>
                                                    <button type="btn" className="btn btn-xl btn-primary btn-del" onClick={this.delUser.bind(this,user.id)}>删除</button>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="5" className="text-center">暂无结果~</td>
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

export default UserList;
