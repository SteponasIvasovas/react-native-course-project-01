import React, { Component } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import DefaultInput from './../UI/DefaultInput/DefaultInput.js';

const PlaceInput = props => {
	return <DefaultInput placeholder="Place name" value={props.placeName} onChangeText={props.onChangeText} />;
};

export default PlaceInput;
