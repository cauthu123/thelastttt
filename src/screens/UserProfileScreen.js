import React, { useState, useEffect } from 'react';
import { Alert, ImageBackground, View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, Share } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme';
import { IconButton } from 'react-native-paper';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase';
import BottomBar from '../components/BottomBar';

export default function UserProfileScreen({ navigation }) {
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
        <ImageBackground
            source={require('../assets/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <Image
                        source={{ uri: userData.image }}
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.boxBody}>
                    <ScrollView>
                        <TouchableOpacity
                            style={styles.userProfileItem}
                            onPress={() => {
                                navigation.navigate('EditScreen');
                            }}

                        >
                            <IconButton
                                icon="cog"
                                color="#000"
                                size={30}
                                style={styles.icon}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.title_body}>Thông tin cá nhân</Text>
                            </View>
                            <IconButton
                                icon="chevron-right"
                                color="#000"
                                size={30}
                                style={styles.right_icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.userProfileItem}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'NFCListScreen' }],
                                });
                            }}

                        >
                            <IconButton
                                icon="share"
                                color="#000"
                                size={30}
                                style={styles.icon}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.title_body}>Chia sẻ</Text>
                            </View>
                            <IconButton
                                icon="chevron-right"
                                color="#000"
                                size={30}
                                style={styles.right_icon}
                            />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.userProfileItem}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'NFCListScreen' }],
                                });
                            }}

                        >
                            <IconButton
                                icon="card"
                                color="#000"
                                size={30}
                                style={styles.icon}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.title_body}>NFC</Text>
                            </View>
                            <IconButton
                                icon="chevron-right"
                                color="#000"
                                size={30}
                                style={[styles.right_icon]}
                            />
                        </TouchableOpacity> */}
                        <View style={styles.horizontalLine}></View>
                        <TouchableOpacity
                            style={styles.userProfileItem}
                            onPress={() => {
                                Alert.alert('Tính năng chưa hoạt động', 'Bạn hãy cố gắng chờ tính năng này ra mắt nhé.')
                            }}

                        >
                            <IconButton
                                icon="flag"
                                color="#000"
                                size={30}
                                style={styles.icon}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.title_body}>Báo cáo sự cố</Text>
                            </View>
                            <IconButton
                                icon="chevron-right"
                                color="#000"
                                size={30}
                                style={styles.right_icon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.userProfileItem}
                            onPress={() => {
                                Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
                                    {
                                        text: 'Đăng xuất',
                                        onPress: () => {
                                            // Điều hướng đến màn hình LoginScreen
                                            navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'LoginScreen' }],
                                            });
                                        },
                                    },
                                    {
                                        text: 'Hủy',
                                        style: 'cancel',
                                    },
                                ]);
                            }}

                        >
                            <IconButton
                                icon="logout"
                                color="#000"
                                size={30}
                                style={styles.icon}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.title_body_logout}>Đăng xuất</Text>
                            </View>
                            <IconButton
                                icon="chevron-right"
                                color="#000"
                                size={30}
                                onPress={navigator.navigate}
                                style={[styles.right_icon]}
                            />
                        </TouchableOpacity>
                    </ScrollView>

                </View>
            </View>
            <BottomBar navigation={navigation} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.surface,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: '7%',

    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,
        top: 30,
        alignSelf: 'center',
    },
    title: {
        flex: 1,
        fontSize: 25,
        marginRight: 10,
        marginLeft: 20,
        textAlign: 'left',
        top: 10,
        fontWeight: 'bold',
    },

    boxBody: {
        flex: 1,
        width: '99%',
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 10,
        // borderWidth: 0.5,
        marginTop: '70%',
        paddingTop: 10,
        shadowColor: 'black',      // Màu của shadow
        shadowOffset: {
            width: 0,              // Điều chỉnh độ dài và độ rộng của shadow
            height: 0,
        },
        shadowOpacity: 0.5,       // Điều chỉnh độ trong suốt của shadow
        shadowRadius: 3,
    },
    title_body: {
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'left',
        fontWeight: '700',
        // marginBottom: 10,
        alignItems: 'center',
    },
    title_body_logout: {
        fontSize: 18,
        marginLeft: 20,
        textAlign: 'left',
        fontWeight: '700',
        // marginBottom: 10,
        alignItems: 'center',
        color: '#EE0000',
    },
    userProfileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderRadius: 10,
        margin: 10,
        padding: 5,
        marginBottom: 5,

    },
    icon: {
        // borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },

    right_icon: {
        position: 'absolute',
        right: 0,
    },
    horizontalLine: {
        borderBottomWidth: 0.5, // Adjust the width as needed
        borderBottomColor: 'black', // Adjust the color as needed
        width: '90%', // Adjust the width to match the container width
        // alignItems: 'center',
        alignSelf: 'center',
    },
});