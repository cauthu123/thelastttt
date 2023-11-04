import React, { useState } from 'react';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import Logo from '../components/Logo';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { emailValidator } from '../helpers/emailValidator';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' });

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email.value);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Khôi phục mật khẩu</Header>
      <TextInput
        label="Địa chỉ E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Bạn sẽ nhận được email có link đặt lại mật khẩu."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Gửi OTP
      </Button>
    </Background>
  );
}
