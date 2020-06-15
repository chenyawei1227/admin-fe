/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
* @Last Modified by:   Luoyi
* @Last Modified time: 2017-04-09 23:43:37
*/

'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Home{
    
    // 获取留言信息
    getMessageInfo(messageId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/message/detail.do'),
            data    : {
                messageId : messageId || 0
            }
        });
    }

    getHomeCount(countMap){
        // _smc.request({
        //     url     : _smc.getServerUrl('/cart/get_cart_product_count.do'),
        //     method  : 'POST',
        //     success : resolve,
        //     error   : reject
        // });
        return _mm.request({
            url     : _mm.getServerUrl('/manage/user/get_home_count.do'),
            data    : countMap
            // data    : {
            //     productNum      : productNum    || 0,
            //     userNum         : userNum       || 0,
            //     messageNum      : messageNum    || 0,
            //     orderNum        : productNum    || 0,
            //     noticeNum       : noticeNum     || 0
            // }
        });
    }
    
}
