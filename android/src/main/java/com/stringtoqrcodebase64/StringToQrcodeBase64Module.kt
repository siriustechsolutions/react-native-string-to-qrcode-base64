package com.stringtoqrcodebase64

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

import android.graphics.Bitmap
import android.util.Base64
import com.google.zxing.BarcodeFormat
import com.google.zxing.EncodeHintType
import com.google.zxing.MultiFormatWriter
import com.google.zxing.common.BitMatrix
import java.io.ByteArrayOutputStream

class StringToQrcodeBase64Module(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun generateQRCode(text: String, promise: Promise) {
    try {
      val hints = mapOf(EncodeHintType.MARGIN to 1)

      val bitMatrix: BitMatrix =
        MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, 512, 512, hints)

      val width = bitMatrix.width
      val height = bitMatrix.height
      val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565)

      for (x in 0 until width) {
        for (y in 0 until height) {
          bitmap.setPixel(
            x,
            y,
            if (bitMatrix.get(x, y)) -0x1000000 else -0x1
          )
        }
      }

      val outputStream = ByteArrayOutputStream()
      bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
      val byteArray = outputStream.toByteArray()
      val base64QRCode = Base64.encodeToString(byteArray, Base64.DEFAULT)

      promise.resolve(base64QRCode)
    } catch (e: Exception) {
      promise.reject("QR_CODE_GENERATION_ERROR", e)
    }
  }

  companion object {
    const val NAME = "StringToQrcodeBase64"
  }
}
