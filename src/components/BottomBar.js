import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BottomBar({ navigation }) {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={styles.bottomBarItem}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Icon name="home" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomBarItem}
                onPress={() => navigation.navigate('AddScreen')}
            >
                <Icon name="plus" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomBarItem}
                onPress={() => navigation.navigate('UserProfileScreen')}
            >
                <Icon name="user" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 25,
        // borderWidth: 1,
        borderColor: 'lightgray',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        shadowColor: 'black',      // Màu của shadow
        shadowOffset: {
            width: 0,              // Điều chỉnh độ dài và độ rộng của shadow
            height: 0,
        },
        shadowOpacity: 0.5,        // Điều chỉnh độ trong suốt của shadow
        shadowRadius: 3, 
    },
    bottomBarItem: {
        alignItems: 'center',
        flex: 1,
    },
});
