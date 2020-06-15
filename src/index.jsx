
'use strict';
// react
import React from 'react';
// react-dom
import { render } from 'react-dom';
// react-router
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';
// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
// bootstrap sb-admin-2 主题
import 'node_modules/sb-admin-2/dist/css/sb-admin-2.min.css';
// font-awesome 字体
import 'node_modules/font-awesome/css/font-awesome.min.css';

// 页面
import Layout               from 'page/layout/index.jsx';
import Home                 from 'page/home/index.jsx';

import ProductList          from 'page/product/index/index.jsx';
import ProductSave          from 'page/product/index/save.jsx';
import ProductDetail        from 'page/product/index/detail.jsx';
import ProductCategory      from 'page/product/category/index.jsx';
import ProductCategoryAdd   from 'page/product/category/add.jsx';

import UserList          from 'page/user/index/index.jsx';
import UserSave          from 'page/user/index/save.jsx';
import UserDetail        from 'page/user/index/detail.jsx';

import MessageList          from 'page/message/index/index.jsx';
import MessageDetail        from 'page/message/index/detail.jsx';

import NoticeList          from 'page/notice/index/index.jsx';
import NoticeSave          from 'page/notice/index/save.jsx';
import NoticeDetail        from 'page/notice/index/detail.jsx';
import NoticeNoticetype           from 'page/notice/noticetype/index.jsx';
import NoticeNoticetypeAdd        from 'page/notice/noticetype/add.jsx';

import OrderList            from 'page/order/index.jsx';
import OrderDetail          from 'page/order/detail.jsx';
import Login                from 'page/login/index.jsx';
import ErrorPage            from 'page/error/index.jsx';
import BlankPage            from 'page/blank/index.jsx';

// render router
render(
    <Router history={hashHistory}>
        <Route path="/">
            {/* home */} 
            <IndexRedirect to="home" />
            <Route path="home" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Home}/>
            </Route>

            {/* product */} 
            <Route path="product" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={ProductList}/>
                <Route path="save(/:pId)" component={ProductSave}/>
                <Route path="detail/:pId" component={ProductDetail}/>
            </Route>
            <Route path="product.category" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index(/:categoryId)" component={ProductCategory}/>
                <Route path="add" component={ProductCategoryAdd}/>
            </Route>
            
            {/* user */} 
            <Route path="user" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={UserList}/>
                <Route path="save(/:pId)" component={UserSave}/>
                <Route path="detail/:pId" component={UserDetail}/>
            </Route>

            {/* message */} 
            <Route path="message" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={MessageList}/>
                <Route path="detail/:pId" component={MessageDetail}/>
            </Route>

            {/* notice */} 
            <Route path="notice" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={NoticeList}/>
                <Route path="save(/:pId)" component={NoticeSave}/>
                <Route path="detail/:pId" component={NoticeDetail}/>
            </Route>
            <Route path="notice.noticetype" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index(/:noticetypeId)" component={NoticeNoticetype}/>
                <Route path="add" component={NoticeNoticetypeAdd}/>
            </Route>

            {/* order */} 
            <Route path="order" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={OrderList}/>
                <Route path="detail/:orderNumber" component={OrderDetail}/>
            </Route>

            {/* without layout */} 
            <Route path="login" component={Login}/>
            <Route path="blank" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={BlankPage}/>
            </Route>
            <Route path="*" component={ErrorPage}/>
        </Route>
        
    </Router>, 
    document.getElementById('app')
);
