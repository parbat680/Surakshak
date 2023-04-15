import 'dart:convert';
import 'dart:developer';

import 'package:age_well/services/repo/cached.dart';
import 'package:age_well/view/home/bottom_nav.dart';
import 'package:dio/dio.dart';
import 'package:get/get.dart';

import '../../constants.dart';

class Auth {
  Future login(String passkey) async {
    CacheData cache = CacheData();
    var dio = Dio();

    var response = await dio.post(
      "$url/senior/login",
      data: {
        "id": passkey,
      },
      options: Options(headers: {
        'content-type': 'application/json',
      }),
    );
    log(response.toString());

    if (response.statusCode == 200) {
      log("jdjd");
      cache.addToken(jsonDecode(response.toString())['token']);
      Get.to(() => const BottomNavBar());
    } else {
      Get.snackbar("Error", "Something went wrong");
    }
  }
}
