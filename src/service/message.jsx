/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
* @Last Modified by:   Luoyi
* @Last Modified time: 2017-04-09 23:43:37
*/

'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Message{
    
    // 获取留言信息
    getMessageInfo(messageId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/message/detail.do'),
            data    : {
                messageId : messageId || 0
            }
        });
    }

    delMessage(messageId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/message/delete_msg.do'),
            data    : {
                messageId   : messageId
            }
        });
    }
    // 获取留言信息
    getMessageList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/message/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/message/search.do'),
                data    : listParam
            });
        }
            
    }
    
}
