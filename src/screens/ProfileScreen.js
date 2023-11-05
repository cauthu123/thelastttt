import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking, Share } from 'react-native';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase';

export default function ProfileScreen({ route, navigation }) {
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

  
  // const [showWebView, setShowWebView] = useState(false);
  // const [webViewUrl, setWebViewUrl] = useState('');
  // const handleShare = () => {
  //   const NFC = `http://192.168.1.3:5500/NFC.html`;
  //   setWebViewUrl(NFC);
  //   setShowWebView(true);
  // };
  // const handleGoBack = () => {
  //   setShowWebView(false);
  // };

  // if (showWebView) {
  //   return <WebViewScreen url={webViewUrl} onGoBack={handleGoBack} />;
  // }



  const handleShare = () => {
    const profileURL = `https://cauthu123.github.io/thelastttt/index.html?userId=${userId}&profileId=${profileData.id}`;
    Share.share({
      message: profileURL,
      title: 'Chia sẻ thông tin hồ sơ'
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };

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
            navigation.navigate('EditProfileScreen', {
              profileData: userData,
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
            onPress={handleShare}
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
  },
  webView: {
    flex: 1,
  },
});
