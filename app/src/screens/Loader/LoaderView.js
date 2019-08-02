import React, { Component } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Text } from 'native-base';
import styles from './LoaderStyle'
const SpinnerComponent = (props) => {
    return (
        <View style={styles.SpinnerStyle}>
            <ActivityIndicator size={props.size || 'large'} color='white' style={styles.indicator} />
            <Text style={styles.loadingText}>Loading ! Please wait....</Text>
        </View>
    )
};

export default SpinnerComponent;