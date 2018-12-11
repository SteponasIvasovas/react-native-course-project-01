import React, { Component, Fragment } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceholder from './../../assets/rose-blue-flower-rose-blooms-67636.jpeg';

class PickImage extends Component {
	render() {
		return (
			<Fragment>
				<View style={styles.placeholder}>
					<Image source={imagePlaceholder} style={styles.previewImage} />
				</View>
				<View style={styles.button}>
					<Button title="Pick image" onPress={() => alert('Pick image')} />
				</View>
			</Fragment>
		);
	}
}

const styles = StyleSheet.create({
	placeholder: {
		borderWidth: 1,
		borderColor: 'black',
		backgroundColor: '#eee',
		width: '80%',
		height: 150,
	},
	button: {
		margin: 8,
	},
	previewImage: {
		width: '100%',
		height: '100%',
	},
});

export default PickImage;
