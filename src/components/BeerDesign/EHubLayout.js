import React, { Component } from 'react';
import { Layout, Menu, Icon, Badge, Avatar, Dropdown, Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import styles from './EHubLayout.css';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="#">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="#">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            <a href="#">3d menu item</a>
        </Menu.Item>
    </Menu>
);
const language = (
    <Menu>
        <Menu.Item key="0">
            <a href="#">Chinese</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="#">English</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">Korean</Menu.Item>
    </Menu>
);

const logoStyle = {
    height: '32px',
    margin: '16px',
    borderRadius: '6px',
    background: '#333',
    color: '#919191',
    fontSize: '1.375em',
    lineHeight: '32px',
    textAlign: 'center'
};

const collapsedLogoStyle = {
    ...logoStyle,
    fontSize: '0',
};

class EHubLayout extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        this.setState({ collapsed: collapsed });
    };

    render() {
        return (
            <Layout>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}>
                    <div style={this.state.collapsed ? collapsedLogoStyle : logoStyle}>
                        eHub
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={[this.props.menu.selectedKey]} mode="inline">
                        {this.props.menu.items.map(function(item, idx){
                            return <Menu.Item key={item.key}>
                                        <Link to={item.link}>
                                            <Icon type={item.iconType} />
                                            <span>{item.name}</span>
                                        </Link>
                                    </Menu.Item>
                        }, this)}
                    </Menu>
                </Sider>
                <Layout>
                    {/* Header Start */}
                    <Header className={styles['user-information-domain']}>
                        {/* Add Component Start: User information domain */}
                        <div className={styles.box1}>
                           <span className={styles.guide}>
                               <a href="#">
                                   <Icon type="question-circle-o" /> Guide
                               </a>
                           </span>
                            <span className={styles['user-profile']}>
                                <Badge count={1}><Avatar shape="circle" icon="user" /></Badge>
                            </span>
                            <span className={styles['user-name']}>
                            <Dropdown overlay={menu} trigger={['click']}>
                             <a className={styles['ant-dropdown-link']} href="#">
                              Xiao-huwa <Icon type="down" />
                             </a>
                            </Dropdown>
                           </span>
                            <span className={styles['user-login']}>
                            <a href="#">
                             <Icon type="user" /> Login
                            </a>
                           </span>
                            <span>
                            <Dropdown overlay={language} trigger={['click']}>
                             <a className={styles['ant-dropdown-link']} href="#">
                              Language <Icon type="down" />
                             </a>
                            </Dropdown>
                           </span>
                        </div>
                        {/* Add Component End: User information domain */}
                    </Header>
                    {/* Header End */}
                    {/* Content Wrapper Start */}
                    <Content className={styles['container-wrapper']}>
                        <Breadcrumb className={styles['current-info']}>
                            <Breadcrumb.Item>Records Summary</Breadcrumb.Item>
                            <Breadcrumb.Item>Detail View</Breadcrumb.Item>
                        </Breadcrumb>
                        {/* Contents Start */}
                        <div className={styles['contents-wrapper']}>
                            {this.props.children}
                        </div>
                        {/* Contents End */}
                    </Content>
                    {/* Content Wrapper End */}
                    {/* Footer Strart */}
                    <Footer className={styles['footer-align']}>
                        <p>
                            eHub ©2017 Created by Beer Design
                        </p>
                        <p>
                            Code Generate by Admin CRUD Scaffold v.0.3.2
                        </p>
                    </Footer>
                    {/* Footer End*/}
                </Layout>
            </Layout>
        );
    }
}

export default EHubLayout;