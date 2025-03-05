# string-to-qrcode-base64

React Native String to QR Base64 is a lightweight and efficient library that converts any given string into a QR code and returns its Base64 representation. This allows seamless integration with image components and easy sharing across different platforms. The library is optimized for performance and works smoothly in React Native environments.

## Installation

```sh
npm install string-to-qrcode-base64
```

## Usage

```js
import { generateQRCode } from 'string-to-qrcode-base64';

// ...

const result = await generateQRCode('Qr Code Text');

<Image
    source={{ uri: `data:image/png;base64,${qrCode}` }}
    style={{ width: 200, height: 200 }}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
