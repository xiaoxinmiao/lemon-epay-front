import React, { Component } from 'react';
import EHubLayout from '../BeerDesign/EHubLayout';

function MainLayout({ children, location }) {
	let menu = {
		selectedKey: location.pathname,
		items: [
			{
				name: 'ShopGreen',
				key: '/shopGreen',
				link: '/shopGreen',
				iconType: 'code-o'
			},
		]
	};
	return (
		<EHubLayout menu={menu}>
			{children}
		</EHubLayout>
	);
}

export default MainLayout;