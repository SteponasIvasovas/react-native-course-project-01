import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './src/store/store.js';
import AuthScreen from './src/screens/AuthScreen/AuthScreen.js';
import SharePlaceScreen from './src/screens/SharePlaceScreen/SharePlaceScreen.js';
import FindPlaceScreen from './src/screens/FindPlaceScreen/FindPlaceScreen.js';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail.js';
import SideDrawerScreen from './src/screens/SideDrawer/SideDrawer.js';

Navigation.registerComponentWithRedux('AuthScreen', () => AuthScreen, Provider, store);
Navigation.registerComponentWithRedux('SharePlaceScreen', () => SharePlaceScreen, Provider, store);
Navigation.registerComponentWithRedux('FindPlaceScreen', () => FindPlaceScreen, Provider, store);
Navigation.registerComponentWithRedux('PlaceDetailScreen', () => PlaceDetailScreen, Provider, store);
Navigation.registerComponent('SideDrawerScreen', () => SideDrawerScreen);

const sideMenuPressedEvent = event => {
	console.log('hello');
	if (event.buttonId === 'sideDrawerToggler') {
		Navigation.mergeOptions('lefSideDrawerScreenID', {
			sideMenu: {
				left: {
					visible: true,
				},
			},
		});
	}
};

Navigation.events().registerNavigationButtonPressedListener(sideMenuPressedEvent);

Navigation.setRoot({
	root: {
		stack: {
			children: [
				{
					component: {
						name: 'AuthScreen',
					},
				},
			],
			options: {
				topBar: {
					title: {
						text: 'Login',
					},
				},
			},
		},
	},
});
