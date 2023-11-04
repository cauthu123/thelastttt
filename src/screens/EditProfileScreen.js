import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import * as ImagePicker from 'expo-image-picker';
import { ref, set } from 'firebase/database';
import { database, auth } from '../../firebase'; // Import Firebase configuration
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditProfileScreen({ route, navigation }) {
    const { profileData } = route.params;
    const [editedUserData, setEditedUserData] = useState({
        id: profileData.id,
        image: profileData.image,
        name: profileData.name,
        phone: profileData.phone,
        companyName: profileData.companyName,
        description: profileData.description,
        facebook: profileData.facebook,
        linkedin: profileData.linkedin,
    });
    const [image, setImage] = useState(null);

    const handleInputChange = (field, value) => {
        setEditedUserData({ ...editedUserData, [field]: value });
    };
    const onSavePressed = async () => {
        try {
            if (!image) {
                Alert.alert('Vui lòng chọn một hình ảnh trước khi lưu.');
                return;
            }

            const imageURL = await uploadImage(image);

            const userUid = auth.currentUser.uid;
            const userRef = ref(database, `users/${userUid}/profiles/${profileData.id}`);

            const updatedUserData = {
                ...editedUserData,
                image: imageURL, // Update the image with the new one
            };

            await set(userRef, updatedUserData);

            Alert.alert('Cập nhật thành công!', 'Thông tin của bạn đã được cập nhật.');

            navigation.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
            });
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin:', error);
            Alert.alert('Lỗi khi cập nhật', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.');
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Cần quyền truy cập thư viện ảnh để tiếp tục');
            return { cancelled: true };
        }

        const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!imagePickerResult.canceled) {
            setImage(imagePickerResult.assets[0].uri);
        }
    };

    const uploadImage = async (uri) => {
        const storage = getStorage();
        const storageRef1 = storageRef(storage, 'avatars/' + auth.currentUser.uid + '/' + new Date().getTime() + '.jpg');
        const response = await fetch(uri);
        const blob = await response.blob();
        const snapshot = await uploadBytes(storageRef1, blob);
        const imageURL = await getDownloadURL(snapshot.ref);
        return imageURL;
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                <Background>
                    <IconButton
                        icon="arrow-left"
                        color="#000"
                        size={30}
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Dashboard' }],
                            })
                        }
                        style={styles.leftIcon}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        {image ? (
                            <Image source={{ uri: image }} style={{ width: 150, height: 150, borderRadius: 100 }} />
                        ) : (
                            <Image source={{ uri: editedUserData.image }} style={{ width: 150, height: 150, borderRadius: 100 }} />
                        )}
                    </TouchableOpacity>
                    <TextInput
                        label="Họ và tên"
                        returnKeyType="next"
                        value={editedUserData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                    />
                    <TextInput
                        label="Tên công ty"
                        returnKeyType="next"
                        value={editedUserData.companyName}
                        onChangeText={(text) => handleInputChange('companyName', text)}
                    />
                    <TextInput
                        label="Số điện thoại"
                        returnKeyType="next"
                        value={editedUserData.phone}
                        onChangeText={(text) => handleInputChange('phone', text)}
                        autoCompleteType="tel"
                        textContentType="telephoneNumber"
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        label="Facebook"
                        returnKeyType="next"
                        value={editedUserData.facebook}
                        onChangeText={(text) => handleInputChange('facebook', text)}
                    />
                    <TextInput
                        label="LinkedIn"
                        returnKeyType="next"
                        value={editedUserData.linkedin}
                        onChangeText={(text) => handleInputChange('linkedin', text)}
                    />
                    <TextInput
                        label="Mô tả bản thân"
                        returnKeyType="done"
                        value={editedUserData.description}
                        onChangeText={(text) => handleInputChange('description', text)}
                        multiline
                    />
                    <Button mode="contained" onPress={onSavePressed} style={{ marginTop: 24 }}>
                        Lưu thay đổi
                    </Button>
                </Background>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    leftIcon: {
        position: 'absolute',
        left: 1,
        top: 30,
    }
});
