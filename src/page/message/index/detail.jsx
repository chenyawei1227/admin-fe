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
import Message      from 'service/message.jsx';

const _mm = new MMUtile();
const _message = new Message();


const MessageDetail = React.createClass({
    getInitialState() {
        return {
            id                  : this.props.params.pId,
            username                : '',
            content              : ''

        };
    },
    componentDidMount: function(){
        this.loadMessage();
    },
    loadMessage(){
        if(this.state.id){
            _message.getMessageInfo(this.state.id).then(res => {
                let message = this.messageAdapter(res) 
                this.setState(message);
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }
    },

    // 适配接口返回的数据
    messageAdapter(message){
        return {
            messageId          : message.id,
            username           : message.username,
            content            : message.content,
            createTime         : message.createTime
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="留言详情"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">留言ID：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.messageId}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">用户名：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.username}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">留言内容：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.content}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputEmail3" className="col-md-2 control-label">留言日期：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.createTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default MessageDetail;