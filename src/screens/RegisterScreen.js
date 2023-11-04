import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native'; // Import Keyboard
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ref, set, getDatabase } from 'firebase/database';
import { getStorage, ref as storageRef1, uploadBytes, getDownloadURL } from 'firebase/storage';
// import Modal from 'react-native-modal';
import SpinnerOverlay from 'react-native-loading-spinner-overlay'; // Import thư viện


export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [companyName, setCompanyName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [facebook, setFacebook] = useState({ value: '', error: '' });
  const [linkedin, setLinkedin] = useState({ value: '', error: '' });
  const [role, setRole] = useState({ value: '', error: '' });
  const [description, setDescription] = useState({ value: '', error: '' });
  const [image, setImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const onSignUpPressed = async () => {
    // setLoading(true);
    if (currentStep === 1) {
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError || nameError) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      try {

        const imagePickerResult = await pickImage();

        if (!imagePickerResult.canceled) {
          setLoading(true);
          const imageURL = await uploadImage(imagePickerResult.assets[0].uri);
          setTimeout(() => {
            setImage(imageURL);
          }, 2000);


          const auth = getAuth();
          const authUser = await createUserWithEmailAndPassword(auth, email.value, password.value);

          const userUid = authUser.user.uid;
          const database = getDatabase();
          const dbRef = ref(database, `users/${userUid}`);


          set(dbRef, {
            name: name.value,
            email: email.value,
            companyName: companyName.value,
            phone: phone.value,
            facebook: "https://facebook.com/" + facebook.value,
            linkedin: "https://linkedin.com/" + linkedin.value,
            role: "user",
            image: imageURL,
            description: description.value,
          });
          setLoading(false);
          // Hiển thị cảnh báo thành công và sau đó chuyển qua Dashboard
          Alert.alert('Đăng ký thành công!', 'Chúc bạn có một trải nghiệm vui vẻ.', [
            {
              text: 'Xem hồ sơ',
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dashboard' }],
                });
              },
            },
          ]);


        }
      } catch (error) {
        Alert.alert('Lỗi đăng ký', 'Đã xảy ra lỗi khi đăng ký tài khoản. Vui lòng thử lại sau.');
        console.log(error);
        setLoading(false);
      }
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Cần quyền truy cập thư viện ảnh để tiếp tục');
      return { cancelled: true };
    }

    return ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  };

  const uploadImage = async (uri) => {

    const storage = getStorage();
    const storageRef = storageRef1(storage, 'avatars/' + new Date().getTime() + '.jpg');
    const response = await fetch(uri);
    const blob = await response.blob();
    const snapshot = await uploadBytes(storageRef, blob);

    return getDownloadURL(snapshot.ref);

  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Background>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Tạo tài khoản</Header>
          {currentStep === 1 && (
            <>
              <TextInput
                label="Họ và tên"
                returnKeyType="next"
                value={name.value}
                onChangeText={(text) => setName({ value: text, error: '' })}
                error={!!name.error}
                errorText={name.error}
              />
              <TextInput
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={(text) => setEmail({ value: text, error: '' })}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <TextInput
                label="Mật khẩu"
                returnKeyType="done"
                value={password.value}
                onChangeText={(text) => setPassword({ value: text, error: '' })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
              />
            </>
          )}
          {currentStep === 2 && (
            <>
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
            </>
          )}
          {currentStep === 3 && (
            <>
              {/* <Button
              mode="outlined"
              onPress={pickImage}
              style={{ marginTop: 16 }}
            >
              Chọn hình ảnh
            </Button>

            {image && (
              <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            )} */}
              <TextInput
                label="Mô tả bản thân"
                returnKeyType="done"
                value={description.value}
                onChangeText={(text) => setDescription({ value: text, error: '' })}
                multiline
              />
            </>
          )}

          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            {currentStep === 1 ? 'Tiếp tục' : currentStep === 2 ? 'Tiếp tục' : 'Chọn ảnh đại diện'}
          </Button>
          {currentStep === 1 && (
            <View style={styles.row}>
              <Text>Bạn đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.link}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* Loading animation */}
          <SpinnerOverlay
            visible={loading}
            color="rgba(0, 0, 0, 0.5)"
          />
        </Background>
      </View>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
