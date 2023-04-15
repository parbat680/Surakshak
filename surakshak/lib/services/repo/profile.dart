import 'dart:developer';

import 'package:surakshak/models/user.dart';
import 'package:surakshak/services/data/api.dart';
import 'package:get/get.dart';

class ProfileHandler {
  static final ApiHandler _apiHandler = ApiHandler();
  static Future<UserModel> getVolunteers() async {
    UserModel? user;
    try {
      var response = await _apiHandler.get("senior/get", "");
      log(response.data.toString());
      if (response.statusCode == 200) {
        user = UserModel.fromJson(response.data);
        log(user.toString());
      } else {
        Get.snackbar("Error", "Error Fetching volunteers");
      }
    } catch (e) {
      Get.snackbar("Error", "Error sending SOS");
      log(e.toString());
    }

    return user!;
  }
}
