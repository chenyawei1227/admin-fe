/*
* @Author: luoyi
* @Date:   2017-02-28 14:53:59
* @Last Modified by:   luoyi
* @Last Modified time: 2017-04-13 15:33:03
*/


'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import MMUtile      from 'util/mm.jsx';
import User      from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();


const UserDetail = React.createClass({
    getInitialState() {
        return {
            id              : this.props.params.pId,
            username        : '',
            password        : '',
            headImage       : [],
            email           : '',
            phone           : '',
            question        : '',
            answer          : '',
            role            : '',
            createTime      : '',
            updateTime      : ''

        };
    },
    componentDidMount: function(){
        // 初始化一级分类
        //this.loadUserRole();
        // 初始化产品
        this.loadUser();
    },

    // 编辑的时候，需要初始化用户信息
    loadUser(){
        // 有id参数时，读取用户信息
        if(this.state.id){
            // 查询一级品类时，不传id
            _user.getUser(this.state.id).then(res => {
                let user = this.userAdapter(res)
                this.setState(user);
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
    },
    //获取用户信息
    loadUserInfo(){
        _user.checkLogin().then(res =>{
            this.setState({
                userInfoList:res
            });
        },err =>{
            alert(err.msg || "获取用户信息失败");
        });    
    },
    // 适配接口返回的数据
    userAdapter(user){
        return {
            userId          : user.id,
            username        : user.username,
            password        : user.password,
            headImage       : user.headImage.split(','),
            email           : user.email,
            phone           : user.phone,
            question        : user.question,
            answer          : user.answer,
            role            : user.role,
            createTime      : user.createTime,
            updateTime      : user.updateTime
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="用户详情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="userId" className="col-md-2 control-label">用户ID：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.userId}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">用户头像：</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.headImage.length ? this.state.headImage.map((image, index) => {
                                            return (
                                                <div className="sub-img" key={index}>
                                                    <img className="img-circle img-thumbnail" src={_mm.getImageUrl(image)}/>
                                                </div>
                                            );
                                        }) : <div className="notice">没有图片</div>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="col-md-2 control-label">用户名：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.username}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-md-2 control-label">密 码：</label>
                                <div className="col-md-2">
                                    <div className="input-group">
                                        <input type="password" className="form-control" id="password" value={this.state.password || ''} readOnly/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">用户权限：</label>
                                <div className="col-md-10">
                                    <select type="password" className="form-control cate-select col-md-2" value={this.state.role} readOnly>
                                        <option value={this.state.role || ''}>权限值：{this.state.role}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="role" className="col-md-2 control-label">用户角色：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.role == 1 ? '管理员' : '普通用户'}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-md-2 control-label">邮 箱：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.email}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="col-md-2 control-label">手 机：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.phone}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question" className="col-md-2 control-label">密保问题：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.question}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="answer" className="col-md-2 control-label">密保答案：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.answer}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="createTime" className="col-md-2 control-label">创建日期：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="updateTime" className="col-md-2 control-label">更新日期：</label>
                                <div className="col-md-2">
                                    <p type="text" className="form-control-static">{this.state.updateTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default UserDetail;