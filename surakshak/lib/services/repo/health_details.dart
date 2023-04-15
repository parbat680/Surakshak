import 'dart:convert';
import 'dart:developer';

import 'package:get/get.dart';
import 'package:surakshak/services/data/api.dart';

import '../../models/health_details.dart';

class UpdateHealthDetailsHandler {
  static final ApiHandler _apiHandler = ApiHandler();
  static update(HealthDetailsModel healthDetailsModel) async {
    try {
      print("try");
      var response = await _apiHandler.post("senior/add/healthdetails", {
        'sistolic': healthDetailsModel.sistolic,
        'diastolic': healthDetailsModel.diastolic,
        'pulse': healthDetailsModel.pulseRate
      });
      print(response.data);
      if (response.statusCode == 200) {
        log('Successful');
        Get.snackbar("Success", "Request Success");
      }
    } catch (e) {
      log(e.toString());
      Get.snackbar("Error", "Something went wrong");
    }
  }
}
