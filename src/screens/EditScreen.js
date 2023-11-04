import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback, Image, ScrollView } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ref, set, get } from 'firebase/database';
import { database, auth } from '../../firebase'; // Import Firebase configuration
import { getStorage, ref as storageRef1, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function EditScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [companyName, setCompanyName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [facebook, setFacebook] = useState({ value: '', error: '' });
  const [linkedin, setLinkedin] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const [image, setImage] = useState(null);
  const [profiles, setProfiles] = useState(''); // Lưu trữ giá trị trường "profiles"

  useEffect(() => {
    fetchDataFromDatabase();
  }, []);

  const fetchDataFromDatabase = async () => {
    try {
      const userUid = auth.currentUser.uid;
      const userRef = ref(database, `users/${userUid}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        setName({ value: userData.name, error: '' });
        setCompanyName({ value: userData.companyName, error: '' });
        setPhone({ value: userData.phone, error: '' });
        setFacebook({ value: userData.facebook, error: '' });
        setLinkedin({ value: userData.linkedin, error: '' });
        setDescription({ value: userData.description, error: '' });
        setImage(userData.image);
        setProfiles(userData.profiles); // Lấy giá trị trường "profiles"
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu từ cơ sở dữ liệu:', error);
    }
  };

  const onSavePressed = async () => {
    try {
      if (!image) {
        Alert.alert('Vui lòng chọn một hình ảnh trước khi lưu.');
        return;
      }

      const imageURL = await uploadImage(image);

      const userUid = auth.currentUser.uid;
      const userRef = ref(database, `users/${userUid}`);

      // Chỉ cập nhật các trường đã thay đổi và giữ nguyên trường "profiles"
      await set(userRef, {
        name: name.value,
        companyName: companyName.value,
        phone: phone.value,
        facebook: facebook.value,
        linkedin: linkedin.value,
        description: description.value,
        image: imageURL,
        profiles: profiles, // Giữ nguyên giá trị trường "profiles"
      });

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
    const storageRef = storageRef1(storage, 'avatars/' + auth.currentUser.uid + '/' + new Date().getTime() + '.jpg');
    const response = await fetch(uri);
    const blob = await response.blob();
    const snapshot = await uploadBytes(storageRef, blob);
    return getDownloadURL(snapshot.ref);
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
              <Image source={require('../assets/path_to_default_image.png')} style={{ width: 150, height: 150, borderRadius: 100 }} />
            )}
          </TouchableOpacity>
          <TextInput
            label="Họ và tên"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
          />
          <TextInput
            label="Tên công ty"
            returnKeyType="next"
            value={companyName.value}
            onChangeText={(text) => setCompanyName({ value: text, error: '' })}
          />
          <TextInput
            label="Số điện thoại"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />
          <TextInput
            label="Facebook"
            returnKeyType="next"
            value={facebook.value}
            onChangeText={(text) => setFacebook({ value: text, error: '' })}
          />
          <TextInput
            label="LinkedIn"
            returnKeyType="next"
            value={linkedin.value}
            onChangeText={(text) => setLinkedin({ value: text, error: '' })}
          />
          <TextInput
            label="Mô tả bản thân"
            returnKeyType="done"
            value={description.value}
            onChangeText={(text) => setDescription({ value: text, error: '' })}
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
