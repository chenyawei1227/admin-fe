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
import Notice      from 'service/notice.jsx';

const _mm = new MMUtile();
const _notice = new Notice();


const NoticeDetail = React.createClass({
    getInitialState() {
        return {
            id                  : this.props.params.pId,
            firstNoticetypeList   : [],
            firstNoticetypeId     : '',
            secondNoticetypeList  : [],
            secondNoticetypeId    : '',
            user_id               :'',
            username            : '',
            name                : '',
            subtitle            : '',
            subImages           : [],
            status              : '',
            content             : ''

        };
    },
    componentDidMount: function(){
        this.loadFirstNoticetype();
        // 初始化产品
        this.loadNotice();
    },
    // 加载一级分类
    loadFirstNoticetype(){
        // 查询一级品类时，不传id
        _notice.getNoticetype().then(res => {
            this.setState({
                firstNoticetypeList : res
            });
            //alert(this.state.noticetype_id);
        }, err => {
            alert(err.msg || '哪里不对了~');
        });
    },
    // 加载二级分类
    loadSecondNoticetype(){
        // 一级品类不存在时，不初始化二级分类
        if(!this.state.firstNoticetypeId){
            return;
        }
        // 查询一级品类时，不传id
        _notice.getNoticetype(this.state.firstNoticetypeId).then(res => {
            this.setState({
                secondNoticetypeList  : res,
                secondNoticetypeId    : this.state.secondNoticetypeId
            });
            //alert(this.state.secondNoticetypeId);
        }, err => {
            alert(err.msg || '哪里不对了~');
        });
    },
    // 编辑的时候，需要初始化商品信息
    loadNotice(){
        // 有id参数时，读取商品信息
        if(this.state.id){
            // 查询一级品类时，不传id
            _notice.getNotice(this.state.id).then(res => {
                let notice = this.noticeAdapter(res) 
                this.setState(notice);
                // 有二级分类时，load二级列表
                if(notice.firstNoticetypeId){
                    this.loadSecondNoticetype();
                }
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
    },
    //获取用户信息
    // loadUserInfo(){
    //     _user.checkLogin().then(res =>{
    //         this.setState({
    //             userInfoList:res
    //         });
    //     },err =>{
    //         alert(err.msg || "获取用户信息失败");
    //     });    
    // },
    // 适配接口返回的数据
    noticeAdapter(notice){
        let firstNoticetypeId     = notice.parentNoticetypeId === 0 ? notice.noticetype_id : notice.parentNoticetypeId,
            secondNoticetypeId    = notice.parentNoticetypeId === 0 ? '' : notice.noticetype_id;
        return {
            noticetypeId        : notice.noticetype_id,
            noticeId            : notice.id,
            user_id              : notice.user_id,
            firstNoticetypeId   : firstNoticetypeId,
            secondNoticetypeId  : secondNoticetypeId,
            name                : notice.name,
            subtitle            : notice.subtitle,
            subImages           : notice.subImages.split(','),
            username            : notice.username,
            createTime          : notice.createTime,
            updateTime          : notice.updateTime,
            content             : notice.content
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="公告详情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="noticeId" className="col-md-2 control-label">公告ID：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.noticeId}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="col-md-2 control-label">发布人信息：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">用户标识：{this.state.user_id} 用户名：{this.state.username}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">公告标题：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.name}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-10">
                                    <select type="password" className="form-control cate-select col-md-5" value={this.state.firstNoticetypeId} readOnly>
                                        <option value="">请选择一级品类</option>
                                        {
                                            this.state.firstNoticetypeList.map((noticetype, index) => {
                                                return (
                                                    <option value={noticetype.id} key={index}>{noticetype.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    {this.state.secondNoticetypeList.length ?  
                                        <select type="password" className="form-control cate-select col-md-5" value={this.state.secondNoticetypeId} readOnly>
                                            <option value="">请选择二级品类</option>
                                            {
                                                this.state.secondNoticetypeList.map((noticetype, index) => {
                                                    return (
                                                        <option value={noticetype.id} key={index}>{noticetype.name}</option>
                                                    );
                                                })
                                            }
                                        </select> : null
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">公告描述：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.subtitle}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">创建日期：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.createTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">更新日期：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.updateTime}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">公告内容：</label>
                                <div className="col-md-10" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default NoticeDetail;