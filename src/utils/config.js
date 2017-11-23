export default {
    name: 'dva-admin',
    prefix: '',
    footerText: 'dva-admin 版权所有 © 2016 由 pmg1989 提供支持',
    logoSrc: 'https://o9u2lnvze.qnssl.com/web/global/brand.png',
    logoText: 'DVA Admin',
    needLogin: true,
  };
  
  export const backendAddr = (() => {
    const env = process.env.REACT_APP_ENV
    switch (env) {
      case 'staging': return {
        default: 'staging.p2shop.cn:50261'
      };
      case 'production': return {
        default: 'https://staging.p2shop.cn/shopgreen'
      };
      default: return {
        default: 'staging.p2shop.cn:50261'
      };
    }
  })();
  