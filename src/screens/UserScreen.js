import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking, Share } from 'react-native';


export default function UserScreen({ navigation }) {
    const [userData, setUserData] = useState({
        image: null,
        name: '',
        phone: '',
        companyName: '',
        description: '',
        facebook: '',
        linkedin: '',
    });

    const [profileURL, setProfileURL] = useState('');

    useEffect(() => {
        const userId = auth.currentUser.uid;
        const dbRef = ref(database, `users/${userId}`);

        get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserData({
                        image: data.image,
                        name: data.name,
                        phone: data.phone,
                        companyName: data.companyName,
                        description: data.description,
                        facebook: data.facebook,
                        linkedin: data.linkedin,
                    });

                    // Tạo URL cho trang profile
                    const profileURL = `http://192.168.1.42:5500/CardLink/detail.html?id=${userId}`;
                    setProfileURL(profileURL); // Thay 'example.com' bằng domain thực tế của bạn
                } else {
                    console.log('Không tìm thấy dữ liệu người dùng.');
                    Alert.alert('Lỗi dữ liệu!', 'Không tìm thấy dữ liệu người dùng..', [
                        {
                            text: 'Quay lại',
                            onPress: () => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Dashboard' }],
                                });
                            },
                        },
                    ]);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi truy cập dữ liệu:', error);
            });
    }, []);



    return (
        <Background>
            <View style={styles.card}>
                <IconButton
                    icon="arrow-left"
                    color="#000"
                    size={20}
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Dashboard' }],
                        })
                    }
                    style={styles.leftIcon}
                />
                <IconButton
                    icon="pencil"
                    color="#000"
                    size={20}
                    onPress={() =>
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'EditScreen' }],
                        })
                    }
                    style={styles.rightIcon}
                />
                <Image
                    style={styles.avatar}
                    source={{ uri: userData.image }}
                />
                <Text style={styles.name}>{userData.name}</Text>
                <Text style={styles.title}>{userData.companyName}</Text>
                <Text style={styles.description}>{userData.description}</Text>

                <View style={styles.iconRow}>
                    <Icon
                        name="phone"
                        size={30}
                        style={styles.icon}
                        onPress={() => {
                            if (userData.phone) {
                                const phoneNumber = `tel:${userData.phone}`;
                                Linking.openURL(phoneNumber);
                            }
                        }}
                    />
                    <Icon
                        name="facebook"
                        size={30}
                        style={styles.icon}
                        onPress={() => {
                            if (userData.facebook) {
                                Linking.openURL(userData.facebook);
                            }
                        }}
                    />
                    <Icon
                        name="linkedin"
                        size={30}
                        style={styles.icon}
                        onPress={() => {
                            if (userData.linkedin) {
                                Linking.openURL(userData.linkedin);
                            }
                        }}
                    />
                    <Icon
                        name="share"
                        style={styles.icon}
                        size={30}
                        onPress={() => {
                            Share.share({
                                message: `${profileURL}`,
                            });
                        }}
                    />
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 16,
        alignItems: 'center',
        width: 'auto',
        height: 'auto',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    description: {
        paddingTop: 16,
        fontSize: 14,
        color: '#777',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
    },
    icon: {
        padding: 20,
        marginRight: 5,
        color: '#3B5998',
    },
    shareIcon: {
        position: 'absolute',
        right: 1,
    },
    leftIcon: {
        position: 'absolute',
        left: 1,
    },
    rightIcon: {
        position: 'absolute',
        right: 1,
    }
});
