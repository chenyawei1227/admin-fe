
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';
import PageTitle    from 'component/page-title/index.jsx';
import FileUploader from 'component/file-uploader/index.jsx';
import RichEditor   from 'component/rich-editor/index.jsx';
import MMUtile      from 'util/mm.jsx';
import User         from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();

import './save.scss';

const UserSave = React.createClass({
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
    // 适配接口返回的数据
    userAdapter(user){
        return {
            userId              : user.id,
            username            : user.username,
            // password            : user.password,
            email               : user.email,
            headImage           : user.headImage.split(','),
            phone               : user.phone,
            question            : user.question,
            answer              : user.answer,
            role                : user.role,
            createTime          : user.createTime,
            updateTime          : user.updateTime
        }
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
            detail: newValue
        });
    },
    // 权限值变化
    onRoleChange(e){
        let newValue    = e.target.value || 0;
        this.setState({
            role: newValue
        });
    },
    // 图片上传成功
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res.data.uri);
        this.setState({
            subImages: subImages
        });
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
    checkUser(user){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!user.username){
            result = {
                status  : false,
                msg     : '请输入用户名'
            }
        }
        // if(!user.password){
        //     result = {
        //         status  : false,
        //         msg     : '请输入用户密码'
        //     }
        // }
        if(!user.email){
            result = {
                status  : false,
                msg     : '请输入邮箱'
            }
        }
        if(!user.phone){
            result = {
                status  : false,
                msg     : '请输入手机号'
            }
        }
        if(!user.question){
            result = {
                status  : false,
                msg     : '请输入密保问题'
            }
        }
        if(!user.answer){
            result = {
                status  : false,
                msg     : '请输入密保答案'
            }
        }
        return result;
    },
    // 提交表单
    onSubmit(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let user = {
                userId              : this.state.id,
                username            : this.state.username,
                password            : this.state.password,
                headImage           : this.state.headImage.join(','),
                email               : this.state.email,
                phone               : this.state.phone,
                question            : this.state.question,
                answer              : this.state.answer,
                role                : this.state.role,
                status              : this.state.status || 1 
            },
            checkUser = this.checkUser(user);
        // 当为编辑时，添加id字段
        if(this.state.id){
            user.id = this.state.id;
        }
        // 验证通过后，提交用户信息
        if(checkUser.status){
            // if(this.state.password == ""){
            //     user.password = null;
            //     alert(user.password+"不带密码更新");
            //      _user.saveUser(user).then(res => {
            //         alert(res);
            //         window.location.href = '#/user/index';
            //     }, err => {
            //         alert(err.msg || '哪里不对了~');
            //     });
            // }else{
            //     //更新用户
            //     _user.saveUser(user).then(res => {
            //         alert(res);
            //         window.location.href = '#/user/index';
            //     }, err => {
            //         alert(err.msg || '哪里不对了~');
            //     });
            // }
            //更新用户
            _user.saveUser(user).then(res => {
                alert(res);
                window.location.href = '#/user/index';
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }else{
            alert(checkUser.msg);
        }
        return false;
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle={'用户管理 -- ' + (this.state.id ? '修改用户信息' : '添加用户')}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="userId" className="col-md-2 control-label">用户ID：</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="userId"
                                        id="userId"
                                        value={this.state.id} readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username" className="col-md-2 control-label">用户名：</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="username"
                                        id="username"
                                        placeholder="请输入用户名"
                                        value={this.state.username}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-md-2 control-label">用户密码：</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        placeholder="留空则表示不更新密码"
                                        value={this.state.password}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-md-2 control-label">邮箱：</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        placeholder="请输入邮箱"
                                        value={this.state.email}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone" className="col-md-2 control-label">手机号：</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="phone"
                                        id="phone"
                                        placeholder="请输入手机号"
                                        value={this.state.phone}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="question" className="col-md-2 control-label">密保问题：</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="question"
                                        id="question"
                                        placeholder="请输入密保问题"
                                        value={this.state.question}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="answer" className="col-md-2 control-label">密保答案：</label>
                                <div className="col-md-5">
                                    <input type="text"
                                        className="form-control"
                                        name="answer"
                                        id="answer"
                                        placeholder="请输入密保答案"
                                        value={this.state.answer}
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="" className="col-md-2 control-label">权限设置</label>
                                <div className="col-md-10">
                                    <select type="password" className="form-control cate-select col-md-5" value={this.state.role} onChange={this.onRoleChange}>
                                        <option value="">-- 请选择用户权限 --</option>
                                        <option value="0">普通用户 ---> 0</option>
                                        <option value="1"> &nbsp;管 理 员 &nbsp;--->1</option>
                                        <option value="2">冻结用户 ---> 2</option>
                                    </select>
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

export default UserSave;