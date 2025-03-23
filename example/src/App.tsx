import { generateQRCode } from 'react-native-string-to-qrcode-base64';
import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

export default function App() {
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    generateQRCode('Hello World').then(setQrCode).catch(console.error);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>QR Code Generator</Text>
          <Image
            source={{ uri: `data:image/png;base64,${qrCode}` }}
            style={styles.image}
          />
          <Text style={styles.qrCodeText}>QR Code: {qrCode}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  qrCodeText: {
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
