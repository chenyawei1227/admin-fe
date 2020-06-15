/*
* @Author: Rosen
* @Date:   2017-02-24 15:49:17
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-06-14 16:36:35
*/

'use strict';

import MMUtil from 'util/mm.jsx';

const mm = new MMUtil();

export default class User{
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    saveUser(user){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/save.do'),
            data    : user
        });
    }
    delUser(userId){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/delete_user.do'),
            data    : {
                userId   : userId
            }
        });
    }
    // 获取用户列表
    getUserList(listParam){
        if(listParam.listType == 'list'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/search.do'),
                data    : listParam
            });
        }  
    }
    // 获取用户权限
    getUserRole(userId){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/get_user_role.do'),
            data    : {
                userId : userId || ''
            }
        });
    }
   // 设置用户权限
    setUserRole(userId, role){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/set_user_role.do'),
            data    : {
                userId   : userId,
                role      : role
            }
        });
    }
    getUser(userId){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/detail.do'),
            data    : {
                userId : userId || 0
            }
        });
    }
    //检查登录状态
    checkLogin(userid,username){
        return mm.request({
            url     : mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            data    : {
                userid : userid || '',
                username : username || ''
            }
        });
    }
    // 登录
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 退出登录
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/loginOut.do'),
            method  : 'POST',
        });
    }
}