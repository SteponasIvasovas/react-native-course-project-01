import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native';

const ButtonWithBackground = props => {
	const contentUI = (
		<View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
			<Text style={props.disabled ? styles.disabledTextColor : null}>{props.children}</Text>
		</View>
	);

	// if (props.disabled) {
	// 	return contentUI;
	// }

	if (Platform.OS === 'android') {
		return <TouchableNativeFeedback onPress={props.onPress}>{contentUI}</TouchableNativeFeedback>;
	}

	return <TouchableOpacity onPress={props.onPress}>{contentUI}</TouchableOpacity>;
};

const styles = StyleSheet.create({
	button: {
		padding: 10,
		margin: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'black',
	},
	disabled: {
		backgroundColor: '#eee',
		borderColor: '#aaa',
	},
	disabledTextColor: {
		color: '#aaa',
	},
});

export default ButtonWithBackground;
