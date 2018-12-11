import React, { Component, Fragment } from 'react';
import { View, Image, Button, StyleSheet, Text, Dimensions } from 'react-native';
import imagePlaceholder from './../../assets/rose-blue-flower-rose-blooms-67636.jpeg';
import MapView from 'react-native-maps';

class PickLocation extends Component {
	state = {
		locationChosen: false,
		focusedLocation: {
			latitude: 37.7900352,
			longitude: -122.4013726,
			latitudeDelta: 0.0122,
			longitudeDelta: (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122,
		},
	};

	handleLocationPick = event => {
		const coords = event.nativeEvent.coordinate;
		this.map.animateToRegion({
			...this.state.focusedLocation,
			latitude: coords.latitude,
			longitude: coords.longitude,
		});

		this.setState(prevState => {
			return {
				locationChosen: true,
				focusedLocation: {
					...prevState.focusedLocation,
					latitude: coords.latitude,
					longitude: coords.longitude,
				},
			};
		});
	};

	render() {
		let markerUI = null;

		if (this.state.locationChosen) {
			markerUI = <MapView.Marker coordinate={this.state.focusedLocation} />;
		}

		return (
			<Fragment>
				<MapView
					initialRegion={this.state.focusedLocation}
					style={styles.map}
					onPress={this.handleLocationPick}
					ref={ref => (this.map = ref)}
				>
					{markerUI}
				</MapView>
				<View style={styles.button}>
					<Button title="Locate me" onPress={() => alert('Locate mes')} />
				</View>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		width: '100%',
		height: 250,
	},
	button: {
		margin: 8,
	},
	previewImage: {
		width: '100%',
		height: '100%',
	},
});

export default PickLocation;
