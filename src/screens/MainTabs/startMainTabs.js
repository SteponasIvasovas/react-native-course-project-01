import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startMainTabs = () => {
	Promise.all([
		Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
		Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : 'ios-share', 30),
		Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30),
	]).then(sources => {
		Navigation.setRoot({
			root: {
				sideMenu: {
					left: {
						component: {
							id: 'lefSideDrawerScreenID',
							name: 'SideDrawerScreen',
						},
					},
					center: {
						bottomTab: {
							selectedColor: 'orange',
						},
						bottomTabs: {
							id: 'BottomTabsID',
							children: [
								{
									stack: {
										children: [
											{
												component: {
													name: 'FindPlaceScreen',
													options: {
														topBar: {
															title: {
																text: 'Find place',
															},
															leftButtons: [
																{
																	id: 'sideDrawerToggler',
																	icon: sources[2],
																	text: 'Menu',
																	color: 'orange',
																},
															],
														},
													},
												},
											},
										],
										options: {
											bottomTab: {
												text: 'Find place',
												selectedIconColor: 'orange',
												icon: sources[0],
											},
										},
									},
								},
								{
									stack: {
										children: [
											{
												component: {
													name: 'SharePlaceScreen',
													options: {
														topBar: {
															title: {
																text: 'Share place',
															},
															leftButtons: [
																{
																	id: 'sideDrawerToggler',
																	icon: sources[2],
																	text: 'Menu',
																	color: 'orange',
																},
															],
														},
													},
												},
											},
										],
										options: {
											bottomTab: {
												text: 'Share place',
												selectedIconColor: 'orange',
												icon: sources[1],
											},
										},
									},
								},
							],
						},
					},
				},
			},
		});
	});
};

export default startMainTabs;
