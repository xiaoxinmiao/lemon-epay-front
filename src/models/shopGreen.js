import * as shopGreenService from '../services/shopGreen';

export default {
  namespace: 'shopGreen',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(shopGreenService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data: data.result.items,
          total: parseInt(data.result.totalCount, 10),
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/shopGreen') {
          dispatch({ type: 'fetch', payload: { query } });
        }
      });
    },
  },
};

