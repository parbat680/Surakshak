import 'dart:developer';
import 'dart:io';

import 'package:intl/intl.dart';
import 'package:surakshak/models/health_details.dart';
import 'package:surakshak/models/medicine.dart';
import 'package:surakshak/services/data/api.dart';
import 'package:get/get.dart';

class HealthDetailsHandler {
  static final ApiHandler _apiHandler = ApiHandler();
  static Future<List<HealthDetailsModel>> getHealthDetails() async {
    DateTime date = DateTime.now();
    List<HealthDetailsModel> sevenDaysHealthDetails = [];
    final response = await _apiHandler.post(
        'health/get/data', {"date": DateFormat('yyyy/MM/dd').format(date)});

    var data = response.data as List;

    if (response.statusCode == 200) {
      sevenDaysHealthDetails =
          data.map((e) => HealthDetailsModel.fromJson(e)).toList();
    } else {
      Get.snackbar("Error", "cannot get Medicine details");
    }

    log("me");

    return sevenDaysHealthDetails;
  }
}
