/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-06-15 09:39:37
*/

'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Notice{
    
    // 获取留言信息
    getNotice(noticeId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/notice/detail.do'),
            data    : {
                noticeId : noticeId || 0
            }
        });
    }


    saveNotice(notice){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/notice/save.do'),
            data    : notice
        });
    }

    delNotice(noticeId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/notice/delete_notice.do'),
            data    : {
                noticeId   : noticeId
            }
        });
    }
    // 获取商品信息
    getNoticeList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/notice/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/notice/search.do'),
                data    : listParam
            });
        }
            
    }
    // 改变公告状态
    setNoticeStatus(noticeId, status){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/notice/set_notice_status.do'),
            data    : {
                noticeId   : noticeId,
                status      : status
            }
        });
    }
    // 获取品类
    getNoticetype(parentNoticetypeId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/noticetype/get_noticetype.do'),
            data    : {
                noticetypeId : parentNoticetypeId || 0
            }
        });
    }
    // 新增品类
    saveNoticetype(noticetype){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/noticetype/add_noticetype.do'),
            data    : {
                parentId        : noticetype.parentId    || 0,
                noticetypeName    : noticetype.noticetypeName  || ''
            }
        });
    }
    // 更新品类名称
    updateNoticetypeName(noticetype){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/noticetype/set_noticetype_name.do'),
            data    : noticetype
        });
    }
}
