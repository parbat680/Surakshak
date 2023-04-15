import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:surakshak/view/home/bottom_nav.dart';
import 'package:surakshak/view/home/passkey.dart';

import '../services/repo/cached.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _navigateToHome();
  }

  _navigateToHome() async {
    await Future.delayed(const Duration(milliseconds: 2500));
    CacheData().getToken() == null
        ? Get.offAll(const PasskeyScreen())
        : Get.offAll(const BottomNavBar());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          child: Image.asset(
            'assets/splash_screen.jpg',
            height: 130,
            width: 250,
          ),
        ),
      ),
    );
  }
}
