import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'

export default function StartScreen({ navigation }) {
  
  return (
    <Background>
      <Logo />
      <Header>Đăng nhập</Header>
      <Paragraph>
        Cách dễ nhất để bắt đầu với ứng dụng tuyệt vời của bạn.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Đăng nhập
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Đăng ký
      </Button>
    </Background>
  )
}
