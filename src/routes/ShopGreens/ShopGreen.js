import React from 'react';
import { connect } from 'dva';
import styles from './ShopGreen.css';
import ShopGreenComponent from '../../components/ShopGreens/ShopGreen';
import MainLayout from '../../components/MainLayout/MainLayout';

function ShopGreen({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <ShopGreenComponent />
      </div>
    </MainLayout>
  );
}

export default connect()(ShopGreen);