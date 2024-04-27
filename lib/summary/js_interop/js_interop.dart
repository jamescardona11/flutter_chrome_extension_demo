// ignore_for_file: avoid_web_libraries_in_flutter

import 'dart:js_interop';

import 'raw_interop.dart' as interop;

abstract class JsInterop {
  static Future<String> getPageUrl() async {
    return (await interop.getPageUrl().toDart).toDart;
  }
}
