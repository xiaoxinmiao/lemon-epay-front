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
        default: 'https://staging.p2shop.cn/bmapping'
      };
      case 'production': return {
        default: 'https://staging.p2shop.cn/bmapping'
      };
      default: return {
        default: 'https://staging.p2shop.cn/bmapping'
      };
    }
  })();
  