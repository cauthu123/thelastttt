import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking, Share } from 'react-native';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase';
import Button from '../components/Button';
import BackButton from '../components/BackButton';


export default function NFCDetailScreen({ route, navigation }) {
    const { profileData } = route.params; // Lấy dữ liệu hồ sơ từ route.params
    const userId = auth.currentUser.uid;
    // Sử dụng profileData để hiển thị thông tin hồ sơ
    const [userData, setUserData] = useState({
        id: profileData.id,
        image: profileData.image,
        name: profileData.name,
        phone: profileData.phone,
        companyName: profileData.companyName,
        description: profileData.description,
        facebook: profileData.facebook,
        linkedin: profileData.linkedin,
    });

    // const [profileURL, setProfileURL] = useState('');
    // const [showWebView, setShowWebView] = useState(false);
    // const [webViewUrl, setWebViewUrl] = useState('');


    const handleShare = () => {
        const profileURL = `https://cauthu123.github.io/thelastttt/index.html?userId=${userId}&profileId=${profileData.id}`;
        Share.share({
            message: profileURL,
            title: 'Chia sẻ thông tin hồ sơ'
        })
            .then(result => console.log(result))
            .catch(error => console.log(error));
    };
    // const handleWriteNfc = async () => {
    //     const profileURL = `https://chunn241529.github.io/first-app/index.html?userId=${userId}&profileId=${profileData.id}`;

    //     try {
    //         const result = await writeNdef(profileURL);
    //         Alert.alert('Ghi dữ liệu thành công', result);
    //     } catch (error) {
    //         Alert.alert('Ghi dữ liệu thất bại', 'Không tìm thấy thẻ để ghi dữ liệu.');
    //     }
    // };


    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Button mode="contained"
                onPress={handleShare}
            >Chia sẻ liên kết</Button>
        </Background >
    );

}

