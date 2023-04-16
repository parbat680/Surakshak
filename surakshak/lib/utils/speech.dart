import 'dart:async';
import 'dart:developer';

import 'package:surakshak/services/repo/cached.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:lottie/lottie.dart';
import 'package:speech_to_text/speech_recognition_result.dart';
import 'package:speech_to_text/speech_to_text.dart';
import 'package:speech_to_text/speech_to_text.dart';

class SpeachToText {
  final SpeechToText _speechToText = SpeechToText();

  bool _speechEnabled = false;
  String lastWords = '';
  final BuildContext context;
  Timer? timer;
  bool cancelTimer = false;
  final void Function(String) onResult;

  SpeachToText({required this.context, required this.onResult}) {
    _initSpeech();

    timer = Timer(Duration(seconds: 4), () {
      // This code will be executed after 2 seconds
      if (!cancelTimer) {
        Get.back(result: "hii");
      }
    });
  }

  /// This has to happen only once per app
  void _initSpeech() async {
    _speechEnabled = await _speechToText.initialize();
    startListening();
  }

  /// Each time to start a speech recognition session
  void startListening() async {
    if (!_speechEnabled) return;
    await _speechToText
        .listen(
      onResult: _onSpeechResult,
      cancelOnError: true,
    )
        .catchError((error) {
      if (error is TimeoutException) {
        log('Timeout');
      } else {
        log('Error: $error');
      }
      _stopListening();
    }).timeout(const Duration(seconds: 2), onTimeout: () {
      _stopListening();
      return "";
    });

    showRecord(context);
  }

  /// Manually stop the active speech recognition session
  /// Note that there are also timeouts that each platform enforces
  /// and the SpeechToText plugin supports setting timeouts on the
  /// listen method.
  void _stopListening() async {
    log("fired");
    await _speechToText.stop();
    Get.back();
  }

  /// This is the callback that the SpeechToText plugin calls when
  /// the platform returns recognized words.
  void _onSpeechResult(SpeechRecognitionResult result) {
    cancelTimer = true;
    if (result.finalResult) {
      lastWords = result.recognizedWords;
      onResult(lastWords);
      log(lastWords);
      timer!.cancel();
      _stopListening();
    }
  }

  showRecord(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return Container(
          child: Lottie.asset('assets/mic.json'),
        );
      },
    );
  }
}
