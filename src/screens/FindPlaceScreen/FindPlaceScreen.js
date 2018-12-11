import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';
import PlaceList from './../../components/PlaceList/PlaceList.js';

class FindPlaceScreen extends Component {
	state = {
		placesLoaded: false,
		removeAnimation: new Animated.Value(1),
		placesAnimation: new Animated.Value(0),
	};

	handleItemPress = key => {
		const selectedPlace = this.props.places.find(place => {
			return place.key === key;
		});

		Navigation.push(this.props.componentId, {
			component: {
				name: 'PlaceDetailScreen',
				passProps: {
					selectedPlace: selectedPlace,
				},
				options: {
					topBar: {
						title: {
							text: selectedPlace.name,
						},
					},
				},
			},
		});
	};

	handlePlaceLoad = () => {
		Animated.timing(this.state.placesAnimation, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	handlePlaceSearch = () => {
		Animated.timing(this.state.removeAnimation, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start(() => {
			this.setState({
				placesLoaded: true,
			});
			this.handlePlaceLoad();
		});
	};

	render() {
		let content = (
			<Animated.View
				style={{
					opacity: this.state.removeAnimation,
					transform: [
						{
							scale: this.state.removeAnimation.interpolate({
								inputRange: [0, 1],
								outputRange: [12, 1],
							}),
						},
					],
				}}
			>
				<TouchableOpacity onPress={this.handlePlaceSearch}>
					<View style={styles.searchButton}>
						<Text style={styles.searchButtonText}>Find places</Text>
					</View>
				</TouchableOpacity>
			</Animated.View>
		);

		if (this.state.placesLoaded) {
			content = (
				<Animated.View style={{ opacity: this.state.placesAnimation }}>
					<PlaceList places={this.props.places} onItemPRess={this.handleItemPress} />
				</Animated.View>
			);
		}

		return <View style={this.state.placesLoaded ? null : styles.buttonContainer}>{content}</View>;
	}
}

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	searchButton: {
		borderColor: 'orange',
		borderWidth: 3,
		borderRadius: 50,
		padding: 20,
	},
	searchButtonText: {
		color: 'orange',
		fontWeight: 'bold',
		fontSize: 26,
	},
});

const mapStateToProps = state => {
	return {
		places: state.places.places,
	};
};

export default connect(mapStateToProps)(FindPlaceScreen);
