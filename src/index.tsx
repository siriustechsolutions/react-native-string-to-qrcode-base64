import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-string-to-qrcode-base64' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const StringToQrcodeBase64 = NativeModules.StringToQrcodeBase64
  ? NativeModules.StringToQrcodeBase64
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function generateQRCode(text: string): Promise<string> {
  return StringToQrcodeBase64.generateQRCode(text);
}
