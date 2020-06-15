/*
* @Author: luoyi
* @Date:   2017-02-11 18:46:37
* @Last Modified by:   luoyi
* @Last Modified time: 2017-04-09 23:48:17
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import './index.scss';
import MMUtile      from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';

import Notice      from 'service/notice.jsx';

const _mm = new MMUtile();
const _notice  = new Notice();

const Noticetype = React.createClass({
    getInitialState() {
        return {
            parentNoticetypeId    : this.props.params.noticetypeId || 0,
            noticetypeList        : []
        };
    },
    componentDidMount(){
        this.initNoticetype(this.state.parentNoticetypeId);
    },
    componentDidUpdate(prevProps){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId   = this.props.params.noticetypeId || 0;
        if(oldPath !== newPath){
            this.initNoticetype(newId);
        }   
    },
    initNoticetype(noticetypeId){
        // 按父id查询对应的品类
        _notice.getNoticetype(noticetypeId).then(res => {
            this.setState({
                parentNoticetypeId : noticetypeId,
                noticetypeList: res
            });
            $("td,th").addClass("text-center");
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    onUpdateName(noticetypeId, noticetypeName){
        let newName = window.prompt("请输入新的分类名称", noticetypeName); 
        if(newName){
            // 更新
            _notice.updateNoticetypeName({
                noticetypeId : noticetypeId,
                noticetypeName : newName
            }).then(res => {
                _mm.successTips(res);
                this.initNoticetype(this.state.parentNoticetypeId);
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips('请输入正确的分类名称');
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="分类管理">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/notice.noticetype/add">
                            <i className="fa fa-plus fa-fw"></i>
                            <span>添加公告分类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-lg-12">
                        <p>当前公告分类ID：{this.state.parentNoticetypeId}</p>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>公告ID</th>
                                    <th>公告标题</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.noticetypeList.map((noticetype, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{noticetype.id}</td>
                                            <td>
                                                <span>{noticetype.name}</span>
                                            </td>
                                            <td>
                                            <a className="opera" onClick={this.onUpdateName.bind(this, noticetype.id, noticetype.name)}>修改名称</a>
                                            {noticetype.parentId == 0 ? 
                                                <Link to={'/notice.noticetype/index/' + noticetype.id} className="opera">查看其子分类</Link>
                                                : null
                                            }
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

export default Noticetype;
