
import * as payService from '../services/pay';

export default {
    namespace: 'pay',
    state: {
        payAmt: '',
        payResult: 'fail',
        openId: "",
    },
    reducers: {
        save(state, { payload: { payAmt, payResult, openId } }) {
            return { ...state, payAmt, payResult, openId };
        },
    },
    effects: {
        *pay({ payload: { eid = 1, payAmt, openId} }, { call, put, select }) {
            if (!payAmt || !/(^[1-9]\d*(\.\d{0,2})?$)|(^\d(\.\d{0,2})?$)/.test(payAmt)) {
                alert("请输入正确的金额");
                return;
            }
            payAmt =parseFloat(payAmt) *100;
            const {data} = yield call(payService.prepay, { eid, payAmt, openId });
            let result = 'fail';

            function jsApiCall() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    data.result, //josn串
                    function (res) {
                        WeixinJSBridge.log(res.err_msg);
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                            result = 'success';
                            WeixinJSBridge.call('closeWindow');
                        } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                            result = 'cancel';
                            alert("cancel");
                        } else {
                            result = 'fail';
                            alert("fail");
                        }
                    }
                );
            }
            function jspay(result) {
                wx.chooseWXPay({
                    timestamp: result.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: result.nonceStr, // 支付签名随机串，不长于 32 位
                    package: result.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: result.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: result.paySign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                });
            }

            if (data && data.success) {
                jspay(data.result);
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
                    }
                    else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
                        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
                    }
                } else {
                    jsApiCall();
                }
            }
        },
        *changeAmt({payload}, { call, put }) {
            // return { ...state, current: state.current - 1};   
           // var Reg = /(^[1-9]\d*(\.\d{0,2})?$)|(^\d(\.\d{0,2})?$)|(^\d\.$)|(^[1-9]\d*\.$)/;  Reg.test(payAmt)||
            var payAmt = payload.payAmt;
            if (true) {
                yield put({
                    type: 'save',
                    payload: {
                        payAmt: payAmt//==''?'':parseFloat(payload.payAmt)
                    },
                });

            }

        },
        *saveOpenId({payload}, { put }) {
            // return { ...state, current: state.current - 1};
            console.log("================openId==========" + payload.openId);
            yield put({
                type: 'save',
                payload: {
                    openId: payload.openId
                },
            });
        },
    },
    subscriptions: {

    },
};