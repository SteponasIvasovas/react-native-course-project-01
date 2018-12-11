import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { placeAdd } from './../../store/actions/index.js';
import PlaceInput from './../../components/PlaceInput/PlaceInput.js';
import MainText from './../../components/UI/MainText/MainText.js';
import HeadingText from './../../components/UI/HeadingText/HeadingText.js';
import PickImage from './../../components/PickImage/PickImage.js';
import PickLocation from './../../components/PickLocation/PickLocation.js';

class SharePlaceScreen extends Component {
	state = {
		placeName: '',
	};

	handlePlaceAdd = () => {
		if (this.state.placeName.trim() !== '') {
			this.props.onPlaceAdd(this.state.placeName);
		}
	};

	handlePlaceNameChange = value => {
		this.setState({
			placeName: value,
		});
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<MainText>
						<HeadingText>Share a place with us</HeadingText>
					</MainText>
					<PickImage />
					<PickLocation />
					<PlaceInput placeName={this.state.placeName} onChangeText={this.handlePlaceNameChange} />
					<View style={styles.button}>
						<Button title="Share the place!" onPress={this.handlePlaceAdd} />
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
});

const mapDispatchToProps = dispatch => {
	return {
		onPlaceAdd: placeName => dispatch(placeAdd(placeName)),
	};
};

export default connect(
	null,
	mapDispatchToProps
)(SharePlaceScreen);
