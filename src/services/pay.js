import request from '../utils/request';
import { PAGE_SIZE } from '../constants';
import { backendAddr } from '../utils/config';

export function prepay({ eid = 1, payAmt,openId}) {

    return request('https://staging.p2shop.com.cn/ipay/v3/wx/prepay',
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "e_id": 10001,
                "body": "xiaomiao test",
                "total_fee": payAmt,
                "trade_type": "JSAPI",
                "notify_url": "http://xiao.xinmiao.com",
                "openid": openId
            })
        }
    );
}
