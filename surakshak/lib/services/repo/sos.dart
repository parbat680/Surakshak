import 'dart:developer';

import 'package:surakshak/services/data/api.dart';
import 'package:get/get.dart';

class SosHelper {
  static final ApiHandler _apiHandler = ApiHandler();
  static Future sendSos(String condition, double latitude, double longitude) async {
    try {
      var response = await _apiHandler
          .post("sos/fire", {"condition": condition, "latitude": latitude, "longitude": longitude});
      if (response.statusCode == 200) {
        Get.snackbar("Success", "SOS send Successfully");
      } else {
        Get.snackbar("Error", "Error sending SOS");
      }
    } catch (e) {
      Get.snackbar("Error", "Error sending SOS");
      log(e.toString());
    }
  }
}
