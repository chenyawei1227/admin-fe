/*
* @Author: luoyi
* @Date:   2017-02-15 20:34:22
* @Last Modified by:   luoyi
* @Last Modified time: 2017-04-04 19:46:28
*/
'use strict';

import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';

import Notice      from 'service/notice.jsx'

const _notice = new Notice();

const NoticetypeAdd = React.createClass({
    getInitialState() {
        return {
            pageName        : '所属类别',
            parentId        : 0,  // 所属品类
            noticetypeName    : '', // 品类名称
            noticetypeList    : []  // 品类集合
        };
    },
    componentDidMount: function(){
        // 查询一级品类时，不传id
        _notice.getNoticetype().then(res => {
            this.setState({
                noticetypeList: res
            });
        }, errMsg => {
            alert(errMsg);
        });
    },
    onValueChange(e){
        let name   = e.target.name;
        this.setState({
            [name] : e.target.value
        });
    },
    onSubmit(e){
        e.preventDefault();
        if(!this.state.noticetypeName){
            alert('请输入分类名称');
            return;
        }
        // 请求接口
        _notice.saveNoticetype({
            parentId      : this.state.parentId,
            noticetypeName    : this.state.noticetypeName
        }).then(res => {
            alert('公告类别添加成功');
            window.location.href='#/notice.noticetype/index';
        }, errMsg => {
            alert(errMsg);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="公告分类管理 -- 添加分类"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <form className="form-horizontal" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="col-md-2 control-label">{this.state.pageName}</label>
                                <div className="col-md-10">
                                    <select className="form-control cate-select" name="parentId" onChange={this.onValueChange}>
                                        <option value="0">/所有</option>
                                        {
                                            this.state.noticetypeList.map(function(noticetype, index) {
                                                return (
                                                    <option value={noticetype.id} key={index}>/所有/{noticetype.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="noticetype-name" className="col-md-2 control-label">品类名称</label>
                                <div className="col-md-3">
                                    <input type="text" 
                                        className="form-control" 
                                        id="noticetype-name" 
                                        name="noticetypeName"
                                        autoComplete="off"
                                        placeholder="请输入品类名称"
                                        onChange={this.onValueChange}/>
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="submit" className="btn btn-xl btn-primary">提交</button></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

export default NoticetypeAdd;