import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from './../ListItem/ListItem.js';

const PlaceList = props => {
	return (
		<FlatList
			style={styles.listContainer}
			data={props.places}
			renderItem={info => {
				return <ListItem placeName={info.item.name} placeImage={info.item.image} onItemPress={() => props.onItemPress(info.item.key)} />;
			}}
		/>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		width: '100%',
	},
});

export default PlaceList;
