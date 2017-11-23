import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Pagination, Popover, Button } from 'antd';
import styles from './ShopGreen.css';
import { PAGE_SIZE } from '../../constants';
var QRCode = require('qrcode.react');


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
      title: 'ShopCode',
      dataIndex: 'code',
      key: 'code',
    },{
        title: 'ShopName',
        dataIndex: 'name',
        key: 'name',
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
        <Popover content={<div>{History.qr_url==""?"No Url!":<QRCode value={History.qr_url} />}</div>} placement="right" trigger="hover">
            <Button>QrCode</Button>
        </Popover>
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
