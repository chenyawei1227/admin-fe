/*
* @Author: luoyi
* @Date:   2017-02-13 10:22:06
* @Last Modified by:   luoyi
* @Last Modified time: 2017-04-13 15:36:53
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import FileUploader from 'component/file-uploader/index.jsx';
import RichEditor   from 'component/rich-editor/index.jsx';

import MMUtile from 'util/mm.jsx';
import Notice      from 'service/notice.jsx';
import User      from 'service/user.jsx';

const _mm = new MMUtile();
const _notice = new Notice();
const _user = new User();

import './save.scss';

const NoticeSave = React.createClass({
    getInitialState() {
        return {
            id                  : this.props.params.pId,
            firstNoticetypeList   : [],
            firstNoticetypeId     : '',
            secondNoticetypeList  : [],
            secondNoticetypeId    : '',
            username              : '',
            user_id              : '',
            name                : '',
            subtitle            : '',
            subImages           : [],
            content              : '',
            status              : ''

        };
    },
    componentDidMount: function(){
        this.loadFirstNoticetype();
        // 初始化产品
        this.loadNotice();
        this.loadUserInfo();
    },
        // 加载一级分类
    loadFirstNoticetype(){
        // 查询一级品类时，不传id
        _notice.getNoticetype().then(res => {
            this.setState({
                firstNoticetypeList: res
            });
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
                secondNoticetypeList: res
            });
        }, err => {
            alert(err.msg || '哪里不对了~');
        });
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
    loadNotice(){
        // 有id参数时，读取商品信息
        if(this.state.id){
            // 查询一级品类时，不传id
            _notice.getNotice(this.state.id).then(res => {
                let notice = this.noticeAdapter(res)
                this.setState(notice);
                if(notice.firstNoticetypeId){
                    this.loadSecondNoticetype();
                }
                this.refs['rich-editor'].setValue(notice.content);
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
    },
    // 适配接口返回的数据
    noticeAdapter(notice){
        let firstNoticetypeId     = notice.parentNoticetypeId === 0 ? notice.noticetype_id : notice.parentNoticetypeId,
            secondNoticetypeId    = notice.parentNoticetypeId === 0 ? '' : notice.noticetype_id;
        return {
            user_id             : notice.user_id,
            username            : notice.username,
            noticetypeId        : notice.noticetype_id,
            name                : notice.name,
            subtitle            : notice.subtitle,
            subImages           : notice.subImages.split(','),
            content             : notice.content,
            firstNoticetypeId   : firstNoticetypeId,
            secondNoticetypeId  : secondNoticetypeId,
            status              : notice.status
        }
        
        // alert(notice.user_id +" " +notice.username);
    },
    // 普通字段更新
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        // 更改state
        this.setState({
            [name] : e.target.value
        });
    },
    // 富文本字段更新
    onRichValueChange(newValue){
        this.setState({
            content: newValue
        });
    },
    //一级品类变化
    onFirstNoticetypeChange(e){
        let newValue    = e.target.value || 0;
        // 更新一级选中值，并清除二级选中值
        this.setState({
            firstNoticetypeId     : newValue,
            secondNoticetypeId    : 0,
            secondNoticetypeList  : []
        }, () => {
            // 更新二级品类列表
            this.loadSecondNoticetype();
        });
    },
    onSecondNoticetypeChange(e){
        let newValue    = e.target.value;
        // 更新二级选中值
        this.setState({
            secondNoticetypeId    : newValue
        });
    },
    // 图片上传成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res.data.uri);
        this.setState({
            subImages: subImages
        });
        // alert(subImages);
    },
    // 图片上传失败
    onUploadError(err){
        alert(err.message || '哪里不对了~');
    },
    // 删除图片
    onDeleteImage(img){
        let subImages   = this.state.subImages,
            imageIndex  = subImages.indexOf(img);
        if(imageIndex >= 0){
            subImages.splice(imageIndex, 1);
        }
        this.setState({
            subImages: subImages
        });
    },
    // 验证要提交的产品信息是否符合规范
    checkNotice(notice){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!notice.name){
            result = {
                status  : false,
                msg     : '请输入标题'
            }
        }
        if(!notice.subtitle){
            result = {
                status  : false,
                msg     : '请输入公告描述'
            }
        }
        if(!notice.content){
            result = {
                status  : false,
                msg     : '请输入公告内容'
            }
        }
        return result;
    },
    // 提交表单
    onSubmit(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let notice = {
                noticetypeId        : this.state.secondNoticetypeId || this.state.firstNoticetypeId || 0,
                user_id             : this.state.user_id,
                username            : this.state.username,
                name                : this.state.name,
                subtitle            : this.state.subtitle,
                subImages           : this.state.subImages.join(','),
                content             : this.state.content,
                status              : this.state.status || 1 // 状态为正常
            },

            checkNotice = this.checkNotice(notice);
            //alert(notice.user_id);
        // 当为编辑时，添加id字段
        if(this.state.id){
            notice.id = this.state.id;
            notice.user_id = this.state.user_id;
            notice.username = this.state.username;
        }
        // 验证通过后，提交信息
        if(checkNotice.status){
            // 保存notice
            _notice.saveNotice(notice).then(res => {
                alert(res);
                // alert();
                window.location.href = '#/notice/index';
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }else{
            alert(checkNotice.msg);
        }
        return false;
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle={'公告管理 -- ' + (this.state.id ? '修改公告' : '添加公告')}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                        <div className="form-group">
                                <label htmlFor="user_id" className="col-md-2 control-label">管理员ID</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="user_id"
                                        id="user_id"
                                        readOnly
                                        value={this.state.user_id}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="col-md-2 control-label">用户名</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        readOnly
                                        value={this.state.username}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">公告标题</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="name"
                                        id="name"
                                        placeholder="请输入公告标题"
                                        value={this.state.name}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">公告描述</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="subtitle"
                                        id="subtitle"
                                        placeholder="请输入公告描述"
                                        value={this.state.subtitle}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">所属分类</label>
                                <div className="col-md-10">
                                    <select type="password" className="form-control cate-select col-md-5" value={this.state.firstNoticetypeId} onChange={this.onFirstNoticetypeChange}>
                                        <option value="">请选择一级分类</option>
                                        {
                                            this.state.firstNoticetypeList.map((noticetype, index) => {
                                                return (
                                                    <option value={noticetype.id} key={index}>{noticetype.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                    {this.state.secondNoticetypeList.length ?  
                                        <select type="password" className="form-control cate-select col-md-5" value={this.state.secondNoticetypeId} onChange={this.onSecondNoticetypeChange}>
                                            <option value="">请选择二级分类</option>
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
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">图片</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.subImages.length ? this.state.subImages.map((image, index) => {
                                            return (
                                                <div className="sub-img" key={index}>
                                                    <img className="img" src={_mm.getImageUrl(image)}/>
                                                    <i className="fa fa-close fa-fw" onClick={this.onDeleteImage.bind(this, image)}></i>
                                                </div>
                                            );
                                        }) : <div className="notice">请上传图片</div>
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10">
                                    <FileUploader onSuccess={this.onUploadSuccess} onError={this.onUploadError}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">公告内容：</label>
                                <div className="col-md-10">
                                    <RichEditor ref="rich-editor" value={this.state.content} onValueChange={this.onRichValueChange} placeholder="公告详细信息"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="btn" className="btn btn-xl btn-primary" onClick={this.onSubmit}>提交</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default NoticeSave;