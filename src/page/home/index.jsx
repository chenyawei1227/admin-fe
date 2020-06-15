/*
* @Author: luoyi
* @Date:   2020-04-06 12:39:33
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-06-15 09:46:33
*/
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import PageTitle    from 'component/page-title/index.jsx';
import { Link }     from 'react-router';
import MMUtile      from 'util/mm.jsx';
import Home         from 'service/home.jsx';
import './index.scss';
const _mm = new MMUtile();
const _home = new Home();

const HomePage = React.createClass({
    getInitialState() {
        return {
            hello: 'Welcome to SMALL Mamagement System.'
        };
    },
    componentDidMount: function(){
       console.log('Home did mount');
       this.loadHomeCount();
       $('span.label-info').click(function() {

         var news=$('input[type=text][id="vuln<?php echo $model->v_id;?>"]').val()+','+$(this).text();
         $('input[type=text][id="vuln<?php echo $model->v_id;?>"]').val(news);
        return false;
        });
    },

    onProductClick(e){window.location.href = this.state.redirect || '#/product';},
    onUserClick(e){window.location.href = this.state.redirect || '#/user';},
    onMessageClick(e){window.location.href = this.state.redirect || '#/message';},
    onOrderClick(e){window.location.href = this.state.redirect || '#/order';},
    onNoticeClick(e){window.location.href = this.state.redirect || '#/notice';},
    loadHomeCount : function(){
        _home.getHomeCount().then(res => {
            let countMap = this.homeCountAdapter(res) 
            this.setState(countMap);
            $('.block-wrap .product-item').text("商品："+res.productNum || 0);
            $('.block-wrap .user-item').text("用户："+res.userNum || 0);
            $('.block-wrap .message-item').text("留言："+res.messageNum || 0);
            $('.block-wrap .order-item').text("订单："+res.orderNum || 0);
            $('.block-wrap .notice-item').text("公告："+res.noticeNum || 0);
        }, err => {
            // alert(err.msg || '哪里不对了~');
            $('.block-wrap .product-item').text(0);
            $('.block-wrap .user-item').text(0);
            $('.block-wrap .message-item').text(0);
            $('.block-wrap .order-item').text(0);
            $('.block-wrap .notice-item').text(0);
        });
    },

    // 适配接口返回的数据
    homeCountAdapter(countMap){
        return {
            productNum        : countMap.productNum,
            userNum           : countMap.userNum,
            messageNum        : countMap.messageNum,
            orderNum          : countMap.orderNum,
            noticeNum         : countMap.noticeNum
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Home"/>
                <div className="row">
                    <div className="col-lg-5 col-md-6">
                        Welcome to MMALL Mamagement System.
                    </div>
                </div>
                <div className="block-wrap">
                    <div className="pull-left" onClick={this.onProductClick}>
                            <span className="product-item" onClick={this.onProductClick}></span>
                    </div>
                    <div className="pull-left" onClick={this.onUserClick}>
                            <span className="user-item" onClick={this.onUserClick}></span>
                    </div>
                    <div className="pull-left" onClick={this.onMessageClick}>
                            <span className="message-item" onClick={this.onMessageClick}></span>
                    </div>
                    <div className="pull-left" onClick={this.onOrderClick}>
                            <span className="order-item" onClick={this.onOrderClick}></span>
                    </div>
                    <div className="pull-left" onClick={this.onNoticeClick}>
                            <span className="notice-item" onClick={this.onNoticeClick}></span>
                    </div>
                </div>
                
            </div>
        );
    }
});

export default HomePage;
