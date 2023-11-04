import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen({ url, onGoBack }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onGoBack} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Quay lại</Text>
            </TouchableOpacity>
            <WebView source={{ uri: url }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 999,
    },
    closeButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
