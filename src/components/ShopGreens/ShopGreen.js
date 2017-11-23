import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import styles from './ShopGreen.css';
import { PAGE_SIZE } from '../../constants';


function ShopGreen({ dispatch, list: dataSource, loading, total, page: current }) {
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/shopGreen',
      query: { page },
    }));
  }

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },{
      title: 'ShopEpayId',
      dataIndex: 'shop_epay_id',
      key: 'shop_epay_id',
    },{
      title: 'ShopCode',
      dataIndex: 'shop_code',
      key: 'shop_code',
    },{
        title: 'ShopName',
        dataIndex: 'shop_name',
        key: 'shop_name',
    },{
        title: 'QrUrl',
        dataIndex: 'qr_url',
        key: 'qr_url',
    },{
      title: 'CreatedAt',
      dataIndex: 'created_at',
      key: 'created_at',
    },{
      title: 'Operation',
      key: 'operation',
      render: (text, History) => (
        <span className={styles.operation}>
          <a onClick={editHandler.bind(null, History.id)}>View</a>
        </span>
      ),
    },
  ];

  const pagination = {
    className : "ant-table-pagination",
    total : total,
    current : current,
    pageSize : PAGE_SIZE,
    onChange : pageChangeHandler,
  };

  return (
    <div className={styles.normal}>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={History => History.id}
          pagination={pagination}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.shopGreen;
  return {
    loading: state.loading.models.shopGreen,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(ShopGreen);
