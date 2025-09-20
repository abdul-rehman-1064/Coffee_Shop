import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

const MainScreen = ({ navigation, route }) => {
  const BgImage = require('../assests/Main.png');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={BgImage}
        style={styles.background}
        imageStyle={styles.image}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,1)']}
         accessibilityElementsHidden={true}
        style={styles.overlay}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text style={styles.subtitle}>
            Welcome to our cozy coffee corner, where every cup is a delightful
            for you.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: -220,
    width: width,
    height: height * 0.9,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: 350,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: '45',
    color: 'white',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#A2A2A2',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    width: '100%',
    backgroundColor: '#C67C4E',
    marginBottom: 80,
    borderRadius: 16,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 16,
  },
});
