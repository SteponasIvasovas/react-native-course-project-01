import React, { Fragment, Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { placeDelete } from './../../store/actions/index.js';
import { Navigation } from 'react-native-navigation';

class PlaceDetail extends Component {
	handlePlaceDelete = () => {
		this.props.onPlaceDelete(this.props.selectedPlace.key);
		Navigation.pop(this.props.componentId);
	};

	render() {
		return (
			<View style={styles.container}>
				<Image source={this.props.selectedPlace.image} style={styles.placeImage} />
				<Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
				<View>
					<TouchableOpacity onPress={this.handlePlaceDelete}>
						<View style={styles.deleteButton}>
							<Icon size={30} color="red" name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 22,
	},
	placeImage: {
		width: '100%',
		height: 200,
	},
	placeName: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 28,
	},
	deleteButton: {
		alignItems: 'center',
	},
});

const mapDispatchToProps = dispatch => {
	return {
		onPlaceDelete: key => dispatch(placeDelete(key)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(PlaceDetail);
